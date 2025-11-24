'use client';

import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VideoBackground } from '@/components/hero/VideoBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import {
  ArrowDown,
  Target,
  Lightbulb,
  Rocket,
  CheckCircle2,
  Users,
  Calendar,
  Clock,
  Building2,
  GraduationCap,
  Sparkles,
  MapPin,
  BookOpen,
  Laptop,
  School,
  Baby,
  GraduationCap as GraduationCap2,
  Brain,
  Cpu,
  Zap,
  Briefcase,
  Presentation,
  Store,
  Shield,
  TrendingUp,
  Phone,
  Mail,
  User,
  Building2 as Building2Icon,
  Images,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function HomePage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLDivElement>(null);
  const heroScrollIndicatorRef = useRef<HTMLDivElement>(null);
  const promotionSectionRef = useRef<HTMLElement>(null);
  const promotionTitleRef = useRef<HTMLHeadingElement>(null);
  const promotionCardsRef = useRef<HTMLDivElement>(null);
  const programSectionRef = useRef<HTMLElement>(null);
  const programCardsRef = useRef<HTMLDivElement>(null);
  const safetyImageRef = useRef<HTMLDivElement>(null);
  const effectImageRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero 섹션 텍스트 애니메이션
    if (heroTitleRef.current) {
      gsap.from(heroTitleRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (heroSubtitleRef.current) {
      gsap.from(heroSubtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroSubtitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (heroButtonRef.current) {
      gsap.from(heroButtonRef.current.children, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 0.7,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: heroButtonRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (heroScrollIndicatorRef.current) {
      gsap.from(heroScrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroScrollIndicatorRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // 스크롤 인디케이터 반복 애니메이션
      gsap.to(heroScrollIndicatorRef.current.querySelector('.arrow-icon'), {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === heroTitleRef.current ||
          trigger.trigger === heroSubtitleRef.current ||
          trigger.trigger === heroButtonRef.current ||
          trigger.trigger === heroScrollIndicatorRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    // 추진배경 섹션 애니메이션
    if (promotionTitleRef.current) {
      const titleText = promotionTitleRef.current.querySelector('span:last-child');
      if (titleText) {
        gsap.from(titleText, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: promotionTitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }

    if (promotionCardsRef.current) {
      const cards = promotionCardsRef.current.querySelectorAll('.promotion-card');
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: promotionCardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    // 추진 근거 카드들
    const reasonCards = document.querySelectorAll('.promotion-reason-card');
    if (reasonCards.length > 0) {
      // 초기화
      gsap.set(reasonCards, { opacity: 0, x: -50 });
      
      gsap.to(reasonCards, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: promotionSectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }

    // 추진 방침 카드들
    const policyCards = document.querySelectorAll('.promotion-policy-card');
    if (policyCards.length > 0) {
      // 초기화
      gsap.set(policyCards, { opacity: 0, scale: 0.8 });

      gsap.to(policyCards, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: policyCards[0] as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === promotionTitleRef.current ||
          trigger.trigger === promotionCardsRef.current ||
          (reasonCards.length > 0 && trigger.trigger === reasonCards[0]) ||
          (policyCards.length > 0 && trigger.trigger === policyCards[0])
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    // 프로그램소개 섹션 애니메이션
    if (programCardsRef.current) {
      const programCards = programCardsRef.current.querySelectorAll('.program-card');
      gsap.from(programCards, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: programCardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    // 테이블 행 순차 표시
    const tables = document.querySelectorAll('#program-introduction table tbody tr');
    if (tables.length > 0) {
      tables.forEach((table) => {
        const rows = table.querySelectorAll('tr') || [table];
        gsap.from(rows, {
          opacity: 0,
          x: -30,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: table.closest('.overflow-x-auto') || table,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === programCardsRef.current ||
          (tables.length > 0 && tables[0].closest('.overflow-x-auto'))
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    // 안전대책/기대효과 이미지 애니메이션
    if (safetyImageRef.current) {
      const image = safetyImageRef.current.querySelector('img');
      if (image) {
        gsap.from(image, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: safetyImageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // 스크롤 시 이미지 확대/축소 효과
        gsap.to(image, {
          scale: 1.05,
          scrollTrigger: {
            trigger: safetyImageRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      }
    }

    if (effectImageRef.current) {
      const image = effectImageRef.current.querySelector('img');
      if (image) {
        gsap.from(image, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: effectImageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // 스크롤 시 이미지 확대/축소 효과
        gsap.to(image, {
          scale: 1.05,
          scrollTrigger: {
            trigger: effectImageRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      }
    }

    // 운영사무국 카드 순차 등장
    if (contactCardsRef.current) {
      const cards = contactCardsRef.current.querySelectorAll('.contact-card');
      // 초기화
      gsap.set(cards, { opacity: 0, y: 50 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactCardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === safetyImageRef.current ||
          trigger.trigger === effectImageRef.current ||
          trigger.trigger === contactCardsRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    // 스크롤 진행률 표시
    if (scrollProgressRef.current) {
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (scrollProgressRef.current) {
            gsap.to(scrollProgressRef.current, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
              ease: 'none',
            });
          }
        },
      });
    }

    // 섹션 간 스무스 전환을 위한 스크롤 최적화
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

    // 모바일 대응: 터치 이벤트 최적화
    if (typeof window !== 'undefined') {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        ScrollTrigger.config({
          touch: true,
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.onUpdate) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <Header />
      {/* 스크롤 진행률 표시 */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50">
        <div
          ref={scrollProgressRef}
          className="h-full bg-primary transition-all duration-100"
          style={{ width: '0%' }}
        />
      </div>
      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        >
          {/* 동영상 배경 */}
          <VideoBackground 
            src="/videos/hero-video.mp4"
            className="z-0"
          />

          {/* 텍스트 콘텐츠 오버레이 */}
          <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
            <h1 
              ref={heroTitleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight drop-shadow-lg"
            >
              <span className="inline-block">금산교육발전특구</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> </span>
              <span className="inline-block text-white">(도농복합경제지원센터)</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> </span>
              <span className="inline-block">스마트팜 프로그램 소개</span>
          </h1>
            <p 
              ref={heroSubtitleRef}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto drop-shadow-md px-4"
            >
              {/* 부제목/설명 영역 - 사용자 컨텐츠 대기 */}
            </p>

            {/* CTA 버튼 영역 */}
            <div 
              ref={heroButtonRef}
              className="flex gap-4 justify-center flex-wrap mb-8 md:mb-12 px-4"
            >
              <button 
                className="px-6 md:px-8 py-2.5 md:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                aria-label="문의하기"
              >
                {/* CTA 버튼 텍스트 - 사용자 컨텐츠 대기 */}
                문의하기
              </button>
            </div>

            {/* 스크롤 인디케이터 */}
            <div 
              ref={heroScrollIndicatorRef}
              className="mt-8 md:mt-16 flex justify-center"
            >
              <a
                href="#promotion-background"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('promotion-background')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
                aria-label="다음 섹션으로 스크롤"
              >
                <span className="text-xs sm:text-sm font-medium">더 알아보기</span>
                <ArrowDown className="arrow-icon w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* 추진배경 섹션 */}
        <section
          ref={promotionSectionRef}
          id="promotion-background"
          className="container mx-auto px-4 py-20 md:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              ref={promotionTitleRef}
              className="text-3xl md:text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3"
            >
              <span className="bg-primary/10 p-2 rounded-xl">
                <Target className="w-8 h-8 text-primary" />
              </span>
              <span>추진배경</span>
            </h2>
          </motion.div>

          <div ref={promotionCardsRef} className="max-w-6xl mx-auto space-y-20">
            {/* 1. 추진 근거 */}
            <div>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 border-l-4 border-primary pl-4"
              >
                추진 근거
              </motion.h3>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="promotion-reason-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none shadow-md bg-gradient-to-br from-white to-primary/5 dark:from-zinc-900 dark:to-primary/10 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-primary/20">
                          <Lightbulb className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">교육발전특구 시범지역 선정</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        지자체, 교육청, 대학, 지역 기업, 지역 공공 기관 등이 협력하여
                        <span className="text-primary font-medium"> 지역발전의 큰 틀</span>에서 
                        지역교육 혁신과 지역인재 양성 및 정주를 종합적으로 지원하는 체제
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="promotion-reason-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none shadow-md bg-gradient-to-br from-white to-primary/5 dark:from-zinc-900 dark:to-primary/10 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm group-hover:shadow-md transition-shadow ring-1 ring-primary/20">
                          <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">스마트팜 교육 확대</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium mb-3 text-foreground/90">
                        도시-농촌 간 경제 교류 확보
                      </p>
                      <div className="pl-4 border-l-2 border-primary/30 py-2">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          영유아·초등학생 스마트팜 체험교육 개발·운영 및 청년 농업인 육성 지원
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* 2. 추진 목적 */}
            <div>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 border-l-4 border-primary pl-4"
              >
                추진 목적
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                  <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="p-6 bg-white dark:bg-zinc-800 rounded-full shadow-lg ring-4 ring-primary/10 shrink-0">
                      <Rocket className="w-12 h-12 text-primary" />
                    </div>
                    <div className="text-center md:text-left space-y-4">
                      <h4 className="text-2xl md:text-3xl font-bold text-foreground">
                        스마트팜 분야 진로 체험 및 실습 프로그램 운영
                      </h4>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        중부대학 및 지역사회(금산군 등) 인프라를 활용하여 운영가능한
                        <span className="text-primary font-bold"> 실질적이고 체계적인</span> 스마트팜 교육 제공
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* 3. 추진 방침 */}
            <div>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 border-l-4 border-primary pl-4"
              >
                추진 방침
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: GraduationCap,
                    title: "찾아가는 프로그램",
                    desc: "초,중,고를 대상으로 찾아가는 스마트팜 프로그램 진행",
                    delay: 0
                  },
                  {
                    icon: Building2,
                    title: "현장체험 프로그램",
                    desc: "희망고등학교를 대상으로 현장체험 및 진로설계 프로그램 진행",
                    delay: 0.1
                  },
                  {
                    icon: Target,
                    title: "연계 확장",
                    desc: "향후 스마트팜 직업체험 및 진학과 연계 확장 진행",
                    delay: 0.2
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="promotion-policy-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                  >
                    <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {item.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                <motion.div 
                  className="promotion-policy-card md:col-span-2 lg:col-span-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-primary/5">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary rounded-lg text-white shadow-md">
                          <Users className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl font-bold">운영 방식</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                      <div className="flex gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          모든 프로그램은 금산교육발전특구(도농복합경제지원센터) 운영비로 운영되며
                          별도 운영을 희망하는 학교에서는 센터와 연락하여 학교 예산으로 추가 운영 가능
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          프로그램 운영 시 학교 담당교사는 프로그램에 함께 참여하여 학생 안전지도
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* 4. 추진 개요 */}
            <div>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 border-l-4 border-primary pl-4"
              >
                추진 개요
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Card className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border-2 border-primary/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-emerald-400 to-primary" />
                  <CardContent className="p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-primary/10 rounded-2xl">
                          <Calendar className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Operation Period</p>
                          <h4 className="text-2xl font-bold">운영 기간</h4>
                        </div>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                          2025. 9. 29. <span className="text-lg text-muted-foreground font-normal">(월)</span>
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-foreground">
                          ~ 2026. 1. 30. <span className="text-lg text-muted-foreground font-normal">(금)</span>
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          <span>약 4개월간 운영</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 프로그램소개 섹션 */}
        <section
          ref={programSectionRef}
          id="program-introduction"
          className="w-full bg-primary/5 py-20 md:py-24"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
                <span className="bg-primary/10 p-2 rounded-xl">
                  <BookOpen className="w-8 h-8 text-primary" />
                </span>
                <span>프로그램 소개</span>
              </h2>
            </motion.div>

            <div ref={programCardsRef} className="max-w-6xl mx-auto space-y-12">
            {/* 프로그램 1: 찾아가는 스마트팜 진로체험 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="program-card border-none shadow-lg bg-white dark:bg-zinc-900">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                    <School className="w-8 h-8 text-primary" />
                    [초·중·고등학교 대상] 찾아가는 스마트팜 진로체험
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* 프로그램 개요 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">일시</span>
                      </div>
                      <p className="text-lg pl-7">
                        당일 오전 09:00~12:30 / 1~2교시 또는 1~4교시 진행
                        <br />
                        <span className="text-sm text-muted-foreground">
                          (학교와 협의 예정, 고등학교는 4~6교시 진행)
                        </span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">장소</span>
                      </div>
                      <p className="text-lg pl-7">지정 학급</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">대상</span>
                      </div>
                      <p className="text-lg pl-7">
                        금산군 내 초등학교 / 학급별 최대 20명(1~6학년)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">운영방법</span>
                      </div>
                      <p className="text-lg pl-7">
                        초등학교: 총 2차시(기본 2차시)
                        <br />
                        중학교: 총 4차시(기본 2차시 + 심화 2차시)
                        <br />
                        고등학교: 총 6차시(기본 2차시 + 심화 4차시)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-lg leading-relaxed">
                      <span className="font-semibold text-primary">진행방식:</span> 이론 학습을 통하여 스마트팜 산업에 대한 이해 및 
                      실제 체험 활동을 통해 구체적인 스마트팜 산업 분야를 탐색하고 이해하는 수업
          </p>
        </div>

                  {/* 대상별 프로그램 탭 */}
                  <Tabs defaultValue="elementary-1-3" className="w-full">
                    <div className="overflow-x-auto mb-6">
                      <TabsList className="grid w-full grid-cols-4 min-w-[600px] md:min-w-0">
                        <TabsTrigger value="elementary-1-3" className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                          초등 1~3학년
                        </TabsTrigger>
                        <TabsTrigger value="elementary-4-6" className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                          초등 4~6학년
                        </TabsTrigger>
                        <TabsTrigger value="middle" className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                          중학교
                        </TabsTrigger>
                        <TabsTrigger value="high" className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                          고등학교
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* 초등학교 1~3학년 */}
                    <TabsContent value="elementary-1-3" className="space-y-6">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <Baby className="w-6 h-6 text-primary" />
                          초등학생 수준을 고려한 진로체험 프로그램 운영
                        </h4>
                        <ul className="space-y-2 text-lg leading-relaxed">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>스마트팜 체험활동: 재미있게 영어로 진행하는 스마트팜 체험활동 포함</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>반려식물 만들기를 통해 정서적 심리치료</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>스마트팜 기술을 활용한 농작물 재배 체험</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>교구를 활용한 스마트팜 모형 제작 체험</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>스마트팜 현장 견학 및 기술 체험</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>교과목과 연계한 프로그램 운영 (과학, 정보, 진로와 직업 등)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-4">공통(기본)</h4>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px] min-w-[80px]">차시</TableHead>
                                <TableHead className="min-w-[300px]">프로그램</TableHead>
                                <TableHead className="w-[100px] min-w-[80px]">비고</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">1차시</TableCell>
                                <TableCell>스마트팜과 우리지역 알아보기</TableCell>
                                <TableCell>이론</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">2차시</TableCell>
                                <TableCell>스마트팜과 디자인 씽킹 사고(딸기 패키지 디자인하기)</TableCell>
                                <TableCell>실습</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>

                    {/* 초등학교 4~6학년 */}
                    <TabsContent value="elementary-4-6" className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold mb-4">공통(기본)</h4>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px] min-w-[80px]">차시</TableHead>
                                <TableHead className="min-w-[300px]">프로그램</TableHead>
                                <TableHead className="w-[100px] min-w-[80px]">비고</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">1차시</TableCell>
                                <TableCell>스마트팜과 우리지역 알아보기</TableCell>
                                <TableCell>이론</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">2차시</TableCell>
                                <TableCell>스마트팜과 수경재배(수경재배 스마트팜 설계도 제작하기)</TableCell>
                                <TableCell>실습</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>

                    {/* 중학교 */}
                    <TabsContent value="middle" className="space-y-6">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <GraduationCap2 className="w-6 h-6 text-primary" />
                          중학생 수준을 고려한 진로체험 프로그램 운영
                        </h4>
                        <ul className="space-y-2 text-lg leading-relaxed">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>정규 교과목과 연계한 농업 기초 교육</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>반려식물 만들기를 통한 스마트팜과 치유농업 소개</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>교구를 활용한 스마트팜 모형 제작 및 원리 이해</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>스마트팜 현장 견학 및 기술 이해</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>미래 농업 토의 활동: 스마트팜을 활용한 친환경 농업과 지속 가능한 농업 등</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>교과목과 연계한 프로그램 운영 (과학, 정보, 진로와 직업 등)</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-primary">공통(기본)</h4>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px] min-w-[80px]">차시</TableHead>
                                  <TableHead className="min-w-[300px]">프로그램</TableHead>
                                  <TableHead className="w-[150px] min-w-[120px]">비고</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">1차시</TableCell>
                                  <TableCell>4차산업과 6차산업</TableCell>
                                  <TableCell>이론+실습</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">2차시</TableCell>
                                  <TableCell>스마트팜센서 이해하기 1(스마트팜과 조도센서 코딩하기)</TableCell>
                                  <TableCell>-</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-primary">선택(심화)</h4>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px] min-w-[80px]">차시</TableHead>
                                  <TableHead className="min-w-[300px]">프로그램</TableHead>
                                  <TableHead className="w-[150px] min-w-[120px]">비고</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">3차시</TableCell>
                                  <TableCell>스마트팜과 IOT</TableCell>
                                  <TableCell>이론+실습</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">4차시</TableCell>
                                  <TableCell>스마트팜센서 이해하기 2(스마트팜 수분센서 코딩하기)</TableCell>
                                  <TableCell>-</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* 고등학교 */}
                    <TabsContent value="high" className="space-y-6">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                          <Laptop className="w-6 h-6 text-primary" />
                          고등학생 수준을 고려한 진로체험 프로그램 운영
                        </h4>
                        <ul className="space-y-2 text-lg leading-relaxed">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>정규 교과목과 연계한 농업 기본/심화 교육</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>스마트팜 현장 견학 및 시설 체험, 업계 종사자 인터뷰</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>교구를 활용한 스마트팜 모형 제작 및 코딩기술을 적용한 loT 기술 융합 이해</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>스마트팜 분야 전망 토의 활동: 스마트팜을 통한 기후변화 대응 및 지속 가능한 농업 기술 사례, 스마트팜의 경제성 분석 등</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span>스마트팜 분야 진로 설계</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-primary">공통(기본)</h4>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px] min-w-[80px]">차시</TableHead>
                                  <TableHead className="min-w-[300px]">프로그램</TableHead>
                                  <TableHead className="w-[150px] min-w-[120px]">비고</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">1차시</TableCell>
                                  <TableCell>스마트팜 이해와 데이터의 역할</TableCell>
                                  <TableCell>이론+실습</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">2차시</TableCell>
                                  <TableCell>스마트팜 관련 창업 아이디어 도출</TableCell>
                                  <TableCell>-</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-primary">선택(심화)</h4>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px] min-w-[80px]">차시</TableHead>
                                  <TableHead className="min-w-[300px]">프로그램</TableHead>
                                  <TableHead className="w-[150px] min-w-[120px]">비고</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">3차시</TableCell>
                                  <TableCell>스마트팜 데이터 수집과 분석 기초</TableCell>
                                  <TableCell>이론+실습</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">4차시</TableCell>
                                  <TableCell>스마트팜 데이터 활용 프로젝트</TableCell>
                                  <TableCell>-</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">5차시</TableCell>
                                  <TableCell>스마트팜 시스템 구성</TableCell>
                                  <TableCell>이론+실습</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">6차시</TableCell>
                                  <TableCell>스마트팜 자동화 및 알림시스템</TableCell>
                                  <TableCell>-</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* 프로그램 2: 특성화 고등학생 대상 직업체험 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="program-card border-none shadow-lg bg-white dark:bg-zinc-900">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                    <Briefcase className="w-8 h-8 text-primary" />
                    [특성화 고등학생 대상] 직업체험
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* 프로그램 개요 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">일시</span>
                      </div>
                      <p className="text-lg pl-7">
                        당일 오전 09:00~12:30 / 1~4교시 진행
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">장소</span>
                      </div>
                      <p className="text-lg pl-7">중부대학교 내 스마트팜 실습실</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">대상</span>
                      </div>
                      <p className="text-lg pl-7">특성화 고등학생 대상</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">운영방법</span>
                      </div>
                      <p className="text-lg pl-7">
                        총 4차시(기본 2차시 + 심화 2차시)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-lg leading-relaxed">
                      <span className="font-semibold text-primary">진행방식:</span> 이론 학습을 통하여 스마트팜 산업에 대한 이해 및 
                      실제 체험 활동을 통해서 구체적인 스마트팜 산업 분야를 탐색하고 이해하는 수업
                    </p>
                  </div>

                  {/* 프로그램 특징 */}
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-primary" />
                      특성화 고등학생 수준을 고려한 직업체험 프로그램 운영
                    </h4>
                    <ul className="space-y-2 text-lg leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>특성화고 교과목 내용을 반영한 직업체험 프로그램 운영</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>인공지능 기술을 활용한 스마트팜 시스템 운영 체험 교육</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>
                          <span className="font-semibold">이론 교육:</span> 스마트팜 관련 기본 이론 (센서, 자동화 시스템, 데이터 분석 등) 및 AI의 농업 활용 가능성
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>
                          <span className="font-semibold">실습 교육:</span> 스마트팜 시스템 구축 실습 (온도, 습도, CO2 농도 조절 등 환경 제어) 및 AI 기반 작물 관리 알고리즘 개발
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>현장 견학 및 프로젝트: 지역 내 스마트팜 현장 방문, 문제 해결형 프로젝트를 통한 실무능력 배양</span>
                      </li>
                    </ul>
                  </div>

                  {/* 차시별 프로그램 표 */}
                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Cpu className="w-6 h-6 text-primary" />
                      차시별 프로그램
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="text-lg font-semibold mb-3 text-primary">공통(기본)</h5>
                        <div className="w-full overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-1/6 md:w-1/5">대상</TableHead>
                                <TableHead className="w-1/6 md:w-1/5">과정</TableHead>
                                <TableHead className="w-1/6 md:w-1/5">차시</TableHead>
                                <TableHead className="w-2/5 md:w-2/5">프로그램</TableHead>
                                <TableHead className="w-1/6 md:w-1/5">비고</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">특성화고등학교</TableCell>
                                <TableCell>공통(기본)</TableCell>
                                <TableCell className="font-medium">1차시</TableCell>
                                <TableCell className="break-words">스마트팜 데이터 수집과 분석 기초</TableCell>
                                <TableCell>이론+실습</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">특성화고등학교</TableCell>
                                <TableCell>공통(기본)</TableCell>
                                <TableCell className="font-medium">2차시</TableCell>
                                <TableCell className="break-words">스마트팜 데이터 활용 프로젝트</TableCell>
                                <TableCell>-</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold mb-3 text-primary">선택(심화)</h5>
                        <div className="w-full overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-1/6 md:w-1/5">대상</TableHead>
                                <TableHead className="w-1/6 md:w-1/5">과정</TableHead>
                                <TableHead className="w-1/6 md:w-1/5">차시</TableHead>
                                <TableHead className="w-2/5 md:w-2/5">프로그램</TableHead>
                                <TableHead className="w-1/6 md:w-1/5">비고</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">특성화고등학교</TableCell>
                                <TableCell>선택(심화)</TableCell>
                                <TableCell className="font-medium">3차시</TableCell>
                                <TableCell className="break-words">스마트팜 시스템 구성</TableCell>
                                <TableCell>이론+실습</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">특성화고등학교</TableCell>
                                <TableCell>선택(심화)</TableCell>
                                <TableCell className="font-medium">4차시</TableCell>
                                <TableCell className="break-words">스마트팜 자동화 및 알림시스템</TableCell>
                                <TableCell>-</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 프로그램 3: 직업희망 고등학생 대상 프로그램 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Card className="program-card border-none shadow-lg bg-white dark:bg-zinc-900">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                    <Target className="w-8 h-8 text-primary" />
                    [직업희망 고등학생 대상] 프로그램
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* 프로그램 개요 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">일시</span>
                      </div>
                      <p className="text-lg pl-7">
                        당일 오전 09:00~10:50 / 1~2교시 진행
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">장소</span>
                      </div>
                      <p className="text-lg pl-7">희망 학교 지정 학급</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">대상</span>
                      </div>
                      <p className="text-lg pl-7">희망 고등학생 대상</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">운영방법</span>
                      </div>
                      <p className="text-lg pl-7">
                        총 2차시(기본 2차시)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-lg leading-relaxed">
                      <span className="font-semibold text-primary">진행방식:</span> 고등학생들이 스마트팜의 핵심 원리와 미래 농업의 가능성을 이해하고 
                      진로 탐색에 활용할 수 있는 이해를 돕는 수업
                    </p>
                  </div>

                  {/* 프로그램 특징 */}
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary" />
                      직업희망 고등학생 대상 진로설계 프로그램 운영
                    </h4>
                    <ul className="space-y-2 text-lg leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>스마트팜 분야 진로를 희망하는 고등학생들을 대상으로 관련분야 교육를 통해 구체적인 진로설계 프로그램 운영</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>스마트팜 기술의 핵심 개념과 스마트팜 산업을 이해하고 관련 직업군 탐색과 진로설계를 지원하는 통합형 직업 교육</span>
                      </li>
                    </ul>
                  </div>

                  {/* 차시별 프로그램 표 */}
                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Cpu className="w-6 h-6 text-primary" />
                      차시별 프로그램
                    </h4>
                    <div>
                      <h5 className="text-lg font-semibold mb-3 text-primary">공통(기본)</h5>
                      <div className="w-full overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/6 md:w-1/5">대상</TableHead>
                              <TableHead className="w-1/6 md:w-1/5">과정</TableHead>
                              <TableHead className="w-1/6 md:w-1/5">차시</TableHead>
                              <TableHead className="w-2/5 md:w-2/5">프로그램</TableHead>
                              <TableHead className="w-1/6 md:w-1/5">비고</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">희망 고등학생</TableCell>
                              <TableCell>공통(기본)</TableCell>
                              <TableCell className="font-medium">1차시</TableCell>
                              <TableCell className="break-words">스마트팜의 기본 개념과 기술 이해</TableCell>
                              <TableCell>이론</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">희망 고등학생</TableCell>
                              <TableCell>공통(기본)</TableCell>
                              <TableCell className="font-medium">2차시</TableCell>
                              <TableCell className="break-words">스마트팜의 미래와 진로 탐색</TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 프로그램 4: 교육발전특구 공유의날 부스 운영 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Card className="program-card border-none shadow-lg bg-white dark:bg-zinc-900">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                    <Store className="w-8 h-8 text-primary" />
                    [교육발전특구 공유의날] 부스 운영
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* 프로그램 개요 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">일시</span>
                      </div>
                      <p className="text-lg pl-7">
                        11월 3일(월) 10:00 ~ 16:00
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">장소</span>
                      </div>
                      <p className="text-lg pl-7">금산종합체육관</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">대상</span>
                      </div>
                      <p className="text-lg pl-7">
                        금산군 내 초,중,고 학생 및 교육관계자
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">운영방법</span>
                      </div>
                      <p className="text-lg pl-7">
                        30분/회
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-lg leading-relaxed">
                      <span className="font-semibold text-primary">진행방식:</span> 부스 컨텐츠 구성 및 부스 방문 학생을 스마트팜 체험 활동
                    </p>
                  </div>

                  {/* 프로그램 특징 */}
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Presentation className="w-6 h-6 text-primary" />
                      학생 체험 프로그램 운영
                    </h4>
                    <ul className="space-y-2 text-lg leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>부스에 참여한 학생들을 대상으로 스마트팜에 대해 소개하고, 스마트팜 관련 기술 관련 체험을 할 수 있도록 부스 구성</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span>스마트팜 모형, 발표 자료, 프로젝트 산출물 등 중부대학교의 우수 결과물을 전시하고, 직접 설명하는 참여형 전시 운영</span>
                      </li>
                    </ul>
                  </div>

                  {/* 갤러리보기 버튼 */}
                  <div className="flex justify-center mt-8">
                    <a
                      href="https://ai-gallery-tau.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Images className="w-5 h-5" />
                      갤러리보기
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          </div>
        </section>

        {/* 안전대책 섹션 */}
        <section
          id="safety-measures"
          className="container mx-auto px-4 py-20 md:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
              <span className="bg-primary/10 p-2 rounded-xl">
                <Shield className="w-8 h-8 text-primary" />
              </span>
              <span>안전대책</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="border-none shadow-lg bg-white dark:bg-zinc-900">
              <CardContent className="p-0">
                <div ref={safetyImageRef} className="relative w-full overflow-hidden rounded-lg">
                  <Image
                    src="/imgs/safety-measures.png"
                    alt="학생 안전 대책 - 4단계 안전 관리 체계: 1. 사전 안전교육, 2. 학교별 자체 계획, 3. 교사 임장지도, 4. 비상연락 및 조치"
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* 기대효과 섹션 */}
        <section
          id="expected-effects"
          className="w-full bg-primary/5 py-20 md:py-24"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
                <span className="bg-primary/10 p-2 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </span>
                <span>기대효과</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <Card className="border-none shadow-lg bg-white dark:bg-zinc-900">
                <CardContent className="p-0">
                  <div ref={effectImageRef} className="relative w-full overflow-hidden rounded-lg">
                    <Image
                      src="/imgs/effect.png"
                      alt="기대효과 - 스마트팜 프로그램을 통한 교육 효과 및 성과"
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* 운영사무국 섹션 */}
        <section
          id="operation-office"
          className="container mx-auto px-4 py-20 md:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 flex items-center justify-center gap-3">
              <span className="bg-primary/10 p-2 rounded-xl">
                <Building2Icon className="w-8 h-8 text-primary" />
              </span>
              <span>운영사무국</span>
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12">
              기타 문의사항
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div ref={contactCardsRef} className="grid md:grid-cols-2 gap-6">
              {/* 립사이언스 대표 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="contact-card border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-xl transition-all h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">립사이언스</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">대표 엄수현</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-zinc-800/50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <a
                        href="tel:010-8227-1730"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        010-8227-1730
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-zinc-800/50 rounded-lg">
                      <Mail className="w-5 h-5 text-primary shrink-0" />
                      <a
                        href="mailto:lipsciencelip@gmail.com"
                        className="text-lg font-medium hover:text-primary transition-colors break-all"
                      >
                        lipsciencelip@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 도농복합경제지원센터 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card className="contact-card border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-xl transition-all h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">도농복합경제지원센터</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">이지형</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-zinc-800/50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <a
                        href="tel:041-750-6770"
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        041-750-6770
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
