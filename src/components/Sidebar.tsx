'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react'; // استيراد أيقونة الإغلاق

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

// --- مكون عنصر القائمة (بتصميم جديد) ---
const NavItem = ({ label, sectionId, onNavigate }: { label: string; sectionId: string; onNavigate: (id: string) => void; }) => (
  <button
    onClick={() => onNavigate(sectionId)}
    className="nav-item group relative w-full text-left"
  >
    <span className="block text-2xl font-light tracking-wider text-gray-400 transition-colors duration-300 group-hover:text-white">
      {label}
    </span>
    {/* خط يظهر عند المرور */}
    <div className="absolute -bottom-1 left-0 h-px w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></div>
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
          gsap.set(sidebar, { display: 'none' }); // إخفاء العنصر بعد اكتمال حركة الخروج
        },
      });

      // حركة الدخول الجديدة
      tl.current
        .set(sidebar, { display: 'block' })
        .fromTo(
          sidebar,
          { x: '100%' }, // يبدأ من خارج الشاشة على اليمين
          { x: '0%', duration: 0.7, ease: 'expo.inOut' }
        )
        .fromTo(
          '.sidebar-content > *', // تحريك العناصر الداخلية
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out' },
          '-=0.4' // ابدأ هذه الحركة قبل انتهاء الحركة السابقة بقليل
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
      {/* طبقة الخلفية المعتمة */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* الشريط الجانبي نفسه */}
      <div
        ref={sidebarRef}
        className="hidden fixed top-0 right-0 h-full w-full max-w-sm z-50"
      >
        <div className="flex h-full flex-col border-l border-gray-800 bg-black p-8 shadow-2xl shadow-purple-900/20">
          {/* ----- الجزء العلوي: الشعار وزر الإغلاق ----- */}
          <div className="sidebar-content flex items-center justify-between pb-8">
            <h2 className="text-2xl font-bold text-white">
              rootx<span className="text-purple-500">.</span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 transition-colors duration-300 hover:bg-gray-800 hover:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* ----- الجزء الأوسط: روابط التنقل ----- */}
          <nav className="sidebar-content flex-grow">
            <div className="flex h-full flex-col justify-center gap-8">
              <NavItem label="Mission" sectionId="mission" onNavigate={onNavigate} />
              <NavItem label="About" sectionId="about" onNavigate={onNavigate} />
              <NavItem label="Capabilities" sectionId="skills" onNavigate={onNavigate} />
              <NavItem label="Contact" sectionId="contact" onNavigate={onNavigate} />
            </div>
          </nav>

          {/* ----- الجزء السفلي: رسالة قصيرة ----- */}
          <div className="sidebar-content pt-8 text-center">
            <p className="text-sm text-gray-600">
              Navigating Digital Frontiers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
