import Image from 'next/image';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { ContactForm } from '@/components/forms/ContactForm';
import type { InquirySourceContext } from '@/types';

/*
  CONTACT PAGE — matches mockup 06-contact-desktop.png
  ─────────────────────────────────────────────────────
  Responsive contract:
  - Large desktop (≥ md AND enough height): fits inside 100dvh, no scroll
  - Small laptop / short viewport: whole page scrolls (min-height, not fixed height)
  - NO internal scroll — the form column never has its own scrollbar

  Contact link icons:
  - The mockup shows the SVG icon directly with NO bordered square around it
  - Only the grid lines between cells act as separators
  - Icons render at clamp(32px, 2.5vw, 48px) visual size using overflow-hidden clip

  Gap between submit and links:
  - Previously caused by justify-between on the left column
  - Now uses gap-based flex-col with a compact mt separator above the links block
*/

/* Star ornament helper — shared pattern */
function StarOrnament({ size = 22, className = '' }: { size?: number; className?: string }) {
  const rendered = Math.round(size / 0.46);
  return (
    <div
      className={`overflow-hidden flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image src="/assets/icons/star-ornament.svg" alt="" width={rendered} height={rendered} className="shrink-0" />
    </div>
  );
}

const CONTACT_LINKS = [
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    sub: '@palaisdeschimères',
    href: 'https://instagram.com/palaisdeschimeres',
    external: true,
    iconSrc: '/assets/icons/insta_icon.svg',
    iconAlt: 'Instagram',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    sub: 'Palais des Chimères',
    href: 'https://linkedin.com/company/palaisdeschimeres',
    external: true,
    iconSrc: '/assets/icons/linkedin_icon.svg',
    iconAlt: 'LinkedIn',
  },
  {
    id: 'email',
    label: 'EMAIL',
    sub: 'studio@palaisdeschimeres.com',
    href: 'mailto:studio@palaisdeschimeres.com',
    external: false,
    iconSrc: '/assets/icons/mail_icon.svg',
    iconAlt: 'Email',
  },
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    sub: 'View selected work',
    href: 'https://palaisdeschimeres.com',
    external: true,
    iconSrc: '/assets/icons/lookbook_icon.svg',
    iconAlt: 'Portfolio',
  },
] as const;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const context: InquirySourceContext = {
    sourceType: 'contact_form',
    sourceLabel: 'Main website contact form',
    locale: locale as 'en' | 'fr',
  };

  return (
    /*
      Responsive height strategy:
      - min-h-[100dvh]: guarantees the page is always at least full-screen
      - On large viewports with enough height, content naturally fits without scroll
      - On small/short viewports, the page grows taller and scrolls normally
      - No overflow-hidden anywhere → no internal scroll on the left column
    */
    <div className="flex flex-col bg-brand-black min-h-[100dvh]">

      {/* ── Split area ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* ── LEFT: content column ──────────────────────────────── */}
        {/*
          Sizing: fixed width proportion so image always has room.
          flex-col + gap-[clamp]: controlled spacing between all elements.
          pt clears the overlay header.
          No overflow, no justify-between.
        */}
        <div
          className="flex w-full flex-col px-6 pt-[clamp(90px,9vw,120px)] pb-8 md:w-[48%] md:px-10 lg:px-12 xl:px-14"
          style={{ gap: 'clamp(0.8rem, 1.5vh, 1.4rem)' }}
        >

          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-brand-ivory/50 uppercase tracking-[0.32em]"
               style={{ fontSize: 'clamp(8px, 0.8vw, 10px)' }}>
            <span>Get in touch</span>
            <StarOrnament size={14} className="opacity-70" />
          </div>

          {/* Headline */}
          <h1
            className="font-serif leading-[1.08] tracking-[0.14em] text-brand-ivory"
            style={{ fontSize: 'clamp(2rem, 3vw, 3.4rem)' }}
          >
            LET THE WORLD<br />FIND YOU
          </h1>

          {/* Wide woven ornament */}
          <div
            aria-hidden="true"
            style={{
              width: 'clamp(110px, 8vw, 160px)',
              height: 'clamp(10px, 0.85vh, 14px)',
              position: 'relative',
              opacity: 0.6,
            }}
          >
            <Image
              src="/assets/icons/woven-ornament.svg"
              alt=""
              fill
              className="object-contain object-left"
            />
          </div>

          {/* Intro paragraph */}
          <p
            className="font-serif text-brand-ivory/60 leading-[1.85]"
            style={{ fontSize: 'clamp(0.8rem, 0.9vw, 0.95rem)', maxWidth: '380px' }}
          >
            For collaborations, custom pieces, editorial requests or private
            appointments, we would love to hear from you.
          </p>

          {/* Form */}
          <ContactForm locale={locale} context={context} />

          {/* Separator — star ornament centered with hairline on each side */}
          <div className="flex items-center gap-4" style={{ marginTop: 'clamp(0.3rem, 0.6vh, 0.8rem)' }}>
            <div className="flex-1 border-t border-brand-ivory/[0.12]" />
            <StarOrnament size={18} className="opacity-55" />
            <div className="flex-1 border-t border-brand-ivory/[0.12]" />
          </div>

          {/*
            Contact links — 2×2 grid
            Mockup: no bordered square around icons — just the SVG icon,
            then label + sub-text. Grid lines between cells only.
            Icon visual size: clamp(32px, 2.5vw, 48px) via overflow-hidden + larger render.
          */}
          <div className="grid grid-cols-2 divide-x divide-y divide-brand-ivory/[0.1] border border-brand-ivory/[0.1]">
            {CONTACT_LINKS.map((link) => {
              /*
                Icon sizing: artwork is 46% of 1254px viewBox.
                Target visual: clamp(36px, 2.2vw, 48px).
                We render the image at the MAX size (48/0.46 ≈ 104px) and
                use CSS clamp on the container to control the visible area.
                The overflow:hidden clips down to the container size.
              */
              const iconRendered = 104; // 48px visual / 0.46 canvas ratio
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 px-4 py-[14px] transition-colors hover:bg-brand-ivory/[0.03]"
                >
                  {/* No border around icon — just the SVG artwork, clipped */}
                  <div
                    className="shrink-0 overflow-hidden flex items-center justify-center"
                    style={{ width: 'clamp(36px, 2.2vw, 48px)', height: 'clamp(36px, 2.2vw, 48px)' }}
                  >
                    <Image
                      src={link.iconSrc}
                      alt={link.iconAlt}
                      width={iconRendered}
                      height={iconRendered}
                      className="shrink-0"
                    />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="uppercase text-brand-ivory/50 tracking-[0.28em]"
                       style={{ fontSize: 'clamp(8px, 0.7vw, 10px)' }}>
                      {link.label}
                    </p>
                    <p className="mt-[3px] truncate text-brand-ivory/80 underline underline-offset-2 decoration-brand-ivory/20 group-hover:decoration-brand-ivory/60 transition-colors tracking-wide"
                       style={{ fontSize: 'clamp(10px, 0.85vw, 12px)' }}>
                      {link.sub}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>

        {/* ── RIGHT: editorial image ────────────────────────────── */}
        {/*
          Responsive strategy:
          - Uses a fixed aspect-ratio box (not fill) so the image frame
            scales proportionally with the viewport width.
          - aspect-[3/4] on the container gives a portrait crop that matches
            the mockup and never drifts horizontally.
          - On desktop (md+) the container switches to position:sticky height:100vh
            so it stays in view as the left column may scroll.
          - object-position is set once and never changed — same crop on all screens.
        */}
        <div className="hidden md:block md:flex-1 relative">
          {/* Sticky container fills the viewport height and clips the image */}
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
            <Image
              src="/assets/images/campaign/ggg.jpeg"
              alt="Palais des Chimères editorial portrait"
              fill
              sizes="52vw"
              priority
              className="object-cover"
              style={{ objectPosition: '60% center' }}
            />
            {/* Left-edge blend */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-black to-transparent" />
            {/* Top fade below header */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-black/55 to-transparent" />
            {/* Atmospheric red vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 80% at 70% 40%, rgba(60,0,0,0.28) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>

      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <InternalPageFooter locale={locale} />
    </div>
  );
}
