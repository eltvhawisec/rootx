// src/components/TeamSection.tsx
import React from 'react';

// --- مكون العنوان (تم تكبيره) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-6 w-full"> {/* زيادة الفجوة */}
    <div className="h-2 flex-grow bg-white" style={{ flexBasis: 'auto' }}></div> {/* زيادة السماكة */}
    <h2 className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-white"> {/* زيادة حجم الخط وسماكته */}
      &#123;{title}&#125;
    </h2>
    <div className="h-2 flex-grow bg-white" style={{ flexBasis: 'auto' }}></div> {/* زيادة السماكة */}
  </div>
);

export default function TeamSection() {
  return (
    // القسم الرئيسي (تم تكبيره)
    <section className="w-full py-28 px-6 md:px-12 lg:px-24 bg-black text-white"> {/* زيادة الهامش العلوي والسفلي */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 items-center"> {/* زيادة الفجوة بين الأعمدة */}
        
        {/* --- العمود الأيسر: العنوان والنص (تم تكبيره) --- */}
        <div className="flex flex-col gap-10"> {/* زيادة الفجوة */}
          {/* العنوان */}
          <SectionTitle title="Team" />

          {/* النص الوصفي (تم تكبيره) */}
          <p className="text-3xl md:text-4xl font-black leading-normal"> {/* زيادة حجم الخط وسماكته */}
            I am the founder of ababilsec, a team specialized in web development and 
            vulnerability research. Our focus is on building secure, modern web applications 
            while exploring and analyzing security weaknesses to enhance digital safety.
          </p>
        </div>

        {/* --- العمود الأيمن: الفيديو (تم تكبيره) --- */}
        <div className="flex items-end justify-center h-full">
          <video 
            src="/ababilsecV.mp4"
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full max-w-lg rounded-2xl shadow-lg shadow-gray-500/20" // زيادة العرض الأقصى للفيديو
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
