import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getProductForLocale, getProductsBySlugs, products } from '@/data/products';
import { getDictionary } from '@/i18n/dictionaries';
import ProductClient from './ProductClient';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { PRODUCT_CARD_META_CLASS, PRODUCT_CARD_TITLE_CLASS } from '@/components/ui/productCardTypography';

/*
  PDP LAYOUT — matches mockup 03-product-detail-desktop.png
  ──────────────────────────────────────────────────────────────
  Desktop 12-col grid:
    Col 1       → thumbnail strip       (sticky)
    Cols 2–7    → main product image    (3:4 ratio)
    Cols 8–12   → info panel            (sticky)

  ProductClient renders all three columns via explicit
  col-span/col-start/row-start classes and participates
  directly in the 12-col grid below.

  The page may scroll naturally — PDP is NOT locked to 100dvh.
  Pieces in This Look + footer follow below the product grid.
*/

export async function generateStaticParams() {
  const locales = ['en', 'fr'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const product of products) {
      params.push({ locale, slug: product.slug });
    }
  }
  return params;
}

// Unknown product slugs must reach the page so they can be sent to the public
// `/404` destination instead of keeping the invalid URL in the address bar.
export const dynamicParams = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const sourceProduct = getProductBySlug(slug);

  if (!sourceProduct) redirect(`/${locale}/404`);

  const product = getProductForLocale(sourceProduct, locale);

  const dict = getDictionary(locale);
  const relatedPieces = getProductsBySlugs(sourceProduct.relatedPieceSlugs ?? [])
    .slice(0, 6)
    .map((p) => getProductForLocale(p, locale));

  return (
    <>
      <main className="bg-brand-black pb-20 pt-[100px]">
        {/* ── Product grid ─────────────────────────────────────────────── */}
        <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12 2xl:px-16">
          {/*
            12-column grid.
            ProductClient renders three direct children of this grid
            via col-span/col-start/row-start utilities:
              [col 1]    thumbnail strip
              [cols 2-7] main image
              [cols 8-12] info panel
          */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12">
            <ProductClient product={product} locale={locale} dict={dict} />
          </div>
        </div>

        {relatedPieces.length > 0 && (
          <section id="pieces-in-this-look" className="related-looks mx-auto mt-9 w-full max-w-[1680px] scroll-mt-28 px-6 md:mt-24 md:scroll-mt-36 md:px-12 2xl:px-16">
            <div className="mb-5">
              <h2 className="font-serif text-[clamp(1.1rem,0.65vw,1.2rem)] font-medium uppercase tracking-[0.26em] text-brand-ivory/80">
                {dict.common.piecesInThisLook}
              </h2>
            </div>

            <div className="related-looks-grid grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-3">
              {relatedPieces.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/${locale}/collection/${rp.slug}`}
                  className="related-look-card group relative block overflow-hidden bg-neutral-950"
                  style={{ aspectRatio: '4/3' }}
                >
                  {/* Product image */}
                  <Image
                    src={rp.image}
                    alt={rp.name}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 2rem), (max-width: 1439px) calc(33vw - 2rem), 20vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/20 to-transparent" />
                  {/* + corner indicator */}
                  <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-brand-ivory/30 text-brand-ivory/55 text-sm transition-colors group-hover:border-brand-ivory/55 group-hover:text-brand-ivory/80">
                    +
                  </div>
                  {/* Product name + availability — bottom-left */}
                  <div className="absolute bottom-4 left-4">
                    <p className={PRODUCT_CARD_TITLE_CLASS}>
                      {rp.name}
                    </p>
                    <p className={PRODUCT_CARD_META_CLASS}>
                      {rp.type === 'priced' && rp.price
                        ? rp.price
                        : dict.common.personalRequest}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <InternalPageFooter locale={locale} />
    </>
  );
}
