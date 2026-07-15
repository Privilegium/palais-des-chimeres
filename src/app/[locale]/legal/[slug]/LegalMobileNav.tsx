'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

type LegalNavItem = {
  slug: string;
  label: string;
};

const SCROLL_POSITION_KEY = 'palais-legal-mobile-nav-scroll';

export default function LegalMobileNav({
  items,
  locale,
  activeSlug,
}: {
  items: readonly LegalNavItem[];
  locale: string;
  activeSlug: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const storedPosition = window.sessionStorage.getItem(SCROLL_POSITION_KEY);
    requestAnimationFrame(() => {
      if (storedPosition) nav.scrollLeft = Number(storedPosition);
      requestAnimationFrame(() => {
        activeItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      });
    });
  }, [activeSlug]);

  const rememberPosition = () => {
    if (navRef.current) {
      window.sessionStorage.setItem(SCROLL_POSITION_KEY, String(navRef.current.scrollLeft));
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Legal pages"
      onScroll={rememberPosition}
      className="legal-mobile-nav -mx-6 mb-7 flex gap-3 overflow-x-auto px-6 pb-2 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item) => {
        const isActive = item.slug === activeSlug;
        return (
          <Link
            key={item.slug}
            ref={isActive ? activeItemRef : undefined}
            href={`/${locale}/legal/${item.slug}`}
            onClick={rememberPosition}
            className={`shrink-0 rounded-full border px-5 py-3 text-[10px] uppercase tracking-[0.16em] transition-colors ${
              isActive
                ? 'border-brand-red bg-brand-red text-brand-ivory'
                : 'border-brand-ivory/20 text-brand-ivory/65'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
