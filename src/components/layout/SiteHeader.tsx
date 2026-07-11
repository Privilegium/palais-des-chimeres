'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import type { Locale } from '@/i18n/dictionaries';

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'HOME', path: `/${locale}` },
    { name: 'COLLECTION', path: `/${locale}/collection` },
    { name: 'FILM', path: `/${locale}/film` },
    { name: 'ABOUT', path: `/${locale}/about` },
    { name: 'CONTACT', path: `/${locale}/contact` },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 w-full flex items-center justify-between text-brand-ivory">
      
      {/* Left: Navigation */}
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

      {/* Center: Logo — absolutely centered on the viewport, nudged 6px below midpoint */}
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

      {/* Right: Language and Social */}
      <div className="flex items-center space-x-8 text-[10px] tracking-[0.25em] font-light">
        <LocaleSwitcher locale={locale} />
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-ivory/60 transition-colors flex items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
      
    </header>
  );

}
