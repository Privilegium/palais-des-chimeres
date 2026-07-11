import Image from 'next/image';
import { StarOrnament } from '@/components/ui/Ornament';

/*
  HOMEPAGE — matches mockup 01-home-desktop.png
  ─────────────────────────────────────────────
  Full-bleed hero image, one-screen (h-screen / overflow-hidden).
  No internal footer.
  SiteHeader overlays from shared layout (position: absolute).

  Bottom-left: editorial text block matching the approved mockup:
    "WEAR THE POETRY
     OF TRANSFORMATION"
    ✦ ornament (SVG)
    AW24 'THE BECOMING'
*/

export default function HomePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-brand-black">
      {/* Full-bleed image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/campaign/ggg.jpeg"
          alt="Palais des Chimères — AW24 The Becoming Campaign"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-90"
          priority
        />
        {/* Top gradient — ensures header readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/20 to-transparent" style={{ height: '40%' }} />
        {/* Bottom-left gradient — ensures editorial text is readable */}
        <div className="absolute bottom-0 left-0 w-[55%] h-[45%] bg-gradient-to-t from-brand-black/85 via-brand-black/40 to-transparent" />
      </div>

      {/* Bottom-left editorial caption — matches approved mockup */}
      <div className="absolute bottom-0 left-0 z-10 px-6 pb-8 md:px-12 md:pb-10 2xl:px-16 2xl:pb-12">
        {/* Main headline — large serif, two lines */}
        <h1
          className="font-serif tracking-[0.2em] text-brand-ivory leading-[1.08] mb-5"
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3rem)' }}
        >
          WEAR THE POETRY<br />
          OF TRANSFORMATION
        </h1>

        {/* Gold star ornament */}
        <StarOrnament size={22} className="mb-4 opacity-70" />

        {/* Collection caption */}
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-ivory/65">
          AW24 &lsquo;THE BECOMING&rsquo;
        </p>
      </div>
    </main>
  );
}
