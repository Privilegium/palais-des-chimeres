'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { InquiryForm } from '@/components/forms/InquiryForm';
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
          className="pb-5 font-serif text-[1rem] leading-[1.7] text-brand-ivory/75"
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
    'VIDMY — 2026';

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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [mediaHeight, setMediaHeight] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mainMediaRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const swipeCurrentX = useRef<number | null>(null);
  const didDragRef = useRef(false);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  useEffect(() => {
    const media = mainMediaRef.current;
    if (!media) return;
    const updateHeight = () => setMediaHeight(media.getBoundingClientRect().height);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(media);
    return () => observer.disconnect();
  }, []);

  const gallery = product.images ?? [{ src: product.image, alt: product.name }];
  const activeImg = gallery[activeIndex] ?? gallery[0];

  const eyebrow =
    product.collectionLine ??
    product.attributes.find((a) => a.label === 'Collection')?.value ??
    'VIDMY — 2026';

  const ctaLabel =
    product.type === 'priced' ? dict.common.order : dict.common.personalRequest;

  const prevIdx = (activeIndex - 1 + gallery.length) % gallery.length;
  const nextIdx = (activeIndex + 1) % gallery.length;

  const selectImage = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    setActiveIndex(nextIndex);
    setDragOffset(0);
  }, [activeIndex]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    swipeStartX.current = event.touches[0]?.clientX ?? null;
    swipeCurrentX.current = swipeStartX.current;
    didDragRef.current = false;
    setIsDragging(true);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = swipeStartX.current;
    const currentX = event.touches[0]?.clientX;
    if (startX === null || currentX === undefined) return;
    const rawOffset = currentX - startX;
    const atEdge = (activeIndex === 0 && rawOffset > 0) || (activeIndex === gallery.length - 1 && rawOffset < 0);
    if (Math.abs(rawOffset) > 8) didDragRef.current = true;
    swipeCurrentX.current = currentX;
    setDragOffset(atEdge ? rawOffset * 0.28 : rawOffset);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = swipeStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? swipeCurrentX.current;
    swipeStartX.current = null;
    swipeCurrentX.current = null;
    setIsDragging(false);
    if (startX === null || endX === null) {
      setDragOffset(0);
      return;
    }
    const threshold = Math.max((mainMediaRef.current?.clientWidth ?? 280) * 0.16, 42);
    const delta = endX - startX;
    if (delta < -threshold && activeIndex < gallery.length - 1) selectImage(nextIdx);
    else if (delta > threshold && activeIndex > 0) selectImage(prevIdx);
    else setDragOffset(0);
  };

  const openImageModal = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    setImageModalOpen(true);
  };

  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <>
      {/* ── Thumbnail rail ─────────────────────────────────── */}
      <div
        className="hidden flex-col lg:flex lg:col-span-2 lg:col-start-1 lg:row-start-1"
        style={{ alignSelf: 'start', position: 'sticky', top: '110px' }}
      >
        <div className="relative" style={{ height: mediaHeight ? `${mediaHeight}px` : '72dvh' }}>
          <div className="h-full overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-[6px]">
            {gallery.map((img, i) => (
              <button
                key={`${img.src}-${i}`}
                ref={(element) => { thumbnailRefs.current[i] = element; }}
                type="button"
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === activeIndex}
                onClick={() => selectImage(i)}
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
                  className="object-contain transition-transform duration-500 hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* ── Main image ────────────────────────────────────── */}
      {/*
        max-height: clamp(72dvh, 88dvh, 95dvh)
        On 13" MacBook (800px viewport): clamps to ~576–704px which is reasonable.
        On 4K (1440px+): allows up to 95dvh for full impact.
        aspect-ratio 3/4 drives the intrinsic size; max-height caps it.
      */}
      <div className="product-media lg:col-span-6 lg:col-start-3 lg:row-start-1">
        <div className="flex w-full justify-center">
        <div
          ref={mainMediaRef}
          className="group relative overflow-hidden bg-neutral-950"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={openImageModal}
          style={{
            width: 'min(100%, 76dvh)',
            aspectRatio: '3/4',
          }}
        >
          <div
            className={`flex h-full w-full ${isDragging ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
            style={{ transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffset}px), 0, 0)` }}
          >
            {gallery.map((image, index) => (
              <div key={`${image.src}-${index}`} className="relative h-full w-full shrink-0">
                <Image
                  src={image.src}
                  alt={index === activeIndex ? image.alt : ''}
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 3rem), 50vw"
                  className="object-cover p-0 lg:object-contain lg:p-2"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>

          {/* ── Navigation arrows ──────────────────────── */}
          {gallery.length > 1 && (
            <>
              {/* LEFT */}
              <button
                type="button"
                aria-label="Previous image"
                onClick={(event) => { event.stopPropagation(); selectImage(prevIdx); }}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-brand-ivory/25 bg-brand-black/50 text-brand-ivory/60 opacity-0 backdrop-blur-[2px] transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 hover:border-brand-ivory/70 hover:bg-brand-black/70 hover:text-brand-ivory focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M7.5 1.5L3 6l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* RIGHT */}
              <button
                type="button"
                aria-label="Next image"
                onClick={(event) => { event.stopPropagation(); selectImage(nextIdx); }}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-brand-ivory/25 bg-brand-black/50 text-brand-ivory/60 opacity-0 backdrop-blur-[2px] transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 hover:border-brand-ivory/70 hover:bg-brand-black/70 hover:text-brand-ivory focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
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
                  onClick={(event) => { event.stopPropagation(); selectImage(i); }}
                  className={`h-[5px] w-[5px] rounded-full transition-colors ${
                    i === activeIndex ? 'bg-brand-ivory' : 'bg-brand-ivory/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Mobile thumbnail strip — gives touch users a visible gallery map,
          rather than relying on hover-only desktop controls. */}
      {gallery.length > 1 && (
        <div className="mobile-product-thumbnails -mt-2 grid grid-cols-4 gap-2 pb-1 lg:hidden">
          {gallery.map((img, i) => (
            <button
              key={`${img.src}-mobile-${i}`}
              type="button"
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIndex}
              onClick={() => selectImage(i)}
              className={`relative aspect-[5/4] w-full overflow-hidden border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold ${
                i === activeIndex ? 'border-brand-ivory/70' : 'border-brand-ivory/20'
              }`}
            >
              <Image src={img.src} alt="" fill sizes="25vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* ── Right info panel ────────────────────────────────────── */}
      <div
        className="product-info flex flex-col lg:col-span-4 lg:col-start-9 lg:row-start-1"
        style={{ alignSelf: 'start', position: 'sticky', top: '110px' }}
      >
        {/* Eyebrow */}
        <div className="mb-3 text-[9px] uppercase tracking-[0.3em] text-brand-ivory/50">
          <span>{eyebrow}</span>
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
        <p className="mb-8 max-w-[34rem] font-serif text-[1.05rem] italic leading-[1.7] text-brand-ivory/80">
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
              <dd className="text-right text-[14px] leading-[1.55] tracking-wide text-brand-ivory/90">
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

      {imageModalOpen && (
        <div role="dialog" aria-modal="true" aria-label={activeImg.alt} className="fixed inset-0 z-[150] flex items-center justify-center bg-brand-black/96 backdrop-blur-sm">
          <button type="button" aria-label="Close full screen image" className="absolute inset-0 cursor-default" onClick={() => setImageModalOpen(false)} />
          <div className="pointer-events-none relative z-10 h-[82dvh] w-full max-w-[1200px] px-5 md:px-14">
            <Image src={activeImg.src} alt={activeImg.alt} fill sizes="(max-width: 767px) 100vw, 90vw" className="object-contain" priority />
          </div>
          <button type="button" aria-label="Close full screen image" onClick={() => setImageModalOpen(false)} className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center border border-brand-ivory/20 bg-brand-black/70 text-xl text-brand-ivory/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold">×</button>
        </div>
      )}
    </>
  );
}
