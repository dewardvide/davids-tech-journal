import * as React from 'react';

/**
 * Page footer built on the same 150px rail: wordmark in the rail, note and links beside it.
 */
export interface FooterProps {
  brand?: string;
  /** One-line standing note. */
  note?: string;
  links?: Array<string | { label: string; href?: string }>;
  style?: React.CSSProperties;
}

export declare function Footer(props: FooterProps): React.JSX.Element;
