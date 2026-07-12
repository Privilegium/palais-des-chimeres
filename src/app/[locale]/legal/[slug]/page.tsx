import Link from 'next/link';
import Image from 'next/image';
import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { notFound } from 'next/navigation';
import { StarOrnament, WovenOrnament } from '@/components/ui/Ornament';

// ─── Shared types ─────────────────────────────────────────────────────────────

type Section = {
  id: string;
  heading: string;
  body: React.ReactNode;
};

type LegalPageData = {
  slug: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

// ─── Sidebar nav config ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { slug: 'shipping',      label: 'Shipping & Returns' },
  { slug: 'legal-notice',  label: 'Legal Notice' },
  { slug: 'privacy',       label: 'Privacy Policy' },
  { slug: 'payment',       label: 'Payment & Ordering' },
  { slug: 'terms',         label: 'Terms' },
] as const;

type NavSlug = typeof NAV_ITEMS[number]['slug'];

// ─── Static content ───────────────────────────────────────────────────────────

const CONTENT: Record<NavSlug, LegalPageData> = {
  shipping: {
    slug: 'shipping',
    title: 'Shipping & Returns',
    subtitle: 'Information regarding delivery, returns, and exchanges for orders from Palais des Chimères.',
    sections: [
      {
        id: 'shipping',
        heading: '01.  Shipping',
        body: (
          <>
            <p className="mb-6 text-brand-ivory/70 leading-relaxed">
              We offer worldwide shipping on all orders. Each piece is carefully prepared and packaged with the utmost attention to detail.
            </p>
            <div className="space-y-5">
              {[
                { label: 'Processing Time', text: 'Orders are processed within 3–5 business days.' },
                { label: 'Delivery Times', text: 'Standard shipping: 7–14 business days. Express shipping: 2–5 business days.' },
                { label: 'Shipping Costs', text: 'Calculated based on your location and selected shipping method. Duties and taxes may apply for international orders.' },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-4">
                  <span className="mt-[2px] shrink-0 text-brand-gold/60 text-[10px]">+</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/50 mb-1">{label}</p>
                    <p className="text-[13px] text-brand-ivory/75 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        id: 'returns',
        heading: '02.  Returns',
        body: (
          <>
            <p className="mb-6 text-brand-ivory/70 leading-relaxed">
              We accept returns within 14 days of delivery for eligible items.
            </p>
            <div className="space-y-5">
              {[
                { label: 'Eligibility', text: 'Items must be unworn, unwashed, and returned in original condition with all tags and packaging.' },
                { label: 'How to Return', text: 'Contact our client service team to initiate a return and receive further instructions.' },
                { label: 'Return Shipping', text: 'Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.' },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-4">
                  <span className="mt-[2px] shrink-0 text-brand-gold/60 text-[10px]">+</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/50 mb-1">{label}</p>
                    <p className="text-[13px] text-brand-ivory/75 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        id: 'exchanges',
        heading: '03.  Exchanges',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            We are happy to offer exchanges for a different size or item. Availability is subject to the made-to-order nature of each creation.
          </p>
        ),
      },
      {
        id: 'non-returnable',
        heading: '04.  Non-Returnable Items',
        body: (
          <>
            <p className="mb-4 text-brand-ivory/70 leading-relaxed">
              For hygiene and craftsmanship reasons, the following items are final sale and cannot be returned:
            </p>
            <p className="text-[13px] text-brand-ivory/55 tracking-wider">
              Made-to-order pieces &nbsp;·&nbsp; Bespoke items &nbsp;·&nbsp; Intimate apparel
            </p>
          </>
        ),
      },
      {
        id: 'questions',
        heading: '05.  Questions?',
        body: (
          <>
            <p className="mb-5 text-brand-ivory/70 leading-relaxed">
              For any questions regarding shipping, returns, or exchanges, please contact our atelier.
            </p>
            <Link href="/en/contact" className="inline-flex items-center gap-2 text-brand-red text-[12px] tracking-[0.2em] uppercase hover:text-brand-red/75 transition-colors">
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </>
        ),
      },
    ],
  },
  'legal-notice': {
    slug: 'legal-notice',
    title: 'Legal Notice',
    subtitle: 'Legal information about Palais des Chimères and the operation of this website.',
    sections: [
      {
        id: 'publisher',
        heading: '01.  Publisher',
        body: (
          <div className="space-y-2 text-[13px] text-brand-ivory/70 leading-relaxed">
            <p>Palais des Chimères</p>
            <p>Paris, France</p>
            <p>studio@palaisdeschimeres.com</p>
          </div>
        ),
      },
      {
        id: 'hosting',
        heading: '02.  Hosting',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            This website is hosted on Vercel Inc., 340 Pine Street, Suite 1501, San Francisco, California 94104, USA.
          </p>
        ),
      },
      {
        id: 'ip',
        heading: '03.  Intellectual Property',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            All content on this website — including images, texts, graphics, and designs — is the exclusive property of Palais des Chimères and is protected by applicable intellectual property laws. Any reproduction or distribution without prior written consent is strictly prohibited.
          </p>
        ),
      },
      {
        id: 'liability',
        heading: '04.  Limitation of Liability',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            Palais des Chimères makes every effort to ensure the accuracy and completeness of information on this website. However, we cannot guarantee that all information is free of errors. We reserve the right to modify the content at any time without prior notice.
          </p>
        ),
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your personal information.',
    sections: [
      {
        id: 'data-collected',
        heading: '01.  Data We Collect',
        body: (
          <>
            <p className="mb-5 text-brand-ivory/70 leading-relaxed">
              When you contact us or submit an inquiry, we collect the following personal information:
            </p>
            <div className="space-y-3">
              {['Full name', 'Email address', 'Phone number (optional)', 'Message content', 'Page URL and locale at time of inquiry'].map((item) => (
                <div key={item} className="flex gap-4">
                  <span className="shrink-0 text-brand-gold/60 text-[10px] mt-[2px]">+</span>
                  <p className="text-[13px] text-brand-ivory/70">{item}</p>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        id: 'how-used',
        heading: '02.  How We Use Your Data',
        body: (
          <>
            <p className="mb-5 text-brand-ivory/70 leading-relaxed">Your information is used exclusively to:</p>
            <div className="space-y-3">
              {['Respond to your inquiry', 'Discuss your order or commission', 'Provide after-sales support'].map((item) => (
                <div key={item} className="flex gap-4">
                  <span className="shrink-0 text-brand-gold/60 text-[10px] mt-[2px]">+</span>
                  <p className="text-[13px] text-brand-ivory/70">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-brand-ivory/70 leading-relaxed">
              We do not sell, rent, or share your data with third parties for marketing purposes.
            </p>
          </>
        ),
      },
      {
        id: 'retention',
        heading: '03.  Data Retention',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            Inquiry data is retained only as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law.
          </p>
        ),
      },
      {
        id: 'rights',
        heading: '04.  Your Rights',
        body: (
          <>
            <p className="mb-5 text-brand-ivory/70 leading-relaxed">
              Under applicable data protection law, you have the right to access, rectify, or request deletion of your personal data.
            </p>
            <Link href="/en/contact" className="inline-flex items-center gap-2 text-brand-red text-[12px] tracking-[0.2em] uppercase hover:text-brand-red/75 transition-colors">
              Contact us to exercise your rights <span aria-hidden="true">→</span>
            </Link>
          </>
        ),
      },
      {
        id: 'cookies',
        heading: '05.  Cookies',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            This website uses only essential technical cookies required for basic functionality. No tracking or advertising cookies are used.
          </p>
        ),
      },
    ],
  },
  payment: {
    slug: 'payment',
    title: 'Payment & Ordering',
    subtitle: 'How ordering works at Palais des Chimères — an inquiry-based, made-to-order process.',
    sections: [
      {
        id: 'inquiry-model',
        heading: '01.  Inquiry-Based Ordering',
        body: (
          <>
            <p className="mb-5 text-brand-ivory/70 leading-relaxed">
              Palais des Chimères operates on a <strong className="text-brand-ivory font-normal">made-to-order, inquiry-based model</strong>. There is no online checkout or instant purchase. Each order begins with a personal conversation.
            </p>
            <p className="text-brand-ivory/70 leading-relaxed">
              This approach allows us to ensure every piece is crafted precisely for you — in the right silhouette, with the correct measurements, and with full creative intention.
            </p>
          </>
        ),
      },
      {
        id: 'how-to-order',
        heading: '02.  How to Order',
        body: (
          <div className="space-y-5">
            {[
              { label: 'Step 1', text: 'Browse the Collection and select a piece that speaks to you.' },
              { label: 'Step 2', text: 'Click "ORDER" or "PERSONAL REQUEST" on the product page.' },
              { label: 'Step 3', text: 'Complete the inquiry form. Include your name, email, and any relevant details.' },
              { label: 'Step 4', text: 'Our atelier will contact you directly within 2–3 business days to discuss your order, measurements, timeline, and payment.' },
            ].map(({ label, text }) => (
              <div key={label} className="flex gap-4">
                <span className="mt-[2px] shrink-0 text-brand-gold/60 text-[10px]">+</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-brand-ivory/50 mb-1">{label}</p>
                  <p className="text-[13px] text-brand-ivory/75 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: 'payment-methods',
        heading: '03.  Payment',
        body: (
          <>
            <p className="mb-5 text-brand-ivory/70 leading-relaxed">
              Payment is arranged directly with the atelier after your inquiry is confirmed. We accept:
            </p>
            <p className="text-[13px] text-brand-ivory/55 tracking-wider">
              Bank transfer &nbsp;·&nbsp; PayPal &nbsp;·&nbsp; International wire transfer
            </p>
            <p className="mt-5 text-brand-ivory/70 leading-relaxed">
              A deposit may be required before production begins. Full payment is due before delivery.
            </p>
          </>
        ),
      },
      {
        id: 'personal-request',
        heading: '04.  Personal Request Pieces',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            Some pieces are labelled <span className="text-brand-ivory italic">&ldquo;Personal Request&rdquo;</span> — these are bespoke commissions with no published price. Pricing is determined individually based on complexity, materials, and timeline. All personal request pieces are unique, non-returnable, and require a confirmed deposit.
          </p>
        ),
      },
      {
        id: 'timeline',
        heading: '05.  Production Timeline',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            All pieces are made to order. Standard production time is 4–8 weeks. Haute Couture and bespoke commissions may require 10–16 weeks. Your atelier contact will communicate the estimated delivery date before payment is confirmed.
          </p>
        ),
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms',
    subtitle: 'Terms and conditions governing your use of this website and ordering process.',
    sections: [
      {
        id: 'acceptance',
        heading: '01.  Acceptance',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            By browsing this website or submitting an inquiry, you agree to be bound by these terms. If you do not agree, please discontinue use of this site.
          </p>
        ),
      },
      {
        id: 'orders',
        heading: '02.  Orders & Contracts',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            Submitting an inquiry does not constitute a binding order. A contract is formed only upon written confirmation from Palais des Chimères and receipt of any required deposit payment.
          </p>
        ),
      },
      {
        id: 'pricing',
        heading: '03.  Pricing',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            All prices displayed are indicative and subject to change without notice. Final pricing is confirmed in writing after consultation. Prices are shown in Euros (€) and exclude applicable taxes and duties.
          </p>
        ),
      },
      {
        id: 'cancellation',
        heading: '04.  Cancellation',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            Orders may be cancelled only before production has commenced. Deposits are non-refundable once production begins. Bespoke and personal request pieces cannot be cancelled once a deposit has been received.
          </p>
        ),
      },
      {
        id: 'governing-law',
        heading: '05.  Governing Law',
        body: (
          <p className="text-brand-ivory/70 leading-relaxed">
            These terms are governed by French law. Any disputes arising from the use of this website or any order placed shall be subject to the exclusive jurisdiction of the courts of Paris, France.
          </p>
        ),
      },
    ],
  },
};

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  const locales = ['en', 'fr'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const item of NAV_ITEMS) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const data = CONTENT[slug as NavSlug];
  if (!data) notFound();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-brand-black">
        {/* ── Hero header ──────────────────────────────────────────── */}
        <div className="pb-8 text-center px-6" style={{ paddingTop: 'clamp(110px, 9vw, 148px)' }}>
          {/* Eyebrow — text only, centered */}
          <div className="mb-4 text-center text-[9px] uppercase tracking-[0.36em] text-brand-ivory/45">
            Legal Information
          </div>

          {/* Title */}
          <h1
            className="font-serif tracking-[0.22em] text-brand-ivory uppercase"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
          >
            {data.title}
          </h1>

          {/* Woven ornament */}
          <WovenOrnament width={144} height={22} className="mx-auto my-4 opacity-55" />

          {/* Subtitle */}
          <p className="body-copy mx-auto max-w-[600px] italic">
            {data.subtitle}
          </p>

          {/* Star divider */}
          <div className="mt-6 flex justify-center" aria-hidden="true">
            <StarOrnament size={18} className="opacity-50" />
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────── */}
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="border-t border-brand-ivory/[0.1]" />
        </div>

        {/* ── Two-column body ───────────────────────────────────────── */}
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-14 md:px-12">
          <div className="flex gap-12 lg:gap-20">

            {/* ── LEFT: sidebar nav ──────────────────────────────── */}
            <aside className="hidden w-[220px] shrink-0 md:block">
              <div className="sticky top-[110px]">
                {/* Section label */}
                <div className="mb-7 flex items-center gap-3 text-[8px] uppercase tracking-[0.36em] text-brand-ivory/35">
                  <span>In this section</span>
                  <StarOrnament size={12} className="opacity-55" />
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-[2px]">
                  {NAV_ITEMS.map((item) => {
                    const isActive = item.slug === slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/${locale}/legal/${item.slug}`}
                        className={`group flex items-center gap-3 py-[10px] text-[11px] tracking-[0.12em] transition-colors ${
                          isActive
                            ? 'text-brand-red'
                            : 'text-brand-ivory/45 hover:text-brand-ivory/80'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`text-[10px] transition-colors ${
                            isActive ? 'text-brand-red' : 'text-brand-ivory/25 group-hover:text-brand-ivory/50'
                          }`}
                        >
                          +
                        </span>
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Need help block */}
                <div className="mt-16 border-t border-brand-ivory/[0.1] pt-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-brand-ivory/60">
                    Need Help?
                  </p>
                  <p className="body-copy mb-5 text-[0.95rem]">
                    Our team is here to assist with any questions regarding your order.
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 text-brand-red text-[11px] tracking-[0.18em] uppercase hover:text-brand-red/75 transition-colors"
                  >
                    Contact us <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── RIGHT: article content ─────────────────────────── */}
            <article className="flex-1 min-w-0">
              <div className="space-y-0">
                {data.sections.map((section, i) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`py-12 ${i < data.sections.length - 1 ? 'border-b border-brand-ivory/[0.08]' : ''}`}
                  >
                    <h2 className="mb-6 font-sans text-[12px] uppercase tracking-[0.32em] text-brand-ivory">
                      {section.heading}
                    </h2>
                    <div className="legal-copy max-w-[68ch]">
                      {section.body}
                    </div>
                  </section>
                ))}
              </div>
            </article>

          </div>
        </main>

        {/* ── Editorial bottom banner ───────────────────────────────── */}
        {/* Image opacity raised from 0.25 → 0.55 to match the approved mockup */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/campaign/ggg.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/30 to-brand-black/60" />
          </div>
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center py-14 px-6 text-center">
            <StarOrnament size={18} className="mb-7 opacity-50" />
            <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-brand-ivory/65 leading-[2.2]">
              Each creation is handled with intention.<br />
              Thank you for being part of our world.
            </p>
            <StarOrnament size={18} className="mt-7 opacity-40" />
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <InternalPageFooter locale={locale} />
      </div>
    </>
  );
}
