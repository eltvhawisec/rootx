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

  const allSkills = [...cyberSkills, ...webSkills];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q    = (s: string) => section.querySelector(s);
    const qAll = (s: string) => section.querySelectorAll(s);

    gsap.set(q('.sk-eyebrow'),       { opacity: 0, x: -14 });
    gsap.set(q('.sk-title'),         { opacity: 0, y: 50 });
    gsap.set(q('.sk-divider'),       { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.sk-counter'),       { opacity: 0, y: 20 });
    gsap.set(q('.sk-progress-fill'), { scaleY: 0, transformOrigin: 'top' });
    gsap.set(qAll('.sk-cat-label'),  { opacity: 0, x: -10 });
    gsap.set(qAll('.sk-pill'),       { opacity: 0, y: 16, scale: 0.95 });
    gsap.set(q('.sk-footer'),        { opacity: 0 });

    const ctx = gsap.context(() => {

      /* header */
      const hTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      });
      hTl
        .to(q('.sk-eyebrow'), { opacity: 1, x: 0,  duration: 0.8, ease: 'power3.out' })
        .to(q('.sk-title'),   { opacity: 1, y: 0,  duration: 1.3, ease: 'expo.out'   }, '-=0.5')
        .to(q('.sk-divider'), { scaleX: 1,          duration: 1.0, ease: 'expo.out'   }, '-=0.8')
        .to(q('.sk-counter'), { opacity: 1, y: 0,  duration: 0.8, ease: 'expo.out'   }, '-=0.6');

      /* category labels */
      gsap.to(qAll('.sk-cat-label'), {
        opacity: 1, x: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: q('.sk-grid'), start: 'top 82%', toggleActions: 'play none none none' },
      });

      /* pills staggered */
      gsap.to(qAll('.sk-pill'), {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.035,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.sk-grid'), start: 'top 80%', toggleActions: 'play none none none' },
      });

      /* progress */
      gsap.to(q('.sk-progress-fill'), {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom center', scrub: true },
      });

      /* footer */
      gsap.to(q('.sk-footer'), {
        opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: q('.sk-footer'), start: 'top 92%', toggleActions: 'play none none none' },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      label: 'Cyber Security',
      num: '01',
      skills: cyberSkills,
    },
    {
      label: 'Web & Writing',
      num: '02',
      skills: webSkills,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden bg-[#080808] py-32 md:py-44"
    >
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* separators */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* scroll progress */}
      <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]">
        <div className="sk-progress-fill w-full bg-gradient-to-b from-white/30 to-transparent" style={{ height: '100%' }} />
      </div>

      {/* big decorative background number */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-custom-pencerio font-bold leading-none"
        style={{
          fontSize: 'clamp(12rem,22vw,22rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.03)',
          letterSpacing: '-0.05em',
        }}
      >
        04
      </div>

      {/* ════ CONTENT ════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* ── HEADER — asymmetric split ── */}
        <div className="mb-20 flex flex-col gap-8 md:mb-32 md:flex-row md:items-end md:justify-between">

          {/* left */}
          <div className="flex flex-col">
            <div className="sk-eyebrow mb-5 flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/20">04</span>
              <span className="h-px w-8 bg-white/[0.07]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/20">Expertise</span>
            </div>

            <h2
              className="sk-title font-custom-pencerio font-bold leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(3rem,7vw,6.5rem)' }}
              suppressHydrationWarning
            >
              <span className="block text-white">{mounted ? t('skillsTitle') : 'Core'}</span>
              <span
                className="block"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}
              >
                Capabilities.
              </span>
            </h2>

            <div className="sk-divider mt-6 h-px w-14 bg-white/[0.08]" />
          </div>

          {/* right — big counter */}
          <div className="sk-counter flex flex-col items-start gap-1 md:items-end">
            <span
              className="font-custom-pencerio font-bold leading-none text-white/06"
              style={{ fontSize: 'clamp(4rem,8vw,7rem)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
            >
              {allSkills.length}
            </span>
            <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/18">
              skills total
            </span>
          </div>
        </div>

        {/* ── SKILLS GRID — category rows ── */}
        <div className="sk-grid flex flex-col gap-16">
          {categories.map(({ label, num, skills }) => (
            <div key={num} className="flex flex-col gap-6">

              {/* category label row */}
              <div className="sk-cat-label flex items-center gap-5">
                <span
                  className="font-custom-pencerio text-[1.6rem] font-bold leading-none"
                  style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.10)' }}
                >
                  {num}
                </span>
                <span className="h-px flex-1 bg-white/[0.05]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/25">
                  {label}
                </span>
              </div>

              {/* pills */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <div
                    key={skill}
                    className="sk-pill group relative overflow-hidden cursor-default"
                  >
                    {/* base pill */}
                    <div className="relative flex items-center gap-2.5 rounded-sm border border-white/[0.07] bg-white/[0.02] px-4 py-3 transition-all duration-400 group-hover:border-white/[0.18] group-hover:bg-white/[0.05]">

                      {/* index dot */}
                      <span className="text-[8px] font-light tracking-[0.25em] text-white/15 transition-colors duration-300 group-hover:text-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* divider */}
                      <span className="h-3 w-px bg-white/[0.07]" />

                      {/* skill name */}
                      <span className="text-[13px] font-light tracking-[0.05em] text-white/40 transition-colors duration-300 group-hover:text-white/75">
                        {skill}
                      </span>

                      {/* hover: right arrow */}
                      <span className="ml-1 translate-x-0 text-[10px] text-white/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/30">
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="sk-footer mt-20 flex items-center justify-between border-t border-white/[0.05] pt-8">
          <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/15">
            Saleh Boukhder · Security &amp; Dev
          </span>
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-white/[0.07]" />
            <span className="text-[9px] font-light uppercase tracking-[0.35em] text-white/15">
              rootx — built with purpose
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}