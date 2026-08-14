import type { Metadata } from 'next';
import { AiStackView } from '@/components/AiStackView';
import { getLatestStack } from '@/lib/ai-stack';

export const metadata: Metadata = {
  title: 'My current AI stack',
  description:
    'The AI hardware, software, services, agents and models I’m working with right now — republished every month with what changed.',
  alternates: { canonical: '/ai-stack' },
};

/** Always the newest snapshot. Each month also has its own URL under [month]. */
export default function AiStackPage() {
  return <AiStackView stack={getLatestStack()} />;
}
