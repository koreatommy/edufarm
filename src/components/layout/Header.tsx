'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const menuItems = [
  { label: '추진배경', href: '#promotion-background' },
  { label: '프로그램소개', href: '#program-introduction' },
  { label: '안전대책', href: '#safety-measures' },
  { label: '기대효과', href: '#expected-effects' },
  { label: '운영사무국', href: '#operation-office' },
  { label: '결과보고서', href: '/results' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // 활성 섹션 감지 (해시 링크만)
      const hashMenuItems = menuItems.filter((item) => item.href.startsWith('#'));
      const sections = hashMenuItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // 메인 페이지에서만 스크롤 감지
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 실행
    }

    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  const handleMenuClick = (href: string) => {
    if (href.startsWith('#')) {
      // 해시 링크 처리
      if (pathname === '/') {
        // 메인 페이지에 있으면 바로 스크롤
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // 다른 페이지에 있으면 메인 페이지로 이동하면서 해시 포함
        // window.location을 사용하여 해시를 포함한 전체 URL로 이동
        window.location.href = '/' + href;
      }
    } else {
      // 페이지 링크: Next.js 라우터로 이동
      router.push(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all',
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-28 items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/imgs/logo_grey.png"
                alt="금산교육발전특구"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isHashLink = item.href.startsWith('#');
              const sectionId = isHashLink ? item.href.substring(1) : '';
              const isActive = isHashLink
                ? activeSection === sectionId
                : pathname === item.href;

              if (isHashLink) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(item.href);
                    }}
                    className={cn(
                      'px-4 py-2 text-xl font-medium rounded-md transition-colors',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.label}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className={cn(
                      'px-4 py-2 text-xl font-medium rounded-md transition-colors',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }
            })}
          </nav>

          {/* Desktop Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t py-4">
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const isHashLink = item.href.startsWith('#');
                const sectionId = isHashLink ? item.href.substring(1) : '';
                const isActive = isHashLink
                  ? activeSection === sectionId
                  : pathname === item.href;

                if (isHashLink) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item.href);
                      }}
                      className={cn(
                        'px-4 py-3 text-xl font-medium rounded-md transition-colors',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      {item.label}
                    </a>
                  );
                } else {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => handleMenuClick(item.href)}
                      className={cn(
                        'px-4 py-3 text-xl font-medium rounded-md transition-colors',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}
              <div className="px-4 py-3">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

