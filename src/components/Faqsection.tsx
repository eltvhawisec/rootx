'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

/* ── single accordion item ── */
const FAQItem = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.55, ease: 'expo.out' }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: 'expo.in' });
    }
  }, [isOpen]);

  return (
    <div
      className="faq-item group border-b border-black/[0.07] last:border-0"
    >
      <button
        className="flex w-full items-start justify-between gap-8 py-7 text-left transition-colors duration-300"
        onClick={onToggle}
      >
        {/* number + question */}
        <div className="flex items-start gap-5">
          <span className="mt-0.5 flex-shrink-0 text-[9px] font-light tracking-[0.3em] text-black/20">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`font-custom-pencerio text-[16px] font-bold leading-snug tracking-tight transition-colors duration-300 md:text-[18px] ${
              isOpen ? 'text-black/85' : 'text-black/50 group-hover:text-black/75'
            }`}
          >
            {question}
          </span>
        </div>

        {/* plus / minus */}
        <div className="relative mt-1 flex-shrink-0">
          <span
            className={`block h-px w-4 bg-black/30 transition-all duration-400 ${
              isOpen ? 'rotate-0' : ''
            }`}
          />
          <span
            className={`absolute left-0 top-0 block h-px w-4 bg-black/30 transition-all duration-400 ${
              isOpen ? 'rotate-0 opacity-0' : 'rotate-90'
            }`}
          />
        </div>
      </button>

      {/* answer — height animated by gsap */}
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p className="pb-8 pl-9 text-[14px] font-light leading-[1.95] text-black/40 md:text-[15px]">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  useEffect(() => { setMounted(true); }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q    = (s: string) => section.querySelector(s);
    const qAll = (s: string) => section.querySelectorAll(s);

    gsap.set(q('.faq-eyebrow'),           { opacity: 0, x: -14 });
    gsap.set(q('.faq-title'),             { opacity: 0, y: 44 });
    gsap.set(q('.faq-divider'),           { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.faq-subtitle'),          { opacity: 0, y: 16 });
    gsap.set(q('.faq-progress-fill'),     { scaleY: 0, transformOrigin: 'top' });
    gsap.set(qAll('.faq-item'),           { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 76%', toggleActions: 'play none none none' },
      });
      hTl
        .to(q('.faq-eyebrow'), { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .to(q('.faq-title'),   { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out'   }, '-=0.6')
        .to(q('.faq-divider'), { scaleX: 1,         duration: 1.0, ease: 'expo.out'   }, '-=0.8')
        .to(q('.faq-subtitle'),{ opacity: 1, y: 0, duration: 0.8, ease: 'expo.out'   }, '-=0.6');

      gsap.to(qAll('.faq-item'), {
        opacity: 1, y: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.faq-list'), start: 'top 82%', toggleActions: 'play none none none' },
      });

      gsap.to(q('.faq-progress-fill'), {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom center', scrub: true },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: 'What cybersecurity services do I offer?',
      a: 'I offer consulting services in cybersecurity and technology, as well as training courses for digital awareness for individuals, employees, and the community. My services are specifically designed to meet the unique needs of businesses and organizations across various sectors, as well as individuals, to help them protect their assets and data in the digital world.',
    },
    {
      q: 'What is the best way to contact the cybersecurity support team?',
      a: 'You can reach me directly via email or through the contact section on this website. I am committed to providing quick and effective cybersecurity solutions to ensure your safety and respond to any inquiries or issues as fast as possible.',
    },
    {
      q: 'What is your data protection policy?',
      a: 'I provide a comprehensive cybersecurity assessment to identify vulnerabilities in your systems. All information shared during our engagement is treated with strict confidentiality, and our team ensures your data remains safe and protected from threats at all times.',
    },
    {
      q: 'Do you offer web application penetration testing?',
      a: 'Yes. I specialize in web application penetration testing — analyzing systems, identifying security vulnerabilities, and providing detailed reports with actionable recommendations to strengthen your digital defenses before attackers can exploit any weaknesses.',
    },
    {
      q: 'Can you help train employees on cybersecurity awareness?',
      a: 'Absolutely. I design and deliver tailored training programs for individuals, employees, and entire organizations. These sessions cover phishing, social engineering, password hygiene, incident response basics, and digital safety — turning your team into a human firewall.',
    },
    {
      q: 'What industries do you work with?',
      a: 'My services are sector-agnostic. I work with startups, SMEs, educational institutions, healthcare providers, and government entities. Any organization handling sensitive data or operating digital infrastructure can benefit from a structured security assessment and awareness program.',
    },
    {
      q: 'How long does a typical security assessment take?',
      a: 'The timeline depends on the scope and complexity of your systems. A focused web application assessment typically takes 3–7 days, while a comprehensive organizational security review may span 2–4 weeks. I provide a clear project scope and timeline before any engagement begins.',
    },
  ];

  const isRtl = mounted && i18n.language === 'ar';

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full overflow-hidden bg-white py-32 md:py-44"
    >
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* separators */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent" />

      {/* scroll progress */}
      <div className="absolute left-0 top-0 h-full w-px bg-black/[0.05]">
        <div className="faq-progress-fill w-full bg-gradient-to-b from-black/25 to-transparent" style={{ height: '100%' }} />
      </div>

      {/* ════ CONTENT ════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* ── two-column layout: header left, faq right (on desktop) ── */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.6fr] md:gap-20 lg:gap-32">

          {/* LEFT — sticky header */}
          <div className="md:sticky md:top-32 md:self-start">

            <div className="faq-eyebrow mb-6 flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/28">06</span>
              <span className="h-px w-8 bg-black/[0.10]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/28">FAQ</span>
            </div>

            <h2
              className="faq-title font-custom-pencerio font-bold leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem,5.5vw,4.8rem)' }}
            >
              <span className="block text-black/85">The most</span>
              <span className="block text-black/85">important</span>
              <span
                className="block"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.22)' }}
              >
                questions.
              </span>
            </h2>

            <div className="faq-divider mt-7 h-px w-12 bg-black/[0.08]" />

            <p className="faq-subtitle mt-6 max-w-[240px] text-[13px] font-light leading-[1.9] text-black/35">
              Everything you need to know about cybersecurity services, training, and how we can protect your digital world.
            </p>

            {/* decorative large number */}
            <div
              className="mt-12 select-none font-custom-pencerio font-bold leading-none"
              style={{
                fontSize: 'clamp(5rem,10vw,9rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(0,0,0,0.05)',
              }}
            >
              FAQ
            </div>
          </div>

          {/* RIGHT — accordion list */}
          <div className="faq-list flex flex-col divide-y-0">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                index={i}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

        </div>

        {/* ── bottom tagline ── */}
        <div className="mt-20 flex items-center justify-between border-t border-black/[0.05] pt-8">
          <span className="text-[9px] font-light uppercase tracking-[0.35em] text-black/20">
            Saleh Boukhder · Questions & Answers
          </span>
          <span className="text-[9px] font-light uppercase tracking-[0.35em] text-black/20">
            {faqs.length} questions answered
          </span>
        </div>

      </div>
    </section>
  );
}