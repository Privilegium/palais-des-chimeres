import Link from 'next/link';
import Image from 'next/image';

export default function InternalPageFooter({
  locale,
  label,
}: {
  locale: string;
  label?: string;
}) {
  return (
    <footer className="border-t border-brand-ivory/10 py-8 px-6 md:px-12 w-full text-[10px] tracking-widest text-brand-ivory/60 uppercase shrink-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Side — ornament + brand label */}
        <div className="flex items-center space-x-5 mb-0">
          {/* Star ornament: 1254×1254 viewBox, artwork ~30% of canvas.
              Render at 52px in a 20×20 clipped container → visible star ~16px */}
          <div className="relative w-5 h-5 shrink-0 overflow-hidden opacity-60 flex items-center justify-center">
            <Image src="/assets/icons/star-ornament.svg" alt="" width={52} height={52} className="object-contain shrink-0" />
          </div>
          <span>{label ?? 'PALAIS DES CHIMÈRES — AW24'}</span>
        </div>


        {/* Right Side — developer credit + legal links */}
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {/* Developer credit — subtle, tracking matches rest of footer */}
          <span className="text-brand-ivory/30 normal-case tracking-[0.12em] text-[10px]">
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
