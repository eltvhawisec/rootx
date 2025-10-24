// src/components/Footer.tsx

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// --- مكون رابط التواصل الاجتماعي (لا تغيير هنا) ---
const SocialLink = ({ href, icon: Icon, name }: { href: string; icon: React.ElementType; name: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link group flex items-center gap-2 text-gray-500 transition-colors duration-300 hover:text-white"
    aria-label={`Follow on ${name}`}
  >
    <Icon className="h-5 w-5" />
    <span className="text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">{name}</span>
  </a>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  // --- 1. الإصلاح الرئيسي: استخدام مصفوفة من المراجع ---
  const footerItemsRef = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // --- 2. فلترة العناصر للتأكد من عدم وجود قيم null ---
    const elementsToAnimate = footerItemsRef.current.filter(el => el !== null);

    // تأكد من وجود عناصر للتحريك
    if (elementsToAnimate.length === 0) return;

    const ctx = gsap.context(() => {
      // --- 3. استهداف مصفوفة المراجع مباشرة ---
      gsap.from(elementsToAnimate, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%', // تم تعديل نقطة البداية قليلاً لضمان التشغيل
          toggleActions: 'play none none none',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full overflow-hidden bg-black px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        
        {/* --- 4. إضافة المراجع (refs) إلى العناصر المستهدفة --- */}
        <h2 
          ref={(el) => { footerItemsRef.current[0] = el; }} 
          className="font-custom-pencerio text-5xl font-bold leading-tight text-white md:text-6xl"
        >
          Secure. Resilient. Ready.
        </h2>
        
        <div ref={(el) => { footerItemsRef.current[1] = el; }} className="mt-8">
          <a href="#" aria-label="Back to top" className="text-2xl font-bold text-white transition-colors hover:text-gray-300">
            rootx<span className="text-purple-500">.</span>
          </a>
        </div>

        <div ref={(el) => { footerItemsRef.current[2] = el; }} className="mt-8 flex items-center gap-6">
          <SocialLink href="https://github.com/rootx" icon={FiGithub} name="GitHub" />
          <SocialLink href="https://linkedin.com/company/rootx" icon={FiLinkedin} name="LinkedIn" />
          <SocialLink href="https://twitter.com/rootx" icon={FiTwitter} name="Twitter" />
        </div>
        
        <div ref={(el ) => { footerItemsRef.current[3] = el; }} className="mt-12 w-full max-w-lg border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} rootx Industries. All rights reserved.
          </p>
          
          <p className="mt-4 text-xs text-gray-700">
            Designed & Developed by{' '}
            <a 
              href="https://eltvhawi.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-gray-500 underline decoration-dotted underline-offset-2 transition-colors hover:text-purple-400"
            >
              eltvhawi
            </a>
            .
          </p>
        </div>

      </div>
    </footer>
   );
}
