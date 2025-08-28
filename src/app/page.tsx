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

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* ================================================================== */}
      {/* HERO SECTION (FIRST SECTION) - Video moved up even more            */}
      {/* ================================================================== */}
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-start p-6 relative z-10">
          <div className="text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-wide font-oswald text-left">
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

        {/* Sidebar Component */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content area for the Hero Section */}
        <main className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl w-full">
            {/* Centered Video - MOVED UP MORE using transform */}
            <div className="w-full max-w-xs mx-auto transform -translate-y-16">
              <VideoPlayer 
                className="w-full h-48 sm:h-56 md:h-64"
                src="/eltuhami.MP4"
                poster="/video-poster.jpg"
              />
            </div>
          </div>
        </main>

        {/* FT. AbabilSec text */}
        <div className="absolute bottom-40 right-6 text-white font-bold text-4xl md:text-5xl lg:text-6xl z-10">
          FT. AbabilSec
        </div>

        {/* Curved bottom section */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-white rounded-t-[50%]"></div>
      </div>

      {/* ================================================================== */}
      {/* ABOUT SECTION (SECOND SECTION)                                     */}
      {/* ================================================================== */}
      <AboutSection />
      {/* ================================================================== */}
      {/* PROJECTS SECTION (THIRD SECTION)                                   */}
      {/* ================================================================== */}
      <ProjectsSection />
      {/* ================================================================== */}
      {/* TEAM SECTION (FOURTH SECTION)                                     */}
      {/* ================================================================== */}
      <TeamSection />
      {/* ================================================================== */}
      {/* SKILLS SECTION (FIFTH SECTION)                                    */}
      {/* ================================================================== */}
      <SkillsSection />
      {/* ================================================================== */}
      {/* CONTACT SECTION (SIXTH SECTION)                                   */}
      {/* ================================================================== */}
      <ContactSection />
    </div>
  );
}
