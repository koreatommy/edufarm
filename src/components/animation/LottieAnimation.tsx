'use client';

import { useEffect, useRef } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';
import { type CSSProperties } from 'react';

interface LottieAnimationProps {
  animationData: unknown;
  className?: string;
  style?: CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

/**
 * Lottie 애니메이션 컴포넌트
 * 
 * @example
 * ```tsx
 * import animationData from '@/public/animations/example.json';
 * 
 * <LottieAnimation
 *   animationData={animationData}
 *   className="w-64 h-64"
 *   loop={true}
 *   autoplay={true}
 * />
 * ```
 */
export function LottieAnimation({
  animationData,
  className = '',
  style,
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
    });

    animation.setSpeed(speed);
    animationRef.current = animation;

    return () => {
      animation.destroy();
      animationRef.current = null;
    };
  }, [animationData, loop, autoplay, speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      aria-label="Lottie animation"
    />
  );
}

