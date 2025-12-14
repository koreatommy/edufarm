# Google Drive API 문제 최종 해결 방법

## 문제 상황
- ✅ 로컬호스트: 정상 작동
- ❌ Vercel 배포: "File not found" 에러

## 근본 원인
**서버 사이드 API 호출에는 HTTP 리퍼러가 없는데, Google API 키에 "웹사이트" 제한이 설정되어 있어 차단됩니다.**

## 최종 해결 방법 (필수)

### 1단계: Google Cloud Console에서 API 키 설정 변경 (가장 중요!)

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com/apis/credentials

2. **API 키 선택**
   - 현재 "웹사이트" 제한이 설정된 API 키를 선택

3. **"애플리케이션 제한사항" 변경**
   - ❌ 현재: "웹사이트" 선택됨
   - ✅ 변경: **"없음"** 선택
   - 또는 "IP 주소" 선택 후 제한 없음

4. **저장**
   - 저장 버튼 클릭

5. **대기**
   - 최대 5분 대기 (설정 적용 시간)

**왜 이렇게 해야 하나요?**
- 서버 사이드(Next.js API Route) API 호출에는 HTTP 리퍼러가 없습니다
- "웹사이트" 제한은 브라우저에서만 작동합니다
- 서버에서 호출할 때는 "없음" 또는 "IP 주소" 제한을 사용해야 합니다

### 2단계: Vercel 환경 변수 재확인

Vercel 대시보드에서:
1. 프로젝트 → Settings → Environment Variables
2. 다음 환경 변수가 **모든 환경**에 설정되어 있는지 확인:
   - `GOOGLE_API_KEY` = `AIzaSyCUReeE6I-Mg1bBQs49tpnTIXwGD6MG6FY`
   - `DRIVE_FOLDER_ID` = `1lM28bdwDO5QaKlrqMW2uNHiXh1_gk7oT`
3. **Environment**: Production, Preview, Development 모두 선택
4. 저장 후 재배포

### 3단계: 폴더 공개 설정 확인

Google Drive에서:
1. https://drive.google.com/drive/folders/1lM28bdwDO5QaKlrqMW2uNHiXh1_gk7oT 접속
2. 폴더 선택 → 우클릭 → "공유"
3. "링크가 있는 모든 사용자" 선택
4. "뷰어" 권한 설정
5. 저장

## 코드 개선 사항

다음 개선 사항이 적용되었습니다:
1. ✅ 재시도 로직 추가 (일시적 에러 대응)
2. ✅ 환경 변수 검증 강화
3. ✅ 상세한 에러 메시지 및 로깅
4. ✅ 직접 fetch 호출 (리퍼러 제한 우회 시도)

## 확인 방법

설정 변경 후:
1. Vercel에서 재배포
2. 결과보고서 페이지 접속
3. Vercel 로그 확인:
   - Functions → 해당 API Route 선택
   - 로그에서 "Google Drive API 직접 호출" 메시지 확인
   - 에러가 있다면 상세 로그 확인

## 여전히 문제가 있다면

1. **Vercel 로그 확인**
   - Functions 탭에서 API Route 로그 확인
   - 환경 변수가 제대로 로드되는지 확인

2. **API 키 재생성**
   - Google Cloud Console에서 새 API 키 생성
   - "애플리케이션 제한사항": "없음"
   - Vercel 환경 변수에 새 키 추가

3. **서비스 계정 사용 (고급)**
   - 더 안정적이지만 설정이 복잡함
   - 필요시 별도 안내
