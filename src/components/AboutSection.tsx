'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // إعداد الحالة الأولية
      gsap.set(imageRef.current, { xPercent: -100, autoAlpha: 0 });
      gsap.set(textWrapperRef.current, { xPercent: 100, autoAlpha: 0 });

      // إنشاء الجدول الزمني للتحريك
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      // حركة انزلاق الصورة والنص إلى مكانهما
      tl.to(imageRef.current, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power4.out',
      }).to(
        textWrapperRef.current,
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power4.out',
        },
        '<0.2' // ابدأ هذه الحركة بعد 0.2 ثانية من بدء حركة الصورة
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full py-24 md:py-40 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* --- الجزء الأيسر: الصورة --- */}
        {/* يأخذ 5 أعمدة من 12 */}
        <div ref={imageRef} className="md:col-span-5 h-[70vh] md:h-[90vh]">
          <img
            src="/eltuhami2.png"
            alt="Eltuhami - Full Stack Developer & Cybersecurity Specialist"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* --- الجزء الأيمن: النص --- */}
        {/* يأخذ 7 أعمدة من 12 */}
        <div ref={textWrapperRef} className="md:col-span-7 md:pl-12 lg:pl-24">
          <h2 className="font-custom-pencerio text-7xl md:text-8xl lg:text-9xl font-bold text-black mb-8 leading-none">
            About Me
          </h2>
          <div className="space-y-5 text-lg md:text-xl font-light leading-relaxed text-gray-700 max-w-xl">
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
