'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (مع تعديل ليتناسب مع الهوية) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative mb-16 text-center md:mb-20">
      <h2
        ref={titleRef}
        className="font-custom-pencerio text-6xl font-bold tracking-wider text-white md:text-7xl"
      >
        {title}
      </h2>
    </div>
  );
};

// --- مكون شريط المهارات (بتصميم وحركة جديدين) ---
const SkillRow = ({
  skills,
  direction = 'left',
  className = '',
}: {
  skills: string[];
  direction?: 'left' | 'right';
  className?: string;
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!marqueeRef.current) return;

    const content = marqueeRef.current.querySelector('.marquee-content') as HTMLElement;
    if (!content) return;

    // مضاعفة المحتوى لتوفير مساحة للحركة اللانهائية
    content.innerHTML += content.innerHTML;

    const ctx = gsap.context(() => {
      let distance = -content.offsetWidth / 2;
      let startX = 0;

      if (direction === 'right') {
        distance = 0;
        startX = -content.offsetWidth / 2;
      }

      const tl = gsap.to(content, {
        x: distance,
        duration: 60, // تم إبطاء الحركة لتكون أكثر أناقة
        ease: 'none',
        repeat: -1,
      });

      gsap.set(content, { x: startX });

      // إبطاء الحركة عند مرور الفأرة بدلاً من إيقافها تماماً
      const handleMouseEnter = () => gsap.to(tl, { timeScale: 0.2, duration: 0.5 });
      const handleMouseLeave = () => gsap.to(tl, { timeScale: 1, duration: 0.5 });

      marqueeRef.current?.addEventListener('mouseenter', handleMouseEnter);
      marqueeRef.current?.addEventListener('mouseleave', handleMouseLeave);
      
      return () => { // Cleanup
        marqueeRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        marqueeRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, marqueeRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={marqueeRef} className={`w-full overflow-hidden ${className}`}>
      <div className="marquee-content flex items-center whitespace-nowrap">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-6 text-2xl font-light text-gray-400 md:text-4xl">
              {skill}
            </span>
            {/* إضافة أيقونة فاصلة */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-purple-500"
            >
              <path d="M12 0L14.6942 9.30584L24 12L14.6942 14.6942L12 24L9.30584 14.6942L0 12L9.30584 9.30584L12 0Z" />
            </svg>
          </div>
         ))}
      </div>
    </div>
  );
};

// --- المكون الرئيسي للقسم (بتصميم جديد) ---
export default function SkillsSection() {
  // تم إعادة تنظيم المهارات لتكون أكثر تركيزًا
  const securityOps = ['Ethical Hacking', 'Penetration Testing', 'Threat Modeling', 'Network Security', 'Vulnerability Assessment'];

  return (
    <section id="skills" className="w-full overflow-hidden bg-black py-24 md:py-32">
      <div className="mx-auto max-w-screen-2xl">
        <SectionTitle title="Skills" /> {/* تغيير العنوان ليعكس القوة */}

        <div className="relative flex flex-col gap-6">
          {/* طبقة التدرج اللوني لإخفاء الحواف */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-black to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-black to-transparent"></div>

          <SkillRow skills={securityOps} direction="right" className="border-y-2 border-purple-900/50 py-6" />
        </div>
      </div>
    </section>
  );
}
