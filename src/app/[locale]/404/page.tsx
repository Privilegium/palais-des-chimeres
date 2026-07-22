import Link from "next/link";

export default async function Localized404Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFrench = locale === "fr";

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-brand-black px-6 py-28 text-brand-ivory">
      <section className="w-full max-w-xl border-y border-brand-ivory/15 py-12 text-center md:py-16">
        <p className="text-[10px] uppercase tracking-[0.36em] text-brand-red">404</p>
        <h1 className="mt-5 font-serif [letter-spacing:clamp(0.32rem,0.5vw,0.6rem)] text-[clamp(2.4rem,7vw,5rem)] leading-none">
          {isFrench ? <>PERDU DANS LES<br />BOIS ENSORCELÉS</> : <>LOST IN THE<br />WITCH WOODS</>}
        </h1>
        <p className="mx-auto mt-6 max-w-sm font-serif text-[1.05rem] italic leading-relaxed text-brand-ivory/65">
          {isFrench ? "Cette page n’a pas été trouvée." : "This page was not found."}
        </p>
        <nav aria-label="Useful links" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={`/${locale}/collection`} className="min-w-48 border border-brand-ivory/30 px-6 py-4 text-[10px] uppercase tracking-[0.27em] transition-colors hover:border-brand-ivory hover:bg-brand-ivory hover:text-brand-black">
            {isFrench ? "Voir la collection" : "View collection"}
          </Link>
          <Link href={`/${locale}/contact`} className="min-w-48 border border-brand-ivory/20 px-6 py-4 text-[10px] uppercase tracking-[0.27em] text-brand-ivory/75 transition-colors hover:border-brand-ivory hover:text-brand-ivory">
            {isFrench ? "Nous contacter" : "Contact us"}
          </Link>
        </nav>
      </section>
    </main>
  );
}
