import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import LegalMobileNav from './LegalMobileNav';
import { getLegalContent, legalNavigation, legalSlugs } from '@/content/legal';

export async function generateStaticParams() {
  const locales = ['en', 'fr'];
  return locales.flatMap((locale) => legalSlugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const language = locale === 'fr' ? 'fr' : 'en';
  const data = getLegalContent(language, slug);
  const navigation = legalNavigation[language];

  if (!data) redirect(`/${locale}/404`);

  const ui = language === 'fr'
    ? {
        eyebrow: 'Informations légales',
        inSection: 'Dans cette section',
        needHelp: 'Besoin d’aide ?',
        helpCopy: 'Notre équipe est à votre écoute pour toute question concernant votre commande.',
        contact: 'Nous contacter',
        banner: ['Chaque création est traitée avec intention.', 'Merci de faire partie de notre monde.'],
      }
    : {
        eyebrow: 'Legal Information',
        inSection: 'In this section',
        needHelp: 'Need Help?',
        helpCopy: 'Our team is here to assist with any questions regarding your order.',
        contact: 'Contact us',
        banner: ['Each creation is handled with intention.', 'Thank you for being part of our world.'],
      };

  return (
    <div className="flex min-h-screen flex-col bg-brand-black">
      <div className="px-6 pb-8 text-center" style={{ paddingTop: 'clamp(110px, 9vw, 148px)' }}>
        <div className="mb-4 text-center text-[9px] uppercase tracking-[0.36em] text-brand-ivory/45">{ui.eyebrow}</div>
        <h1 className="font-serif [letter-spacing:clamp(0.32rem,0.5vw,0.6rem)] uppercase text-brand-ivory" style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}>
          {data.title}
        </h1>
        <p className="body-copy mx-auto max-w-[680px] italic">{data.subtitle}</p>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12"><div className="border-t border-brand-ivory/[0.1]" /></div>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-10 md:px-12 md:py-14">
        <LegalMobileNav items={navigation} locale={locale} activeSlug={slug} />
        <div className="flex gap-12 lg:gap-20">
          <aside className="hidden w-[220px] shrink-0 md:block">
            <div className="sticky top-[110px]">
              <div className="mb-7 text-[8px] uppercase tracking-[0.36em] text-brand-ivory/35">{ui.inSection}</div>
              <nav className="flex flex-col gap-[2px]">
                {navigation.map((item) => {
                  const isActive = item.slug === slug;
                  return (
                    <Link key={item.slug} href={`/${locale}/legal/${item.slug}`} className={`group flex items-center gap-3 py-[10px] text-[11px] tracking-[0.12em] transition-colors ${isActive ? 'text-brand-red' : 'text-brand-ivory/45 hover:text-brand-ivory/80'}`}>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-16 border-t border-brand-ivory/[0.1] pt-8">
                <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-brand-ivory/60">{ui.needHelp}</p>
                <p className="body-copy mb-5 text-[0.95rem]">{ui.helpCopy}</p>
                <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-red transition-colors hover:text-brand-red/75">
                  {ui.contact} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </aside>

          <article className="min-w-0 flex-1">
            {data.sections.map((section, i) => (
              <section key={section.id} id={section.id} className={`legal-section py-9 md:py-12 ${i < data.sections.length - 1 ? 'border-b border-brand-ivory/[0.08]' : ''}`}>
                <h2 className="mb-6 font-serif text-[12px] uppercase tracking-[0.32em] text-brand-ivory">{section.heading}</h2>
                <div className="legal-copy max-w-[68ch]">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mb-5 whitespace-pre-line text-brand-ivory/70 leading-relaxed">{paragraph}</p>)}
                  {section.items && (
                    <div className="space-y-5">
                      {section.items.map((item) => (
                        <div key={item.label}>
                          <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-brand-ivory/50">{item.label}</p>
                          <p className="text-[13px] leading-relaxed text-brand-ivory/75">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.bullets && (
                    <ul className="mb-5 space-y-3 pl-5 text-[13px] leading-relaxed text-brand-ivory/70">
                      {section.bullets.map((bullet) => <li key={bullet} className="list-disc">{bullet}</li>)}
                    </ul>
                  )}
                  {section.contactLink && (
                    <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-brand-red transition-colors hover:text-brand-red/75">
                      {section.contactLink} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/images/campaign/ggg.jpeg" alt="" fill sizes="100vw" className="object-cover object-center opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/30 to-brand-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center px-6 py-14 text-center">
          <p className="font-sans text-[10px] uppercase leading-[2.2] tracking-[0.36em] text-brand-ivory/65">
            {ui.banner[0]}<br />{ui.banner[1]}
          </p>
        </div>
      </div>

      <InternalPageFooter locale={locale} />
    </div>
  );
}
