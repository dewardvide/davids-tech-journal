import * as React from 'react';

/**
 * Squared-corner action button. Primary is solid ink; outline is a hairline on paper.
 */
export interface ButtonProps {
  /** Solid ink (primary) or hairline outline. */
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  /** Render as an anchor for navigation actions. */
  as?: 'button' | 'a';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): React.JSX.Element;
