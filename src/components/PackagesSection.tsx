'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCheck } from 'react-icons/fi'; // Checkmark icon

gsap.registerPlugin(ScrollTrigger);

// --- 1. Package data in English ---
const packagesData = [
  {
    name: 'Essential',
    price: 'Starting at $1,500',
    description: 'Perfect for personal portfolios and emerging startups.',
    features: [
      'Custom Design (up to 5 pages)',
      'Fully Responsive Layout',
      'Basic SEO Optimization',
      'Contact Form',
      'Deployment & Hosting Setup',
    ],
    isFeatured: false,
  },
  {
    name: 'Professional',
    price: 'Starting at $3,000',
    description: 'The most popular solution for businesses and e-commerce.',
    features: [
      'Everything in Essential Plan',
      'Advanced Design (up to 10 pages)',
      'Full E-commerce Integration',
      'Payment Gateway Setup',
      'Headless CMS Integration',
      'Advanced SEO Optimization',
    ],
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: 'Let\'s Talk',
    description: 'For large-scale projects and complex applications with unique needs.',
    features: [
      'Everything in Professional Plan',
      'Custom-built Features',
      'Third-party API Integrations',
      'Dedicated Security & Support',
      'High-Performance Architecture',
    ],
    isFeatured: false,
  },
];

// --- PackageCard Component (with LTR adjustments) ---
const PackageCard = ({
  name,
  price,
  description,
  features,
  isFeatured,
}: (typeof packagesData)[0]) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative border rounded-2xl p-8 flex flex-col ${
        isFeatured ? 'bg-black text-white border-gray-700 scale-105 shadow-2xl' : 'bg-white text-black border-gray-200'
      }`}
    >
      {isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className={`mt-2 ${isFeatured ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
      
      <div className="my-8">
        <span className="text-4xl font-extrabold">{price}</span>
      </div>

      {/* --- 2. Removed dir="rtl" for LTR layout --- */}
      <ul className="space-y-4 mb-10 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <FiCheck className={`w-5 h-5 flex-shrink-0 ${isFeatured ? 'text-blue-400' : 'text-blue-500'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full mt-auto font-bold py-3 rounded-lg transition-colors duration-300 ${
          isFeatured
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Get Started
      </button>
    </div>
  );
};

// --- SectionTitle Component (no changes needed) ---
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
      <h2 className="font-custom-pencerio text-5xl md:text-6xl font-bold text-black tracking-wide">{title}</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
};

// --- Main Section Component ---
export default function PackagesSection() {
  return (
    <section id="packages" className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* --- 3. English title and subtitle --- */}
        <SectionTitle 
          title="Choose Your Plan"
          subtitle="Clear, transparent solutions designed to fit your needs. Pick the package that suits your project and let's start building."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {packagesData.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
