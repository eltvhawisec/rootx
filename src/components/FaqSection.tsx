'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. بيانات الأسئلة الشائعة باللغة الإنجليزية ---
const faqData = [
  {
    question: 'What sets you apart from other developers or website builders?',
    answer: 'I deliver fully custom, integrated solutions, not just websites. Unlike template-based platforms that limit your brand, I build unique digital experiences tailored to your business goals. My background in cybersecurity is my key differentiator; every line of code is written with the security of your data and your customers\' data in mind, which is invaluable in today\'s digital landscape.',
  },
  {
    question: 'How do you ensure my website will rank well on Google (SEO)?',
    answer: 'SEO is an integral part of my development process. I focus on core pillars: a fast, well-structured site architecture, responsive design for all devices, strategic keyword implementation, and automatic sitemap generation. This ensures search engines can efficiently crawl and index your site, giving you the best possible foundation for ranking high in search results.',
  },
  {
    question: 'My current website is slow and performs poorly. Can you fix it, or should I start over?',
    answer: 'It depends on the situation. I always start with a comprehensive audit to identify the root cause. Often, significant improvements can be made by optimizing code and assets. However, if the underlying codebase is outdated and insecure, building a new site with modern, high-performance technology like Next.js is often the most effective long-term solution for performance, security, and scalability.',
  },
  {
    question: 'What is the approximate cost of a project? Are there any hidden fees?',
    answer: 'The cost is entirely dependent on the project\'s scope and complexity. After our initial consultation to understand your needs, I provide a detailed and fully transparent quote. There are absolutely no hidden fees. The proposal will cover everything from design to deployment. The only additional costs would be for third-party services like web hosting or a domain name.',
  },
  {
    question: 'Will I be able to update the website content myself?',
    answer: 'Absolutely. Empowering you to manage your own content is a key goal. I integrate your site with a user-friendly Headless CMS (like Sanity or Strapi), which allows you to easily update text, change images, and add new blog posts yourself, no technical knowledge required.',
  },
  {
    question: 'How long does it take to build a new website, and how can I track the progress?',
    answer: 'The timeline varies with project complexity, but a typical mid-sized project takes 1 to 2 weeks. I believe in full transparency, so you will have access to a private preview link to see live progress. We\'ll also have regular, brief check-in meetings to discuss developments and ensure we are perfectly aligned.',
  },
  {
    question: 'Will the website design be unique to me, or do you use templates?',
    answer: 'Every design I create is 100% unique and custom-built for you. I never use pre-made templates. My process begins with a deep dive into your brand and audience, followed by a custom UI/UX design that precisely reflects your identity and meets your objectives. This ensures your website stands out and is truly one-of-a-kind.',
  },
  {
    question: 'What happens after the website is launched? Do you offer support?',
    answer: 'The launch is just the beginning. I offer optional support and maintenance packages that include regular security updates, backups, and performance monitoring to ensure your site remains fast, secure, and up-to-date. My goal is to build a long-term partnership, and I\'m here to help you grow.',
  },
];


// --- مكون السؤال الواحد (مع تعديل اتجاه النص) ---
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.from(itemRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: itemRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      }
    });
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    gsap.to(answerRef.current, {
      height: isOpen ? 0 : 'auto',
      opacity: isOpen ? 0 : 1,
      duration: 0.4,
      ease: 'power3.inOut',
    });
  };

  return (
    // --- 2. إزالة dir="rtl" واستخدام التخطيط الافتراضي LTR ---
    <div ref={itemRef} className="border-b border-gray-200 py-6">
      <div 
        className="flex justify-between items-center cursor-pointer gap-4"
        onClick={toggleOpen}
      >
        <h3 className="text-xl md:text-2xl font-semibold text-black">{question}</h3>
        <div className="relative w-6 h-6 flex-shrink-0">
          <div className={`absolute w-full h-0.5 bg-black top-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}></div>
          <div className={`absolute w-full h-0.5 bg-black top-1/2 -translate-y-1/2 transition-transform duration-300 rotate-90 ${isOpen ? 'rotate-180' : 'rotate-90'}`}></div>
        </div>
      </div>
      <div ref={answerRef} className="h-0 overflow-hidden">
        <p className="text-gray-600 text-lg pt-4 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

// --- مكون عنوان القسم ---
const SectionTitle = ({ title }: { title: string }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    useLayoutEffect(() => {
      if (!titleRef.current) return;
      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none none" }
      });
    }, []);
    return (
      <div className="relative mb-12 md:mb-16 text-center">
        <h2 ref={titleRef} className="font-custom-pencerio text-5xl md:text-6xl font-bold text-black tracking-wide">
          {title}
        </h2>
      </div>
    );
};


// --- المكون الرئيسي للقسم ---
export default function FaqSection() {
  return (
    <section id="faq" className="w-full py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle title="Frequently Asked Questions" />
        
        <div className="flex flex-col">
          {faqData.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
