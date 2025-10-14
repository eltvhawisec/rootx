'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import Masonry from './Masonry'; // تأكد من أن المسار صحيح
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- بيانات المشاريع مع إضافة العنوان والتصنيف ---
const allProjects = [
    { id: '1', img: '/fashion.png', url: 'https://fashion-ababilsec.vercel.app/', height: 400, title: 'Fashion Store', category: 'E-commerce' },
    { id: '2', img: '/svnty.png', url: 'https://svnty.vercel.app/', height: 550, title: 'SVNTY', category: 'Portfolio' },
    { id: '3', img: '/svntechno.png', url: 'https://svntechno.vercel.app/', height: 450, title: 'SVN Techno', category: 'Agency' },
    { id: '4', img: '/zeniths.png', url: 'https://zeniths.vercel.app/', height: 500, title: 'Zeniths', category: 'Landing Page' },
    { id: '5', img: '/elite-fitness.png', url: 'https://elite-fitnes.vercel.app/', height: 420, title: 'Elite Fitness', category: 'Health' },
    { id: '6', img: '/1.png', url: '#', height: 480, title: 'Project Six', category: 'Creative' },
];

// --- مكون عنوان القسم (بتصميم موحد وأنيق ) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="font-custom-pencerio text-5xl md:text-6xl font-bold text-black tracking-wide">
      {title}
    </h2>
  </div>
);

// --- المكون الرئيسي لقسم المشاريع ---
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const masonryContainerRef = useRef<HTMLDivElement>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useLayoutEffect(() => {
    if (!masonryContainerRef.current) return;

    const ctx = gsap.context(() => {
      // استخدام clip-path لإنشاء تأثير القناع الذي يكشف المحتوى
      gsap.from(masonryContainerRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)', // يبدأ القناع من الأسفل مغلقًا تمامًا
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%", // ابدأ التحريك عندما يصل منتصف القسم إلى أعلى الشاشة
          toggleActions: "play none none none",
          onEnter: () => setStartAnimation(true), // شغل تحريك Masonry عند بدء كشف القناع
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id='projects' className="w-full py-24 md:py-32 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto font-custom-pencerio">
        <SectionTitle title="Our Projects" />
        
        {/* حاوية Masonry التي سيتم تطبيق القناع عليها */}
        <div ref={masonryContainerRef} className="bg-black rounded-3xl p-2 sm:p-4 shadow-2xl">
          <div style={{ minHeight: '1000px' }}>
            <Masonry
              items={allProjects}
              startAnimation={startAnimation}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
