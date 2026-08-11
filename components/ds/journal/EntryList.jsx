import React from 'react';

export function EntryList({ children, style, ...rest }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-hairline)', ...style }} {...rest}>
      {children}
    </div>
  );
}
