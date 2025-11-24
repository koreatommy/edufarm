'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  fallbackImage?: string;
}

/**
 * 히어로 섹션용 동영상 배경 컴포넌트
 * 
 * @example
 * ```tsx
 * <VideoBackground 
 *   src="/videos/hero-video.mp4"
 *   poster="/images/video-poster.jpg"
 * />
 * ```
 */
export function VideoBackground({
  src,
  poster,
  className,
  fallbackImage,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = video?.parentElement;
    if (!video || !container) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      // 자동 재생 시도
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn('동영상 자동 재생 실패:', error);
          // 브라우저 정책으로 인한 자동 재생 실패는 정상
        });
    };

    const handleError = () => {
      console.error('동영상 로딩 실패');
      setHasError(true);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Intersection Observer로 뷰포트에 들어올 때 재생
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            video.play().catch(() => {
              // 자동 재생 실패는 정상 (브라우저 정책)
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    // 패럴랙스 효과 추가
    const parallaxTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(video, {
          y: progress * 100,
          scale: 1 + progress * 0.1,
          ease: 'none',
          duration: 0.1,
        });
      },
    });

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
      observer.disconnect();
      parallaxTrigger.kill();
    };
  }, []);

  // 에러 발생 시 폴백 이미지 표시
  if (hasError && fallbackImage) {
    return (
      <div
        className={cn(
          'absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat',
          className
        )}
        style={{ backgroundImage: `url(${fallbackImage})` }}
        aria-label="동영상 배경 (이미지 폴백)"
      />
    );
  }

  return (
    <div className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}>
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* 동영상 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload="auto"
        aria-label="히어로 섹션 배경 동영상"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/mp4" />
        {/* WebM 형식 지원 (선택사항) */}
        {src.endsWith('.mp4') && (
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        )}
        {/* 브라우저가 동영상을 지원하지 않을 경우를 위한 메시지 */}
        <p className="text-white">
          동영상을 재생할 수 없습니다. 브라우저가 동영상 형식을 지원하지 않습니다.
        </p>
      </video>

      {/* 어두운 오버레이 (텍스트 가독성 향상) */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
    </div>
  );
}

