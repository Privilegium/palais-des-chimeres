import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, products } from '@/data/products';
import { getDictionary } from '@/i18n/dictionaries';
import ProductClient from './ProductClient';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { StarOrnament } from '@/components/ui/Ornament';

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
  Related Looks + footer follow below the product grid.
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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const dict = getDictionary(locale);
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

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

        {/* ── Related Looks ──────────────────────────────────────────────── */}
        <div className="mx-auto mt-24 w-full max-w-[1680px] px-6 md:px-12 2xl:px-16">
          {/* Section heading */}
          <div className="mb-7 flex items-center gap-4">
            <StarOrnament size={16} className="opacity-55" />
            <h2 className="text-[10px] uppercase tracking-[0.36em] text-brand-ivory/65">
              Related Looks
            </h2>
          </div>

          {/* 3-column card grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.id}
                href={`/${locale}/collection/${rp.slug}`}
                className="group relative block overflow-hidden bg-neutral-950"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Product image */}
                <Image
                  src={rp.image}
                  alt={rp.name}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1680px) 33vw, 528px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/20 to-transparent" />
                {/* + corner indicator */}
                <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-brand-ivory/30 text-brand-ivory/55 text-sm transition-colors group-hover:border-brand-ivory/55 group-hover:text-brand-ivory/80">
                  +
                </div>
                {/* Product name + price — bottom-left */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-brand-ivory/90">
                    {rp.name}
                  </p>
                  <p className="mt-[5px] text-[10px] tracking-wide text-brand-ivory/55">
                    {rp.type === 'priced' && rp.price
                      ? rp.price
                      : dict.common.personalRequest}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <InternalPageFooter locale={locale} />
    </>
  );
}
