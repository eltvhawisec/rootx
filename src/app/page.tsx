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
  const finalInterfaceRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- إعداد الحالة الأولية ---
      gsap.set([textContainerRef.current, menuIconRef.current], { opacity: 0, y: -30 });
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(curveRef.current, { yPercent: 100 });
      
      gsap.set(leftPanelRef.current, { xPercent: 0 });
      gsap.set(rightPanelRef.current, { xPercent: 0 });

      // --- الجدول الزمني الرئيسي ---
      const tl = gsap.timeline({
        delay: 0.5,
      });

      // 1. تحريك الألواح للخارج
      tl.to(leftPanelRef.current, {
        xPercent: -100,
        duration: 1.5,
        ease: 'expo.inOut',
      })
      .to(rightPanelRef.current, {
        xPercent: 100,
        duration: 1.5,
        ease: 'expo.inOut',
      }, "<");

      // 2. إظهار عناصر الواجهة النهائية بتتابع متقن
      tl.to([textContainerRef.current, menuIconRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
      }, "-=1.2")
      // ==================================================================
      // --- التعديل الأول: ظهور الصورة مع النصوص ---
      // ==================================================================
      .to(imageContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }, "<") // <-- تم تغيير "<0.2" إلى "<" لتبدأ في نفس لحظة ظهور النصوص
      .to(curveRef.current, {
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.out',
      }, "<0.3");

      // ==================================================================
      // --- التعديل الثاني: تسريع حركة الطفو ---
      // ==================================================================
      // حركة المحور Y (أعلى وأسفل)
      gsap.to(imageContainerRef.current, {
        y: "+=20",
        duration: 3, // <-- تم تقليل المدة من 5 إلى 3 ثوانٍ
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: tl.duration() - 0.5,
      });
      // حركة المحور X (يمين ويسار)
      gsap.to(imageContainerRef.current, {
        x: "-=15",
        duration: 2.5, // <-- تم تقليل المدة من 4 إلى 2.5 ثانية
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: tl.duration() - 0.5,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black">
      <div ref={heroRef} className="min-h-screen bg-white text-black relative overflow-hidden">
        
        <div ref={finalInterfaceRef} className="w-full h-full absolute inset-0">
          <div ref={textContainerRef} className="absolute top-12 left-0 p-6 md:p-8 z-10">
            <h1 className="font-custom-heading text-black font-bold text-8xl md:text-[120px] lg:text-[140px] tracking-wide leading-none">
              eltuhami
              <sup className="text-3xl md:text-4xl text-gray-800 -top-8 md:-top-0 m1-1">
                sec
              </sup>
            </h1>
            <p className="font-custom-heading text-black text-3xl md:text-5xl tracking-widest mt-4">
              FT. AbabilSec
            </p>
          </div>

          <div ref={menuIconRef} className="absolute top-0 right-0 p-6 md:p-8 z-20">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSidebarOpen(true)}>
                <div className="w-8 h-1 bg-black"></div>
                <div className="w-8 h-1 bg-black"></div>
                <div className="w-8 h-1 bg-black"></div>
              </div>
            </div>
          </div>

          <div ref={imageContainerRef} className="absolute top-1/4 -translate-y-1/2 right-[20%] w-full max-w-[200px] md:max-w-[240px] z-0 opacity-90">
            <img src="./favicon.ico" alt="eltuhami logo" className="w-full h-auto rounded-2xl" />
          </div>

          <div ref={curveRef} className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-black rounded-t-[50%] z-20"></div>
        </div>

        <div className="absolute inset-0 flex z-30 pointer-events-none">
          <div ref={leftPanelRef} className="w-1/2 h-full bg-white flex items-center justify-center">
            <h2 className="font-custom-heading text-black text-6xl md:text-9xl font-extrabold">eltuhami</h2>
          </div>
          <div ref={rightPanelRef} className="w-1/2 h-full bg-white flex items-center justify-center">
            <h2 className="font-custom-heading text-black text-6xl md:text-9xl font-extrabold">AbabilSec</h2>
          </div>
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <AboutSection />
      <ProjectsSection />
      <TeamSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
