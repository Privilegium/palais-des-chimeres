'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Fragment } from 'react';
import { getSiteContent } from '@/content/site';

// ─── Film config ──────────────────────────────────────────────────────────────

const YOUTUBE_VIDEO_ID = 'iEQf4BQ_ASg'; // https://youtu.be/iEQf4BQ_ASg

type FilmCredit = {
  label: string;
  value: string;
  href?: string;
};

type FilmContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  credits: readonly FilmCredit[];
};

// ─── Video Modal ──────────────────────────────────────────────────────────────
/*
  Poster-first architecture:
  - The YouTube iframe is NOT rendered until the user clicks Play.
  - Once the modal is open, the iframe loads with autoplay=1.
  - This avoids any performance penalty or CLS from the iframe on the poster.
  - We use the nocookie domain for reduced tracking.
*/

function VideoModal({ onClose, content }: { onClose: () => void; content: ReturnType<typeof getSiteContent>['film'] }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Build the embed URL — autoplay=1 starts playback as soon as iframe loads.
  // rel=0 suppresses related videos. modestbranding=1 reduces YT branding.
  const embedSrc = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={content.modalAria}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brand-black/97 backdrop-blur-sm"
    >
      {/* Click-outside close area */}
      <button
        type="button"
        aria-label={content.modalClose}
        tabIndex={-1}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      {/* Video frame */}
      <div className="pointer-events-none relative z-10 w-full max-w-[1200px] px-6 md:px-12">
        <div className="relative aspect-video w-full pointer-events-auto">
          <iframe
            src={embedSrc}
            title={content.iframeTitle}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      {/* Close button */}
      <button
        ref={closeRef}
        type="button"
        aria-label="Close film player"
        onClick={onClose}
        className="pointer-events-auto absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center border border-brand-ivory/20 bg-brand-black/70 text-xl text-brand-ivory/80 transition-colors hover:border-brand-ivory/50 hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold md:right-10 md:top-8"
      >
        ×
      </button>

      <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[9px] uppercase tracking-[0.36em] text-brand-ivory/30">
        {content.modalCollection}
      </p>
    </div>
  );
}

// ─── Watch Film button ─────────────────────────────────────────────────────────
/*
  Restored to pre-refactor visual:
  - Left: brand-red square containing a gold triangle (inline SVG, no asset dependency)
  - Right: spaced uppercase text label
  - Outer border matches the site's glass-panel language
*/

function GoldPlayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="group inline-flex items-center border border-brand-ivory/30 bg-brand-black/20 backdrop-blur-sm text-brand-ivory transition-all duration-300 hover:border-brand-ivory/60 hover:bg-brand-black/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold max-md:min-w-[min(100%,15.5rem)]"
    >
      {/* Red square — play triangle inside */}
      <span
        className="flex shrink-0 items-center justify-center bg-brand-red transition-colors duration-300 group-hover:bg-[#c41420] max-md:!h-[3.75rem] max-md:!w-[3.75rem]"
        style={{ width: 'clamp(46px, 4vw, 64px)', height: 'clamp(46px, 4vw, 64px)' }}
      >
        {/* Inline gold triangle — immune to canvas/wrapper sizing issues */}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 14"
          fill="none"
          style={{ width: 'clamp(11px, 1vw, 14px)', height: 'auto' }}
        >
          <path d="M1 1l10 6-10 6V1z" fill="#F4F1ED" />
        </svg>
      </span>
      {/* Label */}
      <span
        className="font-sans uppercase tracking-[0.3em] text-brand-ivory/90 group-hover:text-brand-ivory transition-colors duration-300 max-md:flex-1 max-md:!px-[1.4rem] max-md:!text-[0.72rem]"
        style={{ padding: '0 clamp(1rem, 2vw, 2rem)', fontSize: 'clamp(9px, 0.85vw, 12px)' }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FilmClient({ watchFilmText, locale }: { watchFilmText: string; locale: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const content = getSiteContent(locale).film;
  const filmContent: FilmContent = {
    eyebrow: content.eyebrow,
    titleLine1: content.titleLine1,
    titleLine2: content.titleLine2,
    subtitle: content.subtitle,
    credits: [
      { label: locale === 'fr' ? 'RÉALISATION' : 'DIRECTOR', value: content.director },
      { label: 'COLLECTION', value: content.collection },
      { label: 'YEAR', value: content.year },
      { label: 'VIDEO', value: content.video, href: 'mailto:opryshkosm@gmail.com' },
    ],
  };

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      {/* ── Full-bleed poster layer ─────────────────────────────────── */}
      <div className="film-poster absolute inset-x-0 top-[82px] aspect-[3/2] md:inset-0 md:aspect-auto">
        <Image
          src="/assets/images/campaign/allll111111.jpg"
          alt={content.posterAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/50 to-brand-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/20 to-brand-black/60" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 20% 80%, rgba(80,0,0,0.28) 0%, transparent 70%)',
          }}
        />
      </div>

      {/*
        ── Content layer ──────────────────────────────────────────────
        Layout: flex-col with a top spacer (flex-[3]) pushing content
        into the lower 60% of the page, matching the mockup composition.
      */}
      <div className="film-content relative z-10 flex h-full min-h-0 flex-col px-6 md:px-12 2xl:px-16">

        {/* Top spacer */}
        <div className="flex-[3]" />

        {/* Content block */}
        <div className="flex-[4] flex flex-col justify-center">

          {/* Eyebrow */}
          <div
            className="mb-[clamp(0.75rem,1.2vh,1.5rem)] text-brand-ivory/55"
            style={{ fontSize: 'clamp(8px, 0.9vw, 11px)', letterSpacing: '0.32em' }}
          >
            <span className="uppercase">{filmContent.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif [letter-spacing:clamp(0.32rem,0.5vw,0.6rem)] text-brand-ivory leading-[0.95]"
            style={{ fontSize: 'clamp(3.5rem, 6.5vw, 7rem)' }}
          >
            {filmContent.titleLine1}<br />
            {filmContent.titleLine2}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-[clamp(0.75rem,1.2vh,1.5rem)] font-serif italic text-brand-ivory/70"
            style={{
              fontSize: 'clamp(1rem, 1.15vw, 1.2rem)',
              lineHeight: 1.6,
              marginBottom: 'clamp(1rem, 1.8vh, 2rem)',
            }}
          >
            {filmContent.subtitle}
          </p>

          {/* Custom gold play button (poster-only, iframe lazy-loaded on click) */}
          <div className="relative z-20 max-md:mt-3 max-md:!mb-0 max-md:flex max-md:justify-start" style={{ marginBottom: 'clamp(0.7rem, 1.4vh, 1.4rem)' }}>
            <GoldPlayButton onClick={openModal} label={watchFilmText} />
          </div>

          {/* Credits block */}
          <div
            className="border-l border-brand-gold/30"
            style={{ paddingLeft: 'clamp(0.8rem, 1.2vw, 1.5rem)', marginBottom: 'clamp(0.5rem, 1vh, 1.5rem)' }}
          >
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                columnGap: 'clamp(1rem, 3vw, 3rem)',
                rowGap: 'clamp(3px, 0.4vh, 8px)',
              }}
            >
              {filmContent.credits.map(({ label, value, href }) => (
                <Fragment key={label}>
                  <dt
                    className="text-brand-ivory/40 uppercase self-baseline"
                    style={{ fontSize: 'clamp(7px, 0.7vw, 10px)', letterSpacing: '0.28em' }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="text-brand-ivory/75"
                    style={{ fontSize: 'clamp(9px, 0.85vw, 12px)', letterSpacing: '0.06em' }}
                  >
                    {href ? (
                      <a href={href} className="transition-colors hover:text-brand-ivory hover:underline hover:underline-offset-4">
                        {value}
                      </a>
                    ) : value}
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>

        <div className="min-h-2 flex-[0.5]" />
      </div>

      {/* ── Video modal — lazy-loaded YouTube iframe ──────────────── */}
      {modalOpen && <VideoModal onClose={closeModal} content={content} />}
    </>
  );
}
