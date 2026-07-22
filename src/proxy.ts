import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "en";
const productSlugs = new Set([
  "veil-of-becoming",
  "chimera-form",
  "ivory-bloom",
  "blood-current",
  "nocturne-creature",
]);
const legalSlugs = new Set(["shipping", "legal-notice", "privacy", "payment", "terms"]);
const singlePageRoutes = new Set(["film", "about", "contact", "jewelry", "archive", "404"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A locale-free 404 always opens in English.
  if (pathname === "/404") {
    return NextResponse.redirect(new URL("/en/404", request.url));
  }
  
  const normalizedPathname = pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
  const segments = normalizedPathname.split("/").filter(Boolean);
  const locale = locales.find((candidate) => candidate === segments[0]);

  if (locale) {
    const section = segments[1];
    const slug = segments[2];
    const hasExtraSegments = segments.length > 3;
    const isInvalidProduct =
      section === "collection" && (hasExtraSegments || (Boolean(slug) && !productSlugs.has(slug)));
    const isInvalidLegalPage =
      section === "legal" && (hasExtraSegments || !slug || !legalSlugs.has(slug));
    const isInvalidSinglePage = Boolean(section && singlePageRoutes.has(section) && (slug || hasExtraSegments));
    const isUnknownPage = Boolean(section && !singlePageRoutes.has(section) && section !== "collection" && section !== "legal");

    // Dynamic routes are matched by Next before its fallback boundary. Handle
    // invalid slugs here so their address also changes to the localized 404.
    if (isInvalidProduct || isInvalidLegalPage || isInvalidSinglePage || isUnknownPage) {
      return NextResponse.redirect(new URL(`/${locale}/404`, request.url));
    }

    return;
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${normalizedPathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip API routes, Next.js internals, public assets, and files with extensions.
    '/((?!api|_next/static|_next/image|assets|.*\\..*).*)',
  ],
};
