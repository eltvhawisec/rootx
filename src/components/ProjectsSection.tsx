// src/components/ProjectsSection.tsx
import React from 'react';

// --- مكون العنوان (تم تكبيره) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center gap-6 w-full max-w-xl mx-auto"> {/* زيادة العرض والفجوة */}
    <div className="h-2 flex-grow bg-black"></div> {/* زيادة السماكة */}
    <h2 className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-black"> {/* زيادة حجم الخط */}
      &#123;{title}&#125;
    </h2>
    <div className="h-2 flex-grow bg-black"></div> {/* زيادة السماكة */}
  </div>
);

// --- أيقونة النجمة المرقمة (تم تكبيرها) ---
const NumberedStar = ({ number }: { number: number }) => (
  <div className="relative w-28 h-28 flex items-center justify-center"> {/* زيادة حجم الحاوية */}
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" fill="none" stroke="black" strokeWidth="2">
      <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
    </svg>
    <span className="text-4xl font-bold text-black z-10">{number}</span> {/* زيادة حجم الرقم */}
  </div>
);

// --- بطاقة المشروع (تم تكبيرها) ---
const ProjectCard = ({ number, direction = 'left', imageUrl }: { number: number; direction: 'left' | 'right'; imageUrl: string }) => {
  const isRight = direction === 'right';
  const ImageDisplay = () => (
    <div className="w-[450px] h-64 rounded-2xl shadow-lg overflow-hidden group"> {/* زيادة أبعاد الصورة */}
      <img 
        src={imageUrl} 
        alt={`Project ${number}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  );

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8`}> {/* زيادة الفجوة */}
      {isRight ? (
        <>
          <NumberedStar number={number} />
          <div className="w-32 h-1.5 bg-black hidden md:block"></div> {/* زيادة طول وسماكة الخط */}
          <div className="flex flex-col items-center gap-6"> {/* زيادة الفجوة */}
            <ImageDisplay />
            <a href="#" className="px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105"> {/* زيادة حجم الزر والخط */}
              View project
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-6"> {/* زيادة الفجوة */}
            <ImageDisplay />
            <a href="#" className="px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105"> {/* زيادة حجم الزر والخط */}
              View project
            </a>
          </div>
          <div className="w-32 h-1.5 bg-black hidden md:block"></div> {/* زيادة طول وسماكة الخط */}
          <NumberedStar number={number} />
        </>
      )}
    </div>
  );
};

// --- المكون الرئيسي للقسم (تم تكبيره) ---
export default function ProjectsSection() {
  return (
    <section id='projects' className="w-full py-28 px-6 md:px-12 lg:px-24 bg-white"> {/* زيادة الهامش العلوي والسفلي */}
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-24"> {/* زيادة الفجوة */}
        
        <SectionTitle title="Projects" />

        <div className="w-full space-y-28"> {/* زيادة المسافة بين المشاريع */}
          <div className="flex justify-end">
            <ProjectCard number={1} direction="right" imageUrl="/project1.jpg" />
          </div>
          <div className="flex justify-start">
            <ProjectCard number={2} direction="left" imageUrl="/project2.png" />
          </div>
        </div>

        <div className="w-full flex justify-center relative -mt-20"> {/* تعديل الهامش العلوي */}
          <div className="absolute ml-100"> 
            <a href="#" className="px-8 py-3 bg-white rounded-lg shadow-md text-black font-bold text-xl transition-transform hover:scale-105"> {/* زيادة حجم الزر والخط */}
              View more
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
