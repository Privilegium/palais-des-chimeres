'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { AboutImage, AboutLightboxLabels } from '@/content/about';

type AboutProcessGalleryProps = {
  images: AboutImage[];
  labels: AboutLightboxLabels;
};

export default function AboutProcessGallery({ images, labels }: AboutProcessGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      // Arrow navigation
      if (event.key === 'ArrowRight') {
        setSelectedIndex((i) => (i === null ? 0 : Math.min(i + 1, images.length - 1)));
      }
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((i) => (i === null ? 0 : Math.max(i - 1, 0)));
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    // Focus the close button on open
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      // Return focus to the thumbnail that opened it
      lastTriggerRef.current?.focus();
    };
  }, [selectedIndex, close, images.length]);

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  return (
    <>
      {/* ── Process grid: 3 cols, 2 rows, editorial aspect ratio ── */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            aria-haspopup="dialog"
            aria-label={`${labels.openImage}: ${image.alt}`}
            className="group relative aspect-[4/3] overflow-hidden bg-neutral-950 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
            onClick={(event) => {
              lastTriggerRef.current = event.currentTarget;
              setSelectedIndex(index);
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 767px) 50vw, (max-width: 1280px) 33vw, 540px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: image.position }}
            />
            {/* subtle dark veil that lifts on hover */}
            <span className="absolute inset-0 bg-brand-black/25 transition-opacity duration-500 group-hover:opacity-0" />
            {/* expand hint icon */}
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center border border-brand-ivory/30 bg-brand-black/50 text-sm text-brand-ivory opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              +
            </span>
          </button>
        ))}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-lightbox-title"
          className="fixed inset-0 z-[200] flex items-center justify-center"
        >
          <h2 id="about-lightbox-title" className="sr-only">
            {labels.dialogTitle}
          </h2>

          {/* backdrop — click to close */}
          <button
            type="button"
            aria-label={labels.close}
            className="absolute inset-0 cursor-default bg-brand-black/96 backdrop-blur-sm"
            onClick={close}
            tabIndex={-1}
          />

          {/* image container */}
          <div className="pointer-events-none relative z-10 h-[80vh] w-full max-w-[1400px] px-5 md:px-14">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="(max-width: 767px) 100vw, 90vw"
              className="object-contain"
              style={{ objectPosition: selectedImage.position }}
              priority
            />
          </div>

          {/* counter */}
          {selectedIndex !== null && (
            <p className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-[10px] tracking-[0.3em] text-brand-ivory/45 uppercase">
              {selectedIndex + 1} / {images.length}
            </p>
          )}

          {/* prev / next arrows */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-5 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-brand-ivory/20 bg-brand-black/60 text-brand-ivory/70 transition-colors hover:border-brand-ivory/50 hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold md:left-8"
              onClick={() => setSelectedIndex(selectedIndex - 1)}
            >
              ‹
            </button>
          )}
          {selectedIndex !== null && selectedIndex < images.length - 1 && (
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-5 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center border border-brand-ivory/20 bg-brand-black/60 text-brand-ivory/70 transition-colors hover:border-brand-ivory/50 hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold md:right-8"
              onClick={() => setSelectedIndex(selectedIndex + 1)}
            >
              ›
            </button>
          )}

          {/* close button */}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label={labels.close}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center border border-brand-ivory/20 bg-brand-black/70 text-xl text-brand-ivory/80 transition-colors hover:border-brand-ivory/55 hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold md:right-8 md:top-7"
            onClick={close}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
