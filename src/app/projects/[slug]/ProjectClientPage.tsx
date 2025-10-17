// src/app/projects/[slug]/ProjectClientPage.tsx
'use client';

import { FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link'; // --- 1. استيراد مكون Link

// تعريف واجهة الأنواع للمشروع
interface Project {
  title: string;
  category: string;
  description: string;
  images: string[];
  liveUrl: string;
}

interface ProjectClientPageProps {
  project: Project;
}

export default function ProjectClientPage({ project }: ProjectClientPageProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row h-full">
        
        <div className="w-full md:w-2/5 md:min-h-screen p-8 md:p-12 lg:p-16 flex flex-col justify-center sticky top-0">
          <div className="animate-fade-in-up">
            <p className="text-base font-semibold text-blue-400 uppercase tracking-wider mb-4">
              {project.category}
            </p>
            <h1 className="font-custom-pencerio text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-md">
              {project.description}
            </p>
            
            <div className="flex items-center gap-6 mt-12">
              {/* زر زيارة الموقع (يبقى <a> لأنه رابط خارجي) */}
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-lg rounded-full transition-transform duration-300 hover:scale-105"
              >
                Visit Site
                <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
              </a>
              
              {/* --- 2. استبدال <a> بـ <Link> --- */}
              {/* زر العودة */}
              <Link href="/" className="text-lg font-semibold text-gray-400 hover:text-white transition-colors">
                &larr; Back
              </Link>
            </div>
          </div>
        </div>

        {/* الجانب الأيمن: معرض الصور */}
        <div className="w-full md:w-3/5 p-4 md:p-8">
          <div className="flex flex-col gap-8">
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden shadow-2xl shadow-gray-900/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* ملاحظة: يجب إصلاح هذا أيضًا إذا لم تكن قد فعلت ذلك بالفعل */}
                <img 
                  src={image} 
                  alt={`${project.title} - Screenshot ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
