import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AiStackView } from '@/components/AiStackView';
import { getAllStacks, getLatestStack, getStackByMonth, monthLabel } from '@/lib/ai-stack';

type Params = { params: Promise<{ month: string }> };

export function generateStaticParams() {
  return getAllStacks().map(({ month }) => ({ month }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { month } = await params;
  const stack = getStackByMonth(month);
  if (!stack) return {};

  return {
    title: `My current AI stack — ${monthLabel(month)}`,
    description: stack.intro,
    // The newest month is also served at /ai-stack; that is the canonical one.
    alternates: { canonical: month === getLatestStack().month ? '/ai-stack' : `/ai-stack/${month}` },
  };
}

export default async function AiStackMonthPage({ params }: Params) {
  const { month } = await params;
  const stack = getStackByMonth(month);
  if (!stack) notFound();

  return (
    <>
      <AiStackView stack={stack} />
      <Link href="/ai-stack" className="dtj-arrow" style={{ marginTop: '1.4em' }}>
        &larr; Latest stack
      </Link>
    </>
  );
}
