'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next'; // <-- استيراد Hook الترجمة
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiInstagram,
  FiCopy,
  FiCheck,
} from 'react-icons/fi';
import { FaTiktok, FaTelegramPlane } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const SocialIcon = ({ href, icon: Icon, 'aria-label': ariaLabel }: { href: string; icon: React.ElementType; 'aria-label': string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="text-gray-500 transition-colors duration-300 hover:text-purple-400"
  >
    <Icon className="h-6 w-6" />
  </a>
);

export default function ContactFooterSection() {
  const { t } = useTranslation(); // <-- استخدام Hook الترجمة
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const email = 'rootxhackers@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  // ... (useLayoutEffect hook يبقى كما هو)
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.2) 0%, transparent 60%)'
        }}
      ></div>

      <div ref={contentRef} className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        
        <h2 className="font-custom-pencerio text-5xl font-bold leading-tight text-white md:text-7xl">
          {t('footerTitle')}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-400">
          {t('footerSubtitle')}
        </p>

        <div 
          onClick={handleCopyEmail}
          className="group relative mt-12 cursor-pointer rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gray-300 md:text-xl">{email}</span>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-md bg-purple-600 text-white"
              aria-label={t('copyEmailLabel')}
            >
              {isCopied ? <FiCheck className="h-5 w-5" /> : <FiCopy className="h-5 w-5" />}
            </button>
          </div>
          <div className="scan-line absolute left-0 top-0 h-full w-1.5 origin-left scale-y-0 rounded-full bg-purple-400 opacity-70 transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>
          <div className="absolute inset-0 rounded-lg border border-transparent transition-colors duration-300 group-hover:border-purple-500"></div>
        </div>
        {isCopied && <p className="mt-3 text-sm text-green-400">{t('emailCopied')}</p>}

        <div className="mt-20 grid w-full max-w-lg grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-semibold text-gray-400">{t('professionalLinks')}</h3>
            <div className="flex items-center gap-6">
              <SocialIcon href="https://www.linkedin.com/in/saleh-jassem-b620a4386" icon={FiLinkedin} aria-label={t('linkedinLabel' )} />
              <SocialIcon href="https://github.com/rootx" icon={FiGithub} aria-label={t('githubLabel' )} />
              <SocialIcon href="https://twitter.com/rootx" icon={FiTwitter} aria-label={t('twitterLabel' )} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-semibold text-gray-400">{t('socialLinks')}</h3>
            <div className="flex items-center gap-6">
              <SocialIcon href="https://instagram.com/s_rootx" icon={FiInstagram} aria-label={t('instagramLabel' )} />
              <SocialIcon href="https://youtube.com/srootx" icon={FiYoutube} aria-label={t('youtubeLabel' )} />
              <SocialIcon href="https://tiktok.com/srootx" icon={FaTiktok} aria-label={t('tiktokLabel' )} />
              <SocialIcon href="https://t.me/RootX_Hack" icon={FaTelegramPlane} aria-label={t('telegramLabel' )} />
            </div>
          </div>
        </div>
        
        <div className="mt-20 w-full border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <p className="mt-4 text-xs text-gray-700">
            {t('developedBy')}{' '}
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
