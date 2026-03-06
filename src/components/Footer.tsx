'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import {
  FiGithub, FiLinkedin, FiTwitter,
  FiYoutube, FiInstagram, FiCopy, FiCheck, FiArrowUpRight,
} from 'react-icons/fi';
import { FaTiktok, FaTelegramPlane } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

/* ── social link — minimal, no box ── */
const SocialLink = ({
  href, icon: Icon, label,
}: { href: string; icon: React.ElementType; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group flex items-center gap-2 text-white/20 transition-colors duration-300 hover:text-white/60"
  >
    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    <span className="text-[10px] uppercase tracking-[0.22em] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
      {label}
    </span>
  </a>
);

export default function ContactFooterSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const email = 'rootxhackers@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q    = (s: string) => section.querySelector(s);
    const qAll = (s: string) => section.querySelectorAll(s);

    /* initial states */
    gsap.set(q('.ft-eyebrow'),  { opacity: 0, x: -14 });
    gsap.set(q('.ft-title'),    { opacity: 0, y: 55 });
    gsap.set(q('.ft-divider'),  { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.ft-sub'),      { opacity: 0, y: 18 });
    gsap.set(q('.ft-email'),    { opacity: 0, y: 24 });
    gsap.set(qAll('.ft-social-group'), { opacity: 0, y: 16 });
    gsap.set(q('.ft-bottom'),   { opacity: 0 });
    gsap.set(q('.ft-glow'),     { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
      });

      tl
        .to(q('.ft-glow'),    { opacity: 1, duration: 2.0, ease: 'power1.out' })
        .to(q('.ft-eyebrow'), { opacity: 1, x: 0,  duration: 0.8, ease: 'power3.out'  }, '-=1.6')
        .to(q('.ft-title'),   { opacity: 1, y: 0,  duration: 1.4, ease: 'expo.out'    }, '-=0.7')
        .to(q('.ft-divider'), { scaleX: 1,          duration: 1.0, ease: 'expo.out'    }, '-=0.9')
        .to(q('.ft-sub'),     { opacity: 1, y: 0,  duration: 0.9, ease: 'expo.out'    }, '-=0.7')
        .to(q('.ft-email'),   { opacity: 1, y: 0,  duration: 1.0, ease: 'expo.out'    }, '-=0.6')
        .to(qAll('.ft-social-group'), { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out' }, '-=0.6')
        .to(q('.ft-bottom'),  { opacity: 1,          duration: 0.7, ease: 'power2.out' }, '-=0.4');

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { group: t('professionalLinks') ?? 'Professional', items: [
      { href: 'https://www.linkedin.com/in/saleh-jassem-b620a4386', icon: FiLinkedin,      label: 'LinkedIn' },
      { href: 'https://github.com/rootx',                            icon: FiGithub,        label: 'GitHub'   },
      { href: 'https://twitter.com/rootx',                           icon: FiTwitter,       label: 'Twitter'  },
    ]},
    { group: t('socialLinks') ?? 'Social', items: [
      { href: 'https://instagram.com/s_rootx',  icon: FiInstagram,     label: 'Instagram' },
      { href: 'https://youtube.com/srootx',     icon: FiYoutube,       label: 'YouTube'   },
      { href: 'https://tiktok.com/srootx',      icon: FaTiktok,        label: 'TikTok'    },
      { href: 'https://t.me/RootX_Hack',        icon: FaTelegramPlane, label: 'Telegram'  },
    ]},
  ];

  return (
    <footer
      ref={sectionRef}
      id="contact"
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

      {/* ambient glow */}
      <div
        className="ft-glow pointer-events-none absolute z-0"
        style={{
          bottom: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(60,20,120,0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ════ CONTENT ════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/*
          Layout:
          ┌──────────────────────┬─────────────────┐
          │  title block (left)  │  email + social  │
          └──────────────────────┴─────────────────┘
        */}
        <div className="grid grid-cols-1 gap-20 md:grid-cols-[1fr_auto] md:gap-28 lg:gap-40">

          {/* ── LEFT: Title block ── */}
          <div className="flex flex-col">

            {/* eyebrow */}
            <div className="ft-eyebrow mb-7 flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">05</span>
              <span className="h-px w-8 bg-white/[0.08]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/18">Contact</span>
            </div>

            {/* headline */}
            <h2
              className="ft-title font-custom-pencerio font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.2rem,7vw,6rem)' }}
            >
              <span className="block text-white">
                {t('footerTitle') ?? "Let's"}
              </span>
              <span
                className="block"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.22)' }}
              >
                {t('footerTitleOutline') ?? 'Connect.'}
              </span>
            </h2>

            {/* divider */}
            <div className="ft-divider mt-8 mb-7 h-px w-12 bg-white/[0.07]" />

            {/* subtitle */}
            <p className="ft-sub max-w-[300px] text-[14px] font-light leading-[1.9] text-white/28">
              {t('footerSubtitle') ??
                'Have a project or just want to say hello? Inbox is always open.'}
            </p>
          </div>

          {/* ── RIGHT: Email + Socials ── */}
          <div className="flex flex-col justify-between gap-14">

            {/* email row */}
            <div className="ft-email flex flex-col gap-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/18">
                Email
              </span>

              {/* email line */}
              <div className="group flex cursor-pointer items-end gap-4" onClick={handleCopy}>
                <span className="text-[15px] font-light tracking-[0.03em] text-white/45 transition-colors duration-300 group-hover:text-white/75">
                  {email}
                </span>
                <button
                  aria-label={t('copyEmailLabel') ?? 'Copy email'}
                  className="mb-0.5 flex items-center gap-1.5 text-white/20 transition-colors duration-300 group-hover:text-white/50"
                  onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                >
                  {isCopied
                    ? <FiCheck className="h-3.5 w-3.5 text-white/60" />
                    : <FiCopy className="h-3.5 w-3.5" />
                  }
                </button>
              </div>

              {/* underline */}
              <div className="h-px w-full bg-white/[0.06]" />

              {/* copied feedback */}
              <div
                className={`flex items-center gap-1.5 text-[11px] text-white/40 transition-all duration-300 ${
                  isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                }`}
              >
                <FiCheck className="h-3 w-3" />
                <span>{t('emailCopied') ?? 'Copied'}</span>
              </div>
            </div>

            {/* socials */}
            <div className="flex flex-col gap-8">
              {socials.map(({ group, items }) => (
                <div key={group} className="ft-social-group flex flex-col gap-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/15">
                    {group}
                  </span>
                  <div className="flex flex-wrap gap-x-5 gap-y-3">
                    {items.map(({ href, icon, label }) => (
                      <SocialLink key={label} href={href} icon={icon} label={label} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom mt-20 flex flex-col items-start gap-3 border-t border-white/[0.04] pt-8 md:flex-row md:items-center md:justify-between">
          <span className="text-[9px] font-light uppercase tracking-[0.3em] text-white/14">
            &copy; {new Date().getFullYear()}{' '}
            {t('copyright') ?? 'RootX Hackers. All rights reserved.'}
          </span>

          <a
            href="https://ababilsec.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[9px] font-light uppercase tracking-[0.3em] text-white/14 transition-colors duration-300 hover:text-white/40"
          >
            <span>{t('developedBy') ?? 'Built by'}</span>
            <span className="text-white/28 transition-colors duration-300 group-hover:text-white/55">ababilsec</span>
            <FiArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </a>
        </div>

      </div>
    </footer>
  );
}