import React from 'react';

const base = {
  fontFamily: 'var(--font-sans-body)',
  fontWeight: 'var(--weight-medium)',
  fontSize: '.9rem',
  lineHeight: 1.55,
  padding: '10px 18px',
  borderRadius: 'var(--radius)',
  border: '1px solid transparent',
  cursor: 'pointer',
};

const byVariant = {
  primary: { background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)', borderColor: 'var(--ink)' },
  outline: { background: 'transparent', color: 'var(--ink)', borderColor: 'var(--btn-outline-border)' },
};

export function Button({ variant = 'primary', disabled = false, as = 'button', href, onClick, style, children, ...rest }) {
  const Tag = as === 'a' ? 'a' : 'button';
  return (
    <Tag
      href={as === 'a' ? href : undefined}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      style={{
        ...base,
        ...byVariant[variant],
        display: 'inline-block',
        textDecoration: 'none',
        borderBottomStyle: 'solid',
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
