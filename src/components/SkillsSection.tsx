// src/components/SkillsSection.tsx

import React from 'react';
import Image from 'next/image'; // --- الخطوة 1: استيراد مكون Image

// --- مكون العنوان (لا تغيير) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 w-full">
    <div className="h-1.5 flex-grow bg-white"></div>
    <h2 className="font-custom-heading text-5xl font-extrabold tracking-wider shrink-0 text-white">
      &#123;{title}&#125;
    </h2>
    <div className="h-1.5 flex-grow bg-white"></div>
  </div>
);

// --- مكون لعرض فئة المهارات (لا تغيير) ---
const SkillCategory = ({ title, skills }: { title: string; skills: string[] }) => (
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
  const frontendSkills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Vite.js"];
  const backendSkills = ["Node.js", "Express.js", "REST APIs", "GraphQL", "Vercel"];
  const securityAndDbSkills = ["Cybersecurity", "Vulnerability Assessment", "PostgerSQL", "SQL", "MongoDB", "Firebase", "Supabase"];

  return (
    // --- الخطوة 2: تعديل العنصر الرئيسي ---
    // أزلنا style و bg-cover. أضفنا 'relative' ليكون مرجعًا للصورة.
    <section className="w-full py-20 text-white relative overflow-hidden">
      
      {/* --- الخطوة 3: إضافة الصورة كعنصر منفصل في الخلفية --- */}
      <Image
        src="/revn.jpg" // تأكد أن الصورة في مجلد 'public'
        alt="Abstract background image for skills section"
        layout="fill" // تملأ العنصر الأب
        objectFit="cover" // تعمل مثل bg-cover
        quality={80} // جودة الصورة (اختياري)
        className="-z-10" // تضع الصورة في الخلفية (z-index: -1)
      />

      {/* طبقة لونية لتحسين وضوح النص */}
      {/* لاحظ أننا أزلنا z-index منها لأن الصورة الآن هي التي في الخلف */}
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>

      {/* المحتوى يجب أن يكون 'relative' ليظهر فوق الطبقة اللونية */}
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative">
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
