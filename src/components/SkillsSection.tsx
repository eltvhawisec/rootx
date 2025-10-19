'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (لا تغيير) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
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
    <div className="relative mb-16 md:mb-24 text-center">
      <h2 ref={titleRef} className="font-custom-pencerio text-5xl md:text-6xl font-bold text-white tracking-wide">
        {title}
      </h2>
    </div>
  );
};

// --- مكون شريط المهارات المتحرك (مع التصحيح) ---
const SkillsMarquee = ({ skills, direction = 'left' }: { skills: string[]; direction?: 'left' | 'right' }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!marqueeRef.current) return;

    const content = marqueeRef.current.querySelector('.marquee-content');
    
    // --- هذا هو الحل ---
    // إذا لم يتم العثور على عنصر المحتوى، أوقف التنفيذ لتجنب الأخطاء.
    if (!content) return;

    // الآن TypeScript متأكد من أن 'content' ليس 'null' في بقية الكود.
    content.innerHTML += content.innerHTML;

    const ctx = gsap.context(() => {
      const distance = direction === 'left' ? -content.scrollWidth / 2 : 0;
      const startX = direction === 'left' ? 0 : -content.scrollWidth / 2;
      
      const tl = gsap.to(content, {
        x: distance,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
      
      gsap.set(content, { x: startX });

      marqueeRef.current?.addEventListener('mouseenter', () => tl.pause());
      marqueeRef.current?.addEventListener('mouseleave', () => tl.play());

    }, marqueeRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={marqueeRef} className="w-full overflow-hidden py-4 border-y border-gray-800">
      <div className="marquee-content flex whitespace-nowrap">
        {skills.map((skill, index) => (
          <span key={index} className="text-3xl md:text-5xl font-bold text-gray-400 mx-8">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- المكون الرئيسي للقسم (لا تغيير هنا) ---
export default function SkillsSection() {
  const frontendSkills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Vite.js", "HTML5", "CSS3", "JavaScript", "NextAuth.js"];
  const backendSkills = ["Node.js", "Express.js", "REST APIs", "GraphQL", "Vercel", "Prisma", "Sequelize", "Git", "GitHub"];
  const securityAndDbSkills = ["PostgreSQL", "SQL", "MongoDB", "Firebase", "Supabase"];
  const cybersecurity = ["Cybersecurity", "Vulnerability Assessment", "Network Security", "Ethical Hacking", "Penetration Testing"];
  
  return (
    <section id="skills" className="w-full py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Skills" />
        
        <div className="flex flex-col gap-8">
          <SkillsMarquee skills={frontendSkills} direction="left" />
          <SkillsMarquee skills={backendSkills} direction="right" />
          <SkillsMarquee skills={securityAndDbSkills} direction="left" />
          <SkillsMarquee skills={cybersecurity} direction="right" />
        </div>
      </div>
    </section>
  );
}
