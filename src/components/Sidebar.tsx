// src/components/Sidebar.tsx

'use client';

import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- تم عكس ألوان هذا المكون ---
const NavItem = ({ label }: { label: string }) => (
  <div className="nav-item flex items-center gap-4 group cursor-pointer">
    <div className="w-8 h-0.5 bg-white transition-all duration-300 group-hover:w-12"></div>
    <span className="text-xl font-semibold tracking-wider text-white group-hover:text-gray-400">{label}</span>
  </div>
);

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // --- تم عكس لون SVG هنا ---
  const maskSvg = `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L0 32 L32 64 Z' fill='white'/%3E%3C/svg%3E"   )`;

  useEffect(() => {
    // --- إعداد الجدول الزمني للتحريك ---
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      // تعريف التحريك
      tl.current
        .fromTo(sidebarRef.current, 
          { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
          { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', duration: 0.6, ease: 'power3.inOut' }
        )
        .fromTo('.sidebar-content > *', {
          opacity: 0,
          y: 20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1, // <-- تتابع ظهور العناصر
          ease: 'power2.out'
        }, "-=0.3"); // يبدأ هذا التحريك أثناء كشف الخلفية
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // --- تشغيل التحريك بناءً على حالة isOpen ---
    if (isOpen) {
      sidebarRef.current?.classList.remove('hidden');
      tl.current?.play();
    } else {
      // عند الإغلاق، نعيد التحريك للبداية ونخفي العنصر بعد انتهاء الانتقال
      tl.current?.reverse().then(() => {
        sidebarRef.current?.classList.add('hidden');
      });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" // إضافة تعتيم للخلفية
          onClick={onClose}
        />
      )}
      
      <div
        ref={sidebarRef}
        // تم تغيير طريقة الإخفاء لتعتمد على GSAP و CSS
        className="hidden fixed top-0 right-0 h-full z-50"
      >
        {/* --- تم عكس الألوان هنا --- */}
        <div className="flex bg-black text-white">
          <div
            className="h-full w-8 bg-black"
            style={{
              maskImage: maskSvg,
              maskRepeat: 'repeat-y',
              maskSize: '32px 64px',
              WebkitMaskImage: maskSvg,
              WebkitMaskRepeat: 'repeat-y',
              WebkitMaskSize: '32px 64px',
            }}
          ></div>
          
          {/* تمت إضافة فئة هنا لتسهيل استهداف العناصر الداخلية */}
          <div className="sidebar-content w-80 p-10 flex flex-col">
            <div className="flex items-center justify-center gap-4 mb-16">
              <Sparkles className="w-8 h-8 text-white" />
              <h2 className="font-custom-heading text-3xl font-bold">eltuhami</h2>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <nav className="flex-1 flex flex-col justify-center">
              <div className="relative flex flex-col items-start gap-12">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white"></div>
                <NavItem label="About" />
                <NavItem label="Projects" />
                <NavItem label="Skills" />
                <NavItem label="Contact" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
