'use client';

import { Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-300 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
          {/* 충청국제캠퍼스 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-zinc-700 pb-2">
              충청국제캠퍼스
            </h3>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>32713 충청남도 금산군 추부면 대학로 201</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:041-750-6500"
                  className="hover:text-primary transition-colors"
                >
                  TEL. 041-750-6500
                </a>
              </div>
            </div>
          </div>

          {/* 고양창의캠퍼스 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-zinc-700 pb-2">
              고양창의캠퍼스
            </h3>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>10279 경기도 고양시 덕양구 동헌로 305</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:031-8075-1000"
                  className="hover:text-primary transition-colors"
                >
                  TEL. 031-8075-1000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-700 pt-8">
          <p className="text-center text-sm text-zinc-500">
            COPYRIGHT© 2019 JOONGBU UNIVERSITY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

