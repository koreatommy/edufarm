# EduFarm

Next.js 16 + React 18 + TypeScript로 구축된 현대적인 랜딩 페이지 프로젝트입니다.

## 기술 스택

### Core
- **Next.js 16** - 최신 안정 버전
- **React 18** - React 19로 업그레이드됨 (Next.js 16 기본)
- **TypeScript** - 타입 안전성

### 스타일링
- **Tailwind CSS v4** - 유틸리티 퍼스트 CSS 프레임워크
- **shadcn/ui** - 고품질 UI 컴포넌트 라이브러리

### 아이콘
- **Lucide React** - 주요 아이콘 라이브러리
- **Heroicons** - Outline 및 Solid 스타일 아이콘
- **Tabler Icons** - 추가 아이콘 라이브러리

### 애니메이션
- **lottie-web** - JSON 기반 애니메이션
- **@rive-app/react-canvas** - Rive 인터랙티브 애니메이션

### 폰트
- **Noto Sans KR** - 한글 폰트 최적화 (next/font 사용)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
edufarm/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   ├── page.tsx      # 홈 페이지
│   │   └── globals.css   # 전역 스타일
│   ├── components/       # 컴포넌트
│   │   └── animation/    # 애니메이션 컴포넌트
│   │       ├── LottieAnimation.tsx
│   │       └── RiveAnimation.tsx
│   └── lib/              # 유틸리티
│       ├── icons.ts      # 아이콘 유틸리티
│       └── utils.ts      # 공통 유틸리티
├── public/               # 정적 파일
├── components.json       # shadcn/ui 설정
└── package.json
```

## 사용 방법

### 아이콘 사용

```tsx
import { Home, Sparkles, Rocket } from 'lucide-react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { IconHome } from '@tabler/icons-react';

// Lucide Icons
<Home className="w-5 h-5" />

// Heroicons
<HomeIcon className="w-5 h-5" />

// Tabler Icons
<IconHome className="w-5 h-5" />
```

### Lottie 애니메이션 사용

```tsx
import { LottieAnimation } from '@/components/animation/LottieAnimation';
import animationData from '@/public/animations/example.json';

<LottieAnimation
  animationData={animationData}
  className="w-64 h-64"
  loop={true}
  autoplay={true}
/>
```

### Rive 애니메이션 사용

```tsx
import { RiveAnimation } from '@/components/animation/RiveAnimation';

<RiveAnimation
  src="/animations/example.riv"
  className="w-64 h-64"
  animations="Idle"
  autoplay={true}
/>
```

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
```

예시:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 주요 기능

- ✅ Next.js 16 App Router
- ✅ TypeScript 완전 지원
- ✅ Tailwind CSS v4
- ✅ shadcn/ui 통합
- ✅ 다중 아이콘 라이브러리 지원
- ✅ Lottie 및 Rive 애니메이션 지원
- ✅ 한글 폰트 최적화 (next/font)
- ✅ 다크 모드 지원 (shadcn/ui 기본)

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Heroicons](https://heroicons.com)
- [Tabler Icons](https://tabler.io/icons)
- [Lottie](https://lottiefiles.com)
- [Rive](https://rive.app)
