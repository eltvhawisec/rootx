'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, Trans } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const { t, i18n } = useTranslation();
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setIsClient(true); setMounted(true); }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q    = (s: string) => section.querySelector(s);
    const qAll = (s: string) => section.querySelectorAll(s);

    /* initial states */
    gsap.set(q('.m-num'),           { opacity: 0, y: 30 });
    gsap.set(q('.m-label'),         { opacity: 0, x: -16 });
    gsap.set(q('.m-title-wrap'),    { opacity: 0, y: 50 });
    gsap.set(q('.m-sub'),           { opacity: 0, y: 20 });
    gsap.set(q('.m-progress-fill'), { scaleY: 0, transformOrigin: 'top' });
    gsap.set(qAll('.m-para'),       { opacity: 0, y: 40 });
    gsap.set(qAll('.m-index'),      { opacity: 0, scaleY: 0, transformOrigin: 'top' });
    gsap.set(q('.m-footer'),        { opacity: 0, y: 14 });
    gsap.set(q('.m-divider'),       { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.m-glow'),          { opacity: 0 });

    const ctx = gsap.context(() => {

      /* title block */
      const titleTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      });
      titleTl
        .to(q('.m-glow'),        { opacity: 1, duration: 2, ease: 'power1.out' })
        .to(q('.m-num'),         { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, '-=1.8')
        .to(q('.m-label'),       { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.8')
        .to(q('.m-title-wrap'),  { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out' }, '-=0.7')
        .to(q('.m-divider'),     { scaleX: 1, duration: 1.0, ease: 'expo.out' }, '-=0.8')
        .to(q('.m-sub'),         { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.7');

      /* paragraphs — each with its index line */
      qAll('.m-para').forEach((el, i) => {
        const line = el.querySelector('.m-index');
        gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
        })
          .to(line, { opacity: 1, scaleY: 1, duration: 0.6, ease: 'expo.out' })
          .to(el,   { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' }, '-=0.4');
      });

      /* footer */
      gsap.to(q('.m-footer'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: q('.m-footer'), start: 'top 90%', toggleActions: 'play none none none' },
      });

      /* scroll progress */
      gsap.to(q('.m-progress-fill'), {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom center', scrub: true },
      });

      /* glow parallax */
      gsap.to(q('.m-glow'), {
        y: -80, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isRtl = isClient && i18n.language === 'ar';

  const paragraphs = [
    { key: 'missionText1', accent: 'text-white/70' },
    { key: 'missionText2', accent: 'text-white/70' },
    { key: 'missionText3', accent: 'text-white/70' },
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
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* scroll progress */}
      <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]">
        <div className="m-progress-fill w-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: '100%' }} />
      </div>

      {/* ambient glow */}
      <div
        className="m-glow pointer-events-none absolute z-0"
        style={{
          top: '20%', right: '-10%',
          width: '500px', height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(80,30,150,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ════════════ CONTENT ════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/*
          NEW LAYOUT:
          ┌─────────────────────────────────────────────────────┐
          │  02 ——— MISSION                                     │
          │                                                     │
          │  BIG number    |    Title block                     │
          │                |    + paragraphs beneath            │
          └─────────────────────────────────────────────────────┘
        */}

        {/* ── top eyebrow row ── */}
        <div className="mb-16 flex items-center gap-4">
          <span className="m-label text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">02</span>
          <span className="h-px w-10 bg-white/[0.08]" />
          <span className="m-label text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">Mission</span>
        </div>

        {/* ── main grid ── */}
        <div className="grid grid-cols-1 gap-20 md:grid-cols-[auto_1fr] md:gap-28 lg:gap-36">

          {/* LEFT — huge decorative number, sticky */}
          <div className="md:sticky md:top-32 md:self-start">
            <div
              className="m-num select-none font-custom-pencerio font-bold leading-none tracking-tight"
              style={{
                fontSize: 'clamp(6rem,14vw,13rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              }}
            >
              02
            </div>
          </div>

          {/* RIGHT — title + paragraphs */}
          <div className="flex flex-col">

            {/* title */}
            <div className="m-title-wrap mb-4">
              <h2
                className="font-custom-pencerio font-bold leading-[0.92] tracking-tight text-white"
                style={{ fontSize: 'clamp(3rem,6.5vw,5.5rem)' }}
                suppressHydrationWarning
              >
                {mounted ? t('missionTitle') : 'Our Mission'}
              </h2>
            </div>

            {/* thin divider */}
            <div className="m-divider mb-10 h-px w-12 bg-white/[0.08]" />

            {/* sub-label */}
            <p className="m-sub mb-16 max-w-xs text-[12px] font-light uppercase tracking-[0.25em] text-white/18">
              rootx — built with purpose
            </p>

            {/* paragraphs */}
            <div className="flex flex-col gap-16">
              {paragraphs.map(({ key, accent }, i) => (
                <div key={key} className="m-para relative flex gap-8 md:gap-12">

                  {/* vertical index line */}
                  <div className="m-index flex flex-col items-center gap-2 pt-1">
                    <span className="text-[9px] font-light tracking-[0.3em] text-white/15">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent" style={{ minHeight: '40px' }} />
                  </div>

                  {/* text */}
                  <div className="flex-1 pb-2">
                    <p className="text-[16px] font-light leading-[2] tracking-[0.01em] text-white/35 md:text-[18px]" suppressHydrationWarning>
                      {mounted ? (
                        <Trans
                          i18nKey={key}
                          components={[<strong key={`${key}-s`} className={`font-normal ${accent}`} />]}
                        />
                      ) : t(key)?.replace(/<[^>]+>/g, '') ?? ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="m-footer mt-16 flex items-center gap-4 border-t border-white/[0.04] pt-8">
              <span className="h-px w-10 bg-white/[0.08]" />
              <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/15">
                Saleh Boukhder · Security &amp; Craft
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}