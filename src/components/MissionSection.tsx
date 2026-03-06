'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q    = (s: string) => section.querySelector(s);
    const qAll = (s: string) => section.querySelectorAll(s);

    /* initial states */
    gsap.set(q('.m-eyebrow'),        { opacity: 0, x: -14 });
    gsap.set(q('.m-title'),          { opacity: 0, y: 44 });
    gsap.set(q('.m-divider'),        { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.m-glow'),           { opacity: 0 });
    gsap.set(q('.m-progress-fill'),  { scaleY: 0, transformOrigin: 'top' });
    gsap.set(qAll('.m-card'),        { opacity: 0, y: 50 });
    gsap.set(q('.m-footer'),         { opacity: 0, y: 10 });

    const ctx = gsap.context(() => {

      /* header */
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 76%', toggleActions: 'play none none none' },
      });
      hTl
        .to(q('.m-glow'),    { opacity: 1, duration: 2.0, ease: 'power1.out' })
        .to(q('.m-eyebrow'), { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=1.6')
        .to(q('.m-title'),   { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out' }, '-=0.7')
        .to(q('.m-divider'), { scaleX: 1, duration: 1.0, ease: 'expo.out' }, '-=0.8');

      /* cards — staggered */
      qAll('.m-card').forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 1.1, delay: i * 0.12, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none none' },
        });
      });

      /* footer */
      gsap.to(q('.m-footer'), {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: q('.m-footer'), start: 'top 92%', toggleActions: 'play none none none' },
      });

      /* scroll progress */
      gsap.to(q('.m-progress-fill'), {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom center', scrub: true },
      });

      /* glow parallax */
      gsap.to(q('.m-glow'), {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /*
    3 cards matching the wireframe:
    Card 1 — portrait image (square) + text below
    Card 2 — text above + square image below
    Card 3 — landscape image + text below (wider)
  */
  const cards = [
    {
      img: '/Boukhder3.jpg',
      aspect: '1/1',          // square — like left box in sketch
      imgPos: 'bottom',
      textKey: 'missionText1',
      label: '01',
    },
    {
      img: '/Boukhder2.webp',
      aspect: '1/1',          // square — like center box in sketch (text above)
      imgPos: 'top',
      textKey: 'missionText2',
      label: '02',
    },
    {
      img: '/bwdk2026.png',
      aspect: '4/3',          // landscape — like right box in sketch
      imgPos: 'bottom',
      textKey: 'missionText3',
      label: '03',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative w-full overflow-hidden bg-[#080808] py-32 md:py-44"
    >
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* separators */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      {/* scroll progress */}
      <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]">
        <div className="m-progress-fill w-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: '100%' }} />
      </div>

      {/* glow */}
      <div
        className="m-glow pointer-events-none absolute z-0"
        style={{
          top: '30%', right: '-8%',
          width: '500px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(70,25,140,0.07) 0%, transparent 70%)',
          filter: 'blur(65px)',
        }}
      />

      {/* ════ CONTENT ════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* ── HEADER ── */}
        <div className="mb-20 md:mb-28">
          <div className="m-eyebrow mb-6 flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">02</span>
            <span className="h-px w-8 bg-white/[0.08]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">Mission</span>
          </div>

          <h2
            className="m-title font-custom-pencerio font-bold leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(3rem,7vw,5.5rem)' }}
            suppressHydrationWarning
          >
            {mounted ? t('missionTitle') : 'Our Mission'}
          </h2>

          <div className="m-divider mt-6 h-px w-12 bg-white/[0.07]" />
        </div>

        {/* ── 3 CARDS ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6 md:items-start">

          {cards.map(({ img, aspect, imgPos, textKey, label }, i) => (
            <div
              key={label}
              className="m-card flex flex-col gap-5"
            >

              {/* text ABOVE image — only card 2 (imgPos=top means text on top) */}
              {imgPos === 'top' && (
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-light tracking-[0.35em] text-white/18 uppercase">{label}</span>
                  <p
                    className="text-[13px] font-light leading-[1.9] text-white/32"
                    suppressHydrationWarning
                  >
                    {mounted ? t(textKey) : ''}
                  </p>
                </div>
              )}

              {/* image */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: aspect, borderRadius: '2px' }}
              >
                <img
                  src={img}
                  alt={`Mission ${label}`}
                  className="h-full w-full object-cover"
                  style={{ filter: 'brightness(0.72) contrast(1.05) saturate(0.80)' }}
                />

                {/* subtle gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: imgPos === 'bottom'
                      ? 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)'
                      : 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 50%)',
                  }}
                />

                {/* hairline border */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ outline: '1px solid rgba(255,255,255,0.06)', outlineOffset: '-1px' }}
                />

                {/* corner brackets */}
                {([
                  { p: 'top-2.5 left-2.5',  d: 'M0 9 L0 0 L9 0'  },
                  { p: 'top-2.5 right-2.5', d: 'M9 9 L9 0 L0 0'  },
                  { p: 'bottom-2.5 left-2.5',  d: 'M0 0 L0 9 L9 9'  },
                  { p: 'bottom-2.5 right-2.5', d: 'M9 0 L9 9 L0 9'  },
                ] as const).map(({ p, d }, ci) => (
                  <div key={ci} className={`absolute ${p} z-10`}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d={d} stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="square" />
                    </svg>
                  </div>
                ))}
              </div>

              {/* text BELOW image — cards 1 and 3 */}
              {imgPos === 'bottom' && (
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-light tracking-[0.35em] text-white/18 uppercase">{label}</span>
                  <p
                    className="text-[13px] font-light leading-[1.9] text-white/32"
                    suppressHydrationWarning
                  >
                    {mounted ? t(textKey) : ''}
                  </p>
                </div>
              )}

            </div>
          ))}

        </div>

        {/* ── FOOTER ── */}
        <div className="m-footer mt-16 flex items-center justify-between border-t border-white/[0.04] pt-8">
          <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/14">
            Saleh Boukhder · Security &amp; Craft
          </span>
          <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/14">
            rootx — built with purpose
          </span>
        </div>

      </div>
    </section>
  );
}