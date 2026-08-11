import React from 'react';
import { Meta } from './Meta.jsx';

export function Card({ meta, title, children, href, style, ...rest }) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        maxWidth: '340px',
        ...style,
      }}
      {...rest}
    >
      {meta ? <Meta style={{ marginBottom: '6px', display: 'block' }}>{meta}</Meta> : null}
      {title ? (
        <h3 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 'var(--weight-semibold)', fontSize: '1.05rem', margin: '0 0 .3em' }}>
          {href ? <a href={href} style={{ color: 'inherit', borderBottom: 'none' }}>{title}</a> : title}
        </h3>
      ) : null}
      {children ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', margin: '6px 0 0' }}>{children}</p>
      ) : null}
    </div>
  );
}
