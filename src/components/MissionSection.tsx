'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (لا تغيير هنا) ---
const SectionTitle = ({ title }: { title:string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 40 });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
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
      <h2 ref={titleRef} className="font-custom-pencerio text-5xl md:text-6xl font-bold text-white tracking-wide">
        {title}
      </h2>
    </div>
  );
};

// --- المكون الرئيسي للقسم (مع تعديل حجم الخط) ---
export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!line1Ref.current || !separatorRef.current || !line2Ref.current) return;

    const ctx = gsap.context(() => {
      const animatedElements = [line1Ref.current, separatorRef.current, line2Ref.current];
      
      gsap.set(animatedElements, { opacity: 0, y: 30 });
      gsap.set(separatorRef.current, { scaleX: 0 });

      gsap.to(animatedElements, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
      
      gsap.to(separatorRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        delay: 0.2,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
        
        <div className="md:col-span-1">
          <SectionTitle title="Our Mission" />
        </div>

        <div className="md:col-span-2">
          {/* *** تم تعديل حجم الخط هنا *** */}
          <div className="flex flex-col gap-6 text-lg md:text-3xl font-light leading-relaxed text-gray-300">
            <p ref={line1Ref} className="text-gray-300">
              To build exceptional digital experiences that are not only beautifully designed and highly visible, but also fundamentally secure.
            </p>
            
            <div ref={separatorRef} className="h-px w-full bg-gray-700 origin-left"></div>

            <p ref={line2Ref} className="text-gray-300">
              We merge creative UI/UX with robust web development, strategic SEO, and ironclad cybersecurity to deliver solutions that perform, captivate, and protect.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
