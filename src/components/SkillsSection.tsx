'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const cyberSkills = mounted ? Object.values(
    t('cyberSecuritySkills', { returnObjects: true }) as Record<string, string>
  ) : ['Web App Pentesting', 'Vulnerability Analysis', 'Digital Forensics', 'OSINT', 'Network Scanning', 'Security Consulting', 'Digital Awareness', 'Cybersecurity Training'];

  const webSkills = mounted ? Object.values(
    t('webDevelopmentSkills', { returnObjects: true }) as Record<string, string>
  ) : ['HTML', 'CSS', 'JavaScript', 'Web Security', 'Technical Writing'];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q    = (s: string) => section.querySelector(s);
    const qAll = (s: string) => section.querySelectorAll(s);

    /* ── initial states ── */
    gsap.set(q('.sk-eyebrow'),        { opacity: 0, x: -14 });
    gsap.set(q('.sk-title'),          { opacity: 0, y: 44 });
    gsap.set(q('.sk-divider'),        { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.sk-glow'),           { opacity: 0 });
    gsap.set(q('.sk-progress-fill'),  { scaleY: 0, transformOrigin: 'top' });
    gsap.set(qAll('.sk-group'),       { opacity: 0, y: 28 });
    gsap.set(qAll('.sk-item'),        { opacity: 0, y: 12 });
    gsap.set(q('.sk-footer'),         { opacity: 0, y: 10 });

    const ctx = gsap.context(() => {

      /* header */
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 76%', toggleActions: 'play none none none' },
      });
      hTl
        .to(q('.sk-glow'),    { opacity: 1, duration: 2.0, ease: 'power1.out' })
        .to(q('.sk-eyebrow'), { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=1.6')
        .to(q('.sk-title'),   { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out' }, '-=0.7')
        .to(q('.sk-divider'), { scaleX: 1, duration: 1.0, ease: 'expo.out' }, '-=0.8');

      /* each group label */
      qAll('.sk-group').forEach((el, i) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      /* skill items — staggered per group */
      qAll('.sk-group').forEach((group) => {
        const items = group.querySelectorAll('.sk-item');
        gsap.to(items, {
          opacity: 1, y: 0,
          stagger: 0.04,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: 'play none none none' },
        });
      });

      /* scroll progress */
      gsap.to(q('.sk-progress-fill'), {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom center', scrub: true },
      });

      /* glow parallax */
      gsap.to(q('.sk-glow'), {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      /* footer */
      gsap.to(q('.sk-footer'), {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: q('.sk-footer'), start: 'top 92%', toggleActions: 'play none none none' },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
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

      {/* separators */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      {/* scroll progress */}
      <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]">
        <div className="sk-progress-fill w-full bg-gradient-to-b from-white/20 to-transparent" style={{ height: '100%' }} />
      </div>

      {/* ambient glow */}
      <div
        className="sk-glow pointer-events-none absolute z-0"
        style={{
          top: '20%', left: '60%',
          width: '500px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(70,25,130,0.07) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ════ CONTENT ════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* ── HEADER ── */}
        <div className="mb-20 md:mb-28">

          <div className="sk-eyebrow mb-6 flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">04</span>
            <span className="h-px w-8 bg-white/[0.08]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">Expertise</span>
          </div>

          <h2
            className="sk-title font-custom-pencerio font-bold leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}
            suppressHydrationWarning
          >
            {mounted ? t('skillsTitle') : 'Core Capabilities'}
          </h2>

          <div className="sk-divider mt-6 h-px w-12 bg-white/[0.07]" />
        </div>

        {/* ── SKILLS GRID ── */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-20 md:gap-y-20">

          {/* ─ Cyber Security ─ */}
          <div className="sk-group flex flex-col gap-6">

            {/* group header */}
            <div className="flex items-center gap-4 border-b border-white/[0.05] pb-5">
              <span
                className="font-custom-pencerio text-[2.4rem] font-bold leading-none"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
              >
                01
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
                  Cyber Security
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/15">
                  {cyberSkills.length} skills
                </span>
              </div>
            </div>

            {/* skill list */}
            <ul className="flex flex-col">
              {cyberSkills.map((skill, i) => (
                <li
                  key={skill}
                  className="sk-item group flex items-center justify-between border-b border-white/[0.04] py-3.5 transition-colors duration-300 hover:border-white/[0.1] last:border-0"
                >
                  <span className="text-[14px] font-light tracking-[0.04em] text-white/35 transition-colors duration-300 group-hover:text-white/65">
                    {skill}
                  </span>
                  <span className="text-[9px] font-light tracking-[0.15em] text-white/12 transition-colors duration-300 group-hover:text-white/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Web Development ─ */}
          <div className="sk-group flex flex-col gap-6">

            {/* group header */}
            <div className="flex items-center gap-4 border-b border-white/[0.05] pb-5">
              <span
                className="font-custom-pencerio text-[2.4rem] font-bold leading-none"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
              >
                02
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
                  Web Development
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/15">
                  {webSkills.length} skills
                </span>
              </div>
            </div>

            {/* skill list */}
            <ul className="flex flex-col">
              {webSkills.map((skill, i) => (
                <li
                  key={skill}
                  className="sk-item group flex items-center justify-between border-b border-white/[0.04] py-3.5 transition-colors duration-300 hover:border-white/[0.1] last:border-0"
                >
                  <span className="text-[14px] font-light tracking-[0.04em] text-white/35 transition-colors duration-300 group-hover:text-white/65">
                    {skill}
                  </span>
                  <span className="text-[9px] font-light tracking-[0.15em] text-white/12 transition-colors duration-300 group-hover:text-white/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="sk-footer mt-20 flex items-center justify-between border-t border-white/[0.04] pt-8">
          <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/14">
            Saleh Boukhder · Security &amp; Dev
          </span>
          <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/14">
            {cyberSkills.length + webSkills.length}+ skills total
          </span>
        </div>
      </div>
    </section>
  );
}