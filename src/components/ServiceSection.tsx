'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCode, FiPenTool, FiShield, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (يبقى كما هو للتناسق) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 40 });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <h2 ref={titleRef} className="font-custom-pencerio text-5xl md:text-6xl font-bold text-black tracking-wide">
        {title}
      </h2>
    </div>
  );
};

// --- 1. مكون بطاقة الخدمة بالتصميم الشبكي الجديد ---
const ServiceCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative p-8 bg-white border border-gray-200 rounded-lg overflow-hidden transition-colors duration-300 hover:bg-black"
    >
      {/* الرقم الكبير في الخلفية */}
      <span className="absolute top-0 right-8 text-[120px] font-black text-gray-100 transition-colors duration-300 group-hover:text-gray-800 z-0">
        {String(index + 1).padStart(2, '0')}
      </span>
      
      <div className="relative z-10 flex flex-col h-full">
        <Icon className="w-10 h-10 text-black mb-6 transition-colors duration-300 group-hover:text-white" />
        
        <h3 className="font-custom-heading text-2xl font-bold text-black mb-3 transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>
        
        <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow transition-colors duration-300 group-hover:text-gray-300">
          {description}
        </p>

        {/* السهم الذي يظهر عند المرور */}
        <FiArrowRight className="w-8 h-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 self-end" />
      </div>
    </div>
  );
};

// --- المكون الرئيسي للقسم ---
export default function ServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: FiCode,
      title: "Web Development",
      description: "Building robust, scalable, and high-performance websites using modern technologies for a seamless user experience."
    },
    {
      icon: FiPenTool,
      title: "UI/UX Design",
      description: "Crafting intuitive and beautiful user interfaces that captivate your audience and reflect your brand identity."
    },
    {
      icon: FiTrendingUp,
      title: "SEO Optimization",
      description: "Enhancing your digital presence to rank higher in search results and attract valuable organic traffic."
    },
    {
      icon: FiShield,
      title: "Cybersecurity",
      description: "Protecting your digital assets with proactive security measures, vulnerability assessments, and data protection."
    },
  ];

  return (
    <section ref={sectionRef} id="service" className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* العنوان في الأعلى */}
        <div className="mb-16 md:mb-24 text-center">
          <SectionTitle title="Services" />
        </div>

        {/* الشبكة الجديدة للخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
