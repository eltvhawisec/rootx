// src/components/AboutSection.tsx

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (لا تغيير) ---
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
        <div ref={leftLineRef} className="h-2 w-full bg-black"></div>
      </div>
      <h2 ref={textRef} className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-black">
        &#123;{title}&#125;
      </h2>
      <div className="flex-grow overflow-hidden">
        <div ref={rightLineRef} className="h-2 w-full bg-black"></div>
      </div>
    </div>
  );
};


export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaMaskRef = useRef<HTMLDivElement>(null); 

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!text) return;
    
    const words = text.innerText.split(' ');
    text.innerHTML = words.map(word => `<span class="word-span inline-block">${word}</span>`).join(' ');
    
    const wordSpans = text.querySelectorAll('.word-span');

    const ctx = gsap.context(() => {
      gsap.set(wordSpans, { opacity: 0 });
      gsap.set(mediaRef.current, { xPercent: 101 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%", 
          toggleActions: "play none none none",
        },
        defaults: { ease: 'power4.inOut' } 
      });

      tl.to(mediaRef.current, {
        xPercent: 0,
        duration: 1.8, 
      })
      .to(wordSpans, {
        opacity: 1,
        y: 0, 
        stagger: 0.02,
        duration: 0.5,
        ease: 'power2.out', 
      }, "-=0.5"); 

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <div className="w-full md:max-w-xl mb-12">
          <SectionTitle title="About" />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-20 lg:gap-32 justify-center items-start">
          
          <div className="w-full md:max-w-2xl mt-6">
            <p ref={textRef} className="font-custom-heading text-4xl md:text-4xl font-black leading-snug text-black">
              My name is eltuhami, a Full Stack Web Developer from Sudan with a strong 
              background in Cybersecurity. I specialize in building and securing modern web 
              applications, combining development skills with security expertise to deliver 
              reliable digital solutions. My passion lies in creating robust back-end systems 
              with Node.js and crafting seamless user experiences with React and Next.js. 
            </p>
          </div>

          {/* --- التعديل الرئيسي هنا --- */}
          <div ref={mediaMaskRef} className="w-full md:max-w-5xl overflow-hidden rounded-3xl">
            <div ref={mediaRef}>
              {/* تم استبدال الفيديو بالصورة */}
              <img
                src="/eltuhami2.png" // <-- غيّر هذا المسار إلى مسار صورتك
                alt="Eltuhami - Full Stack Developer" // <-- نص بديل وصفي للصورة
                className="w-full aspect-square object-cover" // نفس الفئات للحفاظ على التنسيق
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
