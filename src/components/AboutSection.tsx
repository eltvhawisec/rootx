'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { t, i18n } = useTranslation(); // <-- احصل على t و i18n
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<(HTMLDivElement | null)[]>([]);

  // ... (useLayoutEffect hook يبقى كما هو بدون تغيير)
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      tl.fromTo(
        imageWrapperRef.current,
        { scale: 1.1, yPercent: -5 },
        { scale: 1, yPercent: 5, ease: 'none' },
        0
      );

      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      paragraphsRef.current.forEach((div, index) => {
        if (!div) return;
        gsap.from(div.querySelector('.text-content'), {
          yPercent: 100,
          duration: 1,
          ease: 'expo.out',
          delay: 0.3 + index * 0.1,
          scrollTrigger: {
            trigger: div,
            start: 'top 85%',
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
      id="about" 
      className="relative w-full overflow-hidden bg-black py-24 md:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-8">
        
        {/* --- قسم النص --- */}
        {/* تعديل هنا: أضفنا كلاسات المحاذاة والترتيب */}
        <div className={`z-10 flex flex-col justify-center ${
          i18n.language === 'ar' ? 'md:text-right md:order-last' : 'md:text-left'
        }`}>
          <h2 
            ref={titleRef} 
            className="font-custom-pencerio text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
          >
            {t('aboutTitle')}
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-400 md:text-xl">
            
            <div ref={(el) => { paragraphsRef.current[0] = el; }} className="overflow-hidden">
              <p className="text-content">
                {t('aboutText1')}
              </p>
            </div>
            <div ref={(el) => { paragraphsRef.current[1] = el; }} className="overflow-hidden">
              <p className="text-content">
                {/* يمكنك إضافة نص آخر هنا بنفس الطريقة */}
              </p>
            </div>

          </div>
        </div>
        
        {/* --- قسم الصورة --- */}
        {/* تعديل هنا: غيرنا موقع الصورة وتدرج الخلفية بناءً على اللغة */}
        <div className={`relative h-[60vh] md:h-screen md:absolute md:top-0 md:w-1/2 ${
          i18n.language === 'ar' ? 'md:left-0' : 'md:right-0'
        }`}>
          <div className={`absolute inset-0 z-10 ${
            i18n.language === 'ar' ? 'bg-gradient-to-l from-black' : 'bg-gradient-to-r from-black'
          } via-transparent to-transparent md:bg-gradient-to-r`}></div>
          
          <div 
            ref={imageWrapperRef} 
            className="h-full w-full"
          >
            <img
              src="/rootx.jpg"
              alt="Cybersecurity specialist"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
