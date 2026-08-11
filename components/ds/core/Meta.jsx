import React from 'react';

export function Meta({ children, style, ...rest }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono-meta)',
        fontSize: 'var(--size-caption)',
        color: 'var(--text-muted)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
