import * as React from 'react';

/**
 * Sage-tinted aside with a 3px accent rule on the left — for rules of thumb and warnings inside entries.
 */
export interface CalloutProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Callout(props: CalloutProps): React.JSX.Element;
