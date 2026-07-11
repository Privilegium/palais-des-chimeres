import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import { hasLocale } from "@/i18n/dictionaries";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",   // keep existing CSS var name — all font-serif classes work unchanged
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Palais des Chimères",
  description: "Dark gothic editorial fashion portfolio.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-ivory">
        <SiteHeader locale={locale} />
        {children}
      </body>
    </html>
  );
}
