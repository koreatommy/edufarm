import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Google Drive API를 사용하여 폴더 내 이미지 파일 목록을 조회하는 API 엔드포인트
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // 환경 변수 읽기 (사용자 제공 이름 사용)
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_DRIVE_API_KEY;
    const folderIdRaw = process.env.DRIVE_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    // 디버깅 로그 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.log('환경 변수 확인:', {
        hasApiKey: !!apiKey,
        apiKeyPrefix: apiKey ? `${apiKey.substring(0, 10)}...` : '없음',
        folderIdRaw: folderIdRaw,
      });
    }
    
    // 폴더 ID에서 URL이 포함된 경우 ID만 추출
    let folderId = folderIdRaw;
    if (folderIdRaw?.includes('/folders/')) {
      const match = folderIdRaw.match(/\/folders\/([a-zA-Z0-9_-]+)/);
      folderId = match ? match[1] : folderIdRaw;
    }

    // 환경 변수 검증
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    if (!folderId) {
      return NextResponse.json(
        { error: 'DRIVE_FOLDER_ID가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // Google Drive API 클라이언트 초기화
    const drive = google.drive({
      version: 'v3',
      auth: apiKey,
    });

    // 이미지 파일 확장자 목록
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const mimeTypes = imageExtensions.map(ext => `image/${ext}`).join(',');

    // 페이지네이션 파라미터
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const pageSize = Math.min(limit, 100); // Google Drive API 최대 100
    
    // 폴더 내 이미지 파일 목록 조회
    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Google Drive API 쿼리:', query, { page, limit, pageSize });
    }
    
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
        const tempResponse = await drive.files.list({
          q: query,
          fields: 'nextPageToken',
          orderBy: 'modifiedTime desc',
          pageSize: pageSize,
          pageToken: pageToken,
        });
        pageToken = tempResponse.data.nextPageToken || undefined;
        if (!pageToken) break;
      }
    }
    
    let response;
    try {
      response = await drive.files.list({
        q: query,
        fields: 'files(id, name, thumbnailLink, webViewLink, mimeType, size), nextPageToken',
        orderBy: 'modifiedTime desc',
        pageSize: pageSize,
        pageToken: pageToken,
      });
    } catch (apiError: any) {
      // Google API 에러를 더 자세히 로깅
      const errorDetails = {
        code: apiError?.code,
        message: apiError?.message,
        response: apiError?.response?.data,
        status: apiError?.response?.status,
        statusText: apiError?.response?.statusText,
        errors: apiError?.errors,
        config: {
          url: apiError?.config?.url,
          method: apiError?.config?.method,
        },
      };
      
      console.error('Google Drive API 상세 오류:', JSON.stringify(errorDetails, null, 2));
      
      // 에러 메시지 추출
      let errorMessage = '알 수 없는 오류';
      if (apiError?.response?.data?.error?.message) {
        errorMessage = apiError.response.data.error.message;
      } else if (apiError?.message) {
        errorMessage = apiError.message;
      }
      
      // 에러를 다시 throw하여 상위에서 처리
      const error = new Error(errorMessage);
      (error as any).code = apiError?.code;
      (error as any).status = apiError?.response?.status;
      (error as any).statusText = apiError?.response?.statusText;
      (error as any).details = errorDetails;
      (error as any).originalError = apiError;
      throw error;
    }

    if (!response.data.files) {
      return NextResponse.json({ images: [] });
    }

    // 이미지 파일만 필터링하고 필요한 정보 추출
    const images = response.data.files
      .filter(file => {
        if (!file.mimeType || !file.id) return false;
        return imageExtensions.some(ext => 
          file.mimeType!.toLowerCase().includes(ext)
        );
      })
      .map(file => {
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
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : null;
    
    return NextResponse.json(
      { 
        images,
        pagination: {
          currentPage,
          limit,
          totalCount: totalCount > 0 ? totalCount : null,
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
      if (errorStatus === 403 || errorCode === 403) {
        userFriendlyMessage = 'Google Drive API 접근이 거부되었습니다. API 키 권한과 폴더 공개 설정을 확인해주세요.';
      } else if (errorStatus === 401 || errorCode === 401) {
        userFriendlyMessage = 'Google Drive API 인증에 실패했습니다. API 키가 유효한지 확인해주세요.';
      } else if (errorStatus === 404 || errorCode === 404) {
        userFriendlyMessage = '폴더를 찾을 수 없습니다. 폴더 ID를 확인해주세요.';
      } else if (errorMessage.includes('API key not valid')) {
        userFriendlyMessage = 'API 키가 유효하지 않습니다. Google Cloud Console에서 API 키를 확인해주세요.';
      } else if (errorMessage.includes('insufficient permissions') || errorMessage.includes('permission denied')) {
        userFriendlyMessage = 'API 키에 Google Drive API 접근 권한이 없습니다. Google Cloud Console에서 Drive API를 활성화해주세요.';
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
