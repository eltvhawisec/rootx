'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, Trans } from 'react-i18next'; // استيراد useTranslation و Trans

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    // ... (الكود هنا يبقى كما هو)
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
      >
        {title}
      </h2>
    </div>
  );
};

export default function MissionSection() {
  const { t } = useTranslation(); // <-- استخدام Hook الترجمة
  const sectionRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  // ... (useLayoutEffect hook يبقى كما هو)
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

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 md:grid-cols-3">
        
        <div className="sticky top-24 md:col-span-1">
          <SectionTitle title={t('missionTitle')} /> {/* <-- استخدام النص المترجم للعنوان */}
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-10 text-xl font-light leading-relaxed text-gray-300 md:text-2xl">
            
            <p ref={(el) => { textElementsRef.current[0] = el; }}>
              <Trans
                i18nKey="missionText1" // مفتاح الترجمة
                components={[<strong className="font-semibold text-purple-400" />]} // المكون الذي سيحل محل <1>
              />
            </p>
            
            <p ref={(el) => { textElementsRef.current[1] = el; }}>
              <Trans
                i18nKey="missionText2"
                components={[<strong className="font-semibold text-white" />]} // يمكن تخصيص المكون لكل نص
              />
            </p>

            <p ref={(el) => { textElementsRef.current[2] = el; }}>
              <Trans
                i18nKey="missionText3"
                components={[<strong className="font-semibold text-purple-400" />]}
              />
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
