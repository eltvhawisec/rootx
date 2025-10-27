'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Sidebar from '@/components/Sidebar';

const MenuIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="group relative z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 p-2 transition-all duration-300 hover:bg-white/10"
      aria-label="Open Menu"
    >
      <div className="space-y-2">
        <span className="block h-0.5 w-6 origin-center rounded-full bg-purple-400 transition-transform duration-300 ease-in-out group-hover:w-8"></span>
        <span className="block h-0.5 w-8 origin-center rounded-full bg-purple-400 transition-transform duration-300 ease-in-out"></span>
      </div>
    </button>
  );
};

export default function Hero() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const imageMask = heroElement.querySelector('.image-mask');
    const image = heroElement.querySelector('.hero-image');
    const mainTitle = heroElement.querySelector('.main-title');
    const subTitle = heroElement.querySelector('.sub-title');
    const menuIcon = heroElement.querySelector('.menu-icon-container');
    const decorativeLines = heroElement.querySelectorAll('.decorative-line');

    gsap.set(imageMask, { clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set(image, { scale: 1.2, opacity: 1 });
    gsap.set([mainTitle, subTitle], { y: 50, opacity: 0 });
    gsap.set(menuIcon, { y: -30, opacity: 0 });
    gsap.set(decorativeLines, { scaleX: 0 });

    const tl = gsap.timeline({
      delay: 0.5, 
      defaults: { duration: 1.2, ease: 'expo.out' },
    });

    tl
      .to(imageMask, { 
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
      })
      .to(image, { 
        scale: 1, 
        duration: 2, 
        ease: 'power2.out' 
      }, "<") 

      .to(decorativeLines, { 
        scaleX: 1, 
        stagger: 0.1, 
        duration: 1, 
        ease: 'power3.out' 
      }, "-=1.2") 

      .to([mainTitle, subTitle], { 
        y: 0, 
        opacity: 1, 
        stagger: 0.15 
      }, "-=0.8")

      .to(menuIcon, { 
        y: 0, 
        opacity: 1, 
        duration: 0.8 
      }, "<");

    const ctx = gsap.context(() => {}, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setSidebarOpen(false);
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  return (
    <>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNavigate={scrollToSection} 
      />

      <section 
        ref={heroRef} 
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4 md:p-8"
      >
        <div 
          className="pointer-events-none absolute inset-0 z-0" 
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 60%)'
          }}
        ></div>

        <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-8 text-center md:grid-cols-2 md:text-left">
          
          <div className="flex flex-col">
            <h1 
              className="main-title font-custom-pencerio text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              rootx<span style={{ color: '#E029F5' }}>.</span>
            </h1>
            <p className="sub-title mt-4 text-lg text-gray-400 md:text-xl">
              Cybersecurity Solutions & Web Application Penetration Testing
            </p>
            <div className="mt-6 space-y-2">
                <div className="decorative-line h-0.5 w-24 origin-left bg-purple-500"></div>
                <div className="decorative-line h-0.5 w-16 origin-left bg-purple-500/50"></div>
            </div>
          </div>

          <div className="image-mask relative flex h-64 items-center justify-center md:h-96">
            <img 
              src="/rootx.jpg"
              alt="rootx logo" 
              className="hero-image h-full w-full rounded-2xl object-cover shadow-2xl shadow-purple-900/20"
            />
          </div>
        </div>

        <div className="menu-icon-container absolute top-6 right-6 md:top-8 md:right-8">
          <MenuIcon onClick={() => setSidebarOpen(true)} />
        </div>
      </section>
    </>
  );
}
