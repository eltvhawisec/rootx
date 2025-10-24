'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 50%', // تبدأ الحركة عندما يصل منتصف الشاشة إلى أعلى القسم
          end: 'bottom bottom', // تستمر الحركة حتى نهاية القسم
          scrub: 1.2, // يجعل الحركة سلسة ومرتبطة بالتمرير
        },
      });

      // 1. حركة الصورة: تكبير بطيء وتغيير في الشفافية أثناء التمرير
      tl.fromTo(
        imageWrapperRef.current,
        { scale: 1.1, yPercent: -5 },
        { scale: 1, yPercent: 5, ease: 'none' },
        0 // ابدأ عند الثانية 0 من التايم لاين
      );

      // 2. حركة العنوان: يظهر ثم يتحرك للأعلى ليختفي تدريجياً
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

      // 3. حركة الفقرات: تظهر كل فقرة على حدة بتأثير "كشف"
      paragraphsRef.current.forEach((p, index) => {
        if (!p) return;
        gsap.from(p.querySelector('.text-content'), {
          yPercent: 100,
          duration: 1,
          ease: 'expo.out',
          delay: 0.3 + index * 0.1,
          scrollTrigger: {
            trigger: p,
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
        
        {/* --- الجزء الأيسر: النص --- */}
        <div className="z-10 flex flex-col justify-center">
          <h2 
            ref={titleRef} 
            className="font-custom-pencerio text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
          >
            The Digital Vanguard.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-400 md:text-xl">
            {/* تم تغليف كل نص في حاوية لإتاحة تأثير الكشف */}
            <div ref={(el) => (paragraphsRef.current[0] = el)} className="overflow-hidden">
              <p className="text-content">
                <strong className="text-purple-400">rootx</strong> is not merely a company; we are a doctrine. Born from the crucible of digital warfare, we are a collective of elite cybersecurity architects and ethical hackers dedicated to one singular purpose: forging digital invulnerability.
              </p>
            </div>
            <div ref={(el) => (paragraphsRef.current[1] = el)} className="overflow-hidden">
              <p className="text-content">
                We dissect threats before they materialize, reverse-engineer adversary tactics, and construct multi-layered defensive systems. Our methodology transforms your digital assets from passive targets into <strong className="font-semibold text-white">proactive, self-defending fortresses</strong>.
              </p>
            </div>
          </div>
        </div>
        
        {/* --- الجزء الأيمن: الصورة --- */}
        <div className="relative h-[60vh] md:h-screen md:absolute md:top-0 md:right-0 md:w-1/2">
          {/* طبقة التدرج اللوني لتعتيم الحواف */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-transparent md:bg-gradient-to-l"></div>
          
          <div 
            ref={imageWrapperRef} 
            className="h-full w-full"
          >
            <img
              src="/rootx.jpg"
              alt="Digital fortress abstract visualization"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
