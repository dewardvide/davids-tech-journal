import type { Metadata } from 'next';
import { EntryList } from '@/components/ds/journal/EntryList.jsx';
import { EntryRow } from '@/components/EntryRow';
import { PageHead } from '@/components/PageHead';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Insights from the intersection of AI and security.',
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHead
        kicker={`${posts.length} entries`}
        title="Journal"
        lede="Insights from the intersection of AI and security."
      />
      <EntryList style={{ marginTop: '3.2em' }}>
        {posts.map((post) => (
          <EntryRow key={post.slug} post={post} />
        ))}
      </EntryList>
    </>
  );
}
