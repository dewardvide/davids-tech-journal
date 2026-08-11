import * as React from 'react';

/** Code block on --paper-dim inside a hairline, with an optional mono filename bar. */
export interface CodeBlockProps {
  code?: string;
  filename?: string;
  lang?: string;
  showLineNumbers?: boolean;
  style?: React.CSSProperties;
}

export declare function CodeBlock(props: CodeBlockProps): React.JSX.Element;

export interface InlineCodeProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare function InlineCode(props: InlineCodeProps): React.JSX.Element;
