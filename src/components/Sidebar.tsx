// src/components/Sidebar.tsx

'use client';

import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void; // دالة للتنقل
}

// مكون زر القائمة الذي يستدعي onNavigate عند النقر
const NavItem = ({ label, sectionId, onNavigate }: { label: string; sectionId: string; onNavigate: (id: string) => void; }) => (
  <div onClick={() => onNavigate(sectionId)} className="nav-item flex items-center gap-4 group cursor-pointer">
    <div className="w-8 h-0.5 bg-white transition-all duration-300 group-hover:w-12"></div>
    <span className="text-2xl md:text-xl font-semibold tracking-wider text-white transition-colors duration-300 group-hover:text-gray-400">{label}</span>
  </div>
);

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const maskSvg = `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L0 32 L32 64 Z' fill='white'/%3E%3C/svg%3E"    )`;

  // GSAP Animation Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ 
        paused: true,
        onReverseComplete: () => {
          gsap.set(sidebarRef.current, { display: 'none' });
        }
      });

      tl.current
        .set(sidebarRef.current, { display: 'block' })
        .fromTo(sidebarRef.current, 
          { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
          { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', duration: 0.6, ease: 'power3.inOut' }
        )
        .fromTo('.sidebar-content > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, "-=0.3");
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  // GSAP Animation Trigger
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
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* حاوية الشريط الجانبي */}
      <div ref={sidebarRef} className="hidden fixed top-0 right-0 h-full z-50">
        <div className="flex bg-black text-white h-full w-screen md:w-auto">
          <div className="h-full w-8 bg-black" style={{ maskImage: maskSvg, maskRepeat: 'repeat-y', maskSize: '32px 64px', WebkitMaskImage: maskSvg, WebkitMaskRepeat: 'repeat-y', WebkitMaskSize: '32px 64px' }}></div>
          
          <div className="sidebar-content flex-1 md:w-80 p-8 md:p-10 flex flex-col">
            <div className="flex items-center justify-center gap-4 mb-16">
              <Sparkles className="w-8 h-8 text-white" />
              <h2 className="font-custom-heading text-3xl font-bold">eltuhami</h2>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <nav className="flex-1 flex flex-col justify-center">
              <div className="relative flex flex-col items-center md:items-start gap-12">
                <div className="absolute left-1/2 md:left-4 -translate-x-1/2 md:translate-x-0 top-0 bottom-0 w-0.5 bg-white/50"></div>
                
                {/* تمرير sectionId و onNavigate لكل زر */}
                <NavItem label="About" sectionId="about" onNavigate={onNavigate} />
                <NavItem label="Projects" sectionId="projects" onNavigate={onNavigate} />
                <NavItem label="Team" sectionId="team" onNavigate={onNavigate} />
                <NavItem label="Skills" sectionId="skills" onNavigate={onNavigate} />
                <NavItem label="Contact" sectionId="contact" onNavigate={onNavigate} />
              </div>
            </nav>
            
            <div className="mt-16 text-center md:hidden">
                <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                    Close
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
