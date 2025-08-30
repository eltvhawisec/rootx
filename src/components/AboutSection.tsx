// src/components/AboutSection.tsx

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (يبقى كما هو) ---
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


// --- مكون AboutSection الرئيسي ---
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null); // Ref للفيديو نفسه
  const mediaMaskRef = useRef<HTMLDivElement>(null); // Ref للقناع

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!text) return;
    
    const words = text.innerText.split(' ');
    text.innerHTML = words.map(word => `<span class="word-span inline-block">${word}</span>`).join(' ');
    
    const wordSpans = text.querySelectorAll('.word-span');

    const ctx = gsap.context(() => {
      // --- إعداد الحالة الأولية ---
      // النص مخفي تمامًا
      gsap.set(wordSpans, { opacity: 0 });
      // الفيديو مزاح إلى اليمين خارج قناعه
      gsap.set(mediaRef.current, { xPercent: 101 });

      // --- إنشاء Timeline للتحريك السينمائي ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%", // يبدأ التحريك عندما يصل منتصف القسم إلى الشاشة
          toggleActions: "play none none none",
        },
        defaults: { ease: 'power4.inOut' } // حركة سينمائية فخمة
      });

      // 1. الفيديو يقتحم الشاشة من اليمين
      tl.to(mediaRef.current, {
        xPercent: 0,
        duration: 1.8, // مدة أطول لتعزيز الإحساس السينمائي
      })
      // 2. النص يظهر بعد استقرار الفيديو
      .to(wordSpans, {
        opacity: 1,
        y: 0, // حركة صعود خفيفة
        stagger: 0.02,
        duration: 0.5,
        ease: 'power2.out', // حركة أسرع وأكثر حيوية للنص
      }, "-=0.5"); // يبدأ قبل نهاية حركة الفيديو بقليل لمزيد من السلاسة

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
            {/* ================================================================== */}
            {/* --- 1. تم تغيير الخط هنا --- */}
            {/* ================================================================== */}
            <p ref={textRef} className="font-custom-heading text-4xl md:text-4xl font-black leading-snug text-black">
              My name is eltuhami, a Full Stack Web Developer from Sudan with a strong 
              background in Cybersecurity. I specialize in building and securing modern web 
              applications, combining development skills with security expertise to deliver 
              reliable digital solutions. My passion lies in creating robust back-end systems 
              with Node.js and crafting seamless user experiences with React and Next.js. 
            </p>
          </div>

          {/* ================================================================== */}
          {/* --- 2. تم تعديل بنية الفيديو هنا لإضافة القناع --- */}
          {/* ================================================================== */}
          <div ref={mediaMaskRef} className="w-full md:max-w-5xl overflow-hidden rounded-3xl">
            <div ref={mediaRef}>
              <video
                src="/eltuhami.MP4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-square object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
