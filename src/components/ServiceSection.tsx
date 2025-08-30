// src/components/ServiceSection.tsx

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCode, FiPenTool, FiShield, FiTrendingUp } from 'react-icons/fi';

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

// --- مكون ServiceSection الرئيسي (عمود واحد كبير) ---
export default function ServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const listItems = listRef.current?.children;
    if (!listItems) return;

    const ctx = gsap.context(() => {
      gsap.set(listItems, { opacity: 0, y: 40 }); // زيادة الإزاحة الأولية للأسفل

      gsap.to(listItems, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        stagger: 0.25, // زيادة الفاصل الزمني بين ظهور كل عنصر
        duration: 1.2, // زيادة مدة التحريك
        ease: 'power3.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Web Development", description: "Building robust, scalable, and high-performance websites and applications." },
    { title: "UI/UX Design", description: "Crafting intuitive and beautiful user interfaces that captivate and convert." },
    { title: "SEO Optimization", description: "Enhancing your digital presence to rank higher and attract organic traffic." },
    { title: "Cybersecurity", description: "Protecting your digital assets with proactive security measures and protocols." },
  ];

  return (
    <section ref={sectionRef} id="service" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="w-full md:max-w-xl mb-20">
          <SectionTitle title="Services" />
        </div>

        {/* ================================================================== */}
        {/* --- تم التعديل هنا --- */}
        {/* ================================================================== */}
        <div ref={listRef} className="w-full max-w-4xl flex flex-col gap-20"> {/* عمود واحد مع مسافة كبيرة */}
          {services.map((service, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start text-center sm:text-left gap-8">
              <div className="w-full">
                <h3 className="font-custom-heading text-5xl font-bold text-black">{service.title}</h3>
                <p className="text-gray-600 text-xl mt-4">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
