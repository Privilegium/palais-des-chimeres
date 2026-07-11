import InternalPageFooter from '@/components/layout/InternalPageFooter';
import { getDictionary } from '@/i18n/dictionaries';
import FilmClient from './FilmClient';

/*
  FASHION FILM PAGE — matches mockup 04-fashion-film-desktop.png
  ──────────────────────────────────────────────────────────────
  Layout philosophy:
  - Entire page is exactly 100dvh — no vertical scroll, ever.
  - The shared SiteHeader is `position: absolute` in the layout, so it
    overlays the poster image exactly like the About and Contact hero panels.
  - Main area = viewport minus the footer bar height.
  - FilmClient owns the full-bleed poster + content overlay.
  - InternalPageFooter sits at the very bottom, inside the viewport.

  We use `100dvh` (Dynamic Viewport Height) instead of `100vh` so the page
  does not scroll on mobile browsers with floating address bars, and so the
  footer stays anchored at the actual bottom edge on every device.
*/

export default async function FilmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    /*
      Root wrapper: exactly 100dvh, clips anything that would spill.
      `flex-col` + `overflow-hidden` guarantee no scroll on any screen.
    */
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-brand-black">

      {/*
        Main cinematic area — grows to fill all available space between
        the top of the viewport and the footer.
        `relative` is required so FilmClient's `absolute inset-0` works.
      */}
      <main className="relative flex-1 overflow-hidden">
        <FilmClient watchFilmText={dict.common.watchFilm} />
      </main>

      {/* Footer — always pinned at the very bottom inside the 100dvh box */}
      <InternalPageFooter locale={locale} />

    </div>
  );
}
