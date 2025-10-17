'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import Masonry from './Masonry'; // تأكد من أن المسار صحيح
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation'; // --- 1. استيراد useRouter

gsap.registerPlugin(ScrollTrigger);

// --- 2. بيانات المشاريع مع إضافة حقل 'slug' ---
const allProjects = [
    { id: '1', img: '/fashion.png', url: '#', height: 400, title: 'Fashion Store', category: 'E-commerce', slug: 'fashion-store' },
    { id: '2', img: '/svnty.png', url: '#', height: 550, title: 'SVNTY', category: 'Portfolio', slug: 'svnty' },
    { id: '3', img: '/svntechno.png', url: '#', height: 450, title: 'SVN Techno', category: 'Agency', slug: 'svn-techno' },
    { id: '4', img: '/zeniths.png', url: '#', height: 500, title: 'Zeniths', category: 'Landing Page', slug: 'zeniths' },
    { id: '5', img: '/elite-fitness.png', url: '#', height: 420, title: 'Elite Fitness', category: 'Health', slug: 'elite-fitness' },
    { id: '6', img: '/1.png', url: '#', height: 480, title: 'Project Six', category: 'Creative', slug: 'project-six' },
];

// --- مكون عنوان القسم (لا تغيير هنا ) ---
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
  const router = useRouter(); // --- 3. تهيئة useRouter

  // --- 4. دالة لمعالجة النقر على المشروع ---
  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  useLayoutEffect(() => {
    if (!masonryContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(masonryContainerRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          onEnter: () => setStartAnimation(true),
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id='projects' className="w-full py-24 md:py-32 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto font-custom-pencerio">
        <SectionTitle title="Our Projects" />
        
        <div ref={masonryContainerRef} className="bg-black rounded-3xl p-2 sm:p-4 shadow-2xl">
          <div style={{ minHeight: '1000px' }}>
            <Masonry
              items={allProjects}
              startAnimation={startAnimation}
              onItemClick={handleProjectClick} // --- 5. تمرير الدالة إلى Masonry
            />
          </div>
        </div>
      </div>
    </section>
  );
}
