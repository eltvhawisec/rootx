'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion, useMotionValue, useAnimation, useTransform, PanInfo, ResolvedValues } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. قائمة بمسارات صور الشهادات ---
// استبدل هذه المسارات بالمسارات الحقيقية لصورك في مجلد public/testimonials
const testimonialImages = [
  '/1.png',
  '/2.png',
  '/5.png',
  '/6.png',
];

// ============================================================================
// --- 2. مكون RollingGallery مدمج هنا ---
// ============================================================================
interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({ autoplay = false, pauseOnHover = false, images = [] }) => {
  const galleryImages = images.length > 0 ? images : [];

  // التأكد من أننا في بيئة المتصفح قبل الوصول إلى window
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(typeof window !== 'undefined' ? window.innerWidth <= 640 : false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(rotation, (val: number) => `rotate3d(0,1,0,${val}deg)`);

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 40, // تم إبطاء الحركة قليلاً لتكون أكثر وضوحًا
        ease: 'linear',
        repeat: Infinity
      }
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay, controls, rotation]);

  const handleUpdate = (latest: ResolvedValues) => {
    if (typeof latest.rotateY === 'number') {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {/* --- تعديل لون التدرج ليتناسب مع خلفية القسم (bg-black) --- */}
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0) 0%, #000 100%)' }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, #000 100%)' }}
      />
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d'
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`
              }}
            >
              <img
                src={url}
                alt={`Testimonial ${i + 1}`}
                className="pointer-events-none w-auto h-auto max-w-[350px] max-h-[200px] rounded-lg border-2 border-gray-700 object-contain transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================================
// --- 3. المكون الرئيسي للقسم الذي يستخدم RollingGallery ---
// ============================================================================

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0, y: 40, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' }
    });
  }, []);
  return (
    <div ref={titleRef} className="text-center mb-16 md:mb-20">
      <h2 className="font-custom-pencerio text-5xl md:text-6xl font-bold text-white tracking-wide">{title}</h2>
      <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          title="What My Clients Say"
          subtitle="Real feedback from real clients. I'm proud to have partnered with them to build digital experiences that not only meet but exceed expectations."
        />
      </div>
      
      <div className="mt-8">
        <RollingGallery 
          images={testimonialImages} 
          autoplay={true} 
          pauseOnHover={true} 
        />
      </div>
    </section>
  );
}
