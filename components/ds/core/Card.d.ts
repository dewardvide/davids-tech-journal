import * as React from 'react';

/**
 * White hairline card for a compact entry teaser. No shadow, 2px radius.
 */
export interface CardProps {
  /** Mono meta line, e.g. "2026.06.19 · Security". */
  meta?: React.ReactNode;
  title?: React.ReactNode;
  /** Optional link for the title. */
  href?: string;
  style?: React.CSSProperties;
  /** Summary copy. */
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): React.JSX.Element;
