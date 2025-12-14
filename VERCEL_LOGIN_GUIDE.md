# Vercel CLI 로그인 가이드

## Vercel CLI 로그인 방법

### 1. 기본 로그인 (브라우저 인증 - 권장)

```bash
vercel login
```

**필요한 정보:**
- **이메일**: `hieugenelee@gmail.com`
- **비밀번호**: `Hgfdsa01!!`

**프로세스:**
1. 명령어 실행 시 브라우저가 자동으로 열립니다
2. 브라우저에서 Vercel 로그인 페이지가 표시됩니다
3. 이메일과 비밀번호를 입력하여 로그인합니다
4. 로그인 완료 후 터미널에 "Success! Authentication complete" 메시지가 표시됩니다

### 2. 토큰을 사용한 로그인

Vercel 대시보드에서 토큰을 생성하여 사용할 수 있습니다.

**토큰 생성 방법:**
1. https://vercel.com/account/tokens 접속
2. "Create Token" 클릭
3. 토큰 이름 입력 (예: "CLI Token")
4. 토큰 복 : 2ddOPuU2PkenRoA2a5CKQ6Do

**토큰으로 로그인:**
```bash
vercel login --token
# 또는
vercel login <your-token>
```

### 3. 로그인 상태 확인

```bash
vercel whoami
```

성공 시 이메일 주소가 표시됩니다.

### 4. 로그아웃

```bash
vercel logout
```

## 현재 프로젝트 정보

- **프로젝트 경로**: `/Users/eugene/Documents/edufarm`
- **GitHub 저장소**: `koreatommy/edufarm`
- **Vercel 계정**: `hieugenelee@gmail.com`

## 로그인 후 환경 변수 추가

로그인 완료 후 다음 명령어로 환경 변수를 추가하세요:

```bash
# 프로젝트 연결 (처음 한 번만)
vercel link

# GOOGLE_API_KEY 추가
echo "AIzaSyCUReeE6I-Mg1bBQs49tpnTIXwGD6MG6FY" | vercel env add GOOGLE_API_KEY production preview development

# DRIVE_FOLDER_ID 추가
echo "1lM28bdwDO5QaKlrqMW2uNHiXh1_gk7oT" | vercel env add DRIVE_FOLDER_ID production preview development

# 환경 변수 확인
vercel env ls
```

## 문제 해결

### 로그인이 안 될 때
- 브라우저가 자동으로 열리지 않으면: https://vercel.com/login 에서 직접 로그인
- 토큰 방식 사용 고려

### 인증 오류가 발생할 때
```bash
# 기존 인증 정보 삭제 후 재로그인
rm -rf ~/.vercel
vercel login
```
