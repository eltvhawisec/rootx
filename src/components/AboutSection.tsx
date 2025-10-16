'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- المكون الرئيسي للقسم (بتصميم التمرير المتداخل) ---
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageWrapperRef.current || !contentRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // تأثير Parallax للصورة (تتحرك ببطء)
      gsap.fromTo(
        imageWrapperRef.current,
        { yPercent: -10 }, // تبدأ مرتفعة قليلاً
        {
          yPercent: 10,   // تنتهي منخفضة قليلاً
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', // ابدأ عندما يظهر أسفل القسم
            end: 'bottom top',   // انتهي عندما يختفي أعلى القسم
            scrub: true,
          },
        }
      );

      // تأثير Parallax للنص (يتحرك بسرعة)
      gsap.from(contentRef.current, {
        yPercent: 50, // يبدأ منخفضًا
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        },
      });
      
      // تأثير ظهور العنوان
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* العنوان */}
        <div className="text-center mb-16 md:mb-24">
            <h2 ref={headingRef} className="font-custom-pencerio text-5xl md:text-6xl font-bold text-black tracking-wide">
                About Me
            </h2>
        </div>

        {/* حاوية الصورة */}
        <div ref={imageWrapperRef} className="relative w-full h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden mb-16 md:mb-24">
          <img
            src="/eltuhami2.png"
            alt="Eltuhami - Full Stack Developer & Cybersecurity Specialist"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* حاوية النص */}
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <div className="space-y-5 text-lg md:text-xl font-light leading-relaxed text-gray-800">
            <p>
              My name is Eltuhami, a Full Stack Web Developer from Sudan with a strong 
              background in Cybersecurity. I specialize in building and securing modern web 
              applications, combining development skills with security expertise to deliver 
              reliable digital solutions.
            </p>
            <p>
              My passion lies in creating robust back-end systems 
              with Node.js and crafting seamless user experiences with React and Next.js.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
