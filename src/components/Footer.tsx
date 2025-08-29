// src/components/Footer.tsx

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon p-2 rounded-full bg-gray-100 hover:bg-black group transition-colors duration-300">
    <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
  </a>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".footer-image", { y: 30, opacity: 0 });
      gsap.set(".footer-heading", { y: 30, opacity: 0 });
      gsap.set(".social-icon", { y: 20, opacity: 0 });
      gsap.set(".copyright-text", { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: 'power3.out' }
      });

      tl.to(".footer-image", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
      })
      .to(".footer-heading", {
        y: 0,
        opacity: 1,
        duration: 1,
      }, "-=0.7")
      .to(".social-icon", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
      }, "-=0.6")
      .to(".copyright-text", {
        opacity: 1,
        duration: 1,
      }, "-=0.5");

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-white text-black py-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        
        {/* ================================================================== */}
        {/* --- تم تعديل الصور هنا --- */}
        {/* ================================================================== */}
        <div className="flex items-center gap-8"> {/* زيادة الفجوة لتناسب الحجم الجديد */}
          {/* صورتك الشخصية (أصغر) */}
          <img
            src="/favicon.ico"
            alt="eltuhami"
            // إزالة الظل
            className="footer-image w-24 h-24 object-cover rounded-2xl"
          />
          {/* صورة الفريق (أكبر) */}
          <img
            src="/ababil.jpg"
            alt="AbabilSec Team"
            // إزالة الظل وتكبير الحجم
            className="footer-image w-32 h-32 object-cover rounded-2xl"
          />
        </div>

        <h2 className="footer-heading font-custom-heading text-5xl md:text-7xl font-black text-center">
          Let&apos;s build the future, <span className="text-gray-500">together.</span>
        </h2>

        <div className="flex items-center gap-5 mt-2">
          <SocialIcon href="https://github.com/eltuhami249" icon={Github} />
          <SocialIcon href="https://www.linkedin.com/in/ahmed-eltuhami-532354380" icon={Linkedin} />
          <SocialIcon href="https://x.com/eltuhamisec?s=21" icon={Twitter} />
          <SocialIcon href="https://instagram.com/eltuhamisec" icon={Instagram} />
        </div>

        <div className="copyright-text border-t border-gray-200 w-full max-w-md mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date( ).getFullYear()} eltuhami. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
