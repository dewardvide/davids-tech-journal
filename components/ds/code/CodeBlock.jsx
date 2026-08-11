import React from 'react';

const RULES = [
  { re: /(\/\/[^\n]*|#[^\n]*|--[^\n]*)/g, tone: 'comment' },
  { re: /("[^"\n]*"|'[^'\n]*')/g, tone: 'string' },
  { re: /\b(let|const|var|function|return|import|from|export|if|else|for|while|class|def|where|summarize|project|by|count|extend|and|or|not|in|as|SELECT|FROM|WHERE|GROUP)\b/g, tone: 'keyword' },
  { re: /\b(\d+(\.\d+)?)\b/g, tone: 'number' },
];

function highlight(line, lang) {
  if (lang === 'text') return [{ t: line, tone: null }];
  const marks = [];
  RULES.forEach(({ re, tone }) => {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(line)) !== null) {
      if (marks.some((k) => m.index < k.end && m.index + m[0].length > k.start)) continue;
      marks.push({ start: m.index, end: m.index + m[0].length, tone });
    }
  });
  marks.sort((a, b) => a.start - b.start);
  const out = [];
  let i = 0;
  marks.forEach((k) => {
    if (k.start > i) out.push({ t: line.slice(i, k.start), tone: null });
    out.push({ t: line.slice(k.start, k.end), tone: k.tone });
    i = k.end;
  });
  if (i < line.length) out.push({ t: line.slice(i), tone: null });
  return out;
}

export function CodeBlock({ code = '', filename, lang = 'js', showLineNumbers = false, style, ...rest }) {
  const lines = String(code).replace(/\n$/, '').split('\n');
  return (
    <div style={{ border: '1px solid var(--code-border)', borderRadius: 'var(--radius)', maxWidth: 'var(--measure-body)', overflow: 'hidden', ...style }} {...rest}>
      {filename ? (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--code-bar-bg)', borderBottom: '1px solid var(--code-border)',
          padding: '7px 14px', fontFamily: 'var(--font-mono-meta)', fontSize: 'var(--size-micro)',
          color: 'var(--text-muted)', letterSpacing: 'var(--tracking-tag)',
        }}>
          <span>{filename}</span>
          <span style={{ textTransform: 'uppercase' }}>{lang}</span>
        </div>
      ) : null}
      <pre style={{
        margin: 0, background: 'var(--code-bg)', color: 'var(--code-fg)',
        fontFamily: 'var(--font-mono-meta)', fontSize: 'var(--code-size)',
        lineHeight: 'var(--leading-code)', padding: 'var(--code-pad)', overflowX: 'auto',
      }}>
        <code>
          {lines.map((line, n) => (
            <div key={n} style={{ display: 'flex' }}>
              {showLineNumbers ? (
                <span style={{ color: 'var(--code-gutter)', userSelect: 'none', width: '2.5ch', flexShrink: 0, textAlign: 'right', marginRight: '14px' }}>{n + 1}</span>
              ) : null}
              <span style={{ whiteSpace: 'pre' }}>
                {highlight(line, lang).map((p, j) => (
                  <span key={j} style={p.tone ? { color: `var(--code-${p.tone})`, fontStyle: p.tone === 'comment' ? 'italic' : 'normal' } : undefined}>{p.t}</span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function InlineCode({ children, style, ...rest }) {
  return (
    <code style={{
      fontFamily: 'var(--font-mono-meta)', fontSize: '.92em',
      background: 'var(--code-inline-bg)', border: '1px solid var(--code-border)',
      borderRadius: 'var(--radius)', padding: '1px 5px', ...style,
    }} {...rest}>{children}</code>
  );
}
