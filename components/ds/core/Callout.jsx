import React from 'react';

export function Callout({ children, style, ...rest }) {
  return (
    <div
      style={{
        background: 'var(--surface-callout)',
        borderLeft: '3px solid var(--border-accent)',
        padding: '14px 18px',
        fontSize: '.92rem',
        color: 'var(--text-body)',
        maxWidth: 'var(--measure-lede)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
