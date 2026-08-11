import * as React from 'react';

/**
 * Site header: serif wordmark left, uppercase mono links right, inside a hairline box.
 *
 * `brand` is widened from the design system's `string` to ReactNode so the
 * wordmark can be a link home. The JSX already renders any node.
 */
export interface NavBarProps {
  /** Wordmark — there is no logo file; the name is set in the display serif. */
  brand?: React.ReactNode;
  /** Link labels, or {label, href} objects. Rendered uppercase. */
  links?: Array<string | { label: string; href?: string }>;
  /** Label of the current section — gets the sage underline. */
  active?: string;
  onNavigate?: (label: string) => void;
  style?: React.CSSProperties;
}

export declare function NavBar(props: NavBarProps): React.JSX.Element;
