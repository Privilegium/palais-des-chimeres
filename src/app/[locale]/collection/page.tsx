import Image from 'next/image';
import Link from 'next/link';
import { collectionLooks, getProductForLocale } from '@/data/products';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { getSiteContent } from '@/content/site';
import { PRODUCT_CARD_META_CLASS, PRODUCT_CARD_TITLE_CLASS } from '@/components/ui/productCardTypography';

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
  col 13–20 : Jewelry            (wide destination card)

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
  displayName: string;
  displayMeta: string;
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  const [veilOfBecoming, chimeraForm, ivoryBloom, bloodCurrent, nocturneCreature] = collectionLooks.map((product) => getProductForLocale(product, locale));
  const cardContent = content.collection.cards;

  const cards: CardItem[] = [
    { ...veilOfBecoming,    ...cardContent['veil-of-becoming'], colStart: 5,  colEnd: 12, rowIndex: 1 },
    { ...chimeraForm,       ...cardContent['chimera-form'], colStart: 12, colEnd: 15, rowIndex: 1 }, // 20% narrower
    { ...ivoryBloom,        ...cardContent['ivory-bloom'], colStart: 15, colEnd: 21, rowIndex: 1 }, // gains the extra width
    { ...bloodCurrent,      ...cardContent['blood-current'], colStart: 1,  colEnd: 9,  rowIndex: 2 },
    { ...nocturneCreature,  ...cardContent['nocturne-creature'], colStart: 9,  colEnd: 13, rowIndex: 2 },
    {
      id: 'lookbook',
      name: content.collection.jewelryName,
      type: 'jewelry',
      price: 'Discover jewelry',
      image: '/assets/images/campaign/ggg.jpeg',
      slug: 'lookbook',
      colStart: 13, colEnd: 21,
      rowIndex: 2,
      displayName: content.collection.jewelryName,
      displayMeta: content.collection.jewelryMeta,
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
          className="collection-grid flex-1 min-h-0"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(20, 1fr)',
            gridTemplateRows: 'minmax(420px, 1fr) minmax(320px, 0.75fr)',
            gap: '4px',
          }}
        >

          {/* ── Left Intro Rail ──────────────────────────────── */}
          <div
            className="collection-intro relative z-20 flex flex-col justify-start pr-8"
            style={{ gridColumn: '1 / 5', gridRow: '1 / 2', paddingTop: '6px' }}
          >
            {/* COLLECTION title — z-20 allows it to ride over card edges */}
            <h1 className="font-serif [letter-spacing:clamp(0.32rem,0.5vw,0.6rem)] text-[2.5rem] lg:text-[3rem] 2xl:text-[3.5rem] uppercase text-brand-ivory leading-none mb-3">
              {content.collection.title}
            </h1>
            <p className="text-[9px] tracking-[0.22em] uppercase text-brand-ivory/50 mb-4">
              {content.collection.collectionLine}
            </p>

            <div className="mb-auto">
              <p className="body-copy-readable max-w-[230px]">
                {content.collection.intro}
              </p>
            </div>
          </div>

          {/* ── Product / Lookbook Cards ──────────────────────── */}
          {cards.map((card) => {
            const href =
              card.type === 'jewelry'
                ? `/${locale}/jewelry`
                : `/${locale}/collection/${card.slug}`;

            return (
              <div
                key={card.id}
                className={`collection-card relative group overflow-hidden ${card.type === 'jewelry' ? 'collection-lookbook' : ''}`}
                style={{
                  gridColumn: `${card.colStart} / ${card.colEnd}`,
                  gridRow: `${card.rowIndex} / ${card.rowIndex + 1}`,
                }}
              >
                <Link href={href} className="relative block h-full w-full">
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
                    <p className={PRODUCT_CARD_TITLE_CLASS}>
                      {card.displayName.toUpperCase()}
                    </p>
                    {card.type === 'jewelry' && (
                      <p className={PRODUCT_CARD_META_CLASS}>
                        {content.collection.jewelryMeta}
                      </p>
                    )}
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
