'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

// --- مكون عنصر القائمة (بتصميم وتفاعل مطور) ---
const NavItem = ({ label, sectionId, onNavigate, index }: { label: string; sectionId: string; onNavigate: (id: string) => void; index: number }) => (
  <button
    onClick={() => onNavigate(sectionId)}
    className="nav-item group relative w-full py-2 text-left"
  >
    {/* 1. إضافة رقم تسلسلي كعنصر تصميمي */}
    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-700 transition-colors duration-300 group-hover:text-purple-400">
      0{index + 1}
    </span>
    <span className="ml-10 block text-3xl font-light tracking-wider text-gray-500 transition-colors duration-300 group-hover:text-white">
      {label}
    </span>
  </button>
);

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          gsap.set(sidebar, { display: 'none' });
        },
      });

      // --- 2. حركة دخول محسّنة (Clip-path) ---
      tl.current
        .set(sidebar, { display: 'block' })
        .fromTo(
          sidebar,
          { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }, // يبدأ من خط عمودي على اليمين
          { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', duration: 0.8, ease: 'expo.inOut' } // يمتد ليغطي المساحة
        )
        .fromTo(
          '.sidebar-content', // استهداف الحاويات الرئيسية
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.5'
        );
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div
        ref={sidebarRef}
        className="hidden fixed top-0 right-0 h-full w-full max-w-md z-50" // زيادة العرض قليلاً
      >
        <div className="flex h-full flex-col border-l border-gray-800 bg-black p-10 shadow-2xl shadow-purple-900/20">
          <div className="sidebar-content flex items-center justify-between pb-10">
            <h2 className="text-2xl font-bold text-white">
              rootx<span className="text-purple-500">.</span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 transition-all duration-300 hover:bg-gray-800 hover:text-white hover:rotate-90"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* --- 3. تحسين التخطيط والمسافات --- */}
          <nav className="sidebar-content flex-grow">
            <div className="flex h-full flex-col justify-center gap-6">
              <NavItem label="Mission" sectionId="mission" onNavigate={onNavigate} index={0} />
              <NavItem label="About" sectionId="about" onNavigate={onNavigate} index={1} />
              <NavItem label="Capabilities" sectionId="skills" onNavigate={onNavigate} index={2} />
              <NavItem label="Credentials" sectionId="certifications" onNavigate={onNavigate} index={3} />
              <NavItem label="Contact" sectionId="contact" onNavigate={onNavigate} index={4} />
            </div>
          </nav>

          <div className="sidebar-content pt-10 text-center">
            <p className="text-sm text-gray-600">
              Designed & Developed by eltvhawi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
