'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, Trans } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <h2 
        ref={titleRef} 
        className="font-custom-pencerio text-5xl font-bold tracking-wider md:text-6xl"
        style={{ color: '#ffffffff' }} 
        suppressHydrationWarning 
      >
        {title}
      </h2>
    </div>
  );
};

export default function MissionSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      textElementsRef.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="mission" 
      className="relative w-full overflow-hidden bg-black py-24 px-6 md:py-32 lg:px-24"
    >
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url('/wave-haikei.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black"></div>
      </div>

      <div className={`relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 ${
        isClient && i18n.language === 'ar' ? 'md:direction-rtl' : ''
      } md:grid-cols-3`}>
        
        <div className="sticky top-24 md:col-span-1">
          <SectionTitle title={t('missionTitle')} />
        </div>

        <div className="md:col-span-2">
          <div className={`flex flex-col gap-10 text-xl font-light leading-relaxed text-gray-300 md:text-2xl ${
            isClient && i18n.language === 'ar' ? 'md:text-right' : 'md:text-left'
          }`}>
            
            <p ref={(el) => { textElementsRef.current[0] = el; }} suppressHydrationWarning>
              <Trans
                i18nKey="missionText1"
                components={[<strong key="mission1-strong" className="font-semibold text-purple-400" />]}
              />
            </p>
            
            <p ref={(el) => { textElementsRef.current[1] = el; }} suppressHydrationWarning>
              <Trans
                i18nKey="missionText2"
                components={[<strong key="mission2-strong" className="font-semibold text-white" />]}
              />
            </p>

            <p ref={(el) => { textElementsRef.current[2] = el; }} suppressHydrationWarning>
              <Trans
                i18nKey="missionText3"
                components={[<strong key="mission3-strong" className="font-semibold text-purple-400" />]}
              />
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
