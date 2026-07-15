import Link from 'next/link';

// Next's not-found boundary intentionally receives no route params.  The
// public preview always begins in English, so these links stay reliable even
// when a malformed path is what triggered this boundary.
export default function LocaleNotFoundPage() {

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-brand-black px-6 py-28 text-brand-ivory">
      <section className="w-full max-w-xl border-y border-brand-ivory/15 py-12 text-center md:py-16">
        <p className="text-[10px] uppercase tracking-[0.36em] text-brand-red">404</p>
        <h1 className="mt-5 font-serif text-[clamp(2.4rem,7vw,5rem)] leading-none tracking-[0.15em]">
          LOST IN THE<br />BECOMING
        </h1>
        <p className="mx-auto mt-6 max-w-sm font-serif text-[1.05rem] italic leading-relaxed text-brand-ivory/65">
          This page has dissolved into the unknown.
        </p>
        <nav aria-label="Useful links" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/en/collection"
            className="min-w-48 border border-brand-ivory/30 px-6 py-4 text-[10px] uppercase tracking-[0.27em] transition-colors hover:border-brand-ivory hover:bg-brand-ivory hover:text-brand-black"
          >
            View collection
          </Link>
          <Link
            href="/en/contact"
            className="min-w-48 border border-brand-ivory/20 px-6 py-4 text-[10px] uppercase tracking-[0.27em] text-brand-ivory/75 transition-colors hover:border-brand-ivory hover:text-brand-ivory"
          >
            Contact us
          </Link>
        </nav>
      </section>
    </main>
  );
}
