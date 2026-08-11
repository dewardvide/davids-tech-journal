# David's Tech Journal

Personal site for David Omurwa — *Navigating contemporary AI and cyber security*.

Built on the **David's Tech Journal Design System** (Claude Design project
`57f9d7bd-4758-40cc-beb7-76b94feef32f`). The visual language is a working
notebook: paper rather than white, a 150px margin rail carrying date and topic,
hairline rules, one sage accent, one ochre for tags, and no shadows, gradients,
animation, or emoji anywhere.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static generation of every route
```

## Layout

| Path | What's there |
|---|---|
| `app/styles/tokens/` | Design system tokens, verbatim. Do not edit — re-pull from the design project instead. |
| `app/styles/site.css` | The only site-level CSS. Wires next/font to the token names and styles long-form prose. |
| `components/ds/` | Design system components, verbatim, with their original directory structure. |
| `components/` | Site-level composition — nav, footer, entry row, page head, theme toggle. |
| `content/journal/*.md` | The entries. One file per entry. |
| `lib/posts.ts` | Reads and renders `content/journal`. Every page goes through it. |
| `lib/links.ts` | Every outbound URL in one place. |

## Adding an entry

Drop a markdown file into `content/journal/`:

```markdown
---
title: "Detection logic that survives contact with real traffic"
date: "2026-09-02"
summary: "One sentence. What the entry is about, including where it fell short."
topics: ["SECURITY", "AI/ML"]
readTime: "6 min read"
---

Body starts here.
```

The slug is the filename. Topics are uppercase mono labels; new ones appear on
`/topics` automatically. Dates render dotted in the rail (`2026.09.02`) and
dashed in meta lines. Blockquotes render as sage callouts. Images written as
`![alt](/images/...)` followed by an italic caption paragraph are fused into a
captioned figure.

## Design system rules worth not breaking

- The eight-step type scale is closed: `2.6 / 1.5 / 1.2 / 1.05 / 1 / .9 / .78 / .68` rem.
- `--radius: 2px` is the only radius. There are no shadows.
- Sage (`--accent`) and ochre (`--tag`) never appear inside the same element;
  ochre is for topic tags only.
- Sentence case for titles; UPPERCASE only in mono.
- No emoji, no icon fonts. `→` and `←` are the entire icon vocabulary.

## Notes

- Entries from the previous site keep their slugs; `/blog` and `/blog/:slug`
  308-redirect to `/journal` (see `next.config.ts`).
- There are no forms on this site — no newsletter, no contact form.
- Entry screenshots are an addition to the design system, which defines no
  imagery. They follow its other surfaces: hairline, 2px radius, no shadow,
  capped at the body measure, mono caption.
