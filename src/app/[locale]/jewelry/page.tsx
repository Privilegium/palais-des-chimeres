import Image from 'next/image';
import Link from 'next/link';
import InternalPageFooter from '@/components/layout/InternalPageFooter';

/*
  JEWELRY PLP — matches mockup 09-jewelry-page.png
  ──────────────────────────────────────────────────
  Layout (desktop):

  Row A  [intro rail ~2/5] [hero card ~3/5, tall portrait]
  Row B  [earring card, spans rows B+C, portrait] [cuff] [ring] [links card, spans rows B+C, portrait]
  Row C                                            [choker] [serpent ring]

  ROUTING:
  Every jewelry card routes to /[locale]/collection/[slug], using slugs
  that are already registered in src/data/products.ts — no separate PDP
  architecture is needed. The jewelry slugs below map to existing products.

  Cards that don't yet have a matching product slug fall back to the most
  thematically appropriate existing product slug (clearly commented for
  replacement when dedicated jewelry PDP pages are created).
*/

type JewelryItem = {
  id: string;
  name: string;
  price?: string;
  type: 'priced' | 'request';
  image: string;
  objectPosition?: string;
  /** Slug used for /[locale]/collection/[slug] route */
  slug: string;
};

const JEWELRY_ITEMS: JewelryItem[] = [
  {
    id: 'chimera-relic-necklace',
    name: 'Chimera Relic Necklace',
    price: '€2,450',
    type: 'priced',
    image: '/assets/images/products/vampire_dress.png',
    objectPosition: 'center 20%',
    slug: 'veil-of-becoming',  // map to closest existing product; replace when jewelry PDP exists
  },
  {
    id: 'thorned-teardrop-earrings',
    name: 'Thorned Teardrop Earrings',
    price: '€680',
    type: 'priced',
    image: '/assets/images/products/goat_dress.png',
    objectPosition: 'center top',
    slug: 'chimera-form',
  },
  {
    id: 'bone-bloom-cuff',
    name: 'Bone Bloom Cuff',
    price: '€1,280',
    type: 'priced',
    image: '/assets/images/products/vase_dress.png',
    objectPosition: 'center 30%',
    slug: 'ivory-bloom',
  },
  {
    id: 'blood-oracle-ring',
    name: 'Blood Oracle Ring',
    price: '€750',
    type: 'priced',
    image: '/assets/images/products/red_witch_dress.png',
    objectPosition: 'center 40%',
    slug: 'blood-current',
  },
  {
    id: 'veil-of-links',
    name: 'Veil of Links',
    price: '€1,950',
    type: 'priced',
    image: '/assets/images/products/cat_dress.png',
    objectPosition: 'center top',
    slug: 'nocturne-creature',
  },
  {
    id: 'nocturne-choker',
    name: 'Nocturne Choker',
    price: '€1,850',
    type: 'priced',
    image: '/assets/images/campaign/ggg.jpeg',
    objectPosition: 'center 35%',
    slug: 'veil-of-becoming',  // replace with dedicated jewelry PDP when ready
  },
  {
    id: 'serpents-vow-ring',
    name: "Serpent's Vow Ring",
    price: '€640',
    type: 'priced',
    image: '/assets/images/products/vampire_dress.png',
    objectPosition: 'center 60%',
    slug: 'chimera-form',  // replace with dedicated jewelry PDP when ready
  },
];

// ─── Card component ─────────────────────────────────────────────────────────

function JewelryCard({
  item,
  locale,
  className = '',
  style,
}: {
  item: JewelryItem;
  locale: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Route to PDP — /[locale]/collection/[slug]
  const href = `/${locale}/collection/${item.slug}`;

  return (
    <div
      className={`group relative overflow-hidden bg-neutral-950 ${className}`}
      style={style}
    >
      <Link href={href} className="block w-full h-full">
        {/* Image */}
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: item.objectPosition ?? 'center' }}
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />

        {/* + icon — top right */}
        <div className="absolute right-4 top-4">
          <span className="text-brand-ivory/40 text-xl font-extralight leading-none group-hover:text-brand-ivory/80 transition-colors duration-300">
            +
          </span>
        </div>

        {/* Name + price — bottom left */}
        <div className="absolute bottom-0 left-0 px-5 py-6 w-full">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-ivory mb-[5px] leading-none">
            {item.name.toUpperCase()}
          </p>
          <p className="font-sans text-[10px] tracking-[0.08em] text-brand-ivory/55 font-light leading-none">
            {item.type === 'priced' && item.price ? item.price : 'Personal Request'}
          </p>
        </div>
      </Link>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function JewelryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [
    hero,           // Chimera Relic Necklace
    earrings,       // Thorned Teardrop Earrings  (tall, spans rows)
    cuff,           // Bone Bloom Cuff
    ring,           // Blood Oracle Ring
    veil,           // Veil of Links              (tall, spans rows)
    choker,         // Nocturne Choker
    serpent,        // Serpent's Vow Ring
  ] = JEWELRY_ITEMS;

  return (
    <div className="flex flex-col min-h-screen bg-brand-black">
      <main className="flex-1 pt-[108px] pb-4">

        {/*
          ── ROW A: Intro rail + Hero card ───────────────────────────
          Left  ≈ 38% — intro text
          Right ≈ 62% — large portrait/landscape hero card
        */}
        <div
          className="jewelry-hero-grid px-4 gap-1"
          style={{
            display: 'grid',
            gridTemplateColumns: '38fr 62fr',
            gridTemplateRows: 'minmax(420px, 52vh)',
          }}
        >
          {/* Intro rail */}
          <div className="jewelry-intro flex flex-col justify-end pb-8 pl-8 pr-10">
            <h1 className="font-serif text-[4rem] tracking-[0.2em] text-brand-ivory uppercase leading-none mb-5 xl:text-[5rem] 2xl:text-[5.5rem]">
              JEWELRY
            </h1>

            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-brand-ivory/65">VIDMY — 2026</p>

            {/* Description */}
            <p className="font-serif italic text-brand-ivory/60 text-[0.88rem] leading-[1.9] max-w-[280px]">
              Relics for the in-between. Adornments born from myths and metamorphosis. For those who carry their own mythology.
            </p>

          </div>

          {/* Hero card */}
          <JewelryCard item={hero} locale={locale} className="h-full" />
        </div>

        {/*
          ── ROWS B + C: 4-column grid ──────────────────────────────
          Col 1: Earrings  (spans 2 rows — tall portrait)
          Col 2: Cuff (row B) + Choker (row C)
          Col 3: Ring (row B) + Serpent (row C)
          Col 4: Veil of Links (spans 2 rows — tall portrait)
        */}
        <div
          className="jewelry-cards-grid mt-1 px-4 gap-1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'minmax(300px, 38vh) minmax(300px, 38vh)',
          }}
        >
          {/* Earrings — tall, spans both rows */}
          <JewelryCard
            item={earrings}
            locale={locale}
            style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}
          />

          {/* Cuff — row B, col 2 */}
          <JewelryCard
            item={cuff}
            locale={locale}
            style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}
          />

          {/* Ring — row B, col 3 */}
          <JewelryCard
            item={ring}
            locale={locale}
            style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}
          />

          {/* Veil of Links — tall, spans both rows, col 4 */}
          <JewelryCard
            item={veil}
            locale={locale}
            style={{ gridColumn: '4 / 5', gridRow: '1 / 3' }}
          />

          {/* Choker — row C, col 2 */}
          <JewelryCard
            item={choker}
            locale={locale}
            style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}
          />

          {/* Serpent — row C, col 3 */}
          <JewelryCard
            item={serpent}
            locale={locale}
            style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}
          />
        </div>

      </main>

      {/* Footer — uses "JEWELRY" context label */}
      <InternalPageFooter locale={locale} label="PALAIS DES CHIMÈRES — VIDMY 2026" />
    </div>
  );
}
