import Link from 'next/link';

export default function InternalPageFooter({
  locale,
  label,
}: {
  locale: string;
  label?: string;
}) {
  return (
    <footer className="border-t border-brand-ivory/10 px-6 py-7 text-[10px] tracking-widest text-brand-ivory/60 uppercase shrink-0 md:px-12 md:py-8 w-full">
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-4">

        {/* Left Side — ornament + brand label */}
        <div className="mb-0 text-center">
          <span>{label ?? 'PALAIS DES CHIMÈRES — VIDMY 2026'}</span>
        </div>


        {/* Right Side — developer credit + legal links */}
        <div className="flex w-auto items-center justify-center gap-6 md:gap-8 md:flex-wrap">
          {/* Developer credit — subtle, tracking matches rest of footer */}
          <span className="hidden text-[10px] normal-case tracking-[0.12em] text-brand-ivory/30 md:inline">
            Website by{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-brand-ivory/20 hover:text-brand-ivory/50 hover:decoration-brand-ivory/40 transition-colors"
            >
              [dev]
            </a>
          </span>

          {/* Divider */}
          <span className="text-brand-ivory/20 select-none hidden md:inline">·</span>

          <Link href={`/${locale}/legal/shipping`} className="hover:text-brand-ivory transition-colors">Shipping &amp; Returns</Link>
          <Link href={`/${locale}/legal/terms`} className="hover:text-brand-ivory transition-colors">Terms</Link>
          <Link href={`/${locale}/legal/privacy`} className="hover:text-brand-ivory transition-colors">Privacy</Link>
        </div>

      </div>
    </footer>
  );
}
