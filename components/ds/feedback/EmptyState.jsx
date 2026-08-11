import React from 'react';

export function EmptyState({ code, title, children, action, style, ...rest }) {
  return (
    <div className="dtj-rail" style={{ borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)', padding: '48px 0', ...style }} {...rest}>
      <div style={{ fontFamily: 'var(--font-mono-meta)', fontSize: 'var(--size-meta)', color: 'var(--text-muted)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase' }}>{code || '—'}</div>
      <div>
        <h2 style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 'var(--weight-semibold)', fontSize: 'var(--size-h2)', margin: '0 0 .3em' }}>{title}</h2>
        {children ? <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--size-sm)', maxWidth: 'var(--measure-body)' }}>{children}</p> : null}
        {action ? <div style={{ marginTop: '18px' }}>{action}</div> : null}
      </div>
    </div>
  );
}
