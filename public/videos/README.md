# 동영상 파일 안내

이 폴더는 히어로 섹션에 사용되는 동영상 파일을 저장하는 곳입니다.

## 지원 형식

- **MP4** (H.264 코덱) - 권장
- **WebM** (VP9 코덱)
- **OGV** (Ogg Theora)

## 권장 사양

### 해상도
- **데스크톱**: 1920x1080 (Full HD)
- **모바일**: 1280x720 (HD) - 더 작은 용량

### 용량
- 최적화된 파일: **5-10MB**
- 최대 권장: **20MB** (로딩 시간 고려)

### 길이
- **10-30초** - 반복 재생되므로 짧은 영상 권장
- 무한 반복되므로 시작과 끝이 자연스럽게 연결되는 영상이 좋습니다

## 파일 이름 규칙

히어로 섹션 동영상은 다음 이름을 사용하세요:
- `hero-video.mp4` (기본)
- 또는 `hero-smartfarm.mp4` (더 구체적인 이름)

## 무료 영상 소스 추천

### Smart Farm 관련 무료 영상

1. **Pexels** (https://www.pexels.com/search/smart-farm/)
   - 고품질 무료 영상
   - 상업적 사용 가능
   - 다운로드: MP4 형식 제공

2. **Pixabay** (https://pixabay.com/videos/search/smart-farm/)
   - 다양한 스마트팜 관련 영상
   - 무료 다운로드
   - 다양한 해상도 제공

3. **Coverr** (https://coverr.co/search?q=smart+farm)
   - 히어로 섹션용 영상 특화
   - 반복 재생에 적합한 영상

4. **Videvo** (https://www.videvo.net/search/?q=smart+farm)
   - 농업 및 기술 관련 영상

## 검색 키워드

다음 키워드로 검색하면 관련 영상을 찾을 수 있습니다:
- smart farm
- agriculture technology
- greenhouse farming
- vertical farming
- hydroponic farming
- modern farming
- 농업 기술
- 스마트 농장

## 영상 최적화 팁

1. **압축 도구 사용**
   - HandBrake (https://handbrake.fr/)
   - FFmpeg
   - 온라인 도구: CloudConvert, FreeConvert

2. **코덱 설정**
   - H.264 코덱 사용
   - CRF 값: 23-28 (품질과 용량의 균형)

3. **프레임 레이트**
   - 30fps 권장
   - 24fps도 가능 (더 작은 용량)

## 사용 방법

1. 영상 파일을 이 폴더에 저장
2. 파일 이름을 `hero-video.mp4`로 변경 (또는 원하는 이름)
3. `src/app/page.tsx`에서 VideoBackground 컴포넌트의 `src` prop을 업데이트

예시:
```tsx
<VideoBackground src="/videos/hero-video.mp4" />
```

## 외부 URL 사용

로컬 파일 대신 외부 URL도 사용할 수 있습니다:

```tsx
<VideoBackground src="https://example.com/video.mp4" />
```

## 주의사항

- 영상 파일은 Git에 커밋하지 않는 것을 권장합니다 (용량이 클 수 있음)
- `.gitignore`에 `public/videos/*.mp4` 추가 고려
- 프로덕션 배포 시 CDN 사용 권장

