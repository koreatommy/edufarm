import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Google Drive 이미지 파일의 메타데이터 타입
 */
interface DriveImage {
  id: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
  downloadUrl: string;
  apiUrl: string;
  createdTime: string;
  modifiedTime: string;
}

/**
 * API 응답 타입
 */
interface ApiResponse {
  images: DriveImage[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * 전체 개수 캐시 (메모리 기반, 서버 재시작 시 초기화)
 * 실제 프로덕션에서는 Redis 등을 사용하는 것이 좋습니다.
 */
let totalItemsCache: { count: number; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

/**
 * Google Drive Service Account 인증 및 API 클라이언트 생성
 */
function getGoogleDriveClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.trim();

  if (!serviceAccountEmail || !privateKey) {
    throw new Error('환경 변수가 설정되지 않았습니다: GOOGLE_SERVICE_ACCOUNT_EMAIL 또는 GOOGLE_PRIVATE_KEY');
  }

  // Private key의 이스케이프된 \n을 실제 줄바꿈으로 변환
  // 큰따옴표 제거 (환경 변수에 큰따옴표가 포함된 경우)
  let cleanedPrivateKey = privateKey.replace(/^["']|["']$/g, '');
  const formattedPrivateKey = cleanedPrivateKey.replace(/\\n/g, '\n');

  // JWT 인증 설정
  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: formattedPrivateKey,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  // Google Drive API 클라이언트 생성
  return google.drive({ version: 'v3', auth });
}

/**
 * GET /api/google-drive
 * 
 * Query Parameters:
 * - page: 현재 페이지 번호 (기본값: 1)
 * - skipCount: 전체 개수 계산 생략 여부 (기본값: false, true 시 성능 향상)
 * 
 * Google Drive 폴더에서 이미지 파일 목록을 가져옵니다.
 * 페이지당 30개의 이미지를 반환합니다.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const skipCount = searchParams.get('skipCount') === 'true';
    const invalidateCache = searchParams.get('invalidateCache') === 'true';

    // limit을 30으로 고정
    const fixedLimit = 30;
    
    // 페이지 번호 유효성 검사
    if (page < 1) {
      return NextResponse.json(
        { error: '잘못된 페이지 번호입니다.' },
        { status: 400 }
      );
    }

    // 폴더 ID 확인 (공백 및 줄바꿈 제거)
    const folderId = process.env.DRIVE_FOLDER_ID?.trim();
    if (!folderId) {
      return NextResponse.json(
        { 
          error: '환경 변수가 설정되지 않았습니다: DRIVE_FOLDER_ID',
          details: 'DRIVE_FOLDER_ID 환경 변수를 설정해주세요.'
        },
        { status: 500 }
      );
    }

    // Google Drive 클라이언트 생성
    const drive = getGoogleDriveClient();

    // 인증 토큰 확인 및 설정
    try {
      const auth = (drive as any).auth;
      if (auth) {
        // 인증 토큰 가져오기
        const token = await auth.getAccessToken();
        console.log('✅ Service Account 인증 성공, 토큰 획득');
        console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim());
      }
    } catch (authError: any) {
      console.error('❌ Service Account 인증 실패:', {
        message: authError.message,
        code: authError.code,
        errors: authError.errors,
      });
      throw new Error(`Service Account 인증 실패: ${authError.message}. 환경 변수 GOOGLE_PRIVATE_KEY를 확인해주세요.`);
    }

    // 먼저 폴더 접근 권한 확인
    try {
      console.log('폴더 접근 시도:', { folderId, serviceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() });
      const folderInfo = await drive.files.get({
        fileId: folderId,
        fields: 'id, name, mimeType, shared, permissions',
      });
      console.log('✅ 폴더 접근 성공:', {
        id: folderInfo.data.id,
        name: folderInfo.data.name,
        shared: folderInfo.data.shared,
      });
    } catch (folderError: any) {
      console.error('❌ 폴더 접근 실패:', {
        code: folderError?.code,
        message: folderError?.message,
        errors: folderError?.errors,
      });
      
      // Service Account가 접근 가능한 폴더 목록 확인 (디버깅용)
      try {
        const accessibleFiles = await drive.files.list({
          q: "mimeType='application/vnd.google-apps.folder' and trashed = false",
          fields: 'files(id, name)',
          pageSize: 5,
        });
        console.log('접근 가능한 폴더 목록 (최대 5개):', accessibleFiles.data.files?.map(f => ({ id: f.id, name: f.name })));
      } catch (listError) {
        console.error('폴더 목록 조회 실패:', listError);
      }
      
      // 404 오류는 실제로는 권한 문제일 수 있습니다
      if (folderError?.code === 404) {
        const shareLink = `https://drive.google.com/drive/folders/${folderId}`;
        const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || '설정되지 않음';
        const errorDetails = folderError?.errors?.[0] || {};
        
        // 더 자세한 에러 정보 포함
        let detailedMessage = `폴더를 찾을 수 없습니다 (404). 

⚠️ 중요: Service Account가 폴더에 공유되어 있어도 인증 문제로 404가 발생할 수 있습니다.

🔧 해결 방법:
1. 다음 링크로 폴더 열기: ${shareLink}
2. 공유 목록에서 ${serviceAccountEmail}이 있는지 확인
3. 없다면 추가: "공유" → 이메일 입력 → "뷰어" 권한 → "완료"
4. 있다면 권한을 "뷰어" 이상으로 설정
5. Google Cloud Console에서 Service Account가 활성화되어 있는지 확인
6. Private Key가 올바른지 확인

📋 확인 사항:
- 폴더 ID: ${folderId}
- Service Account: ${serviceAccountEmail}
- 공유 목록에 Service Account가 있는지 확인
- Service Account 권한이 "뷰어" 이상인지 확인`;

        if (process.env.NODE_ENV === 'development' && errorDetails.message) {
          detailedMessage += `\n\n🔍 개발 환경 디버그 정보:\n${errorDetails.message}`;
        }
        
        throw new Error(detailedMessage);
      } else if (folderError?.code === 403) {
        const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || '설정되지 않음';
        throw new Error(`폴더 접근 권한이 없습니다 (403). 

Google Drive에서 폴더를 공유하고 Service Account(${serviceAccountEmail})에 '뷰어' 권한을 부여해주세요.`);
      }
      throw folderError;
    }

    // 전체 이미지 개수 조회 (캐싱 및 선택적 계산)
    let totalItems = 0;
    let totalPages = 0;
    
    // 캐시 확인
    const now = Date.now();
    // invalidateCache가 true이면 캐시를 무효화
    if (invalidateCache) {
      totalItemsCache = null;
    }
    const useCache = totalItemsCache && (now - totalItemsCache.timestamp) < CACHE_DURATION;
    
    if (useCache && totalItemsCache) {
      // 캐시된 값 사용 (skipCount와 관계없이 캐시 사용)
      totalItems = totalItemsCache.count;
      totalPages = Math.ceil(totalItems / fixedLimit);
    } else if (!skipCount) {
      // skipCount가 false인 경우에만 전체 개수 계산 (최적화: pageSize를 최대값으로 사용)
      let nextPageToken: string | undefined = undefined;
      
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const countResponse = await drive.files.list({
          q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
          fields: 'nextPageToken, files(id)',
          pageSize: 1000, // Google Drive API 최대값
          pageToken: nextPageToken,
        }) as { data: { files?: Array<{ id?: string | null }>; nextPageToken?: string | null } };
        
        const files = countResponse.data.files || [];
        totalItems += files.length;
        nextPageToken = countResponse.data.nextPageToken || undefined;
        
        if (!nextPageToken) break;
      }
      
      // 캐시 업데이트
      totalItemsCache = {
        count: totalItems,
        timestamp: now,
      };
      
      totalPages = Math.ceil(totalItems / fixedLimit);
    } else {
      // skipCount가 true이고 캐시가 없는 경우: 추정치 사용하지 않음
      // 대신 전체 개수를 계산하거나 캐시를 기다림
      // 정확성을 위해 전체 개수 계산
      let nextPageToken: string | undefined = undefined;
      
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const countResponse = await drive.files.list({
          q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
          fields: 'nextPageToken, files(id)',
          pageSize: 1000, // Google Drive API 최대값
          pageToken: nextPageToken,
        }) as { data: { files?: Array<{ id?: string | null }>; nextPageToken?: string | null } };
        
        const files = countResponse.data.files || [];
        totalItems += files.length;
        nextPageToken = countResponse.data.nextPageToken || undefined;
        
        if (!nextPageToken) break;
      }
      
      // 캐시 업데이트
      totalItemsCache = {
        count: totalItems,
        timestamp: now,
      };
      
      totalPages = Math.ceil(totalItems / fixedLimit);
    }

    // 현재 페이지 데이터 조회 (최적화된 페이지 이동)
    let currentPageToken: string | undefined = undefined;
    
    // 페이지 이동 최적화: 1페이지가 아니면 해당 페이지까지 pageToken을 순차적으로 이동
    // 하지만 이미지 데이터는 가져오지 않고 nextPageToken만 가져와서 API 호출 최소화
    if (page > 1) {
      // 이전 페이지들의 nextPageToken만 수집 (데이터는 가져오지 않음)
      for (let i = 1; i < page; i++) {
        const tempResponse = await drive.files.list({
          q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
          fields: 'nextPageToken', // nextPageToken만 가져와서 최소한의 데이터만 전송
          pageSize: fixedLimit,
          orderBy: 'modifiedTime desc',
          pageToken: currentPageToken,
        }) as { data: { nextPageToken?: string | null } };
        
        currentPageToken = tempResponse.data.nextPageToken || undefined;
        if (!currentPageToken) {
          // 더 이상 페이지가 없으면 중단
          // 이 경우 현재 페이지가 마지막 페이지보다 큰 것이므로 빈 결과 반환
          break;
        }
      }
    }

    // 현재 페이지 데이터 조회
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, thumbnailLink, webViewLink, createdTime, modifiedTime, mimeType), nextPageToken',
      orderBy: 'modifiedTime desc', // 최신 파일부터
      pageSize: fixedLimit,
      pageToken: currentPageToken,
    }) as { 
      data: { 
        files?: Array<{
          id?: string | null;
          name?: string | null;
          thumbnailLink?: string | null;
          webViewLink?: string | null;
          createdTime?: string | null;
          modifiedTime?: string | null;
          mimeType?: string | null;
        }>;
        nextPageToken?: string | null;
      } 
    };

    const files = response.data.files || [];
    const hasNextPage = !!response.data.nextPageToken;

    // 이미지 메타데이터 생성
    const images: DriveImage[] = files.map((file) => {
      const fileId = file.id || '';
      const fileName = file.name || 'Untitled';
      
      // 프록시 URL 생성 (고해상도 이미지용)
      const proxyUrl = `/api/google-drive/image/${fileId}`;
      
      return {
        id: fileId,
        name: fileName,
        thumbnailLink: file.thumbnailLink || '', // 썸네일 (작은 이미지용)
        webViewLink: file.webViewLink || '',
        downloadUrl: proxyUrl, // 프록시 URL 사용 (고해상도)
        apiUrl: proxyUrl, // 프록시 URL 사용 (고해상도)
        createdTime: file.createdTime || '',
        modifiedTime: file.modifiedTime || '',
      };
    });

    // API 응답 생성
    const apiResponse: ApiResponse = {
      images,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNextPage: hasNextPage,
        hasPreviousPage: page > 1,
      },
    };

    return NextResponse.json(apiResponse, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0', // 캐시 비활성화 (실시간 업데이트용)
      },
    });

  } catch (error) {
    console.error('Google Drive API 오류:', error);
    console.error('에러 상세:', JSON.stringify(error, null, 2));

    // 에러 메시지 생성
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    let errorDetails = '';

    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Google API 에러인 경우
      if ('code' in error) {
        const googleError = error as { code?: number; errors?: Array<{ message: string; domain?: string; reason?: string }> };
        errorDetails = googleError.errors?.[0]?.message || '';
        
        // 권한 오류
        if (googleError.code === 403) {
          errorMessage = `Google Drive 접근 권한이 없습니다. 
          
해결 방법:
1. Google Drive에서 폴더 열기: https://drive.google.com/drive/folders/${process.env.DRIVE_FOLDER_ID}
2. 폴더 우클릭 → "공유" 클릭
3. 이메일 추가: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}
4. 권한: "뷰어" 선택
5. "완료" 클릭`;
        }
        // 폴더를 찾을 수 없음
        else if (googleError.code === 404) {
          errorMessage = `Google Drive 폴더를 찾을 수 없습니다. 

확인 사항:
- 폴더 ID: ${process.env.DRIVE_FOLDER_ID}
- Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}
- 폴더가 삭제되지 않았는지 확인
- Service Account에 폴더 접근 권한이 있는지 확인`;
        }
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
        folderId: process.env.DRIVE_FOLDER_ID?.trim(),
        serviceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim(),
      },
      { status: 500 }
    );
  }
}
