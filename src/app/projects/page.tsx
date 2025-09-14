// app/projects/page.tsx
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import Link from 'next/link';

// أيقونة سهم احترافية
const ArrowLeftIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
 );

export default function ProjectsPage() {
  return (
    <div className="bg-black">
      {/* شريط تنقل احترافي */}
      <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* -- التعديل هنا -- */}
          {/* زر العودة للرئيسية (بالطريقة الحديثة) */}
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-gray-300 transition-colors duration-300"
          >
            <ArrowLeftIcon />
            <span>Back to Home</span>
          </Link>
          
          {/* يمكنك إضافة عناصر أخرى هنا، مثل شعار الموقع */}
          <div>
            {/* <img src="/logo.svg" alt="Logo" className="h-8" /> */}
          </div>
        </nav>
      </header>
      
      <main>
        {/* عرض قسم المشاريع مع كل المشاريع */}
        <ProjectsSection showAll={true} />
      </main>
      
      <Footer />
    </div>
  );
}
