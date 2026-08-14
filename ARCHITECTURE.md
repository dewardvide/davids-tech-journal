# Architecture

How this site is put together and why. Every feature added to the site is recorded
here as part of the same change — see [Change log](#change-log) at the bottom.

**Live:** https://davids-tech-journal.vercel.app
**Repo:** https://github.com/dewardvide/davids-tech-journal

---

## What this is

A personal site and journal for David Omurwa — *Navigating contemporary AI and cyber
security*. It replaced a v0-generated landing page at `v0-cleon-landing-page.vercel.app`,
carrying that site's content across into an entirely different visual language.

There is no app, no dashboard, no funnel. The product is the journal itself: a reading
surface plus a short index of work. That framing drives most of the decisions below.

## Stack

| Choice | Why |
|---|---|
| Next.js 16, App Router | Static generation for every route; no server needed at request time. |
| TypeScript | Everything except the design system components, which ship as `.jsx` with `.d.ts` alongside. |
| Plain CSS with custom properties | The design system ships CSS tokens. Tailwind would mean re-expressing them in a second vocabulary and inviting values from outside the scale. |
| Markdown in `content/journal/` | Entries are prose. A file per entry means adding one is a file drop, with no CMS, database, or build step to think about. |
| `gray-matter` + `remark` | Frontmatter and markdown → HTML, both at build time. Nothing parses markdown in the browser. |
| Vercel, GitHub integration | Push to `main` deploys production. |

**No client-side data fetching anywhere.** Every page reads the filesystem during the
build. `lib/posts.ts` is the only module that touches `content/`.

## Layout

```
app/
  layout.tsx              Root shell: fonts, theme script, nav, footer
  page.tsx                Home — bio, AI stack, selected work, GitHub projects (REPOS in the file), latest entries
  ai-stack/page.tsx       The newest AI stack snapshot
  ai-stack/[month]/page.tsx  One month's snapshot
  journal/page.tsx        The full ledger
  journal/[slug]/page.tsx One entry
  topics/page.tsx         All topics with their entries
  topics/[topic]/page.tsx One topic
  about/page.tsx          Prose, plus the certifications list (CERTIFICATIONS in the file)
  not-found.tsx           404
  styles/
    styles.css            Entry point — @import list only
    site.css              The ONLY site-level CSS (see below)
    tokens/*.css          Design system tokens, verbatim

components/
  ds/                     Design system components, verbatim
  SiteNav.tsx             Composes ds/NavBar with route-aware active state
  SiteFooter.tsx          Composes ds/Footer + ThemeToggle
  ThemeToggle.tsx         Light/dark, persisted
  EntryRow.tsx            A Post rendered as ds/JournalEntry
  PageHead.tsx            Kicker + h1 + lede
  AiStackView.tsx         A stack snapshot with its month-over-month diff

lib/
  posts.ts                Read, sort, render, and slug the entries
  ai-stack.ts             Stack lookups, month labels, and the diff
  links.ts                Every outbound URL, in one place

content/journal/*.md      The entries
content/ai-stack.ts       The monthly stack snapshots
public/images/blog/       Figures embedded in entries
```

## The design system boundary

This is the most important thing to understand before changing anything visual.

The site is built on the **David's Tech Journal Design System**, which lives as a Claude
Design project (`57f9d7bd-4758-40cc-beb7-76b94feef32f`) and is read with the `DesignSync`
tool. It is a working-notebook language: paper `#F7F8F6` rather than white, a 150px left
margin rail carrying each entry's date and topic, hairline rules, one sage accent
`#3F6C51`, one ochre `#8A6D3B` used only for topic tags, `--radius: 2px`, and **no
shadows, gradients, animation, transparency, imagery, or emoji**.

Files are divided into three tiers, and the tier decides how you may change them:

### 1. Verbatim — do not edit in place

`app/styles/tokens/*.css` and `components/ds/**`.

These are byte-for-byte copies from the design project. If one needs to change, change it
upstream and re-pull with `DesignSync`. Editing locally means the next pull silently
reverts your work, or worse, you keep a fork nobody knows about.

`components/ds/` preserves the design project's own directory structure
(`core/`, `journal/`, `navigation/`, `code/`, `feedback/`) specifically so the components'
relative imports — `import { Pill } from '../core/Pill.jsx'` — work unmodified.

Two deliberate exceptions, both documented at the point of divergence:

- **`tokens/fonts.css` is not used.** It loads the three families from Google Fonts by URL.
  We load them through `next/font/google` instead (self-hosted, no render-blocking request)
  and re-point the three font tokens in `site.css`. `app/styles/styles.css` is therefore
  our own file, mirroring the upstream `styles.css` minus that one import.
- **`NavBar.d.ts` widens `brand` from `string` to `ReactNode`,** so the wordmark can be a
  link home. The component's JSX already renders any node; only the type was narrow.

### 2. Site-level — `app/styles/site.css`

The only place site CSS is allowed to live. It does exactly three jobs:

1. Points the design system's font tokens at the `next/font` faces.
2. Styles long-form prose (`.dtj-prose`), which the system defines for a hand-authored page
   but not for HTML generated from markdown.
3. A small number of gap-fillers, each with a comment saying what it is compensating for.

Nothing here introduces a colour, size, radius, or shadow that isn't already in the system.
The type scale is closed at eight steps — `2.6 / 1.5 / 1.2 / 1.05 / 1 / .9 / .78 / .68` rem
— and if something seems to need a size between two of them, it is the wrong element.

### 3. Composition — `components/*.tsx`, `app/**/page.tsx`

Ordinary application code. It composes design system components and uses tokens. It should
not be re-implementing anything the system already provides.

### Deliberate extensions

Three things the design system does not define, added because the site cannot ship without
them. Each stays inside the system's language:

- **Prose styling** (`.dtj-prose`) — headings, lists, tables, and rules for generated HTML.
  Blockquotes render with the Callout treatment: sage 3px rule on the left edge only.
- **Entry figures** — the system defines no imagery at all, but the entries carry
  screenshots that are load-bearing content. They follow the system's other surfaces:
  hairline border, 2px radius, no shadow, capped at the body measure, mono caption.
- **Nav wrap below 720px** — the wordmark and links stop fitting on one row, so the
  wordmark takes its own line rather than breaking mid-name.

### Rules worth not breaking

- Sage and ochre never appear inside the same element; ochre is topic tags only.
- Sentence case for titles and headings. UPPERCASE only in mono — nav, tags, kickers.
- No emoji, no icon library. `→` and `←` are the entire icon vocabulary.
- No `position: fixed`. The nav is a static hairline box, not a floating bar.
- Separation comes from rules, never from depth.

## Content

### The frontmatter contract

```markdown
---
title: "Detection logic that survives contact with real traffic"
date: "2026-09-02"          # ISO. Rendered dotted in rails, dashed in meta lines.
summary: "One sentence."     # Shown in ledgers, cards, and as the entry lede.
topics: ["SECURITY", "AI/ML"] # Uppercase mono labels. topics[0] shows in the rail.
readTime: "6 min read"
---
```

The filename is the slug. Topics need no registration — `/topics` and `/topics/[topic]`
derive themselves from what the entries actually use, via `getAllTopics()`.

### Where the entries came from

All eight were carried over from the previous site. `WebFetch` returned *summarised*
bodies rather than the real text, so the entries were instead recovered by fetching each
page's raw HTML, extracting the `<article>` element, and converting with Turndown. The
bodies are verbatim. The 22 embedded images were downloaded to `public/images/blog/<slug>/`.

Slugs were kept identical to the old site so existing links resolve, and
`next.config.ts` 308-redirects `/blog` → `/journal` and `/blog/:slug` → `/journal/:slug`.

Topics were **not** carried over as-is. The originals tagged nearly every post
`AI + Cybersecurity`, which made a topic index useless. They were re-cut so the axes
discriminate: `AI/ML`, `SECURITY`, `VULN MGMT`, `AUTOMATION`, `THREAT INTEL`, `DFIR`.

### The AI stack snapshots

`/ai-stack` publishes the hardware, software, services, agents, and models in use, and is
republished monthly. `content/ai-stack.ts` holds one object per month:

```ts
type StackMonth = {
  month: string;   // "2026-08" — also the URL segment
  intro: string;   // that month's lede
  categories: { heading: string; groups: { heading: string; items: StackItem[] }[] }[];
};
type StackItem = { name: string; href?: string; note?: string };
```

**Adding a month is appending one object.** Each snapshot is written as the stack *is*,
never as a list of changes: `diffStack()` in `lib/ai-stack.ts` compares it against the
previous month and marks each item `new` / `unchanged`, appending anything that
disappeared as `removed` so a dropped tool stays visible rather than silently vanishing.
Groups and categories dropped whole come back the same way. The identity key is
`category/group/item`, lowercased — so renaming an item reads as one removal plus one
addition, which is what actually happened.

Hardware is modelled as one group per component (`GPU`, `CPU`, `RAM`) holding a single
item. That needs no special case at render time and lands naturally in the 150px rail:
group heading in the rail, items in the body — the same shape as the home page's
repository rows.

This is the one deliberate exception to "`lib/posts.ts` is the only module that touches
`content/`". It is structured data rather than prose, so it is an *imported TypeScript
module*, not a filesystem read: a mistyped key fails the build instead of rendering blank.
Nothing about the static, no-client-fetching invariant changes.

`/ai-stack` always serves the newest month; `/ai-stack/YYYY-MM` serves any month and is
what gets linked and indexed. The newest month is reachable at both, so its `[month]` page
declares `/ai-stack` as canonical.

### Figures

The source entries write a screenshot as an image paragraph followed by an italic caption
paragraph. `figures()` in `lib/posts.ts` fuses that pair into a `<figure>` /
`<figcaption>`, so the caption can be set as mono meta rather than floating body italics.

## Notable decisions

**No forms.** Not a newsletter box, not a contact form, not a search input. This was an
explicit requirement and it overrides the design system, which defines Input, SearchInput,
Textarea, and a newsletter block. `components/ds/forms/` was never copied down. The
absence is verified against the built output, not just the source.

This is why the AI stack's month switcher is a row of links rather than a `<select>`. It
also gives every month a real URL, which a dropdown would not.

**Theme toggle without React state.** The label is driven by CSS off the `data-theme`
attribute:

```css
.dtj-when-dark{display:none}
[data-theme="dark"] .dtj-when-light{display:none}
[data-theme="dark"] .dtj-when-dark{display:inline}
```

The click handler flips the attribute and writes `localStorage`. Nothing else. An earlier
version tracked the theme in `useState` seeded from an effect, which meant the label was
wrong in the server-rendered HTML and had to be hidden until hydration. Driving it from
the attribute makes the markup correct on arrival, removes the flash, and drops a hook.

A small inline script in `<head>` (`themeScript`) applies a stored pick before first
paint. React logs a dev-only warning about script tags inside components; the tag is in the
server-rendered HTML and does run. `next/script` with `beforeInteractive` produces the same
warning, so the plainer form is kept.

The pick is deliberate and sticky: once a reader chooses, `prefers-color-scheme` is not
silently followed back.

**Design system components use plain `<a>`.** They're verbatim, so entry links from
`JournalEntry` are full page loads rather than client-side navigations. On a static
reading site the difference isn't worth forking a component over. Links in our own
components use `next/link`.

**Nearest-neighbour related entries.** The entry footer shows the entries immediately
before and after by date. Not tag similarity — with eight entries, date adjacency is
honest and needs no tuning.

## Verification

Before calling a change done:

```bash
npm run build     # must generate every route; a failure here is a real failure
npx eslint .
npm run dev       # then check the actual pages
```

Check pages at 1280px and 375px, in both themes, and confirm the rail unstacks below
720px. Then the adherence pass:

```bash
grep -rniE "box-shadow|gradient|position: *fixed" app components
grep -rniE "<form|<input|<textarea" app components
```

## Change log

Newest first. One entry per feature.

### 2026-08-14 — vllm-ctl in selected projects

`dewardvide/vllm-ctl` added to the home page's Selected GitHub projects, first in the
list. It is the newest of the three and the only one on the local-inference side of the
work the site now leads with.

- `REPOS` in `app/page.tsx` — one appended object. The section already maps the array, so
  there is no render change.
- `lib/links.ts` — `vllmCtl`. The URL does not get inlined; that module stays the only
  place an outbound URL is written.
- Its tag reads `LLM OPS`, a domain label, where the other two rows carry stack labels
  (`TERRAFORM`, `PYTHON`). Deliberate: the repo is TypeScript, and saying so would tell a
  reader nothing about what it is. Ordering across the whole list is manual — literal
  array order, no sort and no GitHub API call, which keeps the static invariant intact.

### 2026-08-14 — My current AI stack

A monthly, diffable inventory of the AI hardware and software actually in use.

- `content/ai-stack.ts` — the snapshots, typed. August 2026 seeded as the first one.
- `lib/ai-stack.ts` — lookups, month labels built from a table rather than
  `toLocaleDateString` so they cannot shift with the build machine's locale, and
  `diffStack()`.
- `components/AiStackView.tsx` — the page body, shared by both routes so they cannot
  drift. Groups reuse the `.dtj-rail` pattern; diff markers are a new `.dtj-stack-mark`
  in `site.css`, mono micro, sage for added and muted for dropped. No `Pill` — that is
  ochre, and ochre is topic tags only.
- `/ai-stack` (newest) and `/ai-stack/[month]` (statically generated per month), with the
  newest month canonicalised to `/ai-stack`.
- A new home page section directly above Selected work, and `AI STACK` in the nav. The
  home page's arrow label reads the newest month from the data, so it cannot go stale.

### 2026-08-11 — Initial build

Built the site from an empty directory and deployed it.

- Scaffolded Next.js 16 App Router with TypeScript, no Tailwind.
- Pulled the design system down: tokens into `app/styles/tokens/`, components into
  `components/ds/`, both verbatim. Skipped `components/forms/` — this site has none.
- Wrote `app/styles/site.css` as the single site-level stylesheet.
- Built the shell (`layout.tsx`): `next/font` for Source Serif 4 / IBM Plex Sans / IBM
  Plex Mono, pre-paint theme script, nav, footer.
- Home, journal index, entry pages, topics index, per-topic pages, about, 404.
- Recovered all 8 entries from the previous site with bodies and figures intact; wrote
  them to `content/journal/` with the frontmatter contract above.
- Re-cut topics from the imported `AI + Cybersecurity` blanket into six discriminating labels.
- Added `/blog` → `/journal` redirects preserving every old URL.
- Fixed two type issues found on screen: headings were inheriting the body's 1.55 leading
  instead of `--leading-tight`, and an entry opening on a heading doubled the rule that
  already closes the entry header.
- Rewrote the theme toggle to be CSS-driven (see above).
- Created the GitHub repo, connected it to Vercel, deployed to production.

Known loose ends:

- `metadataBase` in `app/layout.tsx` points at the `.vercel.app` URL. Update it when a
  custom domain is attached — it is the only place the domain is hard-coded.
- `public/{file,globe,next,vercel,window}.svg` are unused `create-next-app` leftovers.
