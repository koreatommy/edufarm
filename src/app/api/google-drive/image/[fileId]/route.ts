import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Google Drive Service Account 인증 및 API 클라이언트 생성
 */
function getGoogleDriveClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.trim();

  if (!serviceAccountEmail || !privateKey) {
    throw new Error('환경 변수가 설정되지 않았습니다: GOOGLE_SERVICE_ACCOUNT_EMAIL 또는 GOOGLE_PRIVATE_KEY');
  }

  // Private key의 큰따옴표 제거 및 이스케이프된 \n을 실제 줄바꿈으로 변환
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
 * GET /api/google-drive/image/[fileId]
 * 
 * Google Drive에서 이미지 파일을 가져와서 프록시로 제공합니다.
 * 고해상도 이미지를 안전하게 제공하기 위해 서버에서 인증된 요청을 사용합니다.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> | { fileId: string } }
) {
  // Next.js 16에서는 params가 Promise일 수 있음
  const resolvedParams = await Promise.resolve(params);
  const { fileId } = resolvedParams;
  
  try {

    console.log('이미지 프록시 요청:', { fileId });

    if (!fileId) {
      console.error('파일 ID가 없습니다');
      return NextResponse.json(
        { error: '파일 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // Google Drive 클라이언트 생성
    const drive = getGoogleDriveClient();
    console.log('Google Drive 클라이언트 생성 완료');

    // 이미지 파일 정보 가져오기
    console.log('파일 정보 조회 중...');
    const fileInfo = await drive.files.get({
      fileId: fileId,
      fields: 'id, name, mimeType, size',
    });
    console.log('파일 정보:', { name: fileInfo.data.name, mimeType: fileInfo.data.mimeType });

    // 이미지 파일인지 확인
    const mimeType = fileInfo.data.mimeType || '';
    if (!mimeType.startsWith('image/')) {
      console.error('이미지 파일이 아님:', mimeType);
      return NextResponse.json(
        { error: '이미지 파일이 아닙니다.' },
        { status: 400 }
      );
    }

    // 이미지 파일 다운로드 (고해상도)
    console.log('이미지 다운로드 중...');
    const imageResponse = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media',
      },
      {
        responseType: 'arraybuffer',
      }
    );
    console.log('이미지 다운로드 완료, 크기:', imageResponse.data ? (imageResponse.data as ArrayBuffer).byteLength : 0);

    // 이미지 데이터를 Buffer로 변환
    const imageBuffer = Buffer.from(imageResponse.data as ArrayBuffer);
    console.log('이미지 버퍼 생성 완료, 크기:', imageBuffer.length);

    // 응답 반환
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': imageBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1시간 캐시
        'Content-Disposition': `inline; filename="${fileInfo.data.name || 'image'}"`,
      },
    });

  } catch (error) {
    console.error('이미지 프록시 오류:', error);
    console.error('에러 상세:', JSON.stringify(error, null, 2));

    let errorMessage = '이미지를 불러올 수 없습니다.';
    let statusCode = 500;
    let errorDetails: any = {};

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };

      // Google API 에러인 경우
      if ('code' in error) {
        const googleError = error as { code?: number; errors?: Array<{ message: string; domain?: string; reason?: string }> };
        errorDetails.code = googleError.code;
        errorDetails.errors = googleError.errors;
        
        if (googleError.code === 404) {
          errorMessage = '이미지 파일을 찾을 수 없습니다.';
          statusCode = 404;
        } else if (googleError.code === 403) {
          errorMessage = '이미지 파일 접근 권한이 없습니다.';
          statusCode = 403;
        } else if (googleError.code === 401) {
          errorMessage = '인증에 실패했습니다.';
          statusCode = 401;
        }
      }
    }

    // 클라이언트가 이미지로 로드하려고 할 때 JSON 에러가 표시되지 않도록
    // 404나 403 같은 경우에는 적절한 상태 코드를 반환하되,
    // 500 에러의 경우에도 클라이언트가 대체 URL로 전환할 수 있도록 처리
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
        fileId: fileId,
      },
      { 
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0', // 에러 응답은 캐시하지 않음
        },
      }
    );
  }
}
