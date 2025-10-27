'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const CertificationCard = ({ name, issuer, imageUrl, index }: { name: string; issuer: string; imageUrl: string; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    gsap.from(cardElement, {
      opacity: 0,
      scale: 0.8,
      rotateY: -30, 
      y: 60,
      duration: 1,
      ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: {
        trigger: cardElement.parentElement,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:h-44"
    >
      <Image
        src={imageUrl}
        alt={`${name} logo`}
        width={150}
        height={80}
        className="object-contain transition-all duration-500 ease-in-out group-hover:scale-90 group-hover:opacity-0"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
        <h3 className="text-base font-bold text-white md:text-lg">{name}</h3>
        <p className="mt-1 text-sm text-purple-400">{issuer}</p>
      </div>
    </div>
  );
};


export default function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const certifications = [
    { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', imageUrl: '/eltuhami.ico' },
    { name: 'Offensive Security Certified Professional (OSCP)', issuer: 'Offensive Security', imageUrl: '/eltuhami.ico' },
    { name: 'CompTIA Security+', issuer: 'CompTIA', imageUrl: '/eltuhami.ico' },
    { name: 'Certified Information Systems Security Professional (CISSP)', issuer: '(ISC)²', imageUrl: '/eltuhami.ico' },
    { name: 'eLearnSecurity Junior Penetration Tester (eJPT)', issuer: 'INE', imageUrl: '/eltuhami.ico' },
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', imageUrl: '/eltuhami.ico' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(backgroundRef.current, {
        y: '25%',
        rotate: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      
      <div
        ref={backgroundRef}
        className="absolute inset-x-0 top-[10%] z-0 mx-auto h-[80%] w-[60%] md:w-[50%]"
      >
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: "url('/blob.svg')" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2
          ref={titleRef}
          className="mb-16 text-center font-custom-pencerio text-6xl font-bold tracking-wider text-white md:text-7xl"
        >
          Recognized Credentials
        </h2>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard
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
