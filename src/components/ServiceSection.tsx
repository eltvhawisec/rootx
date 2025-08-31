'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCode, FiPenTool, FiShield, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// --- SectionTitle Component (remains unchanged) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftLineRef.current, { xPercent: -100 });
      gsap.set(rightLineRef.current, { xPercent: 100 });
      gsap.set(textRef.current, { y: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: 'power3.inOut', duration: 1.2 }
      });

      tl.to(leftLineRef.current, { xPercent: 0 })
        .to(rightLineRef.current, { xPercent: 0 }, "<")
        .to(textRef.current, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={titleRef} className="flex items-center gap-6 w-full">
      <div className="flex-grow overflow-hidden">
        <div ref={leftLineRef} className="h-2 w-full bg-black"></div>
      </div>
      <h2 ref={textRef} className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-black">
        &#123;{title}&#125;
      </h2>
      <div className="flex-grow overflow-hidden">
        <div ref={rightLineRef} className="h-2 w-full bg-black"></div>
      </div>
    </div>
  );
};


// --- Main ServiceSection Component (Expanded) ---
export default function ServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const listItems = listRef.current?.children;
    if (!listItems) return;

    const ctx = gsap.context(() => {
      gsap.set(listItems, { opacity: 0, y: 50 });

      gsap.to(listItems, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: 'power4.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- Expanded service data ---
  const services = [
    {
      icon: FiCode,
      title: "Web Development",
      description: "We build robust, scalable, and high-performance websites and applications using modern technologies like React and Next.js, ensuring a fast and seamless user experience that meets your business goals."
    },
    {
      icon: FiPenTool,
      title: "UI/UX Design",
      description: "We craft intuitive and beautiful user interfaces that captivate your audience and drive conversions. Our focus is on creating seamless user journeys and visually appealing designs that reflect your brand identity."
    },
    {
      icon: FiTrendingUp,
      title: "SEO Optimization",
      description: "Enhance your digital presence to rank higher in search results and attract organic traffic. Our strategies include keyword research, technical SEO, on-page optimization, and quality link building."
    },
    {
      icon: FiShield,
      title: "Cybersecurity",
      description: "Protect your digital assets with proactive security measures and protocols. Our services include vulnerability assessments, network security, and data protection to ensure your business operates securely."
    },
  ];

  return (
    <section ref={sectionRef} id="service" className="w-full py-24 px-6 md:px-12 lg:px-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="w-full md:max-w-xl mb-24">
          <SectionTitle title="Services" />
        </div>

        {/* ================================================================== */}
        {/* --- Content and layout have been enhanced here --- */}
        {/* ================================================================== */}
        <div ref={listRef} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex flex-col p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-black rounded-full mr-5">
                    <Icon className="text-white text-3xl" />
                  </div>
                  <h3 className="font-custom-heading text-3xl font-bold text-black">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <a href="#" className="group text-black font-semibold text-lg mt-auto flex items-center">
                  Learn More
                  <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
