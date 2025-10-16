'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- المكون الرئيسي للقسم (بتصميم البيان التفاعلي) ---
export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    // تقسيم النص إلى كلمات لتطبيق التأثير
    const words = textRef.current.innerText.split(' ');
    textRef.current.innerHTML = words.map(word => `<span class="word inline-block mr-4">${word}</span>`).join('');
    const wordSpans = textRef.current.querySelectorAll('.word');

    const mm = gsap.matchMedia();

    // هذا التأثير سيعمل على الشاشات الكبيرة فقط
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000', // استمر في التثبيت لمسافة 2000px من التمرير
          pin: true,
          scrub: 1,
        },
      });

      // حركة تلوين الكلمات من الرمادي إلى الأبيض
      tl.to(wordSpans, {
        color: '#FFFFFF', // اللون النهائي (أبيض)
        stagger: 0.1,     // تظهر الكلمات بشكل متتابع
        ease: 'none',
      });

      return () => {
        tl.kill();
      };
    });

    // تأثير أبسط للشاشات الصغيرة
    mm.add("(max-width: 767px)", () => {
        gsap.from(textRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
            }
        });
    });

  }, []);

  return (
    // يجب أن يكون للقسم ارتفاع كافٍ ليحدث تأثير التثبيت والتمرير
    <section ref={sectionRef} id="team" className="relative w-full min-h-[150vh] bg-black py-24 md:py-32">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-24">
        
        {/* النص الذي سيتم تحريكه */}
        <h2 
          ref={textRef} 
          className="font-custom-pencerio text-4xl md:text-6xl lg:text-7xl font-bold text-gray-700 max-w-6xl text-center leading-tight"
        >
          At the heart of AbabilSec lies a philosophy: development is an art, and security is its fortress. We don&apos;t just build web applications; we craft digital experiences, all while deconstructing vulnerabilities to forge a more resilient and trusted web.
        </h2>

      </div>
    </section>
  );
}
