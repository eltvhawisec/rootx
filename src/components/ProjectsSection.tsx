// src/components/ProjectsSection.tsx

'use client'; // <-- الخطوة 1: إضافة توجيه العميل

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap'; // <-- الخطوة 2: استيراد GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); // تسجيل الإضافة

// --- مكون العنوان (تم تحديثه بالإصدار الذي يحتوي على تحريك) ---
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
    // تم تعديل HTML هنا ليتوافق مع منطق التحريك
    <div ref={titleRef} className="flex items-center justify-center gap-6 w-full max-w-xl mx-auto">
      <div className="flex-grow overflow-hidden">
        <div ref={leftLineRef} className="h-2 w-full bg-black"></div>
      </div>
      <h2 ref={textRef} className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-black">
        &#123;{title}&#125;
      </h2>
      <div className="flex-grow overflow-hidden">
        <div ref={rightLineRef} className="h-2 w-full bg-black"></div>
      </div>
    </div>
  );
};


// --- أيقونة النجمة المرقمة (تبقى كما هي) ---
const NumberedStar = ({ number }: { number: number }) => (
  <div className="relative w-28 h-28 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" fill="none" stroke="black" strokeWidth="2">
      <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
    </svg>
    <span className="text-4xl font-bold text-black z-10">{number}</span>
  </div>
);

// --- بطاقة المشروع (تبقى كما هي) ---
const ProjectCard = ({ number, direction = 'left', imageUrl }: { number: number; direction: 'left' | 'right'; imageUrl: string }) => {
  const isRight = direction === 'right';
  const ImageDisplay = () => (
    <div className="w-[450px] h-64 rounded-2xl shadow-lg overflow-hidden group">
      <img 
        src={imageUrl} 
        alt={`Project ${number}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  );

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8`}>
      {isRight ? (
        <>
          <NumberedStar number={number} />
          <div className="w-32 h-1.5 bg-black hidden md:block"></div>
          <div className="flex flex-col items-center gap-6">
            <ImageDisplay />
            <a href="#" className="px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105">
              View project
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-6">
            <ImageDisplay />
            <a href="#" className="px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105">
              View project
            </a>
          </div>
          <div className="w-32 h-1.5 bg-black hidden md:block"></div>
          <NumberedStar number={number} />
        </>
      )}
    </div>
  );
};

// --- المكون الرئيسي للقسم (تم إضافة تحريك للبطاقات) ---
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const projectCards = gsap.utils.toArray('.project-card-container');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      projectCards.forEach((card: any) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id='projects' className="w-full py-28 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-24">
        
        <SectionTitle title="Projects" />

        <div className="w-full space-y-28">
          {/* تمت إضافة فئة وحاوية هنا لتسهيل التحريك */}
          <div className="project-card-container flex justify-end">
            <ProjectCard number={1} direction="right" imageUrl="/project1.jpg" />
          </div>
          <div className="project-card-container flex justify-start">
            <ProjectCard number={2} direction="left" imageUrl="/project2.png" />
          </div>
        </div>

        <div className="w-full flex justify-center relative -mt-20">
          <div className="absolute ml-100"> 
            <a href="#" className="px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105">
              View more
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
