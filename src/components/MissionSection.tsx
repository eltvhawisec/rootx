// src/components/MissionSection.tsx

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (يفضل استيراده من ملف مشترك) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftLineRef.current, { xPercent: -100 });
      gsap.set(rightLineRef.current, { xPercent: 100 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: 'power3.inOut', duration: 1.2 }
      });

      tl.to(leftLineRef.current, { xPercent: 0 })
        .to(rightLineRef.current, { xPercent: 0 }, "<")
        .to(textRef.current, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={titleRef} className="flex items-center gap-6 w-full">
      <div className="flex-grow overflow-hidden">
        <div ref={leftLineRef} className="h-2 w-full bg-white"></div>
      </div>
      <h2 ref={textRef} className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-white">
        &#123;{title}&#125;
      </h2>
      <div className="flex-grow overflow-hidden">
        <div ref={rightLineRef} className="h-2 w-full bg-white"></div>
      </div>
    </div>
  );
};

// --- مكون MissionSection الرئيسي (بدون صورة) ---
export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!text) return;
    
    const words = text.innerText.split(' ');
    text.innerHTML = words.map(word => `<span class="word-span inline-block">${word}</span>`).join(' ');
    
    const wordSpans = text.querySelectorAll('.word-span');

    const ctx = gsap.context(() => {
      gsap.set(wordSpans, { opacity: 0, y: 20 });

      gsap.to(wordSpans, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // يبدأ التحريك أبكر قليلاً لأن لا يوجد صورة ننتظرها
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center"> {/* توسيط المحتوى */}
        
        <div className="w-full md:max-w-xl mb-16">
          <SectionTitle title="Mission" />
        </div>

        <div className="w-full max-w-5xl text-center"> {/* توسيط النص */}
          <p ref={textRef} className="font-custom-heading text-4xl md:text-5xl font-black leading-tight text-white">
            To build exceptional digital experiences that are not only beautifully designed and highly visible, but also fundamentally secure. We merge creative UI/UX with robust web development, strategic SEO, and ironclad cybersecurity to deliver solutions that perform, captivate, and protect.
          </p>
        </div>

      </div>
    </section>
  );
}
