'use client';

import Rive from '@rive-app/react-canvas';
import { type CSSProperties, type ComponentProps } from 'react';

interface RiveAnimationProps extends Omit<ComponentProps<'canvas'>, 'src'> {
  src: string;
  className?: string;
  style?: CSSProperties;
  artboard?: string;
  animations?: string | string[];
  stateMachines?: string | string[];
  useOffscreenRenderer?: boolean;
  shouldDisableRiveListeners?: boolean;
  shouldResizeCanvasToContainer?: boolean;
  automaticallyHandleEvents?: boolean;
}

/**
 * Rive 애니메이션 컴포넌트
 * 
 * @example
 * ```tsx
 * <RiveAnimation
 *   src="/animations/example.riv"
 *   className="w-64 h-64"
 *   animations="Idle"
 *   stateMachines="StateMachine"
 * />
 * ```
 */
export function RiveAnimation({
  src,
  className = '',
  style,
  artboard,
  animations,
  stateMachines,
  useOffscreenRenderer,
  shouldDisableRiveListeners,
  shouldResizeCanvasToContainer = true,
  automaticallyHandleEvents,
  ...rest
}: RiveAnimationProps) {
  return (
    <Rive
      src={src}
      className={className}
      style={style}
      artboard={artboard}
      animations={animations}
      stateMachines={stateMachines}
      useOffscreenRenderer={useOffscreenRenderer}
      shouldDisableRiveListeners={shouldDisableRiveListeners}
      shouldResizeCanvasToContainer={shouldResizeCanvasToContainer}
      automaticallyHandleEvents={automaticallyHandleEvents}
      aria-label="Rive animation"
      {...rest}
    />
  );
}

