'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-sm border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/30">
    {children}
  </span>
);

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // helper: select inside section
    const q = (sel: string) => section.querySelector(sel);
    const qAll = (sel: string) => section.querySelectorAll(sel);

    /* ── set all initial invisible states BEFORE any scroll check ── */
    gsap.set(q('.anim-progress'),  { scaleY: 0, transformOrigin: 'top' });
    gsap.set(q('.anim-eyebrow'),   { opacity: 0, x: -16 });
    gsap.set(q('.anim-name'),      { opacity: 0, y: 60 });
    gsap.set(q('.anim-roles'),     { opacity: 0, y: 18 });
    gsap.set(q('.anim-line'),      { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.anim-bio'),       { opacity: 0, y: 22 });
    gsap.set(q('.anim-tags'),      { opacity: 0, y: 14 });
    gsap.set(q('.anim-footer'),    { opacity: 0, y: 12 });
    gsap.set(q('.anim-card'),      { opacity: 0, x: 36 });
    gsap.set(q('.anim-card-info'), { opacity: 0, y: 10 });
    gsap.set(qAll('.anim-stat'),   { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {

      /* ── scroll progress bar ── */
      gsap.to(q('.anim-progress'), {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom center', scrub: true },
      });

      /* ── glow float ── */
      gsap.to(q('.anim-glow'), {
        y: -80, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      /* ── image parallax ── */
      gsap.fromTo(q('.anim-img'),
        { scale: 1.08, yPercent: -3 },
        { scale: 1, yPercent: 3, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 60%', end: 'bottom bottom', scrub: 1.8 } }
      );

      /* ── card entrance ── */
      const cardTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      });
      cardTl
        .to(q('.anim-card'),      { opacity: 1, x: 0, duration: 1.4, ease: 'expo.out' })
        .to(q('.anim-card-info'), { opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.6');

      /* ── text cascade ── */
      const textTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 72%', toggleActions: 'play none none none' },
      });
      textTl
        .to(q('.anim-eyebrow'), { opacity: 1, x: 0,     duration: 0.8, ease: 'power3.out' })
        .to(q('.anim-name'),    { opacity: 1, y: 0,     duration: 1.4, ease: 'expo.out'   }, '-=0.5')
        .to(q('.anim-roles'),   { opacity: 1, y: 0,     duration: 0.9, ease: 'expo.out'   }, '-=0.9')
        .to(q('.anim-line'),    { scaleX: 1,            duration: 1.0, ease: 'expo.out'   }, '-=0.7')
        .to(q('.anim-bio'),     { opacity: 1, y: 0,     duration: 1.0, ease: 'expo.out'   }, '-=0.7')
        .to(q('.anim-tags'),    { opacity: 1, y: 0,     duration: 0.8, ease: 'expo.out'   }, '-=0.6')
        .to(q('.anim-footer'),  { opacity: 1, y: 0,     duration: 0.7, ease: 'expo.out'   }, '-=0.5');

      /* ── stats ── */
      qAll('.anim-stat').forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.8, delay: 0.1 * i, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
        });
      });

      /* ── refresh after layout settles ── */
      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '60+', label: mounted ? (t('statFollowers')  ?? 'Followers')        : 'Followers' },
    { value: '40+', label: mounted ? (t('statVisitors')   ?? 'Site Visitors')    : 'Site Visitors' },
    { value: '8+',  label: mounted ? (t('statProjects')   ?? 'Projects')         : 'Projects' },
  ];

  const roles = mounted ? [
    t('roleTrainer')   ?? 'Trainer',
    t('rolePentester') ?? 'Penetration Tester',
    t('roleAnalyst')   ?? 'Security Analyst',
  ] : ['Trainer', 'Penetration Tester', 'Security Analyst'];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-[#080808] py-28 md:py-40"
    >
      {/* ── grain ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── faint grid ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.016]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '90px 90px',
        }}
      />

      {/* ── separators ── */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── scroll progress ── */}
      <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]">
        <div
          className="anim-progress w-full bg-gradient-to-b from-white/25 to-transparent"
          style={{ height: '100%' }}
        />
      </div>

      {/* ── ambient glow ── */}
      <div
        className="anim-glow pointer-events-none absolute z-0"
        style={{
          top: '5%',
          left: isRtl ? 'auto' : '-15%',
          right: isRtl ? '-15%' : 'auto',
          width: '650px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(90,35,160,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:gap-20 lg:gap-28">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-1 flex-col">

            {/* eyebrow */}
            <div className="anim-eyebrow mb-7 flex items-center gap-3">
              <span className="text-[10px] font-medium tracking-[0.35em] text-white/20 uppercase">03</span>
              <span className="h-px w-7 bg-white/10" />
              <span className="text-[10px] font-medium tracking-[0.35em] text-white/20 uppercase">{t('aboutTitle') ?? 'About'}</span>
            </div>

            {/* name */}
            <h2
              className="anim-name font-custom-pencerio font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.2rem,7vw,5.8rem)' }}
            >
              <span className="block text-white">Saleh</span>
              <span
                className="block"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}
              >
                Boukhder
              </span>
            </h2>

            {/* roles */}
            <div className="anim-roles mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
              {roles.map((r, i) => (
                <span key={r} className="flex items-center gap-3">
                  <span className="text-[12px] font-light tracking-[0.1em] text-white/32">{r}</span>
                  {i < roles.length - 1 && <span className="h-px w-4 bg-white/10" />}
                </span>
              ))}
            </div>

            {/* divider */}
            <div className="anim-line my-8 h-px w-14 bg-white/[0.08]" />

            {/* bio */}
            <div className="anim-bio space-y-5" suppressHydrationWarning>
              <p className="text-[15px] font-light leading-[1.95] text-white/28" suppressHydrationWarning>
                {mounted ? t('aboutText1') : ''}
              </p>
              <p className="text-[15px] font-light leading-[1.95] text-white/28" suppressHydrationWarning>
                {mounted ? t('aboutText2') : ''}
              </p>
            </div>

            {/* tags */}
            <div className="anim-tags mt-7 flex flex-wrap gap-2" suppressHydrationWarning>
              <Tag>{mounted ? (t('tagPentesting')  ?? 'Web App Pentesting')     : 'Web App Pentesting'}</Tag>
              <Tag>{mounted ? (t('tagVuln')        ?? 'Vulnerability Analysis') : 'Vulnerability Analysis'}</Tag>
              <Tag>{mounted ? (t('tagConsulting')  ?? 'Security Consulting')    : 'Security Consulting'}</Tag>
              <Tag>{mounted ? (t('tagAwareness')   ?? 'Digital Awareness')      : 'Digital Awareness'}</Tag>
            </div>

            {/* stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              {stats.map((s) => (
                <div key={s.label} className="anim-stat group flex flex-col gap-2">
                  <span className="font-custom-pencerio text-[2rem] font-bold tracking-tight text-white/85 transition-colors duration-300 group-hover:text-white">
                    {s.value}
                  </span>
                  <span className="whitespace-pre-line text-[9px] font-medium leading-snug tracking-[0.18em] text-white/20 uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="anim-footer mt-8 flex items-center gap-2.5">
              <span className="h-1 w-1 rounded-full bg-white/18" />
              <span className="text-[9px] tracking-[0.28em] text-white/14 uppercase">
                rootx — {t('footerTagline') ?? 'security & precision'}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Image card ── */}
          <div className="flex w-full flex-shrink-0 items-start justify-center md:w-[260px] lg:w-[300px] md:sticky md:top-32">
            <div className="anim-card relative w-full">

              {/* portrait */}
              <div
                className="relative overflow-hidden"
                style={{ width: '100%', aspectRatio: '3/4', borderRadius: '2px' }}
              >
                <img
                  className="anim-img h-full w-full object-cover object-top"
                  src="/Boukhder.jpg"
                  alt="Saleh Boukhder"
                  style={{ filter: 'brightness(0.78) contrast(1.06) saturate(0.82)' }}
                />

                {/* bottom gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.3) 40%, transparent 65%)' }}
                />

                {/* name overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  <p className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase">
                    Saleh Boukhder
                  </p>
                  <p className="mt-1 text-[9px] tracking-[0.22em] text-white/25 uppercase">
                    {t('cardRole') ?? 'Cybersecurity'}
                  </p>
                </div>

                {/* hairline border */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ outline: '1px solid rgba(255,255,255,0.06)', outlineOffset: '-1px' }}
                />

                {/* corner brackets */}
                {([
                  { p: 'top-3 left-3',    d: 'M0 10 L0 0 L10 0' },
                  { p: 'top-3 right-3',   d: 'M10 10 L10 0 L0 0' },
                  { p: 'bottom-3 left-3', d: 'M0 0 L0 10 L10 10' },
                  { p: 'bottom-3 right-3',d: 'M10 0 L10 10 L0 10' },
                ] as const).map(({ p, d }, i) => (
                  <div key={i} className={`absolute ${p} z-20`}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d={d} stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeLinecap="square" />
                    </svg>
                  </div>
                ))}
              </div>

              {/* info strip */}
              <div className="anim-card-info mt-4 flex flex-col gap-3 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/35" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/50" />
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/22">
                    {t('availableLabel') ?? 'Available for work'}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    t('serviceWebPentest')   ?? 'Web Penetration Testing',
                    t('serviceTraining')     ?? 'Security Training',
                    t('serviceConsulting')   ?? 'Tech Consulting',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-px w-4 flex-shrink-0 bg-white/12" />
                      <span className="text-[10px] font-light tracking-[0.08em] text-white/25">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}