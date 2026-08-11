import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EntryList } from '@/components/ds/journal/EntryList.jsx';
import { EntryRow } from '@/components/EntryRow';
import { PageHead } from '@/components/PageHead';
import { getAllTopics, getPostsByTopic } from '@/lib/posts';

type Params = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return getAllTopics().map(({ slug }) => ({ topic: slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topic } = await params;
  const match = getAllTopics().find((t) => t.slug === topic);
  return match ? { title: match.topic } : {};
}

export default async function TopicPage({ params }: Params) {
  const { topic } = await params;
  const match = getAllTopics().find((t) => t.slug === topic);
  if (!match) notFound();

  const posts = getPostsByTopic(topic);

  return (
    <>
      <PageHead kicker={`${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`} title={match.topic} />
      <EntryList style={{ marginTop: '3.2em' }}>
        {posts.map((post) => (
          <EntryRow key={post.slug} post={post} />
        ))}
      </EntryList>
      <Link href="/topics" className="dtj-arrow" style={{ marginTop: '1.4em' }}>
        &larr; All topics
      </Link>
    </>
  );
}
