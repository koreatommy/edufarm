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
 * Google Drive Service Account 인증 및 API 클라이언트 생성
 */
function getGoogleDriveClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!serviceAccountEmail || !privateKey) {
    throw new Error('환경 변수가 설정되지 않았습니다: GOOGLE_SERVICE_ACCOUNT_EMAIL 또는 GOOGLE_PRIVATE_KEY');
  }

  // Private key의 이스케이프된 \n을 실제 줄바꿈으로 변환
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

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
 * 
 * Google Drive 폴더에서 이미지 파일 목록을 가져옵니다.
 * 페이지당 30개의 이미지를 반환합니다.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    // limit을 30으로 고정
    const fixedLimit = 30;
    
    // 페이지 번호 유효성 검사
    if (page < 1) {
      return NextResponse.json(
        { error: '잘못된 페이지 번호입니다.' },
        { status: 400 }
      );
    }

    // 폴더 ID 확인
    const folderId = process.env.DRIVE_FOLDER_ID;
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

    // 인증 토큰 확인 (디버깅용)
    try {
      const auth = (drive as any).auth;
      if (auth) {
        await auth.authorize();
        console.log('✅ Service Account 인증 성공');
      }
    } catch (authError: any) {
      console.error('❌ Service Account 인증 실패:', authError);
      throw new Error(`Service Account 인증 실패: ${authError.message}. 환경 변수 GOOGLE_PRIVATE_KEY를 확인해주세요.`);
    }

    // 먼저 폴더 접근 권한 확인
    try {
      const folderInfo = await drive.files.get({
        fileId: folderId,
        fields: 'id, name, mimeType, shared',
      });
      console.log('✅ 폴더 접근 성공:', folderInfo.data.name);
    } catch (folderError: any) {
      console.error('❌ 폴더 접근 실패:', {
        code: folderError?.code,
        message: folderError?.message,
        errors: folderError?.errors,
      });
      
      // 404 오류는 실제로는 권한 문제일 수 있습니다
      if (folderError?.code === 404) {
        const shareLink = `https://drive.google.com/drive/folders/${folderId}`;
        throw new Error(`폴더를 찾을 수 없습니다 (404). 

이는 보통 Service Account에 폴더 접근 권한이 없어서 발생합니다.

🔧 해결 방법:
1. 다음 링크로 폴더 열기: ${shareLink}
2. 폴더 우클릭 → "공유" 클릭
3. 이메일 입력: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}
4. 권한: "뷰어" 선택
5. "완료" 클릭
6. 서버 재시작 후 다시 시도

📋 확인 사항:
- 폴더 ID: ${folderId}
- Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}
- 폴더가 삭제되지 않았는지 확인`);
      } else if (folderError?.code === 403) {
        throw new Error(`폴더 접근 권한이 없습니다 (403). 

Google Drive에서 폴더를 공유하고 Service Account(${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL})에 '뷰어' 권한을 부여해주세요.`);
      }
      throw folderError;
    }

    // 전체 이미지 개수 조회 (모든 페이지를 순회하여 정확한 개수 계산)
    let totalItems = 0;
    let nextPageToken: string | undefined = undefined;
    
    do {
      const countResponse = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'nextPageToken, files(id)',
        pageSize: 1000, // Google Drive API 최대값
        pageToken: nextPageToken,
      });
      
      const files = countResponse.data.files || [];
      totalItems += files.length;
      nextPageToken = countResponse.data.nextPageToken || undefined;
    } while (nextPageToken);

    const totalPages = Math.ceil(totalItems / fixedLimit);

    // 현재 페이지 데이터 조회 (pageToken을 사용하여 해당 페이지까지 이동)
    let currentPageToken: string | undefined = undefined;
    let targetPage = page;
    
    // 1페이지가 아니면 해당 페이지까지 pageToken을 순차적으로 이동
    if (page > 1) {
      for (let i = 1; i < page; i++) {
        const tempResponse = await drive.files.list({
          q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
          fields: 'nextPageToken',
          pageSize: fixedLimit,
          orderBy: 'modifiedTime desc',
          pageToken: currentPageToken,
        });
        currentPageToken = tempResponse.data.nextPageToken || undefined;
        if (!currentPageToken) break; // 더 이상 페이지가 없으면 중단
      }
    }

    // 현재 페이지 데이터 조회
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, thumbnailLink, webViewLink, createdTime, modifiedTime, mimeType), nextPageToken',
      orderBy: 'modifiedTime desc', // 최신 파일부터
      pageSize: fixedLimit,
      pageToken: currentPageToken,
    });

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
        folderId: process.env.DRIVE_FOLDER_ID,
        serviceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      },
      { status: 500 }
    );
  }
}
