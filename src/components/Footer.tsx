// src/components/Footer.tsx

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// --- مكون أيقونة التواصل الاجتماعي (بتصميم جديد) ---
const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link text-gray-600 transition-colors duration-300 hover:text-purple-400"
  >
    <Icon className="h-6 w-6" />
  </a>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // حركة ظهور الخط الفاصل
      gsap.from(footer.querySelector('.divider'), {
        scaleX: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });

      // حركة ظهور العناصر الأخرى
      const elements = [
        footer.querySelector('.logo-text'),
        footer.querySelector('.social-links'),
        footer.querySelector('.copyright'),
      ];
      gsap.from(elements, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        delay: 0.4,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-black px-6 py-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* الخط الفاصل العلوي */}
        <div className="divider h-px w-full origin-left bg-gray-800"></div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
          {/* الشعار أو الاسم */}
          <div className="logo-text text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              rootx<span className="text-purple-500">.</span>
            </h3>
          </div>

          {/* حقوق النشر */}
          <div className="copyright order-last text-center sm:order-none">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} rootx. All Rights Reserved. Forging Digital Security.
            </p>
          </div>

          {/* روابط التواصل الاجتماعي */}
          <div className="social-links flex items-center gap-6">
            <SocialLink href="https://github.com/rootx" icon={FiGithub} />
            <SocialLink href="https://linkedin.com/company/rootx" icon={FiLinkedin} />
            <SocialLink href="https://twitter.com/rootx" icon={FiTwitter} />
          </div>
        </div>
      </div>
    </footer>
   );
}
