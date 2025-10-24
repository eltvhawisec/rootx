'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// --- 1. مكون صورة الشهادة التفاعلي ---
const CertificationLogo = ({ name, issuer, imageUrl, index }: { name: string; issuer: string; imageUrl: string; index: number }) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const logoElement = logoRef.current;
    if (!logoElement) return;

    // حركة ظهور الشعارات بشكل متتابع
    gsap.from(logoElement, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      delay: index * 0.1, // تأخير متزايد لكل عنصر
      scrollTrigger: {
        trigger: logoElement,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });
  }, [index]);

  return (
    <div
      ref={logoRef}
      className="group relative flex h-32 w-full items-center justify-center rounded-lg border border-gray-800 bg-gray-900/40 p-6 transition-all duration-300 md:h-40"
    >
      {/* --- الصورة (الشعار) --- */}
      <Image
        src={imageUrl}
        alt={`${name} logo`}
        width={140}
        height={80}
        className="object-contain transition-all duration-500 group-hover:scale-90 group-hover:opacity-10" // تصغير وتعتيم الصورة عند المرور
      />

      {/* --- التفاصيل التي تظهر عند المرور (Hover) --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <h3 className="text-base font-bold text-white md:text-lg">{name}</h3>
        <p className="mt-1 text-sm text-purple-400">{issuer}</p>
      </div>
    </div>
  );
};

// --- 2. المكون الرئيسي للقسم ---
export default function CertificationsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // **مهم:** تأكد من وضع هذه الصور في مجلد /public/certs/
  const certifications = [
    { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', imageUrl: '/certs/ceh-logo.png' },
    { name: 'Offensive Security Certified Professional (OSCP)', issuer: 'Offensive Security', imageUrl: '/certs/oscp-logo.png' },
    { name: 'CompTIA Security+', issuer: 'CompTIA', imageUrl: '/certs/security-plus-logo.png' },
    { name: 'Certified Information Systems Security Professional (CISSP)', issuer: '(ISC)²', imageUrl: '/certs/cissp-logo.png' },
    { name: 'eLearnSecurity Junior Penetration Tester (eJPT)', issuer: 'INE', imageUrl: '/certs/ejpt-logo.png' },
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', imageUrl: '/certs/aws-ccp-logo.png' },
  ];

  useLayoutEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;
    gsap.from(titleElement, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleElement,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section id="certifications" className="w-full overflow-hidden bg-black py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2
          ref={titleRef}
          className="mb-16 text-center font-custom-pencerio text-6xl font-bold tracking-wider text-white md:text-7xl"
        >
          Recognized Credentials
        </h2>
        
        {/* --- شبكة الشعارات --- */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {certifications.map((cert, index) => (
            <CertificationLogo
              key={index}
              name={cert.name}
              issuer={cert.issuer}
              imageUrl={cert.imageUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
