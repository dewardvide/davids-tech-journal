import React from 'react';
import { Pill } from '../core/Pill.jsx';

export function JournalEntry({ date, category, title, summary, href = '#', linkLabel = 'Read entry →', style, ...rest }) {
  return (
    <article
      className="dtj-rail"
      style={{
        padding: '26px 0',
        borderBottom: '1px solid var(--border-hairline)',
        ...style,
      }}
      {...rest}
    >
      <div className="dtj-rail-head" style={{ fontFamily: 'var(--font-mono-meta)', fontSize: 'var(--size-meta)', color: 'var(--text-muted)', paddingTop: '4px' }}>
        <span style={{ color: 'var(--text-body)', fontWeight: 'var(--weight-medium)' }}>{date}</span>
        {category ? <div style={{ marginTop: '8px' }}><Pill style={{ fontSize: 'var(--size-mono-2xs)', padding: '2px 6px' }}>{category}</Pill></div> : null}
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 'var(--weight-semibold)', fontSize: 'var(--size-h3)', margin: '0 0 .3em' }}>
          <a href={href} style={{ color: 'inherit', borderBottom: 'none' }}>{title}</a>
        </h3>
        {summary ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--size-body-sm)', margin: '.3em 0 0', maxWidth: 'var(--measure-body)' }}>{summary}</p>
        ) : null}
        <a
          href={href}
          style={{
            fontFamily: 'var(--font-mono-meta)',
            fontSize: 'var(--size-meta)',
            color: 'var(--text-link)',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '10px',
            borderBottom: '1px solid var(--accent)',
          }}
        >
          {linkLabel}
        </a>
      </div>
    </article>
  );
}
