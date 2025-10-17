'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Sidebar from '@/components/Sidebar';

// --- 1. مكون أيقونة القائمة (بدون دائرة) ---
const MenuIcon = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalLine = iconRef.current?.querySelector('.line-horizontal');
      const verticalLine = iconRef.current?.querySelector('.line-vertical');

      tl.current = gsap.timeline({ paused: true, reversed: true });

      tl.current.to([horizontalLine, verticalLine], {
        rotation: '+=135',
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }, iconRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  return (
    // --- تم التعديل هنا: إزالة كلاسات الدائرة ---
    <div
      ref={iconRef}
      className="group cursor-pointer p-2" // أضفنا padding بسيط لتحسين مساحة النقر
      onClick={onClick}
    >
      <div className="relative w-8 h-8">
        {/* الخط الأفقي */}
        <div className="line-horizontal absolute top-1/2 left-0 w-full h-0.5 bg-black transition-opacity duration-300 group-hover:opacity-70 -translate-y-1/2"></div>
        {/* الخط العمودي */}
        <div className="line-vertical absolute top-1/2 left-0 w-full h-0.5 bg-black transition-opacity duration-300 group-hover:opacity-70 -translate-y-1/2 rotate-90"></div>
      </div>
    </div>
  );
};


// --- المكون الرئيسي Hero (لا تغيير هنا) ---
export default function Hero() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const menuIconContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setSidebarOpen(false);
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([textContainerRef.current, menuIconContainerRef.current], { opacity: 0, y: -30 });
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(curveRef.current, { yPercent: 100 });
      gsap.set(leftPanelRef.current, { xPercent: 0 });
      gsap.set(rightPanelRef.current, { xPercent: 0 });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(leftPanelRef.current, { xPercent: -100, duration: 1.5, ease: 'expo.inOut' })
        .to(rightPanelRef.current, { xPercent: 100, duration: 1.5, ease: 'expo.inOut' }, "<")
        .to([textContainerRef.current, menuIconContainerRef.current], { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, "-=1.2")
        .to(imageContainerRef.current, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, "<")
        .to(curveRef.current, { yPercent: 0, duration: 1.2, ease: 'expo.out' }, "<0.3");

      gsap.to(imageContainerRef.current, { y: "+=20", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: tl.duration() - 0.5 });
      gsap.to(imageContainerRef.current, { x: "-=15", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: tl.duration() - 0.5 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNavigate={scrollToSection} 
      />

      <div ref={heroRef} className="min-h-screen bg-white text-black relative overflow-hidden">
        <div className="w-full h-full absolute inset-0">
          <div ref={textContainerRef} className="absolute top-12 left-0 p-4 md:p-8 z-10">
            <h1 className="font-custom-pencerio text-black font-bold text-7xl md:text-8xl lg:text-[140px] tracking-wide leading-none">
              eltuhami
              <sup className="font-custom-heading text-3xl md:text-4xl text-gray-800 -top-6 md:-top-8 lg:-top-0 m1-1">
                sec
              </sup>
            </h1>
            <p className="font-custom-heading text-black text-3xl md:text-5xl tracking-widest mt-4">
              AbabilSec
            </p>
          </div>
          
          <div ref={menuIconContainerRef} className="absolute top-0 right-0 p-6 md:p-8 z-20">
            <MenuIcon isOpen={isSidebarOpen} onClick={() => setSidebarOpen(!isSidebarOpen)} />
          </div>

          <div ref={imageContainerRef} className="absolute top-1/3 -translate-y-1/2 right-1/2 translate-x-1/2 md:right-[20%] md:translate-x-0 md:top-1/4 w-full max-w-[180px] md:max-w-[240px] z-0 opacity-90">
            <img src="/eltuhami.jpg" alt="eltuhami logo" className="w-full h-auto rounded-2xl" />
          </div>
          <div ref={curveRef} className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-black rounded-t-[50%] z-20"></div>
        </div>
        <div className="absolute inset-0 flex z-30 pointer-events-none">
          <div ref={leftPanelRef} className="w-1/2 h-full bg-white flex items-center justify-center">
            <h2 className="font-custom-pencerio font-custom-heading text-black text-5xl md:text-9xl font-extrabold">eltuhami</h2>
          </div>
          <div ref={rightPanelRef} className="w-1/2 h-full bg-white flex items-center justify-center">
            <h2 className="font-custom-pencerio font-custom-heading text-black text-5xl md:text-9xl font-extrabold">AbabilSec</h2>
          </div>
        </div>
      </div>
    </>
  );
}
