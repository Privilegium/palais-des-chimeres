'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { StarOrnament } from '@/components/ui/Ornament';
import type { Product, InquirySourceContext } from '@/types';
import type { Dictionary } from '@/i18n/dictionaries';

// ─── Accordion ────────────────────────────────────────────────────────────────

function AccordionRow({ label, content }: { label: string; content?: string }) {
  const [open, setOpen] = useState(false);
  const contentId = `pdp-accordion-${label.toLowerCase().replace(/[\s&]+/g, '-')}`;

  return (
    <div className="border-b border-brand-ivory/[0.12]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-[14px] text-left text-[10px] uppercase tracking-[0.28em] text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          className={`text-[16px] leading-none text-brand-ivory/60 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {open && (
        <div
          id={contentId}
          className="pb-5 font-serif text-[13px] leading-[1.85] text-brand-ivory/60"
        >
          {content ?? 'Information available upon request.'}
        </div>
      )}
    </div>
  );
}

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

function InquiryModal({
  product,
  locale,
  onClose,
}: {
  product: Product;
  locale: string;
  onClose: () => void;
}) {
  const eyebrow =
    product.collectionLine ??
    product.attributes.find((a) => a.label === 'Collection')?.value ??
    'AW24 — THE BECOMING';

  const context: InquirySourceContext = {
    sourceType: 'product_inquiry',
    sourceLabel: `Product inquiry — ${product.name}`,
    productId: product.id,
    productSlug: product.slug,
    productName: product.name,
    productType: product.type,
    productPrice: product.price,
    locale: locale as 'en' | 'fr',
  };

  return (
    <Modal isOpen onClose={onClose}>
      <div className="mb-8 border-b border-brand-ivory/[0.12] pb-5">
        <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-brand-ivory/40">
          {eyebrow}
        </p>
        <h2 className="font-serif text-[1.3rem] tracking-[0.2em] text-brand-ivory">
          {product.name.toUpperCase()}
        </h2>
        {product.type === 'priced' && product.price && (
          <p className="mt-1 text-[13px] tracking-[0.1em] text-brand-ivory/65">
            {product.price}
          </p>
        )}
      </div>
      <InquiryForm context={context} locale={locale} />
    </Modal>
  );
}

// ─── ProductClient ────────────────────────────────────────────────────────────

/*
  THUMBNAIL RAIL — "3 visible + ~25% peek of 4th" design
  ──────────────────────────────────────────────────────────
  Architecture:
  • Outer wrapper: overflow-hidden, fixed height = 3.25 × thumb height
    → 3 full thumbnails + 25% of 4th visible, fading into dark
  • Inner track: transform: translateY(-offset) animated with CSS transition
    → only the track moves, the page NEVER scrolls
  • No scrollIntoView() at document level — ever.

  WHY transform + overflow-hidden instead of scrollTop:
  scrollTop on a scrollable element can still trigger browser-level
  scroll-linked effects and paint the scrollbar flash. A non-scrollable
  overflow-hidden container with a CSS transform is completely inert to
  the document scroll model.

  HEIGHT MATH (per thumbnail):
  • Column is col-span-2 in a 12-col grid → width ≈ (100vw - padding) / 6
  • We target thumb width ≈ 100% of col, so thumb height = thumbWidth × 4/3
  • Rail height = thumbHeight × 3.25 (3 full + 25% peek)
  • The gap between thumbs is 6px; we add 3 gaps worth to the offset calc

  MAIN IMAGE:
  • max-height: clamp(72dvh, 88dvh, 95dvh) — fits 13" MacBook without overflow
  • aspect-ratio: 3/4 preserved
  • Related Looks is reachable with ~1 scroll on all screen sizes
*/

// Gap between thumbnails in px
const THUMB_GAP = 6;
// How many full thumbnails to show (the next thumbnail is ~25% visible as a peek)
const VISIBLE_FULL = 3;

export default function ProductClient({
  product,
  locale,
  dict,
}: {
  product: Product;
  locale: string;
  dict: Dictionary;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Ref to the outer fixed-height viewport div (overflow-hidden)
  const thumbViewportRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [modalOpen, closeModal]);

  const gallery = product.images ?? [{ src: product.image, alt: product.name }];
  const activeImg = gallery[activeIndex] ?? gallery[0];

  const eyebrow =
    product.collectionLine ??
    product.attributes.find((a) => a.label === 'Collection')?.value ??
    'AW24 — THE BECOMING';

  const ctaLabel =
    product.type === 'priced' ? dict.common.order : dict.common.personalRequest;

  const prevIdx = (activeIndex - 1 + gallery.length) % gallery.length;
  const nextIdx = (activeIndex + 1) % gallery.length;

  /*
    Compute the translateY offset for the inner track.
    We want thumbnail[activeIndex] to be fully visible inside the viewport.

    If activeIndex <= VISIBLE_FULL - 1 (i.e. 0, 1, 2): no scroll needed.
    When activeIndex >= VISIBLE_FULL: shift the track up by (activeIndex - VISIBLE_FULL + 1)
    thumbnail heights + gaps.

    We don't know exact pixel heights at this point (they're CSS-driven),
    so we calculate the offset as a percentage of the outer viewport height.

    Let H = viewport height (= (VISIBLE_FULL + PEEK_FRACTION) * thumbHeight + (VISIBLE_FULL) * gap)
    One thumb height T = (H - VISIBLE_FULL * gap) / (VISIBLE_FULL + PEEK_FRACTION)

    Offset = max(0, activeIndex - (VISIBLE_FULL - 1)) * (T + gap)

    We express this as a CSS calc() so it works at any container size without JS measurement.
  */
  const scrollSteps = Math.max(0, activeIndex - (VISIBLE_FULL - 1));

  return (
    <>
      {/* ── Thumbnail rail ─────────────────────────────────── */}
      <div
        className="hidden flex-col lg:flex lg:col-span-2 lg:col-start-1 lg:row-start-1"
        style={{ alignSelf: 'start', position: 'sticky', top: '110px' }}
      >
        {/*
          Outer viewport — overflow-hidden, fixed height shows 3.25 thumbnails.
          The CSS calc computes: viewportHeight = (VISIBLE_FULL + PEEK_FRACTION) × thumbH + gaps
          where thumbH = containerWidth × (4/3)
          containerWidth ≈ 2/12 of viewport (col-span-2 in 12-col grid) minus ~px padding.

          We approximate with:
            thumbW  = (100vw - 48px) * 2/12   [subtract approx outer padding and grid gaps]
            thumbH  = thumbW * 4/3
            viewH   = (VISIBLE_FULL + PEEK_FRACTION) * thumbH + VISIBLE_FULL * THUMB_GAP
        */}
        <div
          ref={thumbViewportRef}
          className="overflow-hidden"
          style={{
            height: `calc(
              (3.25 * ((100vw - 48px) * 2 / 12 * 4 / 3))
              + ${VISIBLE_FULL * THUMB_GAP}px
            )`,
          }}
        >
          {/*
            Inner track — translates upward as activeIndex advances past the 3rd thumbnail.
            Transition: smooth 300ms ease so the track slides, not jumps.

            translateY offset per step =
              thumbH + gap = ((100vw - 48px) * 2/12 * 4/3) + THUMB_GAP px
          */}
          <div
            className="flex flex-col gap-[6px] transition-transform duration-300 ease-in-out"
            style={
              scrollSteps === 0
                ? undefined
                : {
                    transform: `translateY(calc(
                      -${scrollSteps} * (
                        ((100vw - 48px) * 2 / 12 * 4 / 3) + ${THUMB_GAP}px
                      )
                    ))`,
                  }
            }
          >
            {gallery.map((img, i) => (
              <button
                key={`${img.src}-${i}`}
                type="button"
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className={`relative w-full shrink-0 overflow-hidden border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold ${
                  i === activeIndex
                    ? 'border-brand-ivory/60'
                    : 'border-brand-ivory/15 hover:border-brand-ivory/35'
                }`}
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="140px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom fade-mask: creates the "disappearing into dark" peek effect */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative -mt-10 h-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, #050505 90%)',
          }}
        />
      </div>

      {/* ── Main image ────────────────────────────────────── */}
      {/*
        max-height: clamp(72dvh, 88dvh, 95dvh)
        On 13" MacBook (800px viewport): clamps to ~576–704px which is reasonable.
        On 4K (1440px+): allows up to 95dvh for full impact.
        aspect-ratio 3/4 drives the intrinsic size; max-height caps it.
      */}
      <div className="lg:col-span-6 lg:col-start-3 lg:row-start-1">
        <div
          className="group relative w-full overflow-hidden bg-neutral-950"
          style={{
            aspectRatio: '3/4',
            maxHeight: 'clamp(72dvh, 88dvh, 95dvh)',
          }}
        >
          <Image
            src={activeImg.src}
            alt={activeImg.alt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), 50vw"
            className="object-cover transition-opacity duration-300"
            priority={activeIndex === 0}
          />

          {/* + indicator */}
          <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-brand-ivory/25 text-brand-ivory/50 text-sm transition-colors group-hover:border-brand-ivory/50 group-hover:text-brand-ivory">
            +
          </div>

          {/* ── Navigation arrows ──────────────────────── */}
          {gallery.length > 1 && (
            <>
              {/* LEFT */}
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setActiveIndex(prevIdx)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center border border-brand-ivory/25 bg-brand-black/50 text-brand-ivory/60 backdrop-blur-[2px] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-brand-ivory/70 hover:text-brand-ivory hover:bg-brand-black/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M7.5 1.5L3 6l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* RIGHT */}
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setActiveIndex(nextIdx)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center border border-brand-ivory/25 bg-brand-black/50 text-brand-ivory/60 backdrop-blur-[2px] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-brand-ivory/70 hover:text-brand-ivory hover:bg-brand-black/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M4.5 1.5L9 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 text-[9px] uppercase tracking-[0.2em] text-brand-ivory/45 bg-brand-black/45 px-2 py-1 backdrop-blur-[2px]">
                {activeIndex + 1} / {gallery.length}
              </div>
            </>
          )}

          {/* Mobile dots */}
          {gallery.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Image ${i + 1}`}
                  onClick={() => setActiveIndex(i)}
                  className={`h-[5px] w-[5px] rounded-full transition-colors ${
                    i === activeIndex ? 'bg-brand-ivory' : 'bg-brand-ivory/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right info panel ────────────────────────────────────── */}
      <div
        className="flex flex-col lg:col-span-4 lg:col-start-9 lg:row-start-1"
        style={{ alignSelf: 'start', position: 'sticky', top: '110px' }}
      >
        {/* Eyebrow */}
        <div className="mb-3 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-brand-ivory/50">
          <span>{eyebrow}</span>
          <StarOrnament size={16} className="opacity-70" />
        </div>

        {/* Title */}
        <h1 className="mb-4 font-serif text-[2rem] leading-[1.08] tracking-[0.2em] text-brand-ivory lg:text-[2.3rem] xl:text-[2.6rem]">
          {product.name.toUpperCase()}
        </h1>

        {/* Price */}
        {product.type === 'priced' && product.price && (
          <p className="mb-5 font-serif text-[1.35rem] tracking-[0.06em] text-brand-ivory">
            {product.price}
          </p>
        )}

        {/* Short description */}
        <p className="mb-8 font-serif text-[0.9rem] italic leading-[1.85] text-brand-ivory/65">
          {product.shortDescription}
        </p>

        {/* Attributes */}
        <dl className="mb-8 border-t border-brand-ivory/[0.12]">
          {product.attributes.map((attr) => (
            <div
              key={attr.label}
              className="flex items-baseline justify-between gap-6 border-b border-brand-ivory/[0.12] py-3"
            >
              <dt className="shrink-0 text-[9px] uppercase tracking-[0.28em] text-brand-ivory/40">
                {attr.label}
              </dt>
              <dd className="text-right text-[12px] tracking-wide text-brand-ivory/85">
                {attr.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* CTA */}
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="dialog"
          onClick={openModal}
          className="mb-3 flex w-full items-center justify-center gap-3 bg-brand-red py-[15px] text-[11px] uppercase tracking-[0.32em] text-brand-ivory transition-colors hover:bg-brand-red/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
        >
          <span>{ctaLabel}</span>
          <span aria-hidden="true">→</span>
        </button>

        {/* Inquiry note */}
        <p className="mb-8 text-center text-[9px] uppercase tracking-[0.26em] text-brand-ivory/30">
          {dict.common.inquiryNote}
        </p>

        {/* Accordions */}
        <div className="border-t border-brand-ivory/[0.12]">
          <AccordionRow
            label={dict.common.details}
            content={product.accordions?.details}
          />
          <AccordionRow
            label={dict.common.delivery}
            content={product.accordions?.delivery}
          />
        </div>
      </div>

      {/* Inquiry modal */}
      {modalOpen && (
        <InquiryModal
          product={product}
          locale={locale}
          onClose={closeModal}
        />
      )}
    </>
  );
}
