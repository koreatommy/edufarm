import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Google Drive API를 사용하여 폴더 내 이미지 파일 목록을 조회하는 API 엔드포인트
 */
export async function GET(request: NextRequest) {
  // 폴더 ID를 catch 블록에서도 사용할 수 있도록 외부에 선언
  let folderId: string | null = null;
  
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // 환경 변수 읽기 (사용자 제공 이름 사용)
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_DRIVE_API_KEY;
    const folderIdRaw = process.env.DRIVE_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    // 디버깅 로그 (프로덕션에서도 환경 변수 확인용)
    console.log('환경 변수 확인:', {
      hasApiKey: !!apiKey,
      apiKeyPrefix: apiKey ? `${apiKey.substring(0, 10)}...` : '없음',
      apiKeyLength: apiKey?.length || 0,
      hasFolderId: !!folderIdRaw,
      folderIdRaw: folderIdRaw,
      folderIdRawLength: folderIdRaw?.length || 0,
      nodeEnv: process.env.NODE_ENV,
    });
    
    // 폴더 ID에서 URL이 포함된 경우 ID만 추출
    folderId = folderIdRaw || null;
    if (folderIdRaw?.includes('/folders/')) {
      const match = folderIdRaw.match(/\/folders\/([a-zA-Z0-9_-]+)/);
      folderId = match ? match[1] : folderIdRaw;
    }

    // 환경 변수 검증
    if (!apiKey) {
      const errorMessage = process.env.NODE_ENV === 'production'
        ? 'GOOGLE_API_KEY가 설정되지 않았습니다. Vercel 대시보드의 환경 변수 설정에서 GOOGLE_API_KEY 또는 GOOGLE_DRIVE_API_KEY를 추가해주세요.'
        : 'GOOGLE_API_KEY가 설정되지 않았습니다. .env.local 파일에 GOOGLE_API_KEY 또는 GOOGLE_DRIVE_API_KEY를 추가해주세요.';
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    if (!folderId) {
      const errorMessage = process.env.NODE_ENV === 'production'
        ? 'DRIVE_FOLDER_ID가 설정되지 않았습니다. Vercel 대시보드의 환경 변수 설정에서 DRIVE_FOLDER_ID 또는 GOOGLE_DRIVE_FOLDER_ID를 추가해주세요.'
        : 'DRIVE_FOLDER_ID가 설정되지 않았습니다. .env.local 파일에 DRIVE_FOLDER_ID 또는 GOOGLE_DRIVE_FOLDER_ID를 추가해주세요.';
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // Google Drive API 직접 호출 (HTTP 리퍼러 제한 우회)
    // googleapis 라이브러리 대신 직접 fetch를 사용하여
    // API 키를 쿼리 파라미터로 전달하면 리퍼러 제한을 우회할 수 있습니다
    const driveApiBaseUrl = 'https://www.googleapis.com/drive/v3';

    // 이미지 파일 확장자 목록
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const mimeTypes = imageExtensions.map(ext => `image/${ext}`).join(',');

    // 페이지네이션 파라미터
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const pageSize = Math.min(limit, 100); // Google Drive API 최대 100
    
    // 폴더 ID 검증 및 로깅
    if (!folderId || folderId.trim() === '') {
      return NextResponse.json(
        { error: '폴더 ID가 비어있습니다. DRIVE_FOLDER_ID 환경 변수를 확인해주세요.' },
        { status: 500 }
      );
    }

    // 폴더 메타데이터 확인은 생략 (파일 목록 조회로 바로 진행)
    // 공개 폴더의 경우 메타데이터 접근이 제한될 수 있으므로
    // 파일 목록 조회로 바로 진행

    // 폴더 내 이미지 파일 목록 조회
    // 여러 쿼리 옵션 시도
    const queries = [
      `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
      `'${folderId}' in parents and (mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/gif' or mimeType='image/webp') and trashed=false`,
    ];
    
    const query = queries[0];
    
    // 디버깅 로그 (프로덕션에서도 폴더 ID 확인용)
    console.log('Google Drive API 요청:', {
      folderId: folderId,
      folderIdLength: folderId.length,
      query: query,
      page: page,
      limit: limit,
      pageSize: pageSize,
      apiKeyPrefix: apiKey ? `${apiKey.substring(0, 10)}...` : '없음',
    });
    
    // 전체 이미지 개수 조회 (선택적, 성능 고려하여 간단하게)
    // Google Drive API는 전체 개수를 직접 반환하지 않으므로
    // 성능을 위해 전체 개수 조회는 생략하고 nextPageToken만 사용
    let totalCount: number | null = null;
    
    // 페이지네이션을 위한 토큰 관리
    // Google Drive API는 pageToken을 사용하므로, 클라이언트에서 요청한 페이지에 맞는 토큰을 찾아야 함
    let pageToken: string | undefined = searchParams.get('pageToken') || undefined;
    
    // 첫 페이지가 아니고 pageToken이 없으면 이전 페이지들을 순회
    if (page > 1 && !pageToken) {
      // 이전 페이지들을 순회하여 해당 페이지의 토큰 찾기
      // 성능을 위해 최대 10페이지까지만 지원 (300개)
      for (let i = 1; i < page && i <= 10; i++) {
        const tempUrl = new URL(`${driveApiBaseUrl}/files`);
        tempUrl.searchParams.set('q', query);
        tempUrl.searchParams.set('fields', 'nextPageToken');
        tempUrl.searchParams.set('orderBy', 'modifiedTime desc');
        tempUrl.searchParams.set('pageSize', pageSize.toString());
        tempUrl.searchParams.set('key', apiKey);
        if (pageToken) {
          tempUrl.searchParams.set('pageToken', pageToken);
        }
        
        const tempResponse = await fetch(tempUrl.toString());
        if (!tempResponse.ok) {
          const errorData = await tempResponse.json().catch(() => ({}));
          throw new Error(errorData.error?.message || `HTTP ${tempResponse.status}`);
        }
        const tempData = await tempResponse.json();
        pageToken = tempData.nextPageToken || undefined;
        if (!pageToken) break;
      }
    }
    
    let response;
    try {
      // Google Drive API 직접 호출 (HTTP 리퍼러 제한 우회)
      // API 키를 쿼리 파라미터로 직접 전달
      const apiUrl = new URL(`${driveApiBaseUrl}/files`);
      apiUrl.searchParams.set('q', query);
      apiUrl.searchParams.set('fields', 'files(id, name, thumbnailLink, webViewLink, mimeType, size), nextPageToken');
      apiUrl.searchParams.set('orderBy', 'modifiedTime desc');
      apiUrl.searchParams.set('pageSize', pageSize.toString());
      apiUrl.searchParams.set('key', apiKey);
      if (pageToken) {
        apiUrl.searchParams.set('pageToken', pageToken);
      }
      
      console.log('Google Drive API 직접 호출:', {
        url: apiUrl.toString().replace(apiKey, 'API_KEY_HIDDEN'),
        folderId: folderId,
        query: query,
      });
      
      const fetchResponse = await fetch(apiUrl.toString());
      
      if (!fetchResponse.ok) {
        const errorData = await fetchResponse.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `HTTP ${fetchResponse.status}`;
        throw {
          response: {
            status: fetchResponse.status,
            statusText: fetchResponse.statusText,
            data: errorData,
          },
          message: errorMessage,
          code: fetchResponse.status,
        };
      }
      
      response = {
        data: await fetchResponse.json(),
      };
    } catch (apiError: any) {
      // Google API 에러를 더 자세히 로깅
      const errorStatus = apiError?.response?.status || apiError?.status || apiError?.code;
      const errorData = apiError?.response?.data || apiError?.response || {};
      const errorDetails = {
        code: apiError?.code || errorStatus,
        message: apiError?.message,
        response: errorData,
        status: errorStatus,
        statusText: apiError?.response?.statusText || apiError?.statusText,
      };
      
      console.error('Google Drive API 상세 오류:', JSON.stringify(errorDetails, null, 2));
      console.error('폴더 ID:', folderId);
      console.error('쿼리:', query);
      console.error('API 키 존재:', !!apiKey);
      console.error('환경:', process.env.NODE_ENV);
      
      // 에러 메시지 추출
      let errorMessage = '알 수 없는 오류';
      if (errorData?.error?.message) {
        errorMessage = errorData.error.message;
      } else if (apiError?.message) {
        errorMessage = apiError.message;
      }
      
      // 리퍼러 차단 에러 확인
      if (errorMessage.includes('referer') || errorMessage.includes('referrer') || errorMessage.includes('Requests from referer')) {
        console.error('=== HTTP 리퍼러 제한으로 인한 차단 ===');
        console.error('서버 사이드 API 호출에는 HTTP 리퍼러가 없습니다.');
        console.error('해결 방법: Google Cloud Console에서 API 키 설정 변경');
        console.error('1. API 및 서비스 → 사용자 인증 정보 → API 키 선택');
        console.error('2. "애플리케이션 제한사항" → "없음" 선택');
        console.error('3. 저장 후 최대 5분 대기');
      }
      
      // "File not found" 에러의 경우 더 자세한 정보 제공
      if (errorMessage.includes('File not found') || errorStatus === 404) {
        console.error('폴더 접근 실패 - 가능한 원인:');
        console.error('1. 폴더 ID가 잘못되었거나 존재하지 않음');
        console.error('2. 폴더가 공개되지 않음 (링크가 있는 모든 사용자로 공개 필요)');
        console.error('3. API 키에 Google Drive API 권한이 없음');
        console.error('4. API 키의 HTTP 리퍼러 제한 (서버 사이드 호출에는 리퍼러가 없음)');
        console.error('5. API 키의 IP 주소 제한');
      }
      
      // 에러를 다시 throw하여 상위에서 처리
      const error = new Error(errorMessage);
      (error as any).code = errorStatus;
      (error as any).status = errorStatus;
      (error as any).statusText = errorDetails.statusText;
      (error as any).details = errorDetails;
      (error as any).originalError = apiError;
      throw error;
    }

    if (!response.data.files || !Array.isArray(response.data.files)) {
      return NextResponse.json({ images: [] });
    }

    // 이미지 파일만 필터링하고 필요한 정보 추출
    const files = response.data.files || [];
    const images = files
      .filter((file: any) => {
        if (!file.mimeType || !file.id) return false;
        return imageExtensions.some(ext => 
          file.mimeType!.toLowerCase().includes(ext)
        );
      })
      .map((file: any) => {
        // Google Drive 이미지 직접 다운로드 URL 생성 (공개 폴더용)
        // 여러 URL 옵션 제공하여 호환성 향상
        const fileId = file.id!;
        
        // Google Drive 이미지 URL 옵션들
        // 1. uc?export=view - 일반적인 공개 이미지 표시 방법
        const downloadUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        
        // 2. uc?export=download - 다운로드 링크 (일부 경우 작동)
        const downloadUrl2 = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        // 3. Google의 썸네일 서버 사용 (더 안정적)
        const thumbnailUrl = file.thumbnailLink 
          ? file.thumbnailLink.replace(/=s\d+/, '=s0') // 썸네일 크기 제한 제거
          : `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920-h1080`; // 최대 크기
        
        // 4. API를 통한 직접 접근 (서버 사이드 프록시 - 가장 안정적)
        const apiUrl = `/api/google-drive/image?id=${fileId}`;
        
        return {
          id: fileId,
          name: file.name || 'Untitled',
          thumbnailLink: thumbnailUrl,
          webViewLink: file.webViewLink || `https://drive.google.com/file/d/${fileId}/view`,
          downloadUrl: downloadUrl,
          downloadUrl2: downloadUrl2,
          apiUrl: apiUrl,
        };
      });

    // REVALIDATE_SECONDS 환경 변수로 캐시 재검증 시간 설정
    const revalidateSeconds = parseInt(process.env.REVALIDATE_SECONDS || '300', 10);
    
    // 페이지네이션 정보 계산
    const hasNextPage = !!response.data.nextPageToken;
    const currentPage = page;
    const totalPages = totalCount !== null && totalCount > 0 ? Math.ceil(totalCount / limit) : null;
    
    return NextResponse.json(
      { 
        images,
        pagination: {
          currentPage,
          limit,
          totalCount: totalCount !== null && totalCount > 0 ? totalCount : null,
          totalPages,
          hasNextPage,
          nextPageToken: response.data.nextPageToken || null,
        },
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${revalidateSeconds}, stale-while-revalidate=60`,
        },
      }
    );
  } catch (error) {
    console.error('Google Drive API 오류:', error);
    
    // 에러 타입에 따른 처리
    if (error instanceof Error) {
      // Google API 에러인 경우 더 자세한 정보 제공
      const errorMessage = error.message || '알 수 없는 오류';
      const errorCode = (error as any).code;
      const errorStatus = (error as any).status;
      const errorDetails = (error as any).details;
      
      let userFriendlyMessage = '이미지를 불러오는 중 오류가 발생했습니다.';
      
      // HTTP 상태 코드 기반 메시지
      const folderIdForError = folderId || '없음';
      
      // 리퍼러 차단 에러 확인 (가장 흔한 원인)
      if (errorMessage.includes('referer') || errorMessage.includes('referrer') || errorMessage.includes('Requests from referer')) {
        userFriendlyMessage = `API 키의 HTTP 리퍼러 제한으로 인해 접근이 차단되었습니다. Google Cloud Console에서 API 키 설정을 변경해주세요:
        
1. Google Cloud Console → API 및 서비스 → 사용자 인증 정보
2. API 키 선택
3. "애플리케이션 제한사항" → "없음" 선택 (또는 "IP 주소" 선택)
4. 저장

서버 사이드 API 호출에는 HTTP 리퍼러가 없으므로 "웹사이트" 제한을 사용할 수 없습니다.`;
      } else if (errorStatus === 403 || errorCode === 403) {
        userFriendlyMessage = `Google Drive API 접근이 거부되었습니다. (폴더 ID: ${folderIdForError})
        
가능한 원인:
1. API 키의 HTTP 리퍼러 제한 (서버 사이드 호출에는 리퍼러가 없음)
2. 폴더가 공개되지 않음 (링크가 있는 모든 사용자로 공개 필요)
3. API 키 권한 부족

해결 방법:
- Google Cloud Console에서 API 키의 "애플리케이션 제한사항"을 "없음"으로 변경`;
      } else if (errorStatus === 401 || errorCode === 401) {
        userFriendlyMessage = 'Google Drive API 인증에 실패했습니다. API 키가 유효한지 확인해주세요.';
      } else if (errorStatus === 404 || errorCode === 404) {
        userFriendlyMessage = `폴더를 찾을 수 없습니다. (폴더 ID: ${folderIdForError})
        
확인 사항:
1. 폴더 ID가 올바른지 확인
2. 폴더가 "링크가 있는 모든 사용자"로 공개되어 있는지 확인`;
      } else if (errorMessage.includes('API key not valid')) {
        userFriendlyMessage = 'API 키가 유효하지 않습니다. Google Cloud Console에서 API 키를 확인해주세요.';
      } else if (errorMessage.includes('insufficient permissions') || errorMessage.includes('permission denied')) {
        userFriendlyMessage = 'API 키에 Google Drive API 접근 권한이 없습니다. Google Cloud Console에서 Drive API를 활성화해주세요.';
      } else if (errorMessage.includes('File not found')) {
        userFriendlyMessage = `폴더를 찾을 수 없습니다. (폴더 ID: ${folderIdForError})
        
확인 사항:
1. 폴더 ID가 올바른지 확인
2. 폴더가 "링크가 있는 모든 사용자"로 공개되어 있는지 확인
3. API 키의 HTTP 리퍼러 제한 확인`;
      }
      
      // 개발 환경에서 더 자세한 정보 포함
      const responseData: any = {
        error: userFriendlyMessage,
        message: errorMessage,
        code: errorCode,
        status: errorStatus,
      };
      
      if (process.env.NODE_ENV === 'development') {
        responseData.details = {
          stack: error.stack,
          fullError: errorDetails,
          originalMessage: errorMessage,
        };
      }
      
      return NextResponse.json(
        responseData,
        { status: errorStatus || 500 }
      );
    }

    return NextResponse.json(
      { error: '알 수 없는 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
