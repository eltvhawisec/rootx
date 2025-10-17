// src/app/projects/[slug]/page.tsx
import ProjectClientPage from './ProjectClientPage';

// --- 1. تحديث البيانات: إضافة 'liveUrl' ---
const allProjects = [
    { 
        id: '1', 
        slug: 'fashion-store', 
        title: 'Fashion Store', 
        category: 'E-commerce', 
        description: 'A full-featured e-commerce platform for a modern fashion brand, focusing on a clean user interface, fast performance, and a secure checkout process. Built with Next.js and Stripe.',
        images: ['/fashion.png', '/fashion-2.png', '/fashion-3.png'],
        liveUrl: 'https://fashion-ababilsec.vercel.app/' // رابط الموقع المباشر
    },
    { 
        id: '2', 
        slug: 'svnty', 
        title: 'SVNTY', 
        category: 'Portfolio', 
        description: 'A creative portfolio website for a digital artist, featuring a minimalist design, smooth page transitions, and a masonry-style gallery to showcase artwork effectively.',
        images: ['/svnty.png', '/svnty-2.png'],
        liveUrl: 'https://svnty.vercel.app/'
    },
    { 
        id: '3', 
        slug: 'svn-techno', 
        title: 'SVN Techno', 
        category: 'Agency', 
        description: 'A corporate website for a technology agency.', 
        images: ['/svntechno.png'],
        liveUrl: 'https://svntechno.vercel.app/'
    },
    // ... أكمل بقية المشاريع بنفس الطريقة
    { id: '4', slug: 'zeniths', title: 'Zeniths', category: 'Landing Page', description: 'A stunning landing page for a new product launch.', images: ['/zeniths.png'], liveUrl: 'https://zeniths.vercel.app/' },
    { id: '5', slug: 'elite-fitness', title: 'Elite Fitness', category: 'Health', description: 'A web application for a fitness center to manage members and classes.', images: ['/elite-fitness.png'], liveUrl: 'https://elite-fitnes.vercel.app/' },
    { id: '6', slug: 'project-six', title: 'Project Six', category: 'Creative', description: 'An experimental creative coding project.', images: ['/1.png'], liveUrl: '#' },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps ) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  
  if (!project) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <h1 className="text-4xl font-bold">Project Not Found</h1>
        </div>
    );
  }

  return <ProjectClientPage project={project} />;
}
