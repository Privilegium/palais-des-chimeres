import { redirect } from 'next/navigation';

export default async function JewelryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  redirect(`/${locale}/collection`);
}
