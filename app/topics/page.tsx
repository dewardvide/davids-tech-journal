import type { Metadata } from 'next';
import Link from 'next/link';
import { Pill } from '@/components/ds/core/Pill.jsx';
import { PageHead } from '@/components/PageHead';
import { getAllTopics, getPostsByTopic } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Every topic the journal runs on, and what sits under each.',
};

export default function TopicsPage() {
  const topics = getAllTopics();

  return (
    <>
      <PageHead
        kicker={`${topics.length} topics`}
        title="Topics"
        lede="One running log, indexed by what each entry is actually about."
      />
      <div style={{ borderTop: '1px solid var(--border-hairline)', marginTop: '3.2em' }}>
        {topics.map(({ topic, slug, count }) => {
          const posts = getPostsByTopic(slug);
          return (
            <section
              key={slug}
              className="dtj-rail"
              style={{ padding: '26px 0', borderBottom: '1px solid var(--border-hairline)' }}
            >
              <div className="dtj-rail-head" style={{ paddingTop: '4px' }}>
                <Pill style={{ fontSize: 'var(--size-mono-2xs)', padding: '2px 6px' }}>{topic}</Pill>
              </div>
              <div>
                <div className="dtj-kicker">
                  {count} {count === 1 ? 'entry' : 'entries'}
                </div>
                <ul style={{ listStyle: 'none', margin: '.8em 0 0', padding: 0 }}>
                  {posts.map((post) => (
                    <li
                      key={post.slug}
                      style={{
                        marginTop: '.5em',
                        fontFamily: 'var(--font-serif-display)',
                        fontWeight: 'var(--weight-semibold)',
                      }}
                    >
                      <Link href={`/journal/${post.slug}`} style={{ color: 'inherit', borderBottom: 'none' }}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
