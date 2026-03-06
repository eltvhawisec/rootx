'use client';

import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Sidebar from '@/components/Sidebar';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

/* ─────────────── SUB-COMPONENTS ─────────────── */

const MenuIcon = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="group relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-[6px]"
  >
    <span className="block h-px w-6 rounded-full bg-white/50 transition-all duration-500 group-hover:w-6 group-hover:bg-white" />
    <span className="block h-px w-4 rounded-full bg-white/30 transition-all duration-500 group-hover:w-6 group-hover:bg-white" />
  </button>
);

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const toggle = () => {
    const lang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };
  return (
    <button
      onClick={toggle}
      className="z-50 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white/70"
    >
      {t('toggleLanguage')}
    </button>
  );
};

/* ─────────────── MAIN HERO ─────────────── */

export default function Hero() {
  const { t } = useTranslation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const q   = (s: string) => hero.querySelector(s);
    const qAll = (s: string) => hero.querySelectorAll(s);

    /* ── initial states ── */
    gsap.set([q('.curtain-top'), q('.curtain-bottom')], { scaleY: 1 });
    gsap.set(q('.logo-reveal'),   { opacity: 0 });
    gsap.set(q('.logo-text'),     { opacity: 0, y: 20 });
    gsap.set(q('.logo-sub'),      { opacity: 0, scaleX: 0 });
    gsap.set(q('.atmosphere'),    { opacity: 0 });

    // image — full bleed approach
    gsap.set(q('.img-wrap'),      { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.set(q('.hero-img'),      { scale: 1.14, yPercent: 4 });
    gsap.set(q('.img-overlay'),   { opacity: 0 });

    // text
    gsap.set(q('.hl-number'),     { opacity: 0, x: -30 });
    gsap.set(q('.hl-eyebrow'),    { opacity: 0 });
    gsap.set(q('.hl-title-a'),    { opacity: 0, y: 80, skewY: 4 });
    gsap.set(q('.hl-title-b'),    { opacity: 0, y: 80, skewY: 4 });
    gsap.set(q('.hl-title-c'),    { opacity: 0, y: 80, skewY: 4 });
    gsap.set(q('.hl-desc'),       { opacity: 0, y: 20 });
    gsap.set(qAll('.hl-tag'),     { opacity: 0, y: 12 });
    gsap.set(q('.hl-cta'),        { opacity: 0, y: 16 });

    // chrome
    gsap.set(q('.menu-wrap'),     { opacity: 0 });
    gsap.set(q('.scroll-ind'),    { opacity: 0 });
    gsap.set(q('.bottom-bar'),    { opacity: 0, y: 10 });

    const tl = gsap.timeline({ delay: 0.3 });

    /* PHASE 1 — darkness, logo reveals */
    tl
      .to(q('.logo-reveal'), { opacity: 1, duration: 0.7, ease: 'power2.out' })
      .to(q('.logo-text'),   { opacity: 1, y: 0, duration: 1.8, ease: 'expo.out' }, '-=0.3')
      .to(q('.logo-sub'),    { opacity: 1, scaleX: 1, duration: 1.2, ease: 'expo.out', transformOrigin: 'center' }, '-=1')

    /* PHASE 2 — hold then curtains part */
      .to({}, { duration: 0.9 })
      .to(q('.logo-reveal'),  { opacity: 0, duration: 1.0, ease: 'power2.inOut' })
      .to([q('.curtain-top'), q('.curtain-bottom')], {
        scaleY: 0, duration: 1.8, ease: 'power3.inOut', stagger: 0.1,
      }, '-=0.7')

    /* PHASE 3 — atmosphere */
      .to(q('.atmosphere'), { opacity: 1, duration: 2.5, ease: 'power1.out' }, '-=1.4')

    /* PHASE 4 — image rises */
      .to(q('.img-wrap'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, '-=2.0')
      .to(q('.hero-img'), { scale: 1, yPercent: 0, duration: 2.8, ease: 'power2.out' }, '<')
      .to(q('.img-overlay'), { opacity: 1, duration: 1.2, ease: 'power1.out' }, '-=2.2')

    /* PHASE 5 — text cascade */
      .to(q('.hl-number'),  { opacity: 1, x: 0, duration: 1.0, ease: 'expo.out' }, '-=1.6')
      .to(q('.hl-eyebrow'), { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.7')
      .to(q('.hl-title-a'), { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'expo.out' }, '-=0.5')
      .to(q('.hl-title-b'), { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'expo.out' }, '-=0.85')
      .to(q('.hl-title-c'), { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'expo.out' }, '-=0.85')
      .to(q('.hl-desc'),    { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.7')
      .to(qAll('.hl-tag'),  { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'expo.out' }, '-=0.6')
      .to(q('.hl-cta'),     { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5')

    /* PHASE 6 — chrome */
      .to(q('.bottom-bar'), { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.6')
      .to(q('.menu-wrap'),  { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.6')
      .to(q('.scroll-ind'), { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');

    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { setSidebarOpen(false); setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300); }
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={scrollTo} />

      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden bg-[#080808]"
      >

        {/* ══ CURTAINS ══ */}
        <div className="curtain-top pointer-events-none absolute inset-x-0 top-0 z-50 h-1/2 origin-top bg-[#080808]" />
        <div className="curtain-bottom pointer-events-none absolute inset-x-0 bottom-0 z-50 h-1/2 origin-bottom bg-[#080808]" />

        {/* ══ LOGO INTRO ══ */}
        <div className="logo-reveal pointer-events-none absolute inset-0 z-[51] flex flex-col items-center justify-center gap-3">
          <span className="logo-text font-custom-pencerio text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-[0.06em] text-white/85">
            ROOTX
          </span>
          <div className="logo-sub h-px w-20 bg-white/12" />
        </div>

        {/* ══ FULL-BLEED IMAGE (left half) ══ */}
        <div
          className="img-wrap absolute inset-y-0 left-0 w-full md:w-[52%]"
        >
          <img
            src="/rootx.jpg"
            alt="Saleh Boukhder"
            className="hero-img h-full w-full object-cover object-center"
            style={{ filter: 'brightness(0.7) contrast(1.08) saturate(0.75)' }}
          />
          {/* layered overlays */}
          <div
            className="img-overlay absolute inset-0"
            style={{
              background: `
                linear-gradient(to right, rgba(8,8,8,0) 30%, rgba(8,8,8,0.95) 100%),
                linear-gradient(to top,   rgba(8,8,8,0.6) 0%,  transparent 40%),
                linear-gradient(to bottom,rgba(8,8,8,0.4) 0%,  transparent 25%)
              `,
            }}
          />
        </div>

        {/* ══ ATMOSPHERE ══ */}
        <div className="atmosphere pointer-events-none absolute inset-0 z-[1]">
          {/* noise */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
          {/* right glow */}
          <div
            className="absolute right-0 top-0 h-full w-1/2"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 90% 40%, rgba(80,30,160,0.08) 0%, transparent 70%)' }}
          />
        </div>

        {/* ══ MAIN CONTENT — right side ══ */}
        <div className="absolute inset-y-0 right-0 z-10 flex w-full flex-col justify-center px-8 md:w-[54%] md:px-12 lg:px-20">

          {/* section number */}
          <div className="hl-number mb-8 flex items-center gap-3">
            <span className="text-[9px] font-light tracking-[0.45em] text-white/18">01</span>
            <span className="h-px w-10 bg-white/10" />
            <span className="text-[9px] font-light tracking-[0.45em] text-white/18 uppercase">Hero</span>
          </div>

          {/* eyebrow */}
          <p className="hl-eyebrow mb-5 text-[10px] font-medium uppercase tracking-[0.38em] text-white/22">
            Cybersecurity · Creative Studio
          </p>

          {/* BIG title — vertical stack, each word own line */}
          <div className="overflow-hidden">
            <div
              className="hl-title-a font-custom-pencerio font-bold leading-[0.88] tracking-tight text-white"
              style={{ fontSize: 'clamp(3.8rem,7.5vw,7rem)' }}
            >
              root
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="hl-title-b font-custom-pencerio font-bold leading-[0.88] tracking-tight"
              style={{
                fontSize: 'clamp(3.8rem,7.5vw,7rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.28)',
              }}
            >
              x.
            </div>
          </div>
          <div className="overflow-hidden mt-1">
            <div
              className="hl-title-c font-custom-pencerio font-light leading-[1] tracking-[0.12em] text-white/18"
              style={{ fontSize: 'clamp(1rem,2vw,1.5rem)' }}
              suppressHydrationWarning
            >
              {mounted ? t('heroSubtitle') : 'where security meets craft'}
            </div>
          </div>

          {/* description */}
          <p className="hl-desc mt-8 max-w-[320px] text-[13px] leading-[2] text-white/28">
            Web application penetration tester &amp; trainer — turning vulnerability
            into resilience, one system at a time.
          </p>

          {/* tag pills */}
          <div className="mt-7 flex flex-wrap gap-2">
            {['Pentesting', 'Training', 'Consulting', 'Awareness'].map((tag) => (
              <span
                key={tag}
                className="hl-tag inline-flex items-center gap-1.5 rounded-[2px] border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="hl-cta mt-10 flex items-center gap-6">
            <button
              onClick={() => scrollTo('contact')}
              className="group flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50 transition-colors duration-300 hover:text-white"
            >
              <span>Get in touch</span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/5"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/22 transition-colors duration-300 hover:text-white/50"
            >
              About me
            </button>
          </div>
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div className="bottom-bar absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-8 pb-8 md:px-12">

          {/* left — name on image */}
          <div className="hidden flex-col gap-1 md:flex">
            <span className="text-[10px] font-medium tracking-[0.25em] text-white/35 uppercase">
              Saleh Boukhder
            </span>
            <span className="text-[9px] tracking-[0.2em] text-white/18 uppercase">
              Security Researcher
            </span>
          </div>

          {/* center — scroll indicator */}
          <div className="scroll-ind flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-8">
            <div className="relative h-10 w-px overflow-hidden bg-white/[0.06]">
              <div
                className="absolute left-0 top-0 w-full bg-white/30"
                style={{ height: '40%', animation: 'scrollDown 2.4s ease-in-out infinite' }}
              />
            </div>
          </div>

          {/* right — available */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/55" />
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/25">Available</span>
          </div>
        </div>

        <style>{`
          @keyframes scrollDown {
            0%   { transform: translateY(-100%); opacity: 0; }
            20%  { opacity: 1; }
            100% { transform: translateY(260%); opacity: 0; }
          }
        `}</style>

        {/* ══ NAV ══ */}
        <div className="menu-wrap absolute right-7 top-8 z-40 flex items-center gap-7 md:right-12 md:top-10">
          <LanguageSwitcher />
          <MenuIcon onClick={() => setSidebarOpen(true)} label={t('menuAriaLabel')} />
        </div>

      </section>
    </>
  );
}