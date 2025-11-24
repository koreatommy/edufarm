'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollTriggerWrapperProps {
  children: ReactNode;
  className?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function ScrollTriggerWrapper({
  children,
  className,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
}: ScrollTriggerWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: onEnter,
      onLeave: onLeave,
      onEnterBack: onEnterBack,
      onLeaveBack: onLeaveBack,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [onEnter, onLeave, onEnterBack, onLeaveBack]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

