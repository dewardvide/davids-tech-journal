import React from 'react';

export function NavBar({ brand = "David's Tech Journal", links = [], active, onNavigate, style, ...rest }) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius)',
        padding: '14px 20px',
        background: 'var(--surface-card)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ fontFamily: 'var(--font-serif-display)', fontWeight: 'var(--weight-bold)', fontSize: '1.05rem' }}>{brand}</div>
      <div style={{ display: 'flex', gap: '22px', fontFamily: 'var(--font-mono-meta)', fontSize: 'var(--size-mono-xs)', color: 'var(--text-muted)' }}>
        {links.map((l) => {
          const label = typeof l === 'string' ? l : l.label;
          const isActive = active === label;
          return (
            <a
              key={label}
              href={typeof l === 'string' ? '#' : l.href || '#'}
              onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(label); } : undefined}
              style={{
                color: isActive ? 'var(--text-link)' : 'var(--text-muted)',
                textDecoration: 'none',
                borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                letterSpacing: 'var(--tracking-tag)',
                cursor: 'pointer',
              }}
            >
              {label.toUpperCase()}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
