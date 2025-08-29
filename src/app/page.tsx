// src/app/page.tsx

'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Sidebar from '@/components/Sidebar';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';

// لا حاجة لاستيراد الخطوط أو استخدام كائنات style

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    // body لديه بالفعل خط النصوص الافتراضي من globals.css
    <div className="bg-white">

      {/* ================================================================== */}
      {/* HERO SECTION (FIRST SECTION)                                       */}
      {/* ================================================================== */}
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-start p-6 relative z-10">
          {/* 
            استخدام فئات Tailwind للتنسيق + فئتنا المخصصة للخط 
          */}
          <div className="font-custom-heading text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-wide text-left">
            eltuhami
          </div>
          
          <div className="flex items-center gap-6">
            <div 
              className="flex flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity z-20"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </div>
        </header>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl w-full">
            <div className="w-full max-w-xs mx-auto transform -translate-y-16">
              <VideoPlayer 
                className="w-full h-48 sm:h-56 md:h-64"
                src="/eltuhami.MP4"
                poster="/video-poster.jpg"
              />
            </div>
          </div>
        </main>

        {/* 
          هذا النص سيستخدم خط النصوص الافتراضي (.font-custom-body) المطبق على <body>
        */}
        <div className="absolute bottom-40 right-6 text-white font-bold text-4xl md:text-5xl lg:text-6xl z-10">
          FT. AbabilSec
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-26 bg-white rounded-t-[50%]"></div>
      </div>

      {/* ================================================================== */}
      {/* باقي الأقسام سترث خط النصوص الافتراضي تلقائياً                 */}
      {/* ================================================================== */}
      <AboutSection />
      <ProjectsSection />
      <TeamSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
