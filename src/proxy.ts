import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip API routes, Next.js internals, public assets, and files with extensions.
    '/((?!api|_next/static|_next/image|assets|.*\\..*).*)',
  ],
};
