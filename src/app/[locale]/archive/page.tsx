import Image from 'next/image';
import Link from 'next/link';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { getProductForLocale, products } from '@/data/products';
import { getSiteContent } from '@/content/site';
import { PRODUCT_CARD_META_CLASS, PRODUCT_CARD_TITLE_CLASS } from '@/components/ui/productCardTypography';

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);
  const archiveProducts = products.map((product) => getProductForLocale(product, locale));

  return (
    <div className="flex min-h-screen flex-col bg-brand-black">
      <main className="flex-1 px-6 pb-6 pt-[120px] md:px-12 md:pb-8 2xl:px-16">
        <section className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4" aria-labelledby="archive-title">
          <div className="archive-intro flex min-h-[18rem] flex-col justify-end px-1 pb-8 pr-8 sm:px-5 lg:min-h-0 lg:px-6 lg:pb-10">
            <h1 id="archive-title" className="font-serif [letter-spacing:clamp(0.32rem,0.5vw,0.6rem)] text-[clamp(2.5rem,4vw,4.5rem)] leading-none text-brand-ivory">
              {content.archive.title}
            </h1>
            <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-brand-ivory/50">
              {content.archive.collectionLine}
            </p>
            <p className="body-copy-readable mt-6 max-w-[18rem]">
              {content.archive.intro}
            </p>
          </div>

          {archiveProducts.map((product) => (
            <Link
              key={product.id}
              href={`/${locale}/collection/${product.slug}`}
              className="archive-product-card group relative aspect-[4/3] overflow-hidden bg-neutral-950"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 3rem), 25vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent" />
              <span className="absolute right-4 top-4 text-xl font-extralight leading-none text-brand-ivory/50 transition-colors group-hover:text-brand-ivory/85" aria-hidden="true">+</span>
              <div className="absolute bottom-0 left-0 w-full px-5 py-5">
                <p className={PRODUCT_CARD_TITLE_CLASS}>
                  {product.name}
                </p>
                {product.type === 'priced' && product.price && (
                  <p className={PRODUCT_CARD_META_CLASS}>
                    {product.price}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </section>
      </main>

      <InternalPageFooter locale={locale} />
    </div>
  );
}
