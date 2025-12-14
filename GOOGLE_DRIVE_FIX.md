# Google Drive API 문제 해결 가이드

## 문제 상황
- 로컬호스트: 정상 작동 ✅
- Vercel 배포: "File not found" 에러 ❌

## 근본 원인
서버 사이드 API 호출에는 HTTP 리퍼러가 없는데, Google API 키에 "웹사이트" 제한이 설정되어 있어 차단됩니다.

## 최종 해결 방법

### 1. Google Cloud Console에서 API 키 설정 변경 (필수)

1. https://console.cloud.google.com/apis/credentials 접속
2. API 키 선택 (현재 "웹사이트" 제한이 설정된 키)
3. **"애플리케이션 제한사항"** 섹션:
   - ❌ 현재: "웹사이트" 선택됨
   - ✅ 변경: **"없음"** 선택
4. **저장** 클릭
5. **최대 5분 대기** (설정 적용 시간)

**중요**: 서버 사이드 호출에는 HTTP 리퍼러가 없으므로 "웹사이트" 제한을 사용할 수 없습니다.

### 2. 환경 변수 재확인

Vercel 대시보드에서 다음 환경 변수가 **모든 환경**에 설정되어 있는지 확인:
- `GOOGLE_API_KEY` 또는 `GOOGLE_DRIVE_API_KEY`
- `DRIVE_FOLDER_ID` 또는 `GOOGLE_DRIVE_FOLDER_ID`

**환경**: Production, Preview, Development 모두 선택

### 3. 폴더 공개 설정 확인

Google Drive에서:
1. 폴더 선택 → 우클릭 → "공유"
2. "링크가 있는 모든 사용자" 선택
3. "뷰어" 권한 설정
4. 저장

## 대안: 서비스 계정 사용 (고급)

API 키 제한 문제를 완전히 해결하려면 서비스 계정을 사용할 수 있습니다:
1. Google Cloud Console에서 서비스 계정 생성
2. 서비스 계정 키(JSON) 다운로드
3. Vercel 환경 변수에 JSON 내용 추가
4. 코드에서 서비스 계정 인증 사용

하지만 현재는 API 키의 "애플리케이션 제한사항"을 "없음"으로 변경하는 것이 가장 간단한 해결책입니다.
