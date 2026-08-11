import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Pill } from '@/components/ds/core/Pill.jsx';
import { Card } from '@/components/ds/core/Card.jsx';
import { getAllPosts, getPostBySlug, railDate, renderBody, topicSlug } from '@/lib/posts';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
    },
  };
}

export default async function EntryPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderBody(post.body);

  // Nearest neighbours by date, for the foot of the entry.
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === post.slug);
  const related = [all[i - 1], all[i + 1]].filter(Boolean);

  return (
    <article style={{ marginTop: '3.2em' }}>
      <header className="dtj-rail" style={{ paddingBottom: '2.4em', borderBottom: '1px solid var(--border-hairline)' }}>
        <div
          className="dtj-rail-head"
          style={{
            fontFamily: 'var(--font-mono-meta)',
            fontSize: 'var(--size-meta)',
            color: 'var(--text-muted)',
            paddingTop: '10px',
          }}
        >
          <span style={{ color: 'var(--text-body)', fontWeight: 'var(--weight-medium)' }}>{railDate(post.date)}</span>
          <div style={{ marginTop: '8px' }}>
            {post.topics.map((t) => (
              <Link
                key={t}
                href={`/topics/${topicSlug(t)}`}
                style={{ borderBottom: 'none', marginRight: '6px', display: 'inline-block' }}
              >
                <Pill style={{ fontSize: 'var(--size-mono-2xs)', padding: '2px 6px' }}>{t}</Pill>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '8px' }}>{post.readTime}</div>
        </div>
        <div>
          <h1>{post.title}</h1>
          <p className="dtj-lede">{post.summary}</p>
        </div>
      </header>

      {/* Body is markdown authored in content/journal, rendered at build time. */}
      <div className="dtj-prose" style={{ marginTop: '2.4em' }} dangerouslySetInnerHTML={{ __html: html }} />

      <footer className="dtj-section">
        <Link href="/journal" className="dtj-arrow">
          &larr; Back to the journal
        </Link>
        {related.length > 0 ? (
          <>
            <h2 style={{ marginTop: '1.8em' }}>Nearby entries</h2>
            <div className="dtj-cards">
              {related.map((p) => (
                <Card key={p.slug} meta={`${p.date} · ${p.topics[0]}`} title={p.title} href={`/journal/${p.slug}`}>
                  {p.summary}
                </Card>
              ))}
            </div>
          </>
        ) : null}
      </footer>
    </article>
  );
}
