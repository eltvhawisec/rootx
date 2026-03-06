'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import {
  FiGithub, FiLinkedin, FiTwitter,
  FiCopy, FiCheck, FiExternalLink,
} from 'react-icons/fi';
import { FaTiktok, FaTelegramPlane } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

/* ── social link ── */
const SocialLink = ({
  href, icon: Icon, label,
}: { href: string; icon: React.ElementType; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group flex items-center gap-2 text-white/25 transition-all duration-300 hover:text-white/70"
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

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

    gsap.set(q('.ft-eyebrow'),         { opacity: 0, x: -14 });
    gsap.set(q('.ft-title'),           { opacity: 0, y: 55 });
    gsap.set(q('.ft-divider'),         { scaleX: 0, transformOrigin: 'left' });
    gsap.set(q('.ft-sub'),             { opacity: 0, y: 18 });
    gsap.set(q('.ft-email'),           { opacity: 0, y: 24 });
    gsap.set(qAll('.ft-social-group'), { opacity: 0, y: 16 });
    gsap.set(q('.ft-bottom'),          { opacity: 0 });
    gsap.set(q('.ft-credit'),          { opacity: 0, y: 12 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
      });

      tl
        .to(q('.ft-eyebrow'), { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
        .to(q('.ft-title'),   { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out'   }, '-=0.5')
        .to(q('.ft-divider'), { scaleX: 1,         duration: 1.0, ease: 'expo.out'   }, '-=0.9')
        .to(q('.ft-sub'),     { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out'   }, '-=0.7')
        .to(q('.ft-email'),   { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out'   }, '-=0.6')
        .to(qAll('.ft-social-group'), {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
          }, '-=0.6')
        .to(q('.ft-bottom'),  { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .to(q('.ft-credit'),  { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out'   }, '-=0.3');

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    {
      group: mounted ? (t('professionalLinks') ?? 'Professional') : 'Professional',
      items: [
        { href: 'https://www.linkedin.com/in/saleh-bukhader', icon: FiLinkedin, label: 'LinkedIn' },
        { href: 'https://github.com/rootx',                   icon: FiGithub,   label: 'GitHub'   },
        { href: 'https://x.com/srootx_h',                    icon: FiTwitter,  label: 'Twitter'  },
      ],
    },
    {
      group: mounted ? (t('socialLinks') ?? 'Social') : 'Social',
      items: [
        { href: 'https://www.tiktok.com/@srootx_h', icon: FaTiktok,        label: 'TikTok'   },
        { href: 'https://t.me/srootX_h',            icon: FaTelegramPlane, label: 'Telegram' },
      ],
    },
  ];

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden py-32 md:py-44"
      style={{ background: 'linear-gradient(160deg, #080808 0%, #080808 45%, #1a1a1a 65%, #2e2e2e 80%, #f5f5f5 100%)' }}
    >
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* top separator */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

      {/* ════ CONTENT ════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        <div className="grid grid-cols-1 gap-20 md:grid-cols-[1fr_auto] md:gap-28 lg:gap-40">

          {/* ── LEFT: Title ── */}
          <div className="flex flex-col">

            <div className="ft-eyebrow mb-7 flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/30">05</span>
              <span className="h-px w-8 bg-white/[0.12]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/30">Contact</span>
            </div>

            <h2
              className="ft-title font-custom-pencerio font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.2rem,7vw,6rem)' }}
              suppressHydrationWarning
            >
              <span className="block text-white" suppressHydrationWarning>
                {mounted ? (t('footerTitle') ?? "Let's") : "Let's"}
              </span>
              <span
                className="block"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
                suppressHydrationWarning
              >
                {mounted ? (t('footerTitleOutline') ?? 'Connect.') : 'Connect.'}
              </span>
            </h2>

            <div className="ft-divider mt-8 mb-7 h-px w-12 bg-white/[0.12]" />

            <p className="ft-sub max-w-[300px] text-[14px] font-light leading-[1.9] text-white/35" suppressHydrationWarning>
              {mounted
                ? (t('footerSubtitle') ?? 'Have a project or just want to say hello? Inbox is always open.')
                : 'Have a project or just want to say hello? Inbox is always open.'}
            </p>
          </div>

          {/* ── RIGHT: Email + Socials ── */}
          <div className="flex flex-col justify-between gap-14">

            {/* email */}
            <div className="ft-email flex flex-col gap-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/30">
                Email
              </span>

              <div className="group flex cursor-pointer items-end gap-4" onClick={handleCopy}>
                <span className="text-[15px] font-light tracking-[0.03em] text-white/50 transition-colors duration-300 group-hover:text-white/85">
                  {email}
                </span>
                <button
                  aria-label={mounted ? (t('copyEmailLabel') ?? 'Copy email') : 'Copy email'}
                  className="mb-0.5 flex items-center gap-1.5 text-white/25 transition-colors duration-300 group-hover:text-white/60"
                  onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                >
                  {isCopied
                    ? <FiCheck className="h-3.5 w-3.5 text-white/60" />
                    : <FiCopy className="h-3.5 w-3.5" />
                  }
                </button>
              </div>

              <div className="h-px w-full bg-white/[0.08]" />

              <div className={`flex items-center gap-1.5 text-[11px] text-white/45 transition-all duration-300 ${
                isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
              }`}>
                <FiCheck className="h-3 w-3" />
                <span suppressHydrationWarning>{mounted ? (t('emailCopied') ?? 'Copied') : 'Copied'}</span>
              </div>
            </div>

            {/* socials */}
            <div className="flex flex-col gap-8">
              {socials.map(({ group, items }) => (
                <div key={group} className="ft-social-group flex flex-col gap-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/22">
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
        <div className="ft-bottom mt-20 border-t border-white/[0.06] pt-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            {/* copyright */}
            <span className="text-[9px] font-light uppercase tracking-[0.3em] text-white/20" suppressHydrationWarning>
              &copy; {new Date().getFullYear()}{' '}
              {mounted ? (t('copyright') ?? 'Saleh Boukhder. All rights reserved.') : 'Saleh Boukhder. All rights reserved.'}
            </span>

            {/* ── ababilsec credit ── */}
            <div className="ft-credit flex items-center gap-3">
              <span className="text-[9px] font-light uppercase tracking-[0.3em] text-white/22" suppressHydrationWarning>
                {mounted ? (t('developedBy') ?? 'Built by') : 'Built by'}
              </span>

              {/* pill button — white outline on dark, fills white on hover */}
              <a
                href="https://ababilsec.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 overflow-hidden rounded-sm border border-white/[0.18] bg-white/[0.04] px-3.5 py-2 transition-all duration-500 hover:border-white/[0.0] hover:shadow-[0_6px_30px_rgba(255,255,255,0.08)]"
              >
                {/* fill: white sweeps up */}
                <span
                  className="absolute inset-0 translate-y-full bg-white transition-transform duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
                />
                {/* shine */}
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)' }}
                />
                {/* text */}
                <span className="relative z-10 font-custom-pencerio text-[13px] font-bold tracking-[0.14em] text-white/70 transition-colors duration-300 group-hover:text-black">
                  ababilsec
                </span>
                {/* icon */}
                <FiExternalLink
                  className="relative z-10 h-3 w-3 flex-shrink-0 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/50"
                />
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}