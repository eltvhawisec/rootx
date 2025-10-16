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
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
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

// --- 1. مكون بطاقة الخدمة بالتصميم الأحادي اللون الجديد ---
const ServiceCard = ({ icon: Icon, title, description, isLast }: { icon: React.ElementType, title: string, description: string, isLast: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      // تأثير ظهور بسيط وأنيق
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
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
    // الحاوية الرئيسية مع تأثير التفاعل
    <div
      ref={cardRef}
      className={`group w-full p-8 md:p-10 border-t border-black transition-colors duration-500 ease-in-out hover:bg-black ${isLast ? 'border-b' : ''}`}
    >
      <div className="flex justify-between items-center">
        {/* الجزء الأيسر: الأيقونة والعنوان */}
        <div className="flex items-center gap-6 md:gap-8">
          <Icon className="w-9 h-9 md:w-12 md:h-12 text-black transition-colors duration-500 ease-in-out group-hover:text-white shrink-0" />
          <h3 className="font-custom-pencerio text-3xl md:text-5xl font-bold text-black transition-colors duration-500 ease-in-out group-hover:text-white">
            {title}
          </h3>
        </div>
        
        {/* الجزء الأيمن: السهم */}
        <div className="shrink-0">
          <FiArrowRight className="w-8 h-8 md:w-10 md:h-10 text-black transition-all duration-500 ease-in-out group-hover:text-white group-hover:scale-110 group-hover:rotate-[-45deg]" />
        </div>
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
    // تم تغيير الخلفية إلى الأبيض الصريح
    <section ref={sectionRef} id="service" className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 md:mb-24 text-center">
          <SectionTitle title="Services" />
        </div>

        {/* قائمة الخدمات العمودية */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description} // الوصف لم يعد يظهر مباشرة، لكن يمكن إضافته عند النقر
              isLast={index === services.length - 1} // لتحديد العنصر الأخير وإضافة حد سفلي له
            />
          ))}
        </div>
      </div>
    </section>
  );
}
