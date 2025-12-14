/**
 * Google Drive API 접근 테스트 스크립트
 * 
 * 사용법: npx tsx scripts/test-drive-access.ts
 */

import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// .env.local 파일 로드
dotenv.config({ path: resolve(__dirname, '../.env.local') });

async function testDriveAccess() {
  try {
    console.log('🔍 Google Drive API 접근 테스트 시작...\n');

    // 환경 변수 확인
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const folderId = process.env.DRIVE_FOLDER_ID;

    console.log('📋 환경 변수 확인:');
    console.log(`  - Service Account: ${serviceAccountEmail ? '✅ 설정됨' : '❌ 없음'}`);
    console.log(`  - Private Key: ${privateKey ? '✅ 설정됨' : '❌ 없음'}`);
    console.log(`  - Folder ID: ${folderId || '❌ 없음'}\n`);

    if (!serviceAccountEmail || !privateKey || !folderId) {
      throw new Error('환경 변수가 설정되지 않았습니다.');
    }

    // Private key 포맷팅
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    // JWT 인증 설정
    console.log('🔐 Service Account 인증 시도...');
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    // 인증 토큰 가져오기
    await auth.authorize();
    console.log('✅ 인증 성공!\n');

    // Google Drive API 클라이언트 생성
    const drive = google.drive({ version: 'v3', auth });

    // 폴더 접근 테스트
    console.log(`📁 폴더 접근 테스트 (ID: ${folderId})...`);
    try {
      const folderInfo = await drive.files.get({
        fileId: folderId,
        fields: 'id, name, mimeType, shared, permissions',
      });

      console.log('✅ 폴더 접근 성공!');
      console.log(`  - 폴더 이름: ${folderInfo.data.name}`);
      console.log(`  - 폴더 ID: ${folderInfo.data.id}`);
      console.log(`  - 공유됨: ${folderInfo.data.shared ? '예' : '아니오'}\n`);

      // 폴더 내 이미지 파일 확인
      console.log('🖼️  폴더 내 이미지 파일 확인...');
      const filesResponse = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id, name, mimeType)',
        pageSize: 10,
      });

      const imageCount = filesResponse.data.files?.length || 0;
      console.log(`✅ 이미지 파일 ${imageCount}개 발견\n`);

      if (imageCount > 0) {
        console.log('📸 이미지 파일 목록 (최대 10개):');
        filesResponse.data.files?.forEach((file, index) => {
          console.log(`  ${index + 1}. ${file.name} (${file.mimeType})`);
        });
      }

      console.log('\n🎉 모든 테스트 통과! Google Drive API가 정상적으로 작동합니다.');
    } catch (folderError: any) {
      console.error('❌ 폴더 접근 실패!\n');
      
      if (folderError?.code === 404) {
        console.error('🔴 오류: 폴더를 찾을 수 없습니다 (404)');
        console.error('\n💡 해결 방법:');
        console.error(`1. Google Drive에서 폴더 열기: https://drive.google.com/drive/folders/${folderId}`);
        console.error('2. 폴더 우클릭 → "공유" 클릭');
        console.error(`3. 이메일 추가: ${serviceAccountEmail}`);
        console.error('4. 권한: "뷰어" 선택');
        console.error('5. "완료" 클릭\n');
      } else if (folderError?.code === 403) {
        console.error('🔴 오류: 폴더 접근 권한이 없습니다 (403)');
        console.error(`\n💡 Service Account(${serviceAccountEmail})에 폴더 접근 권한을 부여해주세요.\n`);
      } else {
        console.error('🔴 오류:', folderError.message);
        console.error('상세:', folderError);
      }
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ 테스트 실패:', error.message);
    if (error.message.includes('인증')) {
      console.error('\n💡 Service Account 인증 실패. 다음을 확인해주세요:');
      console.error('  - GOOGLE_SERVICE_ACCOUNT_EMAIL이 올바른지');
      console.error('  - GOOGLE_PRIVATE_KEY가 올바르게 설정되었는지');
      console.error('  - Private Key가 큰따옴표로 감싸져 있는지');
    }
    process.exit(1);
  }
}

testDriveAccess();
