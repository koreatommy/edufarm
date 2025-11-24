/**
 * 아이콘 라이브러리 통합 유틸리티
 * 
 * 사용 예시:
 * ```tsx
 * import { LucideIcon, HeroIcon, TablerIcon } from '@/lib/icons';
 * 
 * <LucideIcon name="Home" className="w-5 h-5" />
 * <HeroIcon name="HomeIcon" className="w-5 h-5" />
 * <TablerIcon name="home" className="w-5 h-5" />
 * ```
 */

import dynamic from 'next/dynamic';
import { type LucideProps } from 'lucide-react';
import { type ComponentType, type SVGProps } from 'react';

/**
 * Lucide 아이콘 동적 import
 */
export const createLucideIcon = (iconName: string) => {
  return dynamic(
    () =>
      import('lucide-react').then((mod) => {
        const Icon = mod[iconName as keyof typeof mod] as ComponentType<LucideProps>;
        return Icon || mod.AlertCircle;
      }),
    { ssr: false }
  );
};

/**
 * Heroicons 아이콘 동적 import
 */
export const createHeroIcon = (iconName: string) => {
  return dynamic(
    () =>
      import('@heroicons/react/24/outline').then((mod) => {
        const Icon = mod[iconName as keyof typeof mod] as ComponentType<SVGProps<SVGSVGElement>>;
        return Icon || mod.ExclamationTriangleIcon;
      }),
    { ssr: false }
  );
};

/**
 * Tabler Icons 동적 import
 */
export const createTablerIcon = (iconName: string) => {
  return dynamic(
    () =>
      import('@tabler/icons-react').then((mod) => {
        const Icon = mod[iconName as keyof typeof mod] as ComponentType<SVGProps<SVGSVGElement>>;
        return Icon || mod.IconAlertCircle;
      }),
    { ssr: false }
  );
};

/**
 * 직접 import를 원할 경우 사용
 */
export * as LucideIcons from 'lucide-react';
export * as HeroIcons from '@heroicons/react/24/outline';
export * as HeroIconsSolid from '@heroicons/react/24/solid';
export * as TablerIcons from '@tabler/icons-react';

