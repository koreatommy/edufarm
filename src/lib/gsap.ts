import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // 성능 최적화 설정
  gsap.config({
    nullTargetWarn: false,
  });

  // ScrollTrigger 전역 설정
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };

export interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  toggleActions?: string;
}

export const defaultScrollOptions: ScrollAnimationOptions = {
  start: 'top 80%',
  end: 'bottom 20%',
  scrub: false,
  markers: false,
  once: true,
  toggleActions: 'play none none none',
};

export function createScrollAnimation(
  element: gsap.TweenTarget,
  animation: gsap.TweenVars,
  options?: ScrollAnimationOptions
) {
  const opts = { ...defaultScrollOptions, ...options };
  
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: opts.trigger || (element as string | Element),
      start: opts.start,
      end: opts.end,
      scrub: opts.scrub,
      markers: opts.markers,
      once: opts.once,
      toggleActions: opts.toggleActions,
    },
  });
}

export function createStaggerAnimation(
  elements: gsap.TweenTarget,
  animation: gsap.TweenVars,
  stagger: number | gsap.StaggerVars = 0.2,
  options?: ScrollAnimationOptions
) {
  const opts = { ...defaultScrollOptions, ...options };
  
  return gsap.to(elements, {
    ...animation,
    stagger,
    scrollTrigger: {
      trigger: opts.trigger || (elements as string | Element),
      start: opts.start,
      end: opts.end,
      scrub: opts.scrub,
      markers: opts.markers,
      once: opts.once,
      toggleActions: opts.toggleActions,
    },
  });
}

export function createParallaxAnimation(
  element: gsap.TweenTarget,
  speed: number = 0.5,
  options?: ScrollAnimationOptions
) {
  const opts = { ...defaultScrollOptions, ...options };
  
  return gsap.to(element, {
    y: (i, el) => {
      const height = (el as HTMLElement).offsetHeight;
      return -(height * speed);
    },
    ease: 'none',
    scrollTrigger: {
      trigger: opts.trigger || (element as string | Element),
      start: opts.start || 'top bottom',
      end: opts.end || 'bottom top',
      scrub: true,
      markers: opts.markers,
    },
  });
}

export function createSplitTextAnimation(
  textElement: HTMLElement,
  options?: ScrollAnimationOptions
) {
  const opts = { ...defaultScrollOptions, ...options };
  
  const text = textElement.textContent || '';
  const words = text.split(' ');
  
  textElement.innerHTML = words
    .map((word) => `<span class="word-wrapper"><span class="word">${word}</span></span>`)
    .join(' ');
  
  const wordElements = textElement.querySelectorAll('.word');
  
  return gsap.from(wordElements, {
    opacity: 0,
    y: 50,
    rotationX: -90,
    transformOrigin: '50% 50% -50',
    stagger: 0.1,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: opts.trigger || textElement,
      start: opts.start,
      end: opts.end,
      scrub: opts.scrub,
      markers: opts.markers,
      once: opts.once,
      toggleActions: opts.toggleActions,
    },
  });
}

export function createCounterAnimation(
  element: HTMLElement,
  targetValue: number,
  duration: number = 2,
  options?: ScrollAnimationOptions
) {
  const opts = { ...defaultScrollOptions, ...options };
  
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: targetValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: opts.trigger || element,
      start: opts.start,
      end: opts.end,
      scrub: opts.scrub,
      markers: opts.markers,
      once: opts.once,
      toggleActions: opts.toggleActions,
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toString();
      },
    },
  });
}

