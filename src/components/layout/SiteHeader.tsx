'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import type { Locale } from '@/i18n/dictionaries';
import { getSiteContent } from '@/content/site';
import { INSTAGRAM_URL } from '@/content/social';

export default function SiteHeader({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isFilmPage = pathname.endsWith('/film');
  
  const navLinks = [
    { name: content.global.nav.home, path: `/${locale}` },
    { name: content.global.nav.collection, path: `/${locale}/collection` },
    { name: content.global.nav.film, path: `/${locale}/film` },
    { name: content.global.nav.about, path: `/${locale}/about` },
    { name: content.global.nav.contact, path: `/${locale}/contact` },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 w-full text-brand-ivory ${isFilmPage ? 'border-b border-brand-ivory/15 bg-brand-black md:border-b-0 md:bg-transparent' : ''}`}>
      <div className="hidden px-6 py-8 md:flex md:px-12 items-center justify-between">
      
      <nav className="flex items-center space-x-8 text-[10px] tracking-[0.2em] font-light">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`whitespace-nowrap transition-colors pb-1 ${
                isActive 
                  ? 'border-b border-brand-ivory text-brand-ivory' 
                  : 'border-b border-transparent text-brand-ivory/80 hover:text-brand-ivory'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: 'calc(50% + 6px)',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      >
        <Link href={`/${locale}`} className="block pointer-events-auto">
          <Image
            src="/assets/images/logo/logo white.png"
            alt="Palais des Chimères Logo"
            width={380}
            height={115}
            className="w-auto h-[78px] lg:h-[94px] object-contain"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center space-x-8 text-[10px] tracking-[0.25em] font-light">
        <LocaleSwitcher locale={locale} />
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-ivory/60 transition-colors flex items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
      </div>

      <div className="flex h-[82px] items-center justify-between px-5 md:hidden">
        <button
          type="button"
          aria-label={menuOpen ? content.global.closeNavigation : content.global.openNavigation}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold"
        >
          <span className="flex w-7 flex-col gap-[6px]" aria-hidden="true">
            <span className={`h-px w-full bg-brand-ivory transition-transform duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-px w-full bg-brand-ivory transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-px w-full bg-brand-ivory transition-transform duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>

        <Link href={`/${locale}`} className="absolute left-1/2 z-[60] -translate-x-1/2">
          <Image
            src="/assets/images/logo/logo white.png"
            alt="Palais des Chimères"
            width={220}
            height={70}
            className="h-[48px] w-auto object-contain"
            priority
          />
        </Link>

        <div className="relative z-[60] flex items-center gap-3 text-[10px] tracking-[0.2em]">
          <LocaleSwitcher locale={locale} />
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" />
            </svg>
          </a>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[55] flex flex-col bg-brand-black px-6 pt-[110px] transition-opacity duration-200 md:hidden ${menuOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation" className="border-y border-brand-ivory/15">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link key={link.name} href={link.path} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className={`flex min-h-14 items-center justify-between border-b border-brand-ivory/10 text-[12px] tracking-[0.28em] last:border-b-0 ${isActive ? 'text-brand-gold' : 'text-brand-ivory/85'}`}>
                {link.name}<span aria-hidden="true">→</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pb-8">
          <p className="mb-4 text-[9px] uppercase tracking-[0.28em] text-brand-ivory/40">{content.global.mobileFooter}</p>
          <div className="flex gap-5 text-[9px] uppercase tracking-[0.18em] text-brand-ivory/65">
            <Link href={`/${locale}/legal/shipping`} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="hover:text-brand-ivory">{content.global.mobileShipping}</Link>
            <Link href={`/${locale}/legal/terms`} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="hover:text-brand-ivory">{content.global.mobileTerms}</Link>
            <Link href={`/${locale}/legal/privacy`} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="hover:text-brand-ivory">{content.global.mobilePrivacy}</Link>
          </div>
        </div>
      </div>
    </header>
  );

}
