// src/components/ProjectsSection.tsx
import React from 'react';

// --- مكون العنوان (لا تغيير) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
    <div className="h-1.5 flex-grow bg-black"></div>
    <h2 className="text-5xl font-extrabold tracking-wider shrink-0 text-black">
      &#123;{title}&#125;
    </h2>
    <div className="h-1.5 flex-grow bg-black"></div>
  </div>
);

// --- أيقونة النجمة المرقمة (لا تغيير) ---
const NumberedStar = ({ number }: { number: number }) => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none" stroke="black" strokeWidth="2">
      <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
    </svg>
    <span className="text-2xl font-bold text-black z-10">{number}</span>
  </div>
);

// --- بطاقة المشروع (لا تغيير) ---
const ProjectCard = ({ number, direction = 'left' }: { number: number; direction: 'left' | 'right' }) => {
  const isRight = direction === 'right';
  return (
    <div className={`flex flex-col md:flex-row items-center gap-6`}>
      {isRight ? (
        <>
          <NumberedStar number={number} />
          <div className="w-24 h-1 bg-black hidden md:block"></div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-80 h-40 bg-black rounded-2xl shadow-lg"></div>
            <a href="#" className="px-6 py-2 bg-white rounded-lg shadow-md text-black font-bold text-lg transition-transform hover:scale-105">
              View project
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-4">
            <div className="w-80 h-40 bg-black rounded-2xl shadow-lg"></div>
            <a href="#" className="px-6 py-2 bg-white rounded-lg shadow-md text-black font-bold text-lg transition-transform hover:scale-105">
              View project
            </a>
          </div>
          <div className="w-24 h-1 bg-black hidden md:block"></div>
          <NumberedStar number={number} />
        </>
      )}
    </div>
  );
};

// --- المكون الرئيسي للقسم ---
export default function ProjectsSection() {
  return (
    <section id='projects' className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        
        <SectionTitle title="Projects" />

        <div className="w-full space-y-20">
          <div className="flex justify-end">
            <ProjectCard number={1} direction="right" />
          </div>
          <div className="flex justify-start">
            <ProjectCard number={2} direction="left" />
          </div>
        </div>

        {/* --- التعديل هنا --- */}
        <div className="w-full flex justify-center relative -mt-16">
          {/* تم إضافة ml-40 (هامش أيسر) لدفع الزر نحو اليمين */}
          <div className="absolute ml-100"> 
            <a href="#" className="px-6 py-2 bg-white rounded-lg shadow-md text-black font-bold text-lg transition-transform hover:scale-105">
              View more
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
