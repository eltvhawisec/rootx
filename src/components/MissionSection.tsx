'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (لا تغيير هنا) ---
const SectionTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
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
      <h2 
        ref={titleRef} 
        className="font-custom-pencerio text-5xl font-bold tracking-wider md:text-6xl"
        style={{ color: '#E029F5' }}
      >
        {title}
      </h2>
    </div>
  );
};

// --- المكون الرئيسي للقسم (مع التصحيح) ---
export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      textElementsRef.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="mission" 
      className="w-full overflow-hidden bg-black py-24 px-6 md:py-32 lg:px-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 md:grid-cols-3">
        
        <div className="sticky top-24 md:col-span-1">
          <SectionTitle title="Our Mandate" />
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-10 text-xl font-light leading-relaxed text-gray-300 md:text-2xl">
            
            {/* ----- تم التصحيح هنا ----- */}
            <p ref={(el) => (textElementsRef.current[0] = el)}>
              In a world of escalating digital threats, our mandate is absolute: to engineer <strong className="font-semibold text-purple-400">impenetrable digital fortresses</strong>. We don&apos;t just build applications; we forge shields in the digital realm.
            </p>
            {/* ------------------------- */}
            
            <p ref={(el) => (textElementsRef.current[1] = el)}>
              Our approach is a synthesis of <strong className="font-semibold text-white">proactive threat intelligence</strong> and bespoke security architecture. We anticipate vulnerabilities before they are exploited, transforming your digital presence from a potential liability into a resilient, secure asset.
            </p>

            <p ref={(el) => (textElementsRef.current[2] = el)}>
              We empower our clients to operate with confidence, knowing their digital infrastructure is not only innovative and performant, but <strong className="font-semibold text-purple-400">uncompromisingly secure</strong>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
