import Image from 'next/image';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { ContactForm } from '@/components/forms/ContactForm';
import type { InquirySourceContext } from '@/types';
import { getSiteContent } from '@/content/site';
import { INSTAGRAM_URL } from '@/content/social';

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

const CONTACT_LINKS = [
  { id: 'instagram', label: 'INSTAGRAM', sub: '@palaisdeschimères', href: INSTAGRAM_URL, external: true, icon: 'instagram' },
  { id: 'linkedin', label: 'LINKEDIN', sub: 'Palais des Chimères', href: 'https://linkedin.com/company/palaisdeschimeres', external: true, icon: 'linkedin' },
  { id: 'email', label: 'EMAIL', sub: 'contact@palaisdeschimeres.com', href: 'mailto:contact@palaisdeschimeres.com', external: false, icon: 'email' },
  { id: 'portfolio', label: 'PORTFOLIO', sub: 'View selected work', href: 'https://palaisdeschimeres.com', external: true, icon: 'portfolio' },
] as const;

function ContactIcon({ kind }: { kind: (typeof CONTACT_LINKS)[number]['icon'] }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const svgClass = 'h-full w-full';
  if (kind === 'instagram') return <svg className={svgClass} viewBox="0 0 24 24" aria-hidden="true" {...shared}><rect x="3" y="3" width="18" height="18" rx="4.5" /><circle cx="12" cy="12" r="4.1" /><path d="M17.6 6.5h.01" /></svg>;
  if (kind === 'linkedin') return <svg className={svgClass} viewBox="0 0 24 24" aria-hidden="true" {...shared}><rect x="3" y="3" width="18" height="18" rx="1.5" /><path d="M8 10v6M8 7.5v.01M11.5 16v-3.4a2.6 2.6 0 0 1 5.2 0V16M11.5 10v6" /></svg>;
  if (kind === 'email') return <svg className={svgClass} viewBox="0 0 24 24" aria-hidden="true" {...shared}><rect x="2.8" y="5" width="18.4" height="14" rx="1.2" /><path d="m3.7 6 8.3 6.7L20.3 6M3.5 18.1l6.3-6M20.5 18.1l-6.3-6" /></svg>;
  return <svg className={svgClass} viewBox="0 0 24 24" aria-hidden="true" {...shared}><path d="M4 4.5c2.8-.8 5.4-.5 8 1v14c-2.6-1.5-5.2-1.8-8-1V4.5Z" /><path d="M20 4.5c-2.8-.8-5.4-.5-8 1v14c2.6-1.5 5.2-1.8 8-1V4.5Z" /><path d="M6.5 8h3M14.5 8h3" /></svg>;
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);
  const contactLinks = CONTACT_LINKS.map((link) => {
    if (link.id === 'portfolio') return { ...link, sub: content.contact.portfolio };
    return link;
  });

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
    <div className="contact-page flex min-h-[100dvh] flex-col bg-brand-black">

      {/* ── Split area ─────────────────────────────────────────────── */}
      <div className="contact-main relative flex flex-1 flex-col md:flex-row">

        {/* ── LEFT: content column ──────────────────────────────── */}
        {/*
          Sizing: fixed width proportion so image always has room.
          flex-col + gap-[clamp]: controlled spacing between all elements.
          pt clears the overlay header.
          No overflow, no justify-between.
        */}
        <div
          className="contact-left relative z-10 flex w-full flex-col px-6 pt-[clamp(120px,9vw,148px)] pb-8 md:w-[48%] md:px-10 lg:px-12 xl:px-14"
          style={{ gap: 'clamp(0.55rem, 1vh, 0.9rem)' }}
        >

          {/* Eyebrow */}
          <div className="text-brand-ivory/50 uppercase tracking-[0.32em]"
            style={{ fontSize: 'clamp(8px, 0.8vw, 10px)' }}>
            <span>{content.contact.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif [letter-spacing:clamp(0.32rem,0.45vw,0.5rem)] leading-[1.08] text-brand-ivory"
            style={{ fontSize: 'clamp(2rem, 3vw, 3.4rem)' }}
          >
            {content.contact.titleLine1}
            {content.contact.titleLine2 && <><br />{content.contact.titleLine2}</>}
          </h1>

          {/* Intro paragraph */}
          <p className="body-copy-readable max-w-[400px]">
            {content.contact.intro}
          </p>

          {/* Form */}
          <ContactForm locale={locale} context={context} />

          <div className="border-t border-brand-ivory/[0.12]" style={{ marginTop: 'clamp(0.3rem, 0.6vh, 0.8rem)' }} />

          <div className="grid grid-cols-2 border border-brand-ivory/[0.12]">
            {contactLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`group flex min-h-[78px] items-center gap-4 px-4 py-3 transition-colors hover:bg-brand-ivory/[0.03] ${index < 2 ? 'border-b border-brand-ivory/[0.12]' : ''} ${index % 2 === 1 ? 'border-l border-brand-ivory/[0.12]' : ''}`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-white/75"><ContactIcon kind={link.icon} /></div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-brand-ivory/50">{link.label}</p>
                  <p className="mt-[3px] truncate text-[12px] tracking-wide text-brand-ivory/85 underline decoration-brand-ivory/20 underline-offset-2 transition-colors group-hover:decoration-brand-ivory/60">{link.sub}</p>
                </div>
                <span aria-hidden="true" className="contact-link-arrow ml-auto text-2xl font-light leading-none text-brand-gold/85">›</span>
              </a>
            ))}
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
        <div className="contact-image absolute inset-x-0 top-0 h-[760px] md:relative md:z-auto md:block md:flex-1 md:h-auto">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/assets/images/campaign/ggg.jpeg"
              alt={content.contact.imageAlt}
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
