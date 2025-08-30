// src/components/ContactSection.tsx

'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- مكون أيقونة التواصل (تم إضافة فئة للتحريك) ---
const SocialNode = ({ href, icon: Icon, style }: { href: string; icon: React.ElementType; style: React.CSSProperties }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-node absolute flex items-center justify-center w-14 h-14 bg-black rounded-full shadow-lg z-20 transition-transform duration-300 hover:!scale-110"
    style={style}
  >
    <Icon className="w-7 h-7 text-white" />
  </a>
);

// --- مكون حقل الإدخال (يبقى كما هو) ---
const FormInput = ({ id, placeholder, type = 'text', value, onChange }: any) => (
  <input
    type={type}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 bg-gray-100 text-black rounded-md border-2 border-gray-200 focus:border-black focus:ring-0 outline-none transition-all"
  />
);

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null); // Ref للكوكبة بأكملها

  const orbitRadius = 140;
  const socialNodes = [
    { href: "https://github.com/eltuhami249", icon: Github, angle: -45 },
    { href: "https://www.linkedin.com/in/ahmed-eltuhami-532354380", icon: Linkedin, angle: 45 },
    { href: "https://x.com/eltuhamisec?s=21", icon: Twitter, angle: 135 },
    { href: "https://instagram.com/eltuhamisec", icon: Instagram, angle: 225 },
  ].map(node => {
    const angleRad = (node.angle * Math.PI ) / 180;
    return {
      ...node,
      lineEnd: {
        x: Math.cos(angleRad) * orbitRadius,
        y: Math.sin(angleRad) * orbitRadius,
      },
      style: {
        left: `calc(50% + ${Math.cos(angleRad) * orbitRadius}px)`,
        top: `calc(50% + ${Math.sin(angleRad) * orbitRadius}px)`,
        transform: `translate(-50%, -50%)`
      }
    };
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- إعداد الحالة الأولية المحسّنة ---
      gsap.set(".planet", { scale: 0, opacity: 0 });
      gsap.set(".social-node", { scale: 0, opacity: 0 });
      gsap.set(".connection-line", { opacity: 0 });
      gsap.set(formRef.current, { opacity: 0, y: 50 });

      // --- الجدول الزمني للدخول المتقن ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        }
      });

      tl.to(".planet", { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' });
      tl.to(".connection-line", {
        opacity: 0.5, // شفافية خفيفة للخطوط
        duration: 1,
        ease: 'power3.inOut',
        stagger: 0.1,
      }, "-=0.8");
      tl.to(".social-node", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      }, "-=0.8");
      tl.to(formRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, "-=1");

      // --- 1. تأثير الاستجابة للفأرة (Parallax) ---
      const parallax = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = sectionRef.current!.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5; // -0.5 to 0.5
        const y = (clientY - top) / height - 0.5; // -0.5 to 0.5
        
        // تحريك الكوكبة بأكملها
        gsap.to(constellationRef.current, {
          x: -x * 30, // عكس الحركة بقوة 30px
          y: -y * 30,
          rotation: -x * 5, // دوران خفيف
          duration: 0.8,
          ease: 'power3.out',
        });
      };
      
      sectionRef.current?.addEventListener('mousemove', parallax);
      
      // إعادة الكوكبة لوضعها الطبيعي عند خروج الفأرة
      sectionRef.current?.addEventListener('mouseleave', () => {
        gsap.to(constellationRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-28 px-6 md:px-12 lg:px-24 bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-24">
        <SectionTitle title="Contact" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        <div className="flex justify-center items-center">
          {/* --- 2. تم إضافة Ref هنا للكوكبة بأكملها --- */}
          <div ref={constellationRef} className="relative w-[350px] h-[350px] flex justify-center items-center">
            {/* --- 3. تم إضافة ظل متوهج هنا --- */}
            <img
              src="/eltuhamiW.ico"
              alt="eltuhami"
              className="planet w-32 h-32 rounded-full object-cover z-10 [filter:drop-shadow(0_0_15px_rgba(0,0,0,0.2))]"
            />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 overflow-visible">
              <svg width="0" height="0" className="overflow-visible">
                {socialNodes.map((node, i) => (
                  <line
                    key={i}
                    className="connection-line"
                    x1="0"
                    y1="0"
                    x2={node.lineEnd.x}
                    y2={node.lineEnd.y}
                    stroke="black"
                    strokeWidth="1.5" // خط أنحف قليلاً
                  />
                ))}
              </svg>
            </div>
            
            {socialNodes.map((node, i) => (
              <SocialNode
                key={i}
                href={node.href}
                icon={node.icon}
                style={node.style}
              />
            ))}
          </div>
        </div>

        <form ref={formRef} className="w-full flex flex-col gap-5">
          <h2 className="font-custom-heading text-5xl font-bold mb-4">Get in Touch</h2>
          <FormInput id="name" placeholder="Your Name" value={formData.name} onChange={() => {}} />
          <FormInput id="email" placeholder="Your Email" type="email" value={formData.email} onChange={() => {}} />
          <textarea
            id="message"
            placeholder="Your Message..."
            rows={5}
            className="w-full p-3 bg-gray-100 text-black rounded-md border-2 border-gray-200 focus:border-black focus:ring-0 outline-none transition-all"
          />
          <button type="submit" className="w-full p-3 bg-black text-white text-lg font-bold rounded-md transition-transform hover:scale-105 flex items-center justify-center gap-2">
            Send <Send className="w-5 h-5" />
          </button>
        </form>
        </div>
      </div>
    </section>
  );
}





// --- مكون العنوان (تم تحديثه بالإصدار الذي يحتوي على تحريك) ---
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
    <div ref={titleRef} className="flex items-center justify-center gap-6 w-full max-w-xl mx-auto">
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

