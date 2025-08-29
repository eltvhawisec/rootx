// src/components/SmoothScroll.tsx (النسخة المحسّنة)
'use client';

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // ربط Lenis مع ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // دالة التنظيف
    return () => {
      lenis.destroy();
      // يمكنك أيضًا إزالة المستمعين إذا لزم الأمر
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
