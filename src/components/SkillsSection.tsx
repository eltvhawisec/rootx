'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون فئة المهارات (مع التصحيح) ---
const SkillCategory = ({ title, skills, index }: { title: string; skills: string[]; index: number }) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // --- 1. الإصلاح الرئيسي: قم بتخزين المرجع في متغير محلي ---
    const categoryElement = categoryRef.current;

    // --- 2. استخدم هذا المتغير للفحص. الآن TypeScript يعرف أن categoryElement ليس null بعد هذا السطر ---
    if (!categoryElement) return;

    const ctx = gsap.context(() => {
      // حركة ظهور الحاوية بأكملها
      gsap.from(categoryElement, { // استخدم المتغير الآمن
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: categoryElement, // استخدم المتغير الآمن
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // حركة ظهور المهارات داخل الحاوية بشكل متتابع
      // --- 3. استخدم المتغير الآمن هنا أيضًا ---
      gsap.from(categoryElement.querySelectorAll('.skill-item'), {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        delay: 0.4,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: categoryElement, // استخدم المتغير الآمن
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, categoryRef); // يمكنك الاستمرار في استخدام categoryRef هنا لسياق GSAP

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={categoryRef}
      className="group relative rounded-lg border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-900/50"
    >
      <h3 className="mb-4 text-lg font-semibold tracking-wider text-purple-400">
        {title}
      </h3>
      
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

// --- المكون الرئيسي للقسم (لا تغيير هنا) ---
export default function SkillsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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
    const titleElement = titleRef.current;
    if (!titleElement) return;

    const ctx = gsap.context(() => {
      gsap.from(titleElement, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleElement,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
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
