import React from 'react';

export function Footer({ brand = "David's Tech Journal", note = 'Written as the work happens. Corrections welcome.', links = ['RSS', 'GitHub', 'Mastodon', 'Email'], style, ...rest }) {
  return (
    <footer className="dtj-rail" style={{ borderTop: '1px solid var(--border-hairline)', marginTop: '4em', paddingTop: '1.4em', ...style }} {...rest}>
      <div style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 'var(--weight-bold)', fontSize: 'var(--size-sm)' }}>{brand}</div>
      <div>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono-meta)', fontSize: 'var(--size-meta)', color: 'var(--text-muted)', maxWidth: 'var(--measure-body)' }}>{note}</p>
        <div style={{ display: 'flex', gap: '22px', marginTop: '12px', fontFamily: 'var(--font-mono-meta)', fontSize: 'var(--size-micro)', letterSpacing: 'var(--tracking-tag)', flexWrap: 'wrap' }}>
          {links.map((l) => {
            const label = typeof l === 'string' ? l : l.label;
            return <a key={label} href={typeof l === 'string' ? '#' : l.href || '#'} style={{ color: 'var(--text-muted)', borderBottomColor: 'var(--border-hairline)' }}>{label.toUpperCase()}</a>;
          })}
        </div>
      </div>
    </footer>
  );
}
