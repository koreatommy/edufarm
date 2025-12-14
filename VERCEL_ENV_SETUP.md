# Vercel 환경 변수 설정 가이드

## 방법 1: Vercel CLI 사용 (권장)

### 1. Vercel 로그인
```bash
vercel login
```
브라우저가 열리면 이메일과 비밀번호로 로그인하세요.

### 2. 프로젝트 연결 확인
```bash
vercel link
```

### 3. 환경 변수 추가
```bash
# GOOGLE_API_KEY 추가
vercel env add GOOGLE_API_KEY production preview development
# 값 입력: AIzaSyCUReeE6I-Mg1bBQs49tpnTIXwGD6MG6FY

# DRIVE_FOLDER_ID 추가
vercel env add DRIVE_FOLDER_ID production preview development
# 값 입력: 1lM28bdwDO5QaKlrqMW2uNHiXh1_gk7oT
```

### 4. 환경 변수 확인
```bash
vercel env ls
```

## 방법 2: Vercel 대시보드 사용

1. https://vercel.com/dashboard 접속
2. 프로젝트 선택
3. Settings → Environment Variables
4. 다음 환경 변수 추가:
   - `GOOGLE_API_KEY` = `AIzaSyCUReeE6I-Mg1bBQs49tpnTIXwGD6MG6FY`
   - `DRIVE_FOLDER_ID` = `1lM28bdwDO5QaKlrqMW2uNHiXh1_gk7oT`
5. Environment: Production, Preview, Development 모두 선택
6. Save 후 재배포

## 스크립트 사용 (로그인 후)

로그인 후 다음 스크립트를 실행할 수 있습니다:
```bash
./add-vercel-env.sh
```
