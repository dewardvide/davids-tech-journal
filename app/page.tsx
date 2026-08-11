import Link from 'next/link';
import { Card } from '@/components/ds/core/Card.jsx';
import { Pill } from '@/components/ds/core/Pill.jsx';
import { EntryList } from '@/components/ds/journal/EntryList.jsx';
import { EntryRow } from '@/components/EntryRow';
import { getAllPosts } from '@/lib/posts';
import { LINKS } from '@/lib/links';

const PRODUCTS = [
  {
    meta: 'PRODUCT',
    title: 'Wrangler',
    href: LINKS.wrangler,
    body: 'AI-powered data analysis for CSV and Excel files — trend analysis, auto-generated visualizations, and privacy-first handling of whatever you drop in.',
  },
  {
    meta: 'VIDEO',
    title: 'CleonSec',
    href: LINKS.cleonsec,
    body: 'Cybersecurity on YouTube: walkthroughs, research breakdowns, and tool demos.',
  },
];

const REPOS = [
  {
    tag: 'TERRAFORM',
    title: 'Simple Sentinel',
    href: LINKS.simpleSentinel,
    body: 'A Terraform template that provisions an Azure Sentinel SIEM stack — the whole workspace, not a fragment of one.',
  },
  {
    tag: 'PYTHON',
    title: 'My First Sentinel Notebook',
    href: LINKS.sentinelNotebook,
    body: 'A Jupyter notebook guide to Azure Sentinel, including the Python setup that trips most people up on the first run.',
  },
];

export default function HomePage() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <>
      <header style={{ marginTop: '3.2em' }}>
        <div className="dtj-kicker">Navigating contemporary AI and cyber security</div>
        <h1 style={{ marginTop: '.3em' }}>David&rsquo;s Tech Journal</h1>
        <p className="dtj-lede">
          I&rsquo;m David Omurwa — a cybersecurity engineer, AI builder, and tool maker working at the
          intersection of security, automation, and applied AI. Based in Wroc&#322;aw, Poland.
        </p>
      </header>

      <section className="dtj-section">
        <h2>Selected work</h2>
        <div className="dtj-cards">
          {PRODUCTS.map((p) => (
            <Card key={p.title} meta={p.meta} title={p.title} href={p.href}>
              {p.body}
            </Card>
          ))}
        </div>
      </section>

      <section className="dtj-section">
        <h2>Selected GitHub projects</h2>
        <div style={{ borderTop: '1px solid var(--border-hairline)', marginTop: '1.4em' }}>
          {REPOS.map((r) => (
            <article
              key={r.title}
              className="dtj-rail"
              style={{ padding: '26px 0', borderBottom: '1px solid var(--border-hairline)' }}
            >
              <div className="dtj-rail-head" style={{ paddingTop: '4px' }}>
                <Pill style={{ fontSize: 'var(--size-mono-2xs)', padding: '2px 6px' }}>{r.tag}</Pill>
              </div>
              <div>
                <h3 style={{ margin: '0 0 .3em' }}>
                  <a href={r.href} style={{ color: 'inherit', borderBottom: 'none' }}>
                    {r.title}
                  </a>
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 'var(--size-sm)',
                    margin: '.3em 0 0',
                    maxWidth: 'var(--measure-body)',
                  }}
                >
                  {r.body}
                </p>
                <a
                  href={r.href}
                  className="dtj-arrow"
                  style={{ marginTop: '10px' }}
                >
                  View on GitHub &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dtj-section">
        <h2>Latest entries</h2>
        <EntryList style={{ marginTop: '1.4em' }}>
          {latest.map((post) => (
            <EntryRow key={post.slug} post={post} />
          ))}
        </EntryList>
        <Link href="/journal" className="dtj-arrow" style={{ marginTop: '1.4em' }}>
          Read the journal &rarr;
        </Link>
      </section>
    </>
  );
}
