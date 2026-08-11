import React from 'react';

export function Pill({ children, style, ...rest }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono-meta)',
        fontSize: 'var(--size-mono-xs)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-tag)',
        color: 'var(--text-tag)',
        border: '1px solid var(--border-tag)',
        borderRadius: 'var(--radius)',
        padding: '3px 8px',
        display: 'inline-block',
        lineHeight: 1.4,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
