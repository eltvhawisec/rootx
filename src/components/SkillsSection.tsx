// src/components/SkillsSection.tsx
import React from 'react';
import Image from "next/image";

// --- مكون العنوان (لا تغيير) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 w-full">
    <div className="h-1.5 flex-grow bg-white"></div>
    <h2 className="text-5xl font-extrabold tracking-wider shrink-0 text-white">
      &#123;{title}&#125;
    </h2>
    <div className="h-1.5 flex-grow bg-white"></div>
  </div>
);

// --- مكون فاصل الورق الممزق (تم تعديله) ---
const TornPaperDivider = ({ visualDirection, position }: { visualDirection: 'left' | 'right', position: 'left' | 'right' }) => {
  const isFlipped = visualDirection === 'left';
  const positionAndTransformClasses = {
    left: `left-0 ${isFlipped ? 'transform -scale-x-100 -translate-x-1/4' : 'transform -translate-x-1/4'}`,
    right: `right-0 ${isFlipped ? 'transform -scale-x-100 translate-x-1/4' : 'transform translate-x-1/4'}`
  };

  return (
    <div className={`absolute top-0 w-1/2 h-full pointer-events-none ${positionAndTransformClasses[position]}`}>
      <Image
        src="/torn-paper.png" // <-- تأكد من أن هذا الملف عالي الدقة
        alt="Torn paper background"
        className="w-full h-full object-cover"
        // --- التعديل هنا: إضافة لتحسين جودة عرض الصورة ---
        style={{ imageRendering: 'high-quality' }} 
      />
    </div>
  );
};

// --- مكون لعرض فئة المهارات (لا تغيير) ---
const SkillCategory = ({ title, skills }: { title:string; skills: string[] }) => (
  <div className="w-full text-center py-12">
    <h3 className="text-3xl font-bold text-white mb-6">{title}</h3>
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-3">
      {skills.map((skill, index) => (
        <span key={index} className="text-lg font-semibold text-black bg-gray-200 px-5 py-2 rounded-full shadow-md">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default function SkillsSection() {
  const frontendSkills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"];
  const backendSkills = ["Node.js", "Express.js", "REST APIs", "GraphQL"];
  const securityAndDbSkills = ["Cybersecurity", "Vulnerability Assessment", "MongoDB", "SQL"];

  return (
    <section className="w-full py-20 bg-black text-white relative overflow-hidden">
      
      <TornPaperDivider visualDirection="right" position="left" /> 
      <TornPaperDivider visualDirection="left" position="right" />

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
        <div className="w-full md:max-w-lg mb-8">
          <SectionTitle title="Skills" />
        </div>
        <SkillCategory title="Front-end" skills={frontendSkills} />
        <SkillCategory title="Back-end" skills={backendSkills} />
        <SkillCategory title="Security & Databases" skills={securityAndDbSkills} />
      </div>
    </section>
  );
}
