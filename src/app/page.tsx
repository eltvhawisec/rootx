// src/app/page.tsx

'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Sidebar from '@/components/Sidebar';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // --- Refs للعناصر ---
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- إعداد الحالة الأولية للعناصر ---
      gsap.set([textContainerRef.current, menuIconRef.current], { opacity: 0 });
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(curveRef.current, { yPercent: 100 });

      // --- الجدول الزمني للتحميل الأولي ---
      const tl = gsap.timeline({
        delay: 0.5,
        defaults: { ease: 'power3.out' }
      });

      // 1. ظهور النصوص والأيقونة
      tl.to([textContainerRef.current, menuIconRef.current], {
        opacity: 1,
        duration: 2,
      })
      // 2. ظهور الصورة
      .to(imageContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
      }, "-=1.5")
      // 3. ارتفاع المنحنى
      .to(curveRef.current, {
        yPercent: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      }, "<");

      // --- تحريك الطفو اللانهائي للصورة ---
      gsap.to(imageContainerRef.current, {
        y: "-=20",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: tl.duration(),
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black">
      <div ref={heroRef} className="min-h-screen bg-white text-black relative overflow-hidden">
        
        {/* --- حاوية النصوص (تم تكبيرها وتحريكها للأسفل) --- */}
        <div 
          ref={textContainerRef} 
          // --- تم تعديل الموضع هنا ---
          className="absolute top-12 left-0 p-6 md:p-8 z-10"
        >
          {/* --- تم تكبير حجم الخط هنا --- */}
          <h1 className="font-custom-heading text-black font-bold text-7xl md:text-9xl tracking-wide leading-none">
            eltuhami
          </h1>
          {/* --- تم تكبير حجم الخط هنا --- */}
          <p className="font-custom-body text-black/70 text-lg md:text-2xl tracking-widest mt-3">
            FT. AbabilSec
          </p>
        </div>

        {/* --- أيقونة القائمة باللون الأسود --- */}
        <div ref={menuIconRef} className="absolute top-0 right-0 p-6 md:p-8 z-20">
          <div className="flex items-center gap-6">
            <div 
              className="flex flex-col gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="w-8 h-1 bg-black"></div>
              <div className="w-8 h-1 bg-black"></div>
              <div className="w-8 h-1 bg-black"></div>
            </div>
          </div>
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* --- حاوية الصورة الطافية في الموضع المحدد (X) --- */}
        <div 
          ref={imageContainerRef} 
          className="absolute top-1/4 -translate-y-1/2 right-[20%] w-full max-w-[200px] md:max-w-[240px] z-0 opacity-90"
        >
          <img
            src="./favicon.ico"
            alt="eltuhami logo"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        {/* --- المنحنى الأسود المصغر --- */}
        <div ref={curveRef} className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-black rounded-t-[50%] z-20"></div>
      </div>

      <AboutSection />
      <ProjectsSection />
      <TeamSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
