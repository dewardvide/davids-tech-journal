import Link from 'next/link';
import { PageHead } from '@/components/PageHead';
import {
  diffStack,
  getAllStacks,
  getPreviousStack,
  monthLabel,
  monthShort,
  type DiffItem,
  type StackMonth,
} from '@/lib/ai-stack';

/** What changed since last month, as a sentence rather than a legend. */
function changeLine(added: number, removed: number, since?: string): string {
  if (!since) return 'First published snapshot';
  if (!added && !removed) return `No changes since ${monthLabel(since)}`;
  const parts: string[] = [];
  if (added) parts.push(`${added} added`);
  if (removed) parts.push(`${removed} dropped`);
  return `${parts.join(' · ')} since ${monthLabel(since)}`;
}

/** The switcher is a row of links, not a select — this site has no forms. */
function MonthNav({ month }: { month: string }) {
  const months = getAllStacks().map((s) => s.month);
  if (months.length < 2) return null;

  return (
    <nav
      className="dtj-kicker"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '1.6em' }}
    >
      {months.map((m) =>
        m === month ? (
          <span key={m} style={{ color: 'var(--text-body)' }}>
            {monthShort(m)}
          </span>
        ) : (
          <Link key={m} href={`/ai-stack/${m}`} style={{ color: 'inherit', borderBottom: 'none' }}>
            {monthShort(m)}
          </Link>
        ),
      )}
    </nav>
  );
}

function Mark({ status }: { status: DiffItem['status'] }) {
  if (status === 'new') {
    return (
      <span className="dtj-stack-mark" style={{ color: 'var(--text-link)' }}>
        + new
      </span>
    );
  }
  if (status === 'removed') {
    return (
      <span className="dtj-stack-mark" style={{ color: 'var(--text-muted)' }}>
        &minus; dropped
      </span>
    );
  }
  return null;
}

function Item({ item, first }: { item: DiffItem; first: boolean }) {
  const muted = item.status === 'removed';

  return (
    // The first item aligns with the rail head; the rest are spaced off it.
    <li style={{ marginTop: first ? 0 : '.45em', color: muted ? 'var(--text-muted)' : undefined }}>
      {item.href && !muted ? <a href={item.href}>{item.name}</a> : item.name}
      {item.note ? (
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--size-sm)' }}>
          {' '}
          &mdash; {item.note}
        </span>
      ) : null}
      <Mark status={item.status} />
    </li>
  );
}

export function AiStackView({ stack }: { stack: StackMonth }) {
  const { categories, added, removed, since } = diffStack(stack, getPreviousStack(stack.month));

  return (
    <>
      <PageHead kicker="Updated monthly" title="My current AI stack" lede={stack.intro} />

      <MonthNav month={stack.month} />
      <p className="dtj-kicker" style={{ marginTop: '.8em' }}>
        {monthLabel(stack.month)} &middot; {changeLine(added, removed, since)}
      </p>

      {categories.map((category) => (
        <section key={category.heading} className="dtj-section">
          <h2>{category.heading}</h2>
          <div style={{ borderTop: '1px solid var(--border-hairline)', marginTop: '1.4em' }}>
            {category.groups.map((group) => (
              <article
                key={group.heading}
                className="dtj-rail"
                style={{ padding: '26px 0', borderBottom: '1px solid var(--border-hairline)' }}
              >
                <div className="dtj-rail-head" style={{ paddingTop: '2px' }}>
                  <span className="dtj-kicker">{group.heading}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {group.items.map((item, i) => (
                    <Item key={`${item.name}-${item.status}`} item={item} first={i === 0} />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
