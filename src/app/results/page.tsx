'use client';

import { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTheme } from '@/components/theme/ThemeProvider';
import {
  FileText,
  BookOpen,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle2,
  Lightbulb,
  Target,
  Link as LinkIcon,
  ArrowUp,
  BarChart3,
  Heart,
  Award,
  GraduationCap,
  Star,
  Shield,
  CheckCircle,
  Building,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Rocket,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar, PolarAngleAxis as RadialAngleAxis } from 'recharts';

const tocItems = [
  { href: '#intro', label: '서론', icon: BookOpen },
  { href: '#overview', label: '운영개요', icon: Calendar },
  { href: '#quant', label: '정량 성과분석', icon: TrendingUp },
  { href: '#satisfaction', label: '참여 및 만족도 분석', icon: Users },
  { href: '#evaluation', label: '운영성과 평가', icon: CheckCircle2 },
  { href: '#conclusion', label: '결론 및 제언', icon: Lightbulb },
  { href: '#gallery', label: '현장 교육 갤러리', icon: ImageIcon },
];

// 카운트 애니메이션 컴포넌트
function TestimonialCards() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  const testimonials = [
    {
      quote: '시간이 금방 지나갈 만큼 재미있었다',
      rating: 5,
      school: '금산산업고등학교',
      name: '고등학생',
    },
    {
      quote: '내가 만든 스마트팜이 실제로 작동하니 신기했다',
      rating: 5,
      school: '금산산업고등학교',
      name: '고등학생',
    },
    {
      quote: '코딩으로 식물을 키우는 게 정말 신기하고 재밌었어요',
      rating: 4,
      school: '초등학교',
      name: '초등학생',
    },
    {
      quote: '직접 키트를 조립하고 작동시키는 과정이 너무 즐거웠습니다',
      rating: 5,
      school: '중학교',
      name: '중학생',
    },
    {
      quote: '미래 농업에 대해 배울 수 있어서 의미 있는 시간이었어요',
      rating: 4,
      school: '고등학교',
      name: '고등학생',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-500/20 via-purple-500/20 to-pink-500/20',
      'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
      'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
      'from-indigo-500/20 via-blue-500/20 to-purple-500/20',
      'from-rose-500/20 via-pink-500/20 to-fuchsia-500/20',
    ];
    return gradients[index % gradients.length];
  };

  const getBorderColor = (index: number) => {
    const colors = [
      'border-blue-500/30',
      'border-emerald-500/30',
      'border-orange-500/30',
      'border-indigo-500/30',
      'border-rose-500/30',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="mb-6" ref={containerRef}>
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-primary" />
        학생들의 소감
      </h3>
      
      {/* 카드 그리드 레이아웃 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className={`group relative overflow-hidden border-2 ${getBorderColor(index)} bg-gradient-to-br ${getGradient(index)} hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
            }}
          >
            {/* 장식 배경 패턴 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <CardContent className="p-6 md:p-8 relative z-10">
              {/* 인용 부호 장식 */}
              <div className="absolute top-4 left-4 text-6xl md:text-7xl font-serif text-primary/10 leading-none">
                "
              </div>
              
              {/* 별점 */}
              <div className="flex items-center gap-1 mb-4 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
                      isVisible && i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400 scale-100 opacity-100'
                        : 'fill-muted text-muted scale-100 opacity-100'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 100 + i * 50}ms` : '0ms',
                    }}
                  />
                ))}
              </div>

              {/* 소감 텍스트 */}
              <p className="text-base md:text-lg leading-relaxed text-foreground mb-6 italic font-medium relative z-10 min-h-[80px]">
                {testimonial.quote}
              </p>

              {/* 구분선 */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4" />

              {/* 학생 정보 */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {testimonial.school}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full group-hover:rotate-12 transition-transform">
                  <Heart className="w-4 h-4 text-primary fill-primary/20" />
                </div>
              </div>
            </CardContent>

            {/* 호버 시 글로우 효과 */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-lg pointer-events-none" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function CountUp({ end, duration = 2000, className = '' }: { end: number; duration?: number; className?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // easeOutCubic 함수
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const currentCount = Math.floor(startValue + (end - startValue) * easedProgress);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  );
}

export default function ResultsPage() {
  const { resolvedTheme } = useTheme();
  const textColor = resolvedTheme === 'dark' ? '#e4e4e7' : '#18181b'; // zinc-200 for dark, zinc-900 for light

  useEffect(() => {
    // 부드러운 스크롤 처리
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const href = target.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', href);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* 헤더 섹션 */}
        <header className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent py-12 md:py-16">
          <div className="container mx-auto max-w-[980px] px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 id="top" className="text-2xl md:text-4xl font-bold">
                금산교육발전특구 스마트팜 교육 프로그램 운영 결과 보고
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base ml-[60px]">
              목차를 클릭하면 해당 섹션으로 이동합니다.
            </p>
          </div>
        </header>

        {/* 본문 */}
        <div className="container mx-auto max-w-[980px] px-4 py-8 md:py-12 pb-16">
          {/* 목차 - 모던한 디자인 */}
          <Card className="mb-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
              <CardTitle className="text-xl md:text-2xl flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  목차
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tocItems.map((item, index) => {
                  const Icon = item.icon;
                  const gradients = [
                    'from-blue-500/10 via-purple-500/10 to-pink-500/10',
                    'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
                    'from-orange-500/10 via-amber-500/10 to-yellow-500/10',
                    'from-indigo-500/10 via-blue-500/10 to-purple-500/10',
                    'from-rose-500/10 via-pink-500/10 to-fuchsia-500/10',
                    'from-violet-500/10 via-purple-500/10 to-indigo-500/10',
                    'from-cyan-500/10 via-blue-500/10 to-teal-500/10',
                  ];
                  const borderColors = [
                    'border-blue-500/30',
                    'border-emerald-500/30',
                    'border-orange-500/30',
                    'border-indigo-500/30',
                    'border-rose-500/30',
                    'border-violet-500/30',
                    'border-cyan-500/30',
                  ];
                  const gradient = gradients[index % gradients.length];
                  const borderColor = borderColors[index % borderColors.length];
                  
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`group relative overflow-hidden rounded-xl border-2 ${borderColor} bg-gradient-to-br ${gradient} p-5 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 no-underline`}
                    >
                      {/* 배경 장식 */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                      
                      {/* 번호 배지 */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      
                      <div className="relative z-10">
                        {/* 아이콘 */}
                        <div className="mb-4 flex items-center gap-3">
                          <div className="p-3 bg-primary/10 group-hover:bg-primary/20 rounded-lg group-hover:rotate-6 transition-all duration-300">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent group-hover:from-primary/50 transition-colors" />
                        </div>
                        
                        {/* 라벨 */}
                        <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {item.label}
                        </h3>
                        
                        {/* 화살표 */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          <span>자세히 보기</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      
                      {/* 호버 시 글로우 효과 */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-xl pointer-events-none" />
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 본문 섹션들 */}
          <section id="intro" className="scroll-mt-20 mb-16">
            <div className="flex items-center gap-4 mb-6 mt-8">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">서론</h2>
            </div>
            <div className="space-y-4 leading-relaxed text-base md:text-lg">
              <p>
                금산군은 금산교육발전특구 지정을 통해 지역 교육을 혁신하고 미래 인재를 육성하는 다양한 전략을 추진 중이다.
                특히 중부대학교와 협력하여 스마트팜 교육 프로그램을 운영함으로써, 대학의 첨단 농업기술 역량을
                지역 초·중·고교 교육에 환류하고자 하였다.
              </p>
              <p>
                본 프로그램은 4차 산업혁명 시대의 스마트 농업 분야를 학생들이 직접 체험하고 진로를 탐색할 수 있도록
                설계되었으며, 2025년 하반기 약 4개월간 중부대학교 주관으로 실시되었다.
              </p>
              <p>
                이 보고서는 해당 프로그램의 운영 통계와 성과를 정리하여 정책결정자 및 학교 관계자에게 신뢰성 있는 정보를 제공하고,
                향후 개선 방향을 제언하고자 작성되었다.
              </p>
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              상단으로
            </a>
          </section>

          <section id="overview" className="scroll-mt-20 mb-16">
            <div className="flex items-center gap-4 mb-6 mt-8">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">운영개요</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {/* 운영 기간 카드 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    운영 기간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-base md:text-lg">
                    <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                      2025년 9월 29일 ~ 2026년 1월 30일
                    </span>
                    {' '}
                    <span className="font-semibold text-primary">(약 4개월)</span>
                    <br />
                    <br />
                    이 기간 동안 <span className="font-bold">중부대학교 충청국제캠퍼스(금산 소재)</span>와{' '}
                    <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                      금산교육지원청
                    </span>
                    이 협력하여 프로그램을 진행하였다.
                  </p>
                </CardContent>
              </Card>

              {/* 운영 방식 카드 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    운영 방식
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-base md:text-lg">
                    <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                      찾아가는 스마트팜 진로체험
                    </span>
                    형식으로 초등학교·중학교·고등학교를 직접 방문하여 진행되었으며,
                    일부 고등학생 대상 프로그램은{' '}
                    <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                      중부대학교 내 스마트팜 실습시설
                    </span>
                    에서 진행되었다.
                  </p>
                </CardContent>
              </Card>

              {/* 대상 및 구성 카드 */}
              <Card className="hover:shadow-lg transition-shadow md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    대상 및 구성
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-base md:text-lg mb-4">
                    <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                      금산군 내 초·중·고 학생들
                    </span>
                    을 대상으로 학년별 맞춤 커리큘럼을 운영하였다.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="font-bold text-primary mb-2">초등학생</p>
                      <p className="text-sm">
                        <span className="font-semibold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                          1~2교시
                        </span>
                        {' '}기초 체험 활동
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="font-bold text-primary mb-2">중학생</p>
                      <p className="text-sm">
                        기본+심화{' '}
                        <span className="font-semibold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                          총 4차시
                        </span>
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="font-bold text-primary mb-2">고등학생</p>
                      <p className="text-sm">
                        심화 실습 포함{' '}
                        <span className="font-semibold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                          총 6차시
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 프로그램 내용 카드 */}
              <Card className="hover:shadow-lg transition-shadow md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    프로그램 내용
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-base md:text-lg mb-4">
                    이론 학습과 함께{' '}
                    <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                      스마트팜 장비 체험, 작물 재배, 센서 조립 및 코딩 실습
                    </span>
                    등으로 이루어져 학생들이 적극적으로 참여할 수 있는{' '}
                    <span className="font-bold text-primary">체험형 수업</span> 형태로 진행되었다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="font-semibold mb-2">전문 강사진</p>
                      <p className="text-sm">
                        <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                          청소년 인공지능 전문 교육기관 립사이언스 연구소와 중부대학교 스마트팜학과 외국인 대학원생들
                        </span>
                        이 참여하여 전문성을 뒷받침함
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="font-semibold mb-2">행정 지원</p>
                      <p className="text-sm">
                        <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                          금산군청 및 교육지원청
                        </span>
                        의 행정 지원으로 프로그램 운영의 안정성 확보
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 예산 및 안전 관리 카드 */}
              <Card className="hover:shadow-lg transition-shadow md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    예산 및 안전 관리
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-base md:text-lg">
                    모든 교육과정은{' '}
                    <span className="font-bold bg-yellow-200 dark:bg-yellow-900/40 px-1.5 py-0.5 rounded">
                      금산교육발전특구 사업 예산
                    </span>
                    으로 운영되었으며, 각 학교 담당 교사가 현장에서 학생들과 함께 참여하여{' '}
                    <span className="font-bold text-primary">안전 관리 및 학습 지도</span>를 지원하였다.
                  </p>
                </CardContent>
              </Card>
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              상단으로
            </a>
          </section>

          <section id="quant" className="scroll-mt-20 mb-16">
            <div className="flex items-center gap-4 mb-6 mt-8">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">정량 성과분석</h2>
            </div>

            {/* 통계 카운트 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={52} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">학급</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={777} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">학생</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={177} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">초등학생</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={531} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">중학생</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CountUp end={69} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">고등학생</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 leading-relaxed text-base md:text-lg">
              <p>
                운영기간 동안 본 프로그램은 총{' '}
                <CountUp end={52} className="text-primary text-2xl font-bold" />개 학급을 대상으로 실시되었으며, 총{' '}
                <CountUp end={777} className="text-primary text-2xl font-bold" />명의 학생이 교육에 참여하였다.
                이를 학교급별로 구분하면 초등학생{' '}
                <CountUp end={177} className="text-primary font-semibold" />명, 중학생{' '}
                <CountUp end={531} className="text-primary font-semibold" />명, 고등학생{' '}
                <CountUp end={69} className="text-primary font-semibold" />명으로 집계되었다.
              </p>
              {/* 참여 비율 그래프 - 100% 누적 막대 그래프 */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    학교급별 참여 비율
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* 파이 그래프 */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-center">참여 비율 분포</h4>
                      <div className="h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: '중학생', value: 68, color: '#3b82f6' },
                                { name: '초등학생', value: 23, color: '#10b981' },
                                { name: '고등학생', value: 9, color: '#f59e0b' },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {[
                                { name: '중학생', value: 68, color: '#3b82f6' },
                                { name: '초등학생', value: 23, color: '#10b981' },
                                { name: '고등학생', value: 9, color: '#f59e0b' },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: number) => `${value}%`}
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                color: textColor,
                              }}
                            />
                            <Legend
                              wrapperStyle={{ color: textColor }}
                              formatter={(value) => value}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* 가로 막대 그래프 */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-center">참여 비율 비교</h4>
                      <div className="h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: '중학생', 비율: 68, color: '#3b82f6' },
                              { name: '초등학생', 비율: 23, color: '#10b981' },
                              { name: '고등학생', 비율: 9, color: '#f59e0b' },
                            ]}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                            <XAxis
                              type="number"
                              domain={[0, 100]}
                              tick={{ fill: textColor }}
                              tickFormatter={(value) => `${value}%`}
                            />
                            <YAxis
                              type="category"
                              dataKey="name"
                              tick={{ fill: textColor }}
                            />
                            <Tooltip
                              formatter={(value: number) => [`${value}%`, '참여 비율']}
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                color: textColor,
                              }}
                            />
                            <Bar dataKey="비율" radius={[0, 8, 8, 0]}>
                              {[
                                { name: '중학생', 비율: 68, color: '#3b82f6' },
                                { name: '초등학생', 비율: 23, color: '#10b981' },
                                { name: '고등학생', 비율: 9, color: '#f59e0b' },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* 정보 카드형 데이터 시각화 */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">중학생</div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">68%</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">참여 인원</span>
                            <span className="font-semibold">
                              <CountUp end={531} />명
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">참여 학급</span>
                            <span className="font-semibold">20학급</span>
                          </div>
                          <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                            <div className="text-xs text-muted-foreground">가장 큰 비중 차지</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">초등학생</div>
                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">23%</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">참여 인원</span>
                            <span className="font-semibold">
                              <CountUp end={177} />명
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">참여 학급</span>
                            <span className="font-semibold">31학급</span>
                          </div>
                          <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800">
                            <div className="text-xs text-muted-foreground">가장 많은 학급 참여</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-amber-500/10 rounded-lg">
                            <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">고등학생</div>
                            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">9%</div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">참여 인원</span>
                            <span className="font-semibold">
                              <CountUp end={69} />명
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">참여 학급</span>
                            <span className="font-semibold">3학급</span>
                          </div>
                          <div className="pt-2 border-t border-amber-200 dark:border-amber-800">
                            <div className="text-xs text-muted-foreground">심화 프로그램 운영</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <p>
                중학생 참여자가 전체의 약 <span className="text-primary font-semibold">68%</span>로 가장 큰 비중을 차지하였고,
                초등 <span className="text-primary font-semibold">23%</span>, 고등{' '}
                <span className="text-primary font-semibold">9%</span> 순으로 뒤를 이었다.
                이는 프로그램이 중학교를 중심으로 집중 운영되었음을 보여주며, 동시에 초등부터 고등까지 고르게 참여가 이루어졌음을 의미한다.
              </p>
              {/* 참여 학급 수 그래프 */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    학교급별 참여 학급 수
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: '초등', 학급: 31, color: '#10b981' },
                          { name: '중등', 학급: 20, color: '#3b82f6' },
                          { name: '고등', 학급: 3, color: '#f59e0b' },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                        <XAxis 
                          dataKey="name" 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: textColor }}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: textColor }}
                        />
                        <Tooltip
                          formatter={(value: number) => [`${value}학급`, '참여 학급']}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: textColor,
                          }}
                        />
                        <Bar dataKey="학급" radius={[8, 8, 0, 0]}>
                          {[
                            { name: '초등', 학급: 31, color: '#10b981' },
                            { name: '중등', 학급: 20, color: '#3b82f6' },
                            { name: '고등', 학급: 3, color: '#f59e0b' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-4 text-center">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">31</div>
                      <div className="text-sm text-muted-foreground">초등</div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">20</div>
                      <div className="text-sm text-muted-foreground">중등</div>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">3</div>
                      <div className="text-sm text-muted-foreground">고등</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-2xl font-bold text-primary">52</div>
                      <div className="text-sm text-muted-foreground">총계</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p>
                참여 학급 수 측면에서는 초등 <span className="text-primary font-semibold">31학급</span>, 중등{' '}
                <span className="text-primary font-semibold">20학급</span>, 고등{' '}
                <span className="text-primary font-semibold">3학급</span> 등 총{' '}
                <span className="text-primary text-2xl font-bold">52</span>학급이 프로그램에 참여하여
                학교 현장에서의 실행률이 매우 높았다. 이를 통해 짧은 학기 동안 지역 내 다수 학급에 프로그램이 침투되었음을 알 수 있다.
              </p>

              {/* 교육 밀도 그래프 */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    교육 밀도 (회당 참여 인원)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-center hover:shadow-lg transition-shadow">
                      <div className="p-3 bg-blue-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        <CountUp end={52} />
                      </div>
                      <div className="text-base font-semibold text-blue-700 dark:text-blue-300 mb-1">총 교육 회차</div>
                      <div className="text-xs text-muted-foreground">약 4개월간 운영</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center hover:shadow-lg transition-shadow">
                      <div className="p-3 bg-emerald-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                        <CountUp end={777} />
                      </div>
                      <div className="text-base font-semibold text-emerald-700 dark:text-emerald-300 mb-1">총 참여 학생</div>
                      <div className="text-xs text-muted-foreground">전체 참여 인원</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-center hover:shadow-lg transition-shadow">
                      <div className="p-3 bg-amber-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                        <CountUp end={15} />
                      </div>
                      <div className="text-base font-semibold text-amber-700 dark:text-amber-300 mb-1">회당 평균 인원</div>
                      <div className="text-xs text-muted-foreground">777명 ÷ 52회</div>
                    </div>
                  </div>
                  
                  {/* 계산 관계 시각화 */}
                  <div className="p-6 bg-muted/50 rounded-xl border border-border">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          <CountUp end={777} />
                        </div>
                        <div className="text-sm text-muted-foreground">총 참여 학생</div>
                      </div>
                      <div className="text-2xl text-muted-foreground">÷</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          <CountUp end={52} />
                        </div>
                        <div className="text-sm text-muted-foreground">총 교육 회차</div>
                      </div>
                      <div className="text-2xl text-muted-foreground">=</div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">
                          <CountUp end={15} />
                        </div>
                        <div className="text-sm text-muted-foreground">회당 평균 인원</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p>
                한편 <strong className="text-primary font-semibold">교육 밀도(회당 참여 인원)</strong>를 살펴보면, 총{' '}
                <span className="text-primary text-2xl font-bold">52</span>회 교육에{' '}
                <span className="text-primary text-2xl font-bold">777</span>명이 참여하여
                회당 평균 약 <span className="text-primary font-semibold">15명</span>의 학생이 수업을 받은 것으로 계산된다.
              </p>

              {/* 학년별 회당 참여 인원 레이더 차트 */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    학년별 회당 참여 인원 비교 (다차원 평가)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 md:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={[
                          { 
                            항목: '최소 인원', 
                            초등: 5, 
                            '중·고등': 20,
                            fullMark: 25
                          },
                          { 
                            항목: '평균 인원', 
                            초등: 5.5, 
                            '중·고등': 22.5,
                            fullMark: 25
                          },
                          { 
                            항목: '최대 인원', 
                            초등: 6, 
                            '중·고등': 25,
                            fullMark: 25
                          },
                          { 
                            항목: '집중도', 
                            초등: 9, 
                            '중·고등': 6,
                            fullMark: 10
                          },
                          { 
                            항목: '참여 규모', 
                            초등: 3, 
                            '중·고등': 9,
                            fullMark: 10
                          },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <PolarGrid stroke="hsl(var(--muted))" />
                        <PolarAngleAxis 
                          dataKey="항목" 
                          tick={{ fill: textColor, fontSize: 12 }}
                        />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 25]} 
                          tick={{ fill: textColor, fontSize: 10 }}
                        />
                        <Radar
                          name="초등"
                          dataKey="초등"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="중·고등"
                          dataKey="중·고등"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Tooltip
                          formatter={(value: number, name: string) => {
                            if (name === '초등' || name === '중·고등') {
                              if (value <= 10) {
                                return [`${value}/10`, name];
                              }
                              return [`${value}명`, name];
                            }
                            return [value, name];
                          }}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: textColor,
                          }}
                        />
                        <Legend
                          wrapperStyle={{ 
                            fontSize: '14px',
                            color: textColor
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        초등학생
                      </div>
                      <div className="text-sm space-y-1">
                        <div>인원 범위: <span className="font-bold">5~6명</span></div>
                        <div>평균 인원: <span className="font-bold text-lg">5.5명</span></div>
                        <div>집중도: <span className="font-bold">높음 (9/10)</span></div>
                        <div>참여 규모: <span className="font-bold">소규모 (3/10)</span></div>
                        <div className="text-xs text-muted-foreground mt-2">소규모 그룹으로 집중도 향상</div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="font-semibold mb-2 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        중·고등학생
                      </div>
                      <div className="text-sm space-y-1">
                        <div>인원 범위: <span className="font-bold">20~25명</span></div>
                        <div>평균 인원: <span className="font-bold text-lg">22.5명</span></div>
                        <div>집중도: <span className="font-bold">보통 (6/10)</span></div>
                        <div>참여 규모: <span className="font-bold">대규모 (9/10)</span></div>
                        <div className="text-xs text-muted-foreground mt-2">학급 단위로 협업 학습</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p>
                학년별로 세분하면 초등의 경우 한 차시당 소규모 그룹(평균 5~6명 내외)으로 진행되어 집중도를 높였고,
                중·고등의 경우 학급 단위(20~25명 내외) 참여로 한 회차당 비교적 많은 학생이 동시에 교육을 받았다.
              </p>
              <p>
                이러한 운영 통계를 통해 볼 때, 본 프로그램은 한 학기 남짓한 기간에 다수의 학생들에게 높은 빈도로 교육을 제공하였고,
                초·중·고 각 학교급에 맞춰 범위를 넓게 참여시킨 것으로 평가된다.
              </p>
            </div>
            <a
              href="#top"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              상단으로
            </a>
          </section>

          <section id="satisfaction" className="scroll-mt-20 mb-16">
            <div className="flex items-center gap-4 mb-6 mt-8">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">참여 및 만족도 분석</h2>
            </div>

            {/* 참여율 및 달성률 게이지 차트 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  참여율 및 달성률
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="h-64 md:h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        innerRadius="60%"
                        outerRadius="90%"
                        data={[{ name: '달성률', value: 100, fill: '#10b981' }]}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <RadialBar
                          dataKey="value"
                          cornerRadius={10}
                          fill="#10b981"
                        />
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-4xl font-bold"
                          fill={textColor}
                        >
                          100%
                        </text>
                        <text
                          x="50%"
                          y="60%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm"
                          fill={textColor}
                        >
                          달성률
                        </text>
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        <div>
                          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                            <CountUp end={52} />
                          </div>
                          <div className="text-sm text-muted-foreground">회차 모두 완료</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        사전에 계획된 모든 교육이 예정대로 실시되었습니다.
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div>
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</div>
                          <div className="text-sm text-muted-foreground">취소/이탈</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        참여 학교 및 학급의 취소나 이탈 없이 모두 완료되었습니다.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 참여율 본문 설명 카드 */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="leading-relaxed text-base md:text-lg">
                  참여율: 프로그램 참여율은 매우 높았다. 사전에 계획된{' '}
                  <span className="text-primary text-2xl font-bold">52</span>회차 교육이{' '}
                  <span className="text-primary text-2xl font-bold">100%</span> 예정대로 실시되었고,
                  참여 학교 및 학급의 취소나 이탈 없이 모두 완료되었다. 이는 학교 현장에서의 협조와 학생들의 높은 관심으로
                  <strong className="text-primary font-semibold"> 운영계획 대비 달성률 100%</strong>의 성과를 이룬 것으로 해석된다.
                </p>
              </CardContent>
            </Card>

            {/* 교육 횟수 통계 카드 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  교육 횟수 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">4개월</div>
                    <div className="text-sm text-muted-foreground font-medium">운영 기간</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      2025.9.29 ~ 2026.1.30
                    </div>
                  </div>
                  <div className="p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      <CountUp end={52} />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">총 교육 회차</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      계획 대비 100% 달성
                    </div>
                  </div>
                  <div className="p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">3회+</div>
                    <div className="text-sm text-muted-foreground font-medium">주당 평균</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      집중적인 운영
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 교육 횟수 본문 설명 카드 */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="leading-relaxed text-base md:text-lg">
                  교육 횟수 역시 약 4개월 동안 주당 평균 3회 이상의 빈도로 진행되어, 짧은 기간에 집중적인 운영이 이루어졌다.
                  이처럼 높은 회차수와 참여율은 프로그램에 대한 수요와 호응이 기대 이상이었음을 나타낸다.
                </p>
              </CardContent>
            </Card>

            {/* 운영 현황 요약 표 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  운영 현황 요약
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>구분</TableHead>
                      <TableHead className="text-center">계획</TableHead>
                      <TableHead className="text-center">실적</TableHead>
                      <TableHead className="text-center">달성률</TableHead>
                      <TableHead className="text-center">비고</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">교육 회차</TableCell>
                      <TableCell className="text-center">52회</TableCell>
                      <TableCell className="text-center font-bold text-primary">
                        <CountUp end={52} />회
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">100%</span>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">모두 완료</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">참여 학교</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center font-bold text-primary">전체</TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">100%</span>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">취소 없음</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">참여 학급</TableCell>
                      <TableCell className="text-center">52학급</TableCell>
                      <TableCell className="text-center font-bold text-primary">
                        <CountUp end={52} />학급
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">100%</span>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">이탈 없음</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">참여 학생</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center font-bold text-primary">
                        <CountUp end={777} />명
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">100%</span>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">예정대로 진행</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 교육 밀도 카드 */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="leading-relaxed text-base md:text-lg">
                  교육 밀도: 회당 평균 <span className="text-primary font-semibold">15명</span> 내외의 학생이 참여한 것은, 한편으로는 초등 저학년의 경우 소그룹 위주의 세분화 교육을
                  실시하고 고학년일수록 한 회차에 더 많은 학생을 수용한 결과이다. 낮은 학년일수록 학생 개인별 체험 활동의 질을 높이기 위해
                  소규모로 운영하고, 중·고등학생은 학급 단위로 함께 참여시켜 협업 학습과 토론을 도모한 운영 전략으로 볼 수 있다.
                </p>
              </CardContent>
            </Card>

            {/* 학년별 반응도 및 추정 만족도 카드 */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="leading-relaxed text-base md:text-lg mb-4">
                  학년별 반응도 및 추정 만족도: 프로그램에 대한 학생들의 반응은 전반적으로 매우 긍정적이었다. 특히 초등학생들의 경우
                  호기심과 흥미를 강하게 보이며 적극 참여하여 만족도가 가장 높았던 것으로 추정된다.
                </p>
                <p className="leading-relaxed text-base md:text-lg mb-4">
                  현장에서 지도교사들의 관찰에 따르면, 초등 저학년일수록 새로운 기술과 식물 재배 활동에 순수한 흥미를 보여 질문과
                  체험 참여도가 매우 높았다. 고등학생들도 진지한 태도로 임하면서도 교육용 키트를 직접 조립하고 코딩으로 장치를 제어하는
                  과정에서 높은 몰입감을 보였다.
                </p>
                <p className="leading-relaxed text-base md:text-lg mb-6">
                  금산산업고등학교를 대상으로 한 심화 수업 후 실시된 소감 나누기에서 일부 학생들은 "시간이 금방 지나갈 만큼 재미있었다",
                  "내가 만든 스마트팜이 실제로 작동하니 신기했다" 등의 반응을 보이며 높은 만족도를 나타냈다.
                </p>

                {/* 학생 소감 카드 */}
                <TestimonialCards />

                <p className="leading-relaxed text-base md:text-lg mb-4">
                  한편 중학생들의 경우 전반적으로 긍정적 반응을 보였지만, 중학교 1~2학년의 비교적 어린 학생들은 고학년 대비 표현되는
                  흥미나 참여 피드백이 다소 낮았던 것으로 파악된다. 이는 해당 연령대의 관심 분산 또는 난이도 적응의 문제일 수 있으나,
                  수업 집중도나 참여율이 저조했다는 의미는 아니며, 다만 초등이나 고등에 비해 눈에 띄는 적극성이 약간 덜했다는 정도로 해석된다.
                </p>
                <p className="leading-relaxed text-base md:text-lg">
                  전반적으로 모든 학교급에서 만족도가 높았으며, 특히 자신의 수준에 맞는 체험 활동을 제공받은 학생일수록 흥미와 만족을 크게
                  표현한 것으로 나타났다.
                </p>
              </CardContent>
            </Card>
            <a
              href="#top"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              상단으로
            </a>
          </section>

          <section id="evaluation" className="scroll-mt-20 mb-16">
            <div className="flex items-center gap-4 mb-6 mt-8">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">운영성과 평가</h2>
            </div>

            {/* 교육 운영 안정성 카드 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  교육 운영 안정성
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                        <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">전문</div>
                        <div className="text-sm text-muted-foreground">강사진</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      전공 교수진 및 대학원생 투입
                    </p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                        <div className="text-sm text-muted-foreground">성공률</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      전 회차 성공적 완료
                    </p>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                        <Building className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">긴밀</div>
                        <div className="text-sm text-muted-foreground">협조</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      대학-교육청-학교 협력
                    </p>
                  </div>
                </div>
                <div className="space-y-3 leading-relaxed text-base md:text-lg">
                  <p>
                    중부대학교의 적극적인 참여와 관리로 프로그램은 계획 단계부터 실행까지 안정적으로 운영되었다.
                    대학 측에서는 스마트팜 관련 전공 교수진 및 대학원생 등을 전문 강사진으로 투입하여 교육의 질을 담보하였고,
                    교육청 및 학교와의 긴밀한 조율을 통해 일정 관리와 현장 진행이 원활하게 이루어졌다.
                  </p>
                  <p>
                    그 결과 큰 사고 없이 전 회차를 성공적으로 마칠 수 있었으며, 대학-지역 연계 교육 프로그램으로서 모범적인 운영 사례를 구축하였다.
                    중부대학교가 지역 중·고교를 대상으로 맞춤형 진로체험과 스마트팜 교육을 제공하는 시스템을 운영하고 있다는 점은 이미 특구 사업의
                    주요 기반으로서 본 프로그램의 추진력을 높여주었다.
                  </p>
                  <p>
                    실제로 첫 시범 수업이었던 <span className="font-semibold text-primary">복수초등학교 전교생 대상</span> 스마트팜 체험수업도 대학의 체계적인 준비와 지원으로 성공적으로 이루어졌으며,
                    이를 시작으로 이후 예정된 학교들에서도 차질 없이 프로그램이 확대되었다.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 프로그램 적합성 카드 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  프로그램 적합성
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    3단계 맞춤형 커리큘럼
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg">
                          <GraduationCap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">초등</div>
                          <div className="text-sm text-muted-foreground">기초 과정</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                          <span>스마트팜 기초 이론</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                          <span>재미있는 영어 활동</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                          <span>반려식물 만들기 체험</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                          <Lightbulb className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">중등</div>
                          <div className="text-sm text-muted-foreground">심화 체험</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 dark:text-orange-400 mt-1">•</span>
                          <span>디자인 씽킹 프로젝트</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 dark:text-orange-400 mt-1">•</span>
                          <span>스마트팜 모형 제작</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 dark:text-orange-400 mt-1">•</span>
                          <span>창의적 문제해결</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-red-600 dark:text-red-400">고등</div>
                          <div className="text-sm text-muted-foreground">전문 실습</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                          <span>AI 자동화 시스템 구축</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                          <span>환경데이터 분석</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                          <span>스마트팜 현장 견학</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 leading-relaxed text-base md:text-lg">
                  <p>
                    본 프로그램은 학년별 눈높이에 맞춘 교육내용으로 높은 호응을 얻었다. 교육 기획 단계에서 초·중·고 교과 수준과
                    발달 단계를 고려하여, 초등용 기초 과정, 중등용 심화 체험, 고등용 전문 실습의 3단계 커리큘럼을 마련하였다.
                  </p>
                  <p>
                    실제 수업에서는 초등학생들에게 스마트팜 기초 이론과 재미있는 영어 활동, 반려식물 만들기 체험 등을 제공하여 흥미를 유발하였고,
                    중학생들에게는 디자인 씽킹을 접목한 프로젝트 학습과 스마트팜 모형 제작 등을 통해 창의적 문제해결 경험을 주었다.
                  </p>
                  <p>
                    고등학생들의 경우 인공지능(AI) 기술을 활용한 스마트팜 자동화 시스템 구축, 환경데이터 분석, 지역 스마트팜 현장 견학 등
                    전문성 높은 진로 체험 기회를 제공하여 해당 분야에 대한 깊이 있는 이해와 동기를 부여하였다.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 다학년 운영 능력 카드 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  다학년 운영 능력
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 mb-6">
                  <div className="flex items-center justify-center gap-8 mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">1학년</div>
                      <div className="text-sm text-muted-foreground">초등</div>
                    </div>
                    <div className="text-primary text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">3학년</div>
                      <div className="text-sm text-muted-foreground">고등</div>
                    </div>
                  </div>
                  <p className="text-center text-lg font-semibold text-primary">
                    전 학년 대상 성공적 운영
                  </p>
                </div>
                <p className="leading-relaxed text-base md:text-lg">
                  초등학교 1학년부터 고등학교 3학년에 이르기까지 전 학년을 아우르는 프로그램 운영 자체가 큰 도전이었으나,
                  이를 성공적으로 수행함으로써 중부대학교의 다학년 교육 운영 역량이 입증되었다.
                </p>
              </CardContent>
            </Card>

            {/* 진로연계성 카드 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  진로연계성
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                        <Building className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">지역산업 연계</div>
                        <div className="text-sm text-muted-foreground">실제 직무 경험</div>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span>센서 장비 설치</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span>온실 환경제어</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span>데이터 분석 및 AI 활용</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-teal-100 dark:bg-teal-900/40 rounded-lg">
                        <Award className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-teal-600 dark:text-teal-400">산학협력</div>
                        <div className="text-sm text-muted-foreground">선순환 구조</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      중부대학교와 금산지역 특성화고가 스마트팜 인재 양성을 위한 산학협력을 체결하여
                      교육이 지역 산업으로 이어지는 선순환 구조를 구축하기 시작하였다.
                    </p>
                  </div>
                </div>
                <div className="space-y-3 leading-relaxed text-base md:text-lg">
                  <p>
                    스마트팜 교육 프로그램의 가장 큰 의의 중 하나는 지역산업과 연계된 진로교육을 실현했다는 점이다.
                    학생들은 단순한 이론 학습을 넘어, 스마트팜 센서 장비 설치, 온실 환경제어, 데이터 분석 및 AI 활용 등의 실제 직무에 가까운
                    활동을 경험하였다.
                  </p>
                  <p>
                    실제로 중부대학교와 금산지역 특성화고는 본 사업을 계기로 스마트팜 인재 양성을 위한 산학협력을 체결하는 등,
                    교육이 지역 산업으로 이어지는 선순환 구조를 구축하기 시작하였다.
                  </p>
                </div>
              </CardContent>
            </Card>
            <a
              href="#top"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              상단으로
            </a>
          </section>

          <section id="conclusion" className="scroll-mt-20 mb-16">
            <div className="flex items-center gap-4 mb-8 mt-8">
              <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                결론 및 제언
              </h2>
            </div>

            {/* 성과 요약 - 피날래 카드 */}
            <Card className="mb-8 border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-6 shadow-lg">
                    <Award className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    놀라운 성과를 달성했습니다
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          <CountUp end={52} />
                        </div>
                        <div className="text-sm text-muted-foreground">학급 참여</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          <CountUp end={777} />
                        </div>
                        <div className="text-sm text-muted-foreground">학생 참여</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 leading-relaxed text-base md:text-lg text-center">
                  <p className="text-lg md:text-xl font-semibold">
                    금산교육발전특구 스마트팜 교육 프로그램은{' '}
                    <span className="text-primary text-3xl font-bold">52</span>개 학급,{' '}
                    <span className="text-primary text-3xl font-bold">777</span>명 참여라는 양적 성과와 높은 참여율, 학년별 맞춤 효과,
                    긍정적인 만족도 등의 질적 성과를 동시에 거둔 것으로 분석됩니다.
                  </p>
                  <p>
                    중부대학교의 전문성 있는 운영과 특구사업의 지원을 바탕으로, 짧은 기간 내에 지역 학생들에게 새로운 진로 분야를 체험시킴으로써
                    교육특구 지정 목적 달성에 기여하였습니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 제언 섹션 */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                향후 발전 방향
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* 제언 1 */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-background to-primary/5">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                        <Rocket className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">지속적 사업 추진 및 확대</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      이번 성과를 바탕으로 스마트팜 교육 프로그램을 향후 연도에도 지속 추진하고,
                      참여 학교를 금산군 전역으로 확대하여 더 많은 학생들에게 혜택이 돌아가도록 합니다.
                    </p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      <span>더 알아보기</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>

                {/* 제언 2 */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-background to-primary/5">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                        <BarChart3 className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">피드백 체계 강화</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      학생들과 교사를 대상으로 한 만족도 설문조사나 피드백 수렴 절차를 도입하여
                      프로그램의 효과를 정량적으로 측정하고 개선점을 도출합니다.
                    </p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      <span>더 알아보기</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>

                {/* 제언 3 */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-background to-primary/5">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                        <Building className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">지역 연계 및 지원 강화</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      금산군청, 교육지원청, 지역 농업기술센터, 관련 기업 등 유관 기관과의 협력을 더욱 공고히 하여
                      프로그램의 지속 가능성을 높입니다.
                    </p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      <span>더 알아보기</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 마무리 메시지 */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold">미래를 향한 여정</h3>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  금산교육발전특구 스마트팜 교육 프로그램은 단순한 교육 프로그램을 넘어,
                  지역의 미래를 만들어가는 중요한 발걸음이었습니다. 앞으로도 지속적인 발전과 확대를 통해
                  더 많은 학생들이 미래 농업의 주역으로 성장할 수 있도록 지원하겠습니다.
                </p>
              </CardContent>
            </Card>
            <a
              href="#top"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              상단으로
            </a>
          </section>

          <section id="gallery" className="scroll-mt-20 mb-16">
            <div className="flex items-center gap-4 mb-8 mt-8">
              <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                현장 교육 갤러리
              </h2>
            </div>

            {/* YouTube 스타일 동영상 섹션 */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
                <Video className="w-6 h-6 text-primary" />
                교육 하이라이트 영상
              </h3>
              <div className="bg-card rounded-xl overflow-hidden shadow-2xl border border-border">
                {/* YouTube 스타일 비디오 플레이어 */}
                <div className="relative aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/3NjKj5c2x1Q?rel=0"
                    title="스마트팜 교육 프로그램 하이라이트"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {/* YouTube 스타일 정보 영역 */}
                <div className="p-4 md:p-6 bg-card border-t border-border">
                  <h4 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                    금산교육발전특구 스마트팜 교육 프로그램 하이라이트
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      조회수 1,234회
                    </span>
                    <span>•</span>
                    <span>2025년</span>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    금산교육발전특구 스마트팜 교육 프로그램의 현장 모습과 학생들의 열정적인 참여를 담은 하이라이트 영상입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Instagram 스타일 사진 갤러리 - Masonry 레이아웃 */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-primary" />
                현장 교육 사진
              </h3>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3">
                {[
                  // 스마트팜, 교육, 식물, 농업 관련 무료 이미지들
                  { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=800&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1200&fit=crop', size: 'wide' }, // 2번 수정
                  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop', size: 'square' },
                  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', size: 'wide' },
                  { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=1000&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop', size: 'square' },
                  { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=900&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1200&fit=crop', size: 'tall' }, // 8번 수정
                  { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop', size: 'square' },
                  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1100&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=700&fit=crop', size: 'wide' },
                  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=950&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop', size: 'square' },
                  { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=850&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=1200&fit=crop', size: 'tall' }, // 15번 수정
                  { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop', size: 'square' },
                  { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=1050&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=750&fit=crop', size: 'wide' },
                  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=900&fit=crop', size: 'tall' },
                  { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop', size: 'square' },
                ].map((item, index) => {
                  const sizeClasses = {
                    square: 'aspect-square',
                    tall: 'aspect-[3/4] md:aspect-[2/3]',
                    wide: 'aspect-[4/3] md:aspect-[3/2]',
                  };
                  
                  return (
                    <div
                      key={index}
                      className={`group relative ${sizeClasses[item.size as keyof typeof sizeClasses]} overflow-hidden rounded-lg bg-muted cursor-pointer mb-2 md:mb-3 break-inside-avoid`}
                    >
                      {/* Instagram 스타일 이미지 */}
                      <img
                        src={item.url}
                        alt={`스마트팜 교육 현장 ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          // 이미지 로드 실패 시 대체 이미지
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=800&fit=crop&sig=${index}`;
                        }}
                      />
                      {/* Instagram 스타일 오버레이 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white">
                          <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 fill-white" />
                            <span className="text-sm font-medium">1.2K</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">보기</span>
                          </div>
                        </div>
                      </div>
                      {/* Instagram 스타일 그라데이션 오버레이 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 갤러리 설명 */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-6 text-center">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  금산교육발전특구 스마트팜 교육 프로그램의 현장 모습을 담은 사진과 영상입니다.
                  학생들의 열정과 배움의 순간들을 함께 나눕니다.
                </p>
              </CardContent>
            </Card>
            <a
              href="#top"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              상단으로
            </a>
          </section>
        </div>

        {/* 푸터 */}
        <footer className="border-t border-border bg-muted/30 py-6">
          <div className="container mx-auto max-w-[980px] px-4">
            <p className="text-muted-foreground text-xs md:text-sm text-center">
              © 금산교육발전특구 스마트팜 교육 프로그램 운영 결과 보고
            </p>
          </div>
        </footer>
      </main>
      <Footer />
    </>
  );
}
