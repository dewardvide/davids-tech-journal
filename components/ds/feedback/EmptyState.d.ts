import * as React from 'react';

/**
 * The one pattern behind every nothing-here view: no results, empty topic, 404.
 */
export interface EmptyStateProps {
  /** Mono kicker in the rail — a status code ("404") or a label ("NO RESULTS"). */
  code?: string;
  title: string;
  /** Explanatory line. */
  children?: React.ReactNode;
  /** Usually a single outline Button. */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;
