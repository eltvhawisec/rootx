// app/projects/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Llenis from '@/components/Llenis';
import { gsap } from 'gsap';

// --- المكون الرئيسي للصفحة ---
export default function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // تأثيرات الحركة
  useEffect(() => {
    const page = pageRef.current;
    const headerContent = headerContentRef.current?.children;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    if (!page || !headerContent || !leftPanel || !rightPanel) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl
      .to(leftPanel, { xPercent: -100, duration: 1.2, ease: 'power4.inOut' })
      .to(rightPanel, { xPercent: 100, duration: 1.2, ease: 'power4.inOut' }, "<")
      .fromTo(page, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.8")
      .fromTo(headerContent, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, 
        "-=0.5"
      );

  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Llenis />
      
      <main ref={pageRef} className="opacity-0">
        {/* --- التعديل هنا: تمت إضافة bg-black --- */}
        <div className="relative pt-28 pb-24 text-center overflow-hidden bg-black">
          
          {/* الطبقة اليسرى */}
          <div 
            ref={leftPanelRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-gray-800 z-20"
          ></div>
          {/* الطبقة اليمنى */}
          <div 
            ref={rightPanelRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 z-20"
          ></div>

          {/* المحتوى */}
          <div ref={headerContentRef} className="relative container mx-auto px-6 z-10">
            <p className="text-lg font-semibold text-gray-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Projects</span>
            </p>
            
            <h1 className="font-custom-pencerio text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">
              Our Projects
            </h1>
            
            <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-300/90 leading-relaxed">
              A curated selection of our projects, showcasing expertise in creating secure, high-performance, and visually stunning web applications.
            </p>
          </div>
        </div>

        <ProjectsSection showAll={true} />
      </main>
      
      <Footer />
    </div>
  );
}
