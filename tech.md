# 기술 스택 문서

## 프로젝트 개요
금산교육발전특구(도농복합경제지원센터) 스마트팜 프로그램 소개 랜딩페이지

---

## 핵심 프레임워크 및 런타임

### Next.js 16.0.10
- **역할**: React 기반 풀스택 웹 프레임워크
- **주요 기능**:
  - App Router 아키텍처 사용
  - 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)
  - API Routes를 통한 백엔드 기능 구현
  - 이미지 최적화 (`next/image`)
  - 자동 코드 스플리팅 및 최적화
- **설정 파일**: `next.config.ts`

### React 19.2.0
- **역할**: UI 라이브러리
- **주요 기능**:
  - 함수형 컴포넌트 및 Hooks 사용
  - Client Components (`'use client'`) 활용
  - 서버 컴포넌트와 클라이언트 컴포넌트 혼합 사용
- **주요 Hooks**:
  - `useState`, `useEffect`, `useRef`
  - `useRouter`, `usePathname` (Next.js)

### TypeScript 5.x
- **역할**: 정적 타입 검사
- **설정**: `tsconfig.json`
- **주요 특징**:
  - 엄격한 타입 체크 (`strict: true`)
  - ES2017 타겟
  - 모듈 해상도: `bundler`
  - 경로 별칭: `@/*` → `./src/*`

---

## 스타일링

### Tailwind CSS 4.x
- **역할**: 유틸리티 우선 CSS 프레임워크
- **설정**: `postcss.config.mjs`
- **주요 특징**:
  - PostCSS 플러그인으로 통합
  - CSS 변수를 통한 테마 시스템
  - 다크 모드 지원
  - 반응형 디자인 (sm, md, lg, xl 브레이크포인트)
  - 커스텀 애니메이션 (`tw-animate-css`)

### CSS 변수 기반 디자인 시스템
- **색상 시스템**: OKLCH 색공간 사용
  - Primary: 에메랄드/그린 계열 (`oklch(0.58 0.18 145)`)
  - Light/Dark 테마 자동 전환
  - 시맨틱 색상 토큰 (background, foreground, card, muted 등)
- **타이포그래피**: Noto Sans KR (Google Fonts)
- **레이아웃**: Container 기반 반응형 그리드

---

## UI 컴포넌트 라이브러리

### shadcn/ui (Radix UI 기반)
- **스타일**: New York 스타일
- **설정**: `components.json`
- **사용된 컴포넌트**:
  - `Card`, `CardHeader`, `CardContent`, `CardTitle`
  - `Dialog`
  - `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`
  - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- **기반 라이브러리**:
  - `@radix-ui/react-dialog`: 접근성 있는 다이얼로그
  - `@radix-ui/react-tabs`: 탭 컴포넌트

### 유틸리티 라이브러리
- **class-variance-authority**: 컴포넌트 변형 관리
- **clsx**: 조건부 클래스명 결합
- **tailwind-merge**: Tailwind 클래스 병합 및 충돌 해결

---

## 애니메이션 라이브러리

### GSAP (GreenSock Animation Platform) 3.13.0
- **역할**: 고성능 애니메이션 엔진
- **플러그인**:
  - `ScrollTrigger`: 스크롤 기반 애니메이션
- **주요 기능** (`src/lib/gsap.ts`):
  - 스크롤 트리거 애니메이션
  - 순차 등장 애니메이션 (stagger)
  - 패럴랙스 효과
  - 텍스트 분할 애니메이션
  - 카운터 애니메이션
- **사용 사례**:
  - Hero 섹션 텍스트 페이드인
  - 카드 순차 등장
  - 이미지 스크롤 확대/축소
  - 스크롤 진행률 표시

### Framer Motion 12.23.24
- **역할**: React 애니메이션 라이브러리
- **주요 기능**:
  - `motion.div` 컴포넌트
  - `initial`, `whileInView`, `viewport` props
  - 스크롤 기반 뷰포트 감지 애니메이션
- **사용 사례**:
  - 섹션 제목 페이드인
  - 카드 호버 효과
  - 순차 등장 애니메이션

---

## 아이콘 라이브러리

### Lucide React 0.554.0
- **역할**: 메인 아이콘 라이브러리
- **특징**: 
  - Tree-shaking 지원
  - TypeScript 네이티브 지원
  - 1000+ 아이콘
- **사용 예시**: `ArrowDown`, `Target`, `Lightbulb`, `Rocket`, `CheckCircle2` 등

### 기타 아이콘 라이브러리
- **@heroicons/react 2.2.0**: Heroicons (사용 제한적)
- **@tabler/icons-react 3.35.0**: Tabler Icons (사용 제한적)

---

## 미디어 처리

### Next.js Image 컴포넌트
- **역할**: 이미지 최적화 및 로딩
- **기능**:
  - 자동 이미지 최적화
  - 지연 로딩 (lazy loading)
  - 반응형 이미지
  - WebP/AVIF 포맷 자동 변환

### VideoBackground 컴포넌트
- **기능**:
  - 히어로 섹션 비디오 배경
  - 자동 재생 (muted, loop)
  - Intersection Observer 기반 재생 제어
  - GSAP ScrollTrigger 패럴랙스 효과
  - 에러 처리 및 폴백 이미지

---

## 백엔드 및 API

### Next.js API Routes
- **경로**: `src/app/api/`
- **구현된 엔드포인트**:
  - `GET /api/google-drive`: Google Drive 이미지 목록 조회
  - `GET /api/google-drive/image/[fileId]`: 이미지 프록시

### Google APIs (googleapis 168.0.0)
- **역할**: Google Drive API 통합
- **인증 방식**: Service Account (JWT)
- **주요 기능**:
  - Google Drive 폴더에서 이미지 목록 조회
  - 페이지네이션 지원
  - 썸네일 및 고해상도 이미지 제공
  - 메타데이터 캐싱 (5분 TTL)
- **환경 변수**:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`
  - `DRIVE_FOLDER_ID`

---

## 테마 시스템

### 커스텀 ThemeProvider
- **위치**: `src/components/theme/ThemeProvider.tsx`
- **기능**:
  - Light/Dark/System 테마 지원
  - 로컬 스토리지에 테마 설정 저장
  - 시스템 테마 자동 감지
  - Context API 기반 전역 상태 관리
- **사용**: `useTheme()` Hook

### ThemeToggle 컴포넌트
- **기능**: 테마 전환 버튼
- **위치**: 헤더 및 모바일 메뉴

---

## 개발 도구

### ESLint 9.x
- **설정**: `eslint.config.mjs`
- **플러그인**: `eslint-config-next`
- **역할**: 코드 품질 및 스타일 검사

### PostCSS
- **플러그인**: `@tailwindcss/postcss`
- **역할**: Tailwind CSS 처리

---

## 성능 최적화

### 코드 스플리팅
- Next.js 자동 코드 스플리팅
- 동적 import 지원

### 이미지 최적화
- Next.js Image 컴포넌트
- WebP/AVIF 포맷 자동 변환
- 지연 로딩

### 애니메이션 최적화
- GSAP `will-change` 속성 활용
- ScrollTrigger 자동 새로고침 최적화
- 모바일 리사이즈 무시 설정

### 캐싱
- Google Drive API 메타데이터 캐싱 (5분)
- Next.js 빌드 타임 최적화

---

## 접근성 (A11y)

### ARIA 레이블
- 시맨틱 HTML 사용
- `aria-label`, `aria-hidden` 속성 활용

### 키보드 네비게이션
- 포커스 관리
- 키보드 접근 가능한 인터랙티브 요소

### 반응형 디자인
- 모바일 퍼스트 접근
- 터치 친화적 UI
- 반응형 타이포그래피

---

## 폰트

### Noto Sans KR
- **로딩 방식**: Google Fonts (Next.js font optimization)
- **설정**: `src/app/layout.tsx`
- **웨이트**: 400, 500, 600, 700
- **최적화**: `display: swap`, `preload: false`

---

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx          # 메인 랜딩 페이지
│   └── globals.css       # 전역 스타일
├── components/            # React 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── hero/             # 히어로 섹션
│   ├── theme/            # 테마 관련
│   └── ui/               # UI 컴포넌트 (shadcn/ui)
└── lib/                  # 유틸리티 및 설정
    ├── gsap.ts           # GSAP 설정 및 헬퍼
    └── utils.ts          # 공통 유틸리티
```

---

## 빌드 및 배포

### 빌드 스크립트
```json
{
  "dev": "next dev",      # 개발 서버
  "build": "next build",  # 프로덕션 빌드
  "start": "next start",  # 프로덕션 서버
  "lint": "eslint"        # 린트 검사
}
```

### 환경 변수
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google Service Account 이메일
- `GOOGLE_PRIVATE_KEY`: Google Service Account Private Key
- `DRIVE_FOLDER_ID`: Google Drive 폴더 ID

---

## 주요 기능

### 1. 스크롤 애니메이션
- GSAP ScrollTrigger 기반 섹션별 애니메이션
- 순차 등장 효과 (stagger)
- 패럴랙스 스크롤

### 2. 비디오 배경
- 히어로 섹션 자동 재생 비디오
- Intersection Observer 기반 재생 제어
- 패럴랙스 효과

### 3. 반응형 네비게이션
- 데스크톱/모바일 메뉴
- 스크롤 기반 활성 섹션 감지
- 부드러운 스크롤 이동

### 4. 테마 전환
- Light/Dark 모드
- 시스템 테마 자동 감지
- 로컬 스토리지 저장

### 5. Google Drive 통합
- 이미지 갤러리 동적 로딩
- 페이지네이션
- 프록시를 통한 이미지 제공

### 6. 접근성
- ARIA 레이블
- 키보드 네비게이션
- 시맨틱 HTML

---

## 브라우저 지원

- 모던 브라우저 (Chrome, Firefox, Safari, Edge)
- ES2017+ 기능 사용
- CSS Grid, Flexbox
- Intersection Observer API
- CSS Variables

---

## 의존성 요약

### 프로덕션 의존성
- **프레임워크**: Next.js 16.0.10, React 19.2.0, React DOM 19.2.0
- **스타일링**: Tailwind CSS 4.x, PostCSS
- **애니메이션**: GSAP 3.13.0, Framer Motion 12.23.24
- **UI 컴포넌트**: Radix UI, shadcn/ui
- **아이콘**: Lucide React, Heroicons, Tabler Icons
- **백엔드**: Google APIs (googleapis)
- **유틸리티**: clsx, tailwind-merge, class-variance-authority

### 개발 의존성
- **타입스크립트**: TypeScript 5.x
- **린터**: ESLint 9.x, eslint-config-next
- **타입 정의**: @types/node, @types/react, @types/react-dom

---

## 성능 특징

1. **코드 스플리팅**: 자동 라우트 기반 코드 분할
2. **이미지 최적화**: Next.js Image 컴포넌트
3. **폰트 최적화**: Next.js Font Optimization
4. **애니메이션 최적화**: GSAP 성능 최적화 설정
5. **캐싱**: API 응답 캐싱, 빌드 타임 최적화

---

## 보안

- 환경 변수를 통한 민감 정보 관리
- Service Account 기반 Google API 인증
- XSS 방지 (React 기본 보안)
- HTTPS 강제 (프로덕션)

---

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [GSAP 문서](https://greensock.com/docs/)
- [Framer Motion 문서](https://www.framer.com/motion/)
- [shadcn/ui 문서](https://ui.shadcn.com)

