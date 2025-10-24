'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون فئة المهارات (بتصميم جديد تمامًا) ---
const SkillCategory = ({ title, skills, index }: { title: string; skills: string[]; index: number }) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!categoryRef.current) return;

    const ctx = gsap.context(() => {
      // حركة ظهور الحاوية بأكملها
      gsap.from(categoryRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categoryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // حركة ظهور المهارات داخل الحاوية بشكل متتابع
      gsap.from(categoryRef.current.querySelectorAll('.skill-item'), {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        delay: 0.4, // ابدأ بعد ظهور الحاوية
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: categoryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, categoryRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={categoryRef}
      className="group relative rounded-lg border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-900/50"
    >
      {/* عنوان الفئة */}
      <h3 className="mb-4 text-lg font-semibold tracking-wider text-purple-400">
        {title}
      </h3>
      
      {/* قائمة المهارات */}
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {skills.map((skill, i) => (
          <span key={i} className="skill-item text-base font-light text-gray-300 transition-colors duration-300 group-hover:text-white">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- المكون الرئيسي للقسم (بتصميم مختلف تمامًا) ---
export default function SkillsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // تنظيم المهارات في فئات واضحة
  const skillCategories = [
    {
      title: 'Offensive Security',
      skills: ['Penetration Testing', 'Ethical Hacking', 'Vulnerability Assessment', 'Social Engineering', 'Red Teaming'],
    },
    {
      title: 'Defensive & Infrastructure',
      skills: ['Network Security', 'Threat Modeling', 'CI/CD Security', 'Docker', 'Kubernetes', 'AWS', 'Cloud Security'],
    },
    {
      title: 'Secure Development',
      skills: ['Next.js', 'TypeScript', 'Node.js', 'Rust', 'Go', 'GraphQL', 'PostgreSQL', 'Secure SDLC'],
    },
    {
      title: 'Tooling & Frameworks',
      skills: ['GSAP', 'Tailwind CSS', 'Prisma', 'Git', 'Vercel', 'React', 'Metasploit', 'Burp Suite'],
    },
  ];

  useLayoutEffect(() => {
    if (!titleRef.current) return;
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
  }, []);

  return (
    <section id="skills" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      {/* تأثير إضاءة خلفي */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-1/2 w-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0) 70%)'
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <h2
          ref={titleRef}
          className="mb-16 text-center font-custom-pencerio text-6xl font-bold tracking-wider text-white md:text-7xl"
        >
          Core Capabilities
        </h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
