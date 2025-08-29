// src/components/ContactSection.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- مكون العنوان (تم التعديل هنا) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
    <div className="h-1.5 flex-grow bg-white"></div>
    {/* --- التعديل هنا --- */}
    {/* تمت إضافة فئة "font-custom-heading" لتطبيق خط العناوين */}
    <h2 className="font-custom-heading text-5xl font-extrabold tracking-wider shrink-0 text-white">
      &#123;{title}&#125;
    </h2>
    <div className="h-1.5 flex-grow bg-white"></div>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormInput = ({ id, label, type = 'text', value, onChange }: any) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-black mb-1">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-black text-white rounded-full border-none focus:ring-2 focus:ring-gray-500 outline-none"
    />
  </div>
);

// --- مكون الفيديو للخلفية (لا تغيير) ---
const BackgroundVideoLink = React.forwardRef<HTMLAnchorElement, { href: string, src: string, className: string }>(
  ({ href, src, className }, ref) => (
    <a 
      ref={ref}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`absolute transition-opacity duration-300 hover:opacity-100 z-20 ${className}`}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-28 h-28 md:w-32 md:h-32 opacity-60"
      />
    </a>
  )
);
BackgroundVideoLink.displayName = 'BackgroundVideoLink';


export default function ContactSection() {
  const [formData, setFormData] = useState({ gmail: '', name: '', message: '' });
  
  const video1Ref = useRef<HTMLAnchorElement>(null);
  const video2Ref = useRef<HTMLAnchorElement>(null);
  const video3Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const videos = [video1Ref.current, video2Ref.current, video3Ref.current];

    videos.forEach(video => {
      if (video) {
        const floatAnimation = (target: HTMLAnchorElement) => {
          gsap.to(target, {
            x: `random(-20, 20, 5)`,
            y: `random(-20, 20, 5)`,
            rotation: `random(-10, 10, 2)`,
            duration: `random(3, 5)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        };
        
        floatAnimation(video);
      }
    });
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Message Sent!");
  };

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 relative z-10">
        <SectionTitle title="Contact" />
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-[40px] p-8 flex flex-col gap-6 shadow-2xl shadow-gray-700/20"
        >
          <FormInput id="gmail" label="Gmail" type="email" value={formData.gmail} onChange={handleChange} />
          <FormInput id="name" label="Name" value={formData.name} onChange={handleChange} />
          <div className="w-full">
            <label htmlFor="message" className="block text-sm font-medium text-black mb-1">Message</label>
            <textarea id="message" value={formData.message} onChange={handleChange} rows={5} className="w-full p-3 bg-black text-white rounded-3xl border-none focus:ring-2 focus:ring-gray-500 outline-none" />
          </div>
          <button type="submit" className="w-full p-3 bg-black text-white text-lg font-bold rounded-full transition-transform hover:scale-105">Send</button>
        </form>
      </div>

      <BackgroundVideoLink ref={video1Ref} href="#" src="/instagram-logo.mp4" className="top-[20%] left-[10%]" />
      <BackgroundVideoLink ref={video2Ref} href="#" src="/tiktok-logo.mp4" className="top-[45%] right-[12%]" />
      <BackgroundVideoLink ref={video3Ref} href="#" src="/telegram-logo.mp4" className="bottom-[15%] left-[20%]" />
    </section>
  );
}
