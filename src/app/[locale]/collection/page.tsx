import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { getDictionary } from '@/i18n/dictionaries';
import { StarOrnament, WovenOrnament } from '@/components/ui/Ornament';

/*
  GRID STRUCTURE (matches approved mockup 02-collection-desktop.png)
  ─────────────────────────────────────────────────────────────────
  We use a 20-column explicit grid.

  Top section (rows 1):
    col  1–4  : Left intro rail
    col  5–11 : Veil of Becoming   (large)
    col 12–15 : Chimera Form       (narrow)
    col 16–20 : Ivory Bloom        (wide)

  Bottom section (row 2):
    col  1–8  : Blood Current      (wide — starts from page left, shifted left vs top products)
    col  9–12 : Nocturne Creature  (narrow, same width as Chimera Form)
    col 13–20 : The Becoming       (wide lookbook)

  ─────────────────────────────────────────────────────────────────
  Scroll behaviour:
    ≤ 1920px  → natural scroll, card heights are fixed px
    > 1920px  → 100dvh, cards grow to fill via flex/grid fr rows
*/

type CardItem = {
  id: string;
  name: string;
  type: string;
  price?: string;
  image: string;
  slug: string;
  // Explicit grid placement
  colStart: number;
  colEnd: number;
  rowIndex: 1 | 2;
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const [veilOfBecoming, chimeraForm, ivoryBloom, bloodCurrent, nocturneCreature] = products;

  const cards: CardItem[] = [
    { ...veilOfBecoming,    colStart: 5,  colEnd: 12, rowIndex: 1 },
    { ...chimeraForm,       colStart: 12, colEnd: 15, rowIndex: 1 }, // 20% narrower
    { ...ivoryBloom,        colStart: 15, colEnd: 21, rowIndex: 1 }, // gains the extra width
    { ...bloodCurrent,      colStart: 1,  colEnd: 9,  rowIndex: 2 },
    { ...nocturneCreature,  colStart: 9,  colEnd: 13, rowIndex: 2 },
    {
      id: 'lookbook',
      name: 'The Becoming',
      type: 'lookbook',
      price: 'Lookbook',
      image: '/assets/images/campaign/ggg.jpeg',
      slug: 'lookbook',
      colStart: 13, colEnd: 21,
      rowIndex: 2,
    },
  ];

  return (
    /* Outer shell: scroll on ≤1920px, locked on >1920px */
    <div className="flex flex-col min-h-screen 2xl:h-[100dvh] 2xl:overflow-hidden bg-brand-black">

      <main className="flex-1 flex flex-col pt-[120px] px-6 md:px-12 pb-4 min-h-0">

        {/*
          20-col CSS Grid.
          Two explicit row tracks: top row taller, bottom row shorter.
          On ≤1920px we give fixed heights via min-height on rows.
          On >1920px (2xl) rows stretch to fill the available flex space.
        */}
        <div
          className="flex-1 min-h-0"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(20, 1fr)',
            gridTemplateRows: 'minmax(420px, 1fr) minmax(320px, 0.75fr)',
            gap: '4px',
          }}
        >

          {/* ── Left Intro Rail ──────────────────────────────── */}
          <div
            className="relative z-20 flex flex-col justify-start pr-8"
            style={{ gridColumn: '1 / 5', gridRow: '1 / 2', paddingTop: '6px' }}
          >
            {/* COLLECTION title — z-20 allows it to ride over card edges */}
            <h1 className="font-serif text-[2.5rem] lg:text-[3rem] 2xl:text-[3.5rem] tracking-[0.25em] uppercase text-brand-ivory leading-none mb-5">
              COLLECTION
            </h1>
            <p className="text-[9px] tracking-[0.22em] uppercase text-brand-ivory/50 mb-10">
              AW24 — THE BECOMING
            </p>

            {/* Small crosshair / star ornament — 1254×1254 viewBox, render large + clip */}
            <div className="mb-auto">
              <StarOrnament size={20} className="mb-10 opacity-75" />

              <p className="font-serif text-[1rem] italic leading-[1.75] text-brand-ivory/70 max-w-[230px]">
                We do not create clothes. We summon forms that remember how to become.
              </p>

              {/* Thorn ornament divider — SVG version */}
              <WovenOrnament width={150} height={24} className="mt-10 opacity-65" />
            </div>
          </div>

          {/* ── Product / Lookbook Cards ──────────────────────── */}
          {cards.map((card) => {
            const href =
              card.type === 'lookbook'
                ? `/${locale}/jewelry`
                : `/${locale}/collection/${card.slug}`;

            const label =
              card.type === 'priced'
                ? card.price
                : card.type === 'lookbook'
                ? 'Lookbook'
                : dict.common.personalRequest;

            return (
              <div
                key={card.id}
                className="relative group overflow-hidden"
                style={{
                  gridColumn: `${card.colStart} / ${card.colEnd}`,
                  gridRow: `${card.rowIndex} / ${card.rowIndex + 1}`,
                }}
              >
                <Link href={href} className="block w-full h-full">
                  {/* Background image */}
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />

                  {/* Bottom gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

                  {/* Plus icon — top right */}
                  <div className="absolute top-5 right-5">
                    <span className="text-brand-ivory/40 text-xl font-extralight leading-none group-hover:text-brand-ivory/80 transition-colors duration-300">
                      +
                    </span>
                  </div>

                  {/* Card label — bottom left */}
                  <div className="absolute bottom-0 left-0 px-6 py-7 w-full">
                    <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-brand-ivory mb-[5px] leading-none">
                      {card.name.toUpperCase()}
                    </p>
                    <p className="font-sans text-[10px] tracking-[0.08em] text-brand-ivory/55 font-light leading-none">
                      {label}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}

        </div>
      </main>

      <InternalPageFooter locale={locale} />
    </div>
  );
}
