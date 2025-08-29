// src/components/TeamSection.tsx

'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (يبقى كما هو) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftLineRef.current, { xPercent: -100 });
      gsap.set(rightLineRef.current, { xPercent: 100 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: 'power3.inOut', duration: 1.2 }
      });

      tl.to(leftLineRef.current, { xPercent: 0 })
        .to(rightLineRef.current, { xPercent: 0 }, "<")
        .to(textRef.current, { y: 0, opacity: 1, duration: 1 }, "-=0.8");

    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={titleRef} className="flex items-center gap-6 w-full">
      <div className="flex-grow overflow-hidden">
        <div ref={leftLineRef} className="h-2 w-full bg-white"></div>
      </div>
      <h2 ref={textRef} className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-white">
        &#123;{title}&#125;
      </h2>
      <div className="flex-grow overflow-hidden">
        <div ref={rightLineRef} className="h-2 w-full bg-white"></div>
      </div>
    </div>
  );
};

// --- المكون الرئيسي للقسم ---
export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const videoContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textContentRef.current, { opacity: 0, x: -50 });
      gsap.set(videoContentRef.current, { opacity: 0, x: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        defaults: { duration: 1.2, ease: 'power3.out' }
      });

      tl.to(textContentRef.current, {
        opacity: 1,
        x: 0,
      })
      .to(videoContentRef.current, {
        opacity: 1,
        x: 0,
      }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="w-full py-28 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 items-center">
        
        <div ref={textContentRef} className="flex flex-col gap-10">
          <SectionTitle title="Team" />
          {/* ================================================================== */}
          {/* --- تم تعديل النص هنا ليصبح أكثر فلسفة --- */}
          {/* ================================================================== */}
          <p className="text-3xl md:text-4xl font-black leading-normal">
            At the heart of AbabilSec lies a philosophy: development is an art, and security is its fortress. We don't just build web applications; we craft digital experiences, all while deconstructing vulnerabilities to forge a more resilient and trusted web.
          </p>
        </div>

        <div ref={videoContentRef} className="flex items-end justify-center h-full">
          {/* ================================================================== */}
          {/* --- تم تصغير الفيديو هنا --- */}
          {/* ================================================================== */}
          <video 
            src="/ababilsecV.MP4"
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full max-w-md rounded-2xl shadow-lg shadow-gray-500/20" // <-- تم التغيير إلى max-w-md
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
