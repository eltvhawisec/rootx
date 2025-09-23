// src/components/ProjectsSection.tsx

'use client';

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    const ctx = gsap.context(() => {
      gsap.set(leftLineRef.current, { xPercent: -100 });
      gsap.set(rightLineRef.current, { xPercent: 100 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none none" },
        defaults: { ease: 'power3.inOut', duration: 1.2 }
      });
      tl.to(leftLineRef.current, { xPercent: 0 })
        .to(rightLineRef.current, { xPercent: 0 }, "<")
        .to(textRef.current, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
    }, titleRef);
    return () => ctx.revert();
  }, [isMounted]);

  const containerClasses = "flex items-center justify-center w-full max-w-xl mx-auto gap-4 md:gap-6";
  const lineClasses = "h-1.5 md:h-2 w-full bg-black";
  const textClasses = "font-custom-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-wider shrink-0 text-black";

  return (
    <div ref={titleRef} className={containerClasses}>
      <div className="flex-grow overflow-hidden"><div ref={leftLineRef} className={lineClasses}></div></div>
      <h2 ref={textRef} className={textClasses}>&#123;{title}&#125;</h2>
      <div className="flex-grow overflow-hidden"><div ref={rightLineRef} className={lineClasses}></div></div>
    </div>
  );
};

const NumberedStar = ({ number }: { number: number }) => {
  const containerClasses = "relative w-20 md:w-28 h-20 md:h-28 flex items-center justify-center";
  const textClasses = "text-2xl md:text-4xl font-bold text-black z-10";
  return (
    <div className={containerClasses}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" fill="none" stroke="black" strokeWidth="2">
        <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
      </svg>
      <span className={textClasses}>{number}</span>
    </div>
  );
};

// --- بطاقة المشروع (بدون تغيير) ---
const ProjectCard = ({ number, direction = 'left', imageUrl, projectUrl }: { number: number; direction: 'left' | 'right'; imageUrl: string; projectUrl: string; }) => {
  const isRight = direction === 'right';
  
  const ImageDisplay = () => (
    <div className="w-72 md:w-[450px] h-48 md:h-64 rounded-2xl shadow-lg overflow-hidden group relative">
      <Image 
        src={imageUrl} 
        alt={`Project ${number}`}
        fill
        style={{ objectFit: 'cover' }}
        className="transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 288px, 450px"
      />
    </div>
  );

  const ConnectorLine = () => <div className="w-16 md:w-32 h-1 md:h-1.5 bg-black hidden md:block"></div>;
  const containerClasses = "flex flex-col md:flex-row items-center gap-4 md:gap-8";
  const contentClasses = "flex flex-col items-center gap-4 md:gap-6";
  const buttonClasses = "px-6 py-2 md:px-8 md:py-3 bg-white rounded-lg shadow-md text-black font-bold text-lg md:text-xl transition-transform hover:scale-105";

  return (
    <div className={containerClasses}>
      {isRight ? (
        <>
          <NumberedStar number={number} />
          <ConnectorLine />
          <div className={contentClasses}>
            <ImageDisplay />
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses}>View project</a>
          </div>
        </>
      ) : (
        <>
          <div className={contentClasses}>
            <ImageDisplay />
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses}>View project</a>
          </div>
          <ConnectorLine />
          <NumberedStar number={number} />
        </>
      )}
    </div>
  );
};

const allProjects = [
  { id: 1, direction: 'right' as const, imageUrl: '/fashion.png', projectUrl: 'https://fashion-ababilsec.vercel.app/' },
  { id: 2, direction: 'left' as const, imageUrl: '/svnty.png', projectUrl: 'https://svnty.vercel.app/' },
  { id: 3, direction: 'right' as const, imageUrl: '/Sweet.png', projectUrl: 'https://shop-ababil.vercel.app/' },
  { id: 4, direction: 'left' as const, imageUrl: '/svntechno.png', projectUrl: 'https://svntechno.vercel.app/' },
];

export default function ProjectsSection({ showAll = false }: { showAll?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;
    
    const ctx = gsap.context(() => {
      const projectCards = gsap.utils.toArray<Element>('.project-card-container');
      
      projectCards.forEach((card) => {
        gsap.from(card, {
          opacity: 0, y: 50, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  const projectsToShow = showAll ? allProjects : allProjects.slice(0, 2);

  const sectionClasses = "w-full py-16 md:py-28 px-4 md:px-6 lg:px-12 xl:px-24 bg-white overflow-hidden";
  const containerClasses = "max-w-7xl mx-auto flex flex-col items-center gap-16 md:gap-24";
  const spacingClasses = "w-full space-y-16 md:space-y-28";
  const viewMoreButtonClasses = "px-6 py-2 md:px-8 md:py-3 bg-white rounded-lg shadow-md text-black font-bold text-lg md:text-xl transition-transform hover:scale-105";

  return (
    <section ref={sectionRef} id='projects' className={sectionClasses}>
      <div className={containerClasses}>
        <SectionTitle title="Projects" />
        <div className={spacingClasses}>
          {projectsToShow.map(project => (
            <div key={project.id} className={`project-card-container flex ${project.direction === 'right' ? 'justify-end' : 'justify-start'}`}>
              <ProjectCard
                number={project.id}
                direction={project.direction}
                imageUrl={project.imageUrl}
                projectUrl={project.projectUrl}
              />
            </div>
          ))}
        </div>
        {!showAll && (
          <div className="w-full flex justify-center mt-8 md:mt-4">
            <Link href="/projects" className={viewMoreButtonClasses}>
              View more
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
