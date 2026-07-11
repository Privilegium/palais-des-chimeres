import Image from 'next/image';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { getAboutContent, type AboutImage } from '@/content/about';
import AboutProcessGallery from './AboutProcessGallery';
import { StarOrnament, WovenOrnament } from '@/components/ui/Ornament';

// ─── Small helpers ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.32em] text-brand-ivory/50">
      <span>{children}</span>
      <StarOrnament size={14} className="opacity-65" />
    </div>
  );
}

/**
 * EditorialPanel — a stable image+text two-column section.
 *
 * The image always lives inside a container that has an explicit `aspect-ratio`
 * (so it never collapses to zero height regardless of the image's intrinsic
 * dimensions). On desktop the text column sits beside it inside a CSS Grid.
 * The layout never breaks if you swap the image or resize the browser.
 *
 * Props
 *  image        — source, alt, objectPosition
 *  imageFirst   — true → image left, text right (default)
 *                 false → text left, image right
 *  imageCols    — how many of 12 grid columns the image occupies (default 7)
 *  children     — text content (already styled by caller)
 */
function EditorialPanel({
  image,
  imageFirst = true,
  imageCols = 7,
  /** imageRatio: '3/4' = tall dramatic, '4/3' = compact landscape */
  imageRatio = '3/4',
  children,
  id,
}: {
  image: AboutImage;
  imageFirst?: boolean;
  imageCols?: number;
  imageRatio?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const textCols = 12 - imageCols;

  return (
    <section
      aria-labelledby={id}
      className="relative grid grid-cols-1 md:grid-cols-12"
    >
      {/* Image cell */}
      <div
        className="relative w-full"
        style={{
          gridColumn: `${imageFirst ? 1 : textCols + 1} / span ${imageCols}`,
          gridRow: '1',
        }}
      >
        <div className="relative w-full" style={{ aspectRatio: imageRatio, minHeight: '300px' }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={`(max-width: 767px) 100vw, ${Math.round((imageCols / 12) * 100)}vw`}
            className="object-cover"
            style={{ objectPosition: image.position }}
          />
          {/* directional gradient so text column stays readable */}
          <div
            className={`absolute inset-0 ${
              imageFirst
                ? 'bg-gradient-to-r from-transparent via-transparent to-brand-black/75'
                : 'bg-gradient-to-l from-transparent via-transparent to-brand-black/75'
            }`}
          />
          {/* bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-black/60 to-transparent" />
        </div>
      </div>

      {/* Text cell */}
      <div
        className="relative z-10 flex flex-col justify-center px-6 py-10 md:py-16 md:px-12 lg:px-16 xl:px-20"
        style={{
          gridColumn: `${imageFirst ? imageCols + 1 : 1} / span ${textCols}`,
          gridRow: '1',
        }}
        id={id}
      >
        {children}
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getAboutContent(locale);

  return (
    <>
      <main className="relative bg-brand-black">
        {/* Ambient red glow — top portion of page only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[900px]"
          style={{
            background:
              'radial-gradient(ellipse 55% 55% at 75% 15%, rgba(139,0,0,0.13) 0%, transparent 70%)',
          }}
        />

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        {/*
          The hero uses the same "image fills a positioned container" pattern
          as the editorial panels below, but at full bleed width.
          We give it a fixed min-height so it is always a cinematic band.
        */}
        <section
          aria-labelledby="about-title"
          className="relative overflow-hidden"
          style={{ minHeight: 'clamp(520px, 55vw, 780px)' }}
        >
          {/* Full-panel image right-anchored */}
          <div className="absolute inset-0 md:left-[22%]">
            <Image
              src={content.hero.image.src}
              alt={content.hero.image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 78vw"
              priority
              className="object-cover"
              style={{ objectPosition: content.hero.image.position }}
            />
            {/* left fade so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/65 to-brand-black/8" />
            {/* bottom fade into next section */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-black to-transparent" />
          </div>

          {/* Gold star ornament — top-left, below header */}
          <div
            className="absolute left-6 md:left-12 2xl:left-16"
            style={{ top: 'clamp(110px, 14vw, 148px)' }}
          >
            <StarOrnament size={22} className="opacity-75" />
          </div>

          {/* Text — bottom-left */}
          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 lg:pb-24 2xl:px-16"
               style={{ minHeight: 'inherit' }}>
            <h1
              id="about-title"
              className="mb-6 font-serif tracking-[0.22em] text-brand-ivory"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
            >
              {content.hero.title}
            </h1>
            <p className="max-w-[300px] font-serif text-[0.9rem] leading-[1.85] text-brand-ivory/65 lg:max-w-[340px]">
              {content.hero.intro}
            </p>
            <WovenOrnament width={120} height={12} className="mt-8 opacity-45" />
          </div>
        </section>

        {/* ─── BRAND WORLD ──────────────────────────────────────────────── */}
        {/* Brand World — compact 4/3 ratio so it scrolls past in roughly one viewport */}
        <EditorialPanel
          image={content.brandWorld.image}
          imageFirst
          imageCols={7}
          imageRatio="4/3"
          id="brand-world-title"
        >
          <SectionLabel>{content.brandWorld.eyebrow}</SectionLabel>
          <h2
            id="brand-world-title"
            className="mb-7 font-serif text-[1.6rem] tracking-[0.16em] text-brand-ivory md:text-[2rem] lg:text-[2.4rem]"
          >
            {content.brandWorld.title}
          </h2>
          <div className="space-y-1 font-serif text-[0.9rem] leading-[1.85] text-brand-ivory/60">
            {content.brandWorld.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div aria-hidden="true" className="mt-9 h-px w-20 bg-brand-gold/40" />
        </EditorialPanel>

        {/* ─── MANIFESTO ────────────────────────────────────────────────── */}
        {/* Manifesto keeps the tall 3/4 ratio — this is the dramatic centrepiece block */}
        <EditorialPanel
          image={content.manifesto.image}
          imageFirst={false}
          imageCols={7}
          imageRatio="3/4"
          id="manifesto-title"
        >
          <SectionLabel>{content.manifesto.eyebrow}</SectionLabel>
          <h2
            id="manifesto-title"
            className="mb-7 font-serif text-[1.6rem] tracking-[0.16em] text-brand-ivory md:text-[2rem] lg:text-[2.4rem]"
          >
            {content.manifesto.title}
          </h2>
          <div className="space-y-1 font-serif text-[0.9rem] leading-[1.85] text-brand-ivory/60">
            {content.manifesto.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </EditorialPanel>

        {/* ─── DESIGNER ─────────────────────────────────────────────────── */}
        {/* Designer — compact 4/3 ratio, balances with the taller Manifesto above */}
        <EditorialPanel
          image={content.designer.image}
          imageFirst
          imageCols={6}
          imageRatio="4/3"
          id="designer-title"
        >
          <SectionLabel>{content.designer.eyebrow}</SectionLabel>
          <h2
            id="designer-title"
            className="mb-7 font-serif text-[1.6rem] tracking-[0.2em] text-brand-ivory md:text-[2rem] lg:text-[2.4rem]"
          >
            {content.designer.name}
          </h2>
          <div className="space-y-5 font-serif text-[0.88rem] leading-[1.85] text-brand-ivory/62 md:text-[0.92rem]">
            {content.designer.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 text-[9px] uppercase tracking-[0.26em] text-brand-red md:text-[10px]">
            {content.designer.note}
          </p>
        </EditorialPanel>

        {/* ─── OUR APPROACH ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="approach-title-label"
          className="px-6 pt-20 pb-0 md:px-12 lg:pt-24 2xl:px-16"
        >
          <SectionLabel>{content.approach.eyebrow}</SectionLabel>
          <h2 id="approach-title-label" className="sr-only">
            {content.approach.title}
          </h2>

          <div className="grid border-y border-brand-ivory/[0.12] md:grid-cols-3 md:divide-x md:divide-brand-ivory/[0.12]">
            {content.approach.items.map((item) => (
              <article
                key={item.title}

                className="border-b border-brand-ivory/[0.12] px-0 py-10 last:border-b-0 md:border-b-0 md:px-10 lg:px-14"
              >
                <div className="flex gap-5">
                  <StarOrnament size={18} className="mt-[2px] shrink-0 opacity-65" />

                  <div>
                    <h3 className="text-[0.75rem] tracking-[0.28em] text-brand-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-4 font-serif text-[0.85rem] leading-[1.8] text-brand-ivory/58">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── IN PROCESS ───────────────────────────────────────────────── */}
        <section
          aria-labelledby="process-title-label"
          className="px-6 pt-16 pb-20 md:px-12 lg:pt-20 lg:pb-24 2xl:px-16"
        >
          <SectionLabel>{content.process.eyebrow}</SectionLabel>
          <h2 id="process-title-label" className="sr-only">
            {content.process.title}
          </h2>
          <AboutProcessGallery
            images={content.process.images}
            labels={content.process.lightbox}
          />
        </section>
      </main>

      <InternalPageFooter locale={locale} />
    </>
  );
}
