// src/components/TeamSection.tsx
import React from 'react';

// --- مكون العنوان (بتصميم مطابق للصورة) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 w-full">
    <div className="h-1.5 flex-grow bg-white" style={{ flexBasis: 'auto' }}></div>
    <h2 className="text-5xl font-extrabold tracking-wider shrink-0 text-white">
      &#123;{title}&#125;
    </h2>
    <div className="h-1.5 flex-grow bg-white" style={{ flexBasis: 'auto' }}></div>
  </div>
);

export default function TeamSection() {
  return (
    // القسم الرئيسي بخلفية سوداء
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 items-center">
        
        {/* --- العمود الأيسر: العنوان والنص --- */}
        <div className="flex flex-col gap-8">
          {/* العنوان */}
          <SectionTitle title="Team" />

          {/* النص الوصفي */}
          <p className="text-2xl md:text-3xl font-bold leading-relaxed">
            I am the founder of ababilsec, a team specialized in web development and 
            vulnerability research. Our focus is on building secure, modern web applications 
            while exploring and analyzing security weaknesses to enhance digital safety.
          </p>
        </div>

        {/* --- العمود الأيمن: الفيديو --- */}
        <div className="flex items-end justify-center h-full">
          {/* 
            - `w-full max-w-md` للتحكم في عرض الفيديو.
            - `rounded-2xl` لزوايا دائرية.
            - `shadow-lg shadow-gray-500/20` لإضافة ظل خفيف.
          */}
          <video 
            src="/ababilsecV.mp4" // <-- ضع مسار الفيديو الخاص بك هنا
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full max-w-md rounded-2xl shadow-lg shadow-gray-500/20"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

