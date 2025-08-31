'use client';

import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

// --- تم تعديل حجم النص هنا ---
const NavItem = ({ label, sectionId, onNavigate }: { label: string; sectionId: string; onNavigate: (id: string) => void; }) => (
  <div onClick={() => onNavigate(sectionId)} className="nav-item flex items-center gap-3 group cursor-pointer">
    <div className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-10"></div>
    {/* تصغير حجم النص من text-2xl/xl إلى text-lg */}
    <span className="text-lg font-medium tracking-wider text-white transition-colors duration-300 group-hover:text-gray-400">{label}</span>
  </div>
);

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const maskSvg = `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L0 32 L32 64 Z' fill='white'/%3E%3C/svg%3E" )`;

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
        .fromTo('.sidebar-content > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, "-=0.3");
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
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div ref={sidebarRef} className="hidden fixed top-0 right-0 h-full z-50">
        <div className="flex bg-black text-white h-full w-screen md:w-auto">
          <div className="h-full w-8 bg-black" style={{ maskImage: maskSvg, maskRepeat: 'repeat-y', maskSize: '32px 64px', WebkitMaskImage: maskSvg, WebkitMaskRepeat: 'repeat-y', WebkitMaskSize: '32px 64px' }}></div>
          
          {/* --- تم تعديل المسافات هنا --- */}
          <div className="sidebar-content flex-1 md:w-80 p-8 flex flex-col justify-center"> {/* استخدام justify-center للمحاذاة العمودية */}
            
            {/* تقليل الهامش السفلي */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <Sparkles className="w-6 h-6 text-white" />
              <h2 className="font-custom-heading text-2xl font-bold">eltuhami</h2>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            
            <nav>
              {/* تقليل المسافة بين العناصر */}
              <div className="relative flex flex-col items-center md:items-start gap-6">
                <div className="absolute left-1/2 md:left-3.5 -translate-x-1/2 md:translate-x-0 top-0 bottom-0 w-0.5 bg-white/50"></div>
                
                <NavItem label="Mission" sectionId="mission" onNavigate={onNavigate} />
                <NavItem label="Service" sectionId="service" onNavigate={onNavigate} />
                <NavItem label="Projects" sectionId="projects" onNavigate={onNavigate} />
                <NavItem label="About" sectionId="about" onNavigate={onNavigate} />
                <NavItem label="Skills" sectionId="skills" onNavigate={onNavigate} />
                <NavItem label="Team" sectionId="team" onNavigate={onNavigate} />
                <NavItem label="Contact" sectionId="contact" onNavigate={onNavigate} />
              </div>
            </nav>
            
            {/* تقليل الهامش العلوي */}
            <div className="mt-12 text-center">
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
