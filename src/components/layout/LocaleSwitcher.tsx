'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/i18n/dictionaries';

function pathForLocale(pathname: string, locale: Locale) {
  return pathname.replace(/^\/(en|fr)(?=\/|$)/, `/${locale}`);
}

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-2">
      <Link
        href={pathForLocale(pathname, 'fr')}
        className={locale === 'fr' ? 'text-brand-ivory' : 'text-brand-ivory/50 hover:text-brand-ivory transition-colors'}
      >
        FR
      </Link>
      <span className="text-brand-ivory/30">/</span>
      <Link
        href={pathForLocale(pathname, 'en')}
        className={locale === 'en' ? 'text-brand-ivory' : 'text-brand-ivory/50 hover:text-brand-ivory transition-colors'}
      >
        EN
      </Link>
    </div>
  );
}
