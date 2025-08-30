// src/components/ProjectsSection.tsx

'use client'; // <-- الخطوة 1: إضافة توجيه العميل

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap'; // <-- الخطوة 2: استيراد GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger); // تسجيل الإضافة

// --- مكون العنوان (تم حل مشكلة Hydration Mismatch) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted]);

  // استخدام CSS classes ثابتة لتجنب Hydration Mismatch
  const containerClasses = "flex items-center justify-center w-full max-w-xl mx-auto";
  const gapClasses = isMounted ? "gap-4 md:gap-6" : "gap-6";
  const lineClasses = isMounted ? "h-1.5 md:h-2 w-full bg-black" : "h-2 w-full bg-black";
  const textClasses = isMounted ? "font-custom-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-wider shrink-0 text-black" : "font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-black";

  return (
    <div ref={titleRef} className={`${containerClasses} ${gapClasses}`}>
      <div className="flex-grow overflow-hidden">
        <div ref={leftLineRef} className={lineClasses}></div>
      </div>
      <h2 ref={textRef} className={textClasses}>
        &#123;{title}&#125;
      </h2>
      <div className="flex-grow overflow-hidden">
        <div ref={rightLineRef} className={lineClasses}></div>
      </div>
    </div>
  );
};

// --- أيقونة النجمة المرقمة (تم حل مشكلة Hydration Mismatch) ---
const NumberedStar = ({ number }: { number: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerClasses = isMounted ? "relative w-20 md:w-28 h-20 md:h-28 flex items-center justify-center" : "relative w-28 h-28 flex items-center justify-center";
  const textClasses = isMounted ? "text-2xl md:text-4xl font-bold text-black z-10" : "text-4xl font-bold text-black z-10";

  return (
    <div className={containerClasses}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" fill="none" stroke="black" strokeWidth="2">
        <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
      </svg>
      <span className={textClasses}>{number}</span>
    </div>
  );
};

// --- بطاقة المشروع (تم حل مشكلة Hydration Mismatch) ---
const ProjectCard = ({ number, direction = 'left', imageUrl }: { number: number; direction: 'left' | 'right'; imageUrl: string }) => {
  const isRight = direction === 'right';
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const ImageDisplay = () => {
    const imageClasses = isMounted ? "w-72 md:w-[450px] h-48 md:h-64 rounded-2xl shadow-lg overflow-hidden group" : "w-[450px] h-64 rounded-2xl shadow-lg overflow-hidden group";
    
    return (
      <div className={imageClasses}>
        <img 
          src={imageUrl} 
          alt={`Project ${number}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    );
  };

  const ConnectorLine = () => {
    const lineClasses = isMounted ? "w-16 md:w-32 h-1 md:h-1.5 bg-black" : "w-32 h-1.5 bg-black hidden md:block";
    
    return <div className={lineClasses}></div>;
  };

  const containerClasses = isMounted ? "flex flex-row items-center gap-4 md:gap-8" : "flex flex-col md:flex-row items-center gap-8";
  const contentClasses = isMounted ? "flex flex-col items-center gap-4 md:gap-6" : "flex flex-col items-center gap-6";
  const buttonClasses = isMounted ? "px-6 py-2 md:px-8 md:py-3 bg-white rounded-lg shadow-md text-black font-bold text-lg md:text-xl transition-transform hover:scale-105" : "px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105";

  return (
    <div className={containerClasses}>
      {isRight ? (
        <>
          <NumberedStar number={number} />
          <ConnectorLine />
          <div className={contentClasses}>
            <ImageDisplay />
            <a href="#" className={buttonClasses}>
              View project
            </a>
          </div>
        </>
      ) : (
        <>
          <div className={contentClasses}>
            <ImageDisplay />
            <a href="#" className={buttonClasses}>
              View project
            </a>
          </div>
          <ConnectorLine />
          <NumberedStar number={number} />
        </>
      )}
    </div>
  );
};

// --- المكون الرئيسي للقسم (تم حل مشكلة Hydration Mismatch) ---
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted]);

  const sectionClasses = isMounted ? "w-full py-16 md:py-28 px-4 md:px-6 lg:px-12 xl:px-24 bg-white overflow-hidden" : "w-full py-28 px-6 md:px-12 lg:px-24 bg-white overflow-hidden";
  const containerClasses = isMounted ? "max-w-7xl mx-auto flex flex-col items-center gap-16 md:gap-24" : "max-w-7xl mx-auto flex flex-col items-center gap-24";
  const spacingClasses = isMounted ? "w-full space-y-16 md:space-y-28" : "w-full space-y-28";
  const viewMoreContainerClasses = isMounted ? "w-full flex justify-center relative -mt-12 md:-mt-20" : "w-full flex justify-center relative -mt-20";
  const viewMoreWrapperClasses = isMounted ? "flex justify-center" : "absolute ml-100";
  const viewMoreButtonClasses = isMounted ? "px-6 py-2 md:px-8 md:py-3 bg-white rounded-lg shadow-md text-black font-bold text-lg md:text-xl transition-transform hover:scale-105" : "px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105";

  return (
    <section ref={sectionRef} id='projects' className={sectionClasses}>
      <div className={containerClasses}>
        
        <SectionTitle title="Projects" />

        <div className={spacingClasses}>
          <div className="project-card-container flex justify-end">
            <ProjectCard number={1} direction="right" imageUrl="/project1.jpg" />
          </div>
          <div className="project-card-container flex justify-start">
            <ProjectCard number={2} direction="left" imageUrl="/project2.png" />
          </div>
        </div>

        <div className={viewMoreContainerClasses}>
          <div className={viewMoreWrapperClasses}> 
            <a href="#" className={viewMoreButtonClasses}>
              View more
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}

