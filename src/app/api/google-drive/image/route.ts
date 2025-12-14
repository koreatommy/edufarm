import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Google Drive 이미지를 프록시하여 CORS 문제를 해결하는 API 엔드포인트
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get('id');

    if (!fileId) {
      return NextResponse.json(
        { error: '파일 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_DRIVE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // Google Drive API 클라이언트 초기화
    const drive = google.drive({
      version: 'v3',
      auth: apiKey,
    });

    // 파일 메타데이터 가져오기
    const fileMetadata = await drive.files.get({
      fileId: fileId,
      fields: 'id, name, mimeType',
    });

    // 이미지 파일인지 확인
    if (!fileMetadata.data.mimeType?.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일이 아닙니다.' },
        { status: 400 }
      );
    }

    // 이미지 데이터 가져오기
    const imageResponse = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media',
      },
      {
        responseType: 'stream',
      }
    );

    // 스트림을 버퍼로 변환
    const chunks: Buffer[] = [];
    for await (const chunk of imageResponse.data) {
      chunks.push(Buffer.from(chunk));
    }
    const imageBuffer = Buffer.concat(chunks);

    // 이미지 반환
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': fileMetadata.data.mimeType || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Content-Length': imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('이미지 프록시 오류:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: '이미지를 불러오는 중 오류가 발생했습니다.',
          message: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: '알 수 없는 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
