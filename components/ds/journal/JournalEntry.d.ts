import * as React from 'react';

/**
 * The signature pattern: a left margin rail carrying date + topic, with the entry beside it.
 */
export interface JournalEntryProps {
  /** Dotted date, e.g. "2026.08.11". */
  date: string;
  /** Topic label rendered as a Pill. */
  category?: string;
  title: string;
  summary?: string;
  href?: string;
  /** Defaults to "Read entry →". */
  linkLabel?: string;
  style?: React.CSSProperties;
}

export declare function JournalEntry(props: JournalEntryProps): React.JSX.Element;
