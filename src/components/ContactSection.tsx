// src/components/ContactSection.tsx
"use client";

import React, { useState } from 'react';

// --- مكون العنوان (لا تغيير) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
    <div className="h-1.5 flex-grow bg-white"></div>
    <h2 className="text-5xl font-extrabold tracking-wider shrink-0 text-white">
      &#123;{title}&#125;
    </h2>
    <div className="h-1.5 flex-grow bg-white"></div>
  </div>
);

// --- مكون حقل الإدخال (لا تغيير) ---
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

// --- مكون الفيديو للخلفية (تم تعديله ليقبل الرابط) ---
const BackgroundVideoLink = ({ href, src, className }: { href: string, src: string, className: string }) => (
  // --- التعديل هنا: تم تغليف الفيديو برابط ---
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`absolute transition-transform duration-300 hover:scale-110 hover:opacity-100 ${className}`}
  >
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      // --- التعديل هنا: تم تكبير حجم الفيديو ---
      className="w-28 h-28 md:w-32 md:h-32 opacity-60 pointer-events-none" // زادت الشفافية قليلاً
    />
  </a>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    gmail: '',
    name: '',
    message: '',
  });

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
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 bg-black text-white rounded-3xl border-none focus:ring-2 focus:ring-gray-500 outline-none"
            />
          </div>
          <button 
            type="submit"
            className="w-full p-3 bg-black text-white text-lg font-bold rounded-full transition-transform hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>

      {/* --- فيديوهات الخلفية (تم تعديلها بالكامل) --- */}
      {/* استبدل "#" بالروابط الحقيقية لصفحاتك */}
      <BackgroundVideoLink 
        href="https://instagram.com/eltuhami249" 
        src="/instagram-logo.mp4" 
        className="top-[20%] left-[10%]" // تم تغيير الموضع
      />
      <BackgroundVideoLink 
        href="https://tiktok.com/@your-profile" 
        src="/tiktok-logo.mp4" 
        className="top-[45%] right-[12%]" // تم تغيير الموضع
      />
      <BackgroundVideoLink 
        href="https://t.me/your-channel" 
        src="/telegram-logo.mp4" 
        className="bottom-[15%] left-[20%]" // تم تغيير الموضع
      />
    </section>
   );
}
