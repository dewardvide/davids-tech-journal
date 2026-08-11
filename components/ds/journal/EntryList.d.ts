import * as React from 'react';

/** Rules a run of JournalEntry rows into one ledger with a top hairline. */
export interface EntryListProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function EntryList(props: EntryListProps): React.JSX.Element;
