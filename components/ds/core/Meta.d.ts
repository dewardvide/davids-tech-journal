import * as React from 'react';

/** The mono / caption / muted triplet used for dates, read time and kickers. */
export interface MetaProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function Meta(props: MetaProps): React.JSX.Element;
