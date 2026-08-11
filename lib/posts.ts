import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'journal');

export type Post = {
  slug: string;
  title: string;
  /** ISO date, e.g. 2026-01-17 */
  date: string;
  summary: string;
  topics: string[];
  readTime: string;
  body: string;
};

function read(slug: string): Post {
  const file = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(file);
  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    summary: String(data.summary),
    topics: (data.topics as string[]) ?? [],
    readTime: String(data.readTime ?? ''),
    body: content,
  };
}

/** Newest first. */
export function getAllPosts(): Post[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => read(f.replace(/\.md$/, '')))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  return fs.existsSync(file) ? read(slug) : undefined;
}

export function getPostsByTopic(topic: string): Post[] {
  return getAllPosts().filter((p) => p.topics.some((t) => topicSlug(t) === topic));
}

/** Every topic in use, with its entry count, ordered by count then name. */
export function getAllTopics(): { topic: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const t of post.topics) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, slug: topicSlug(topic), count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}

/** `AI/ML` → `ai-ml`. Reversed by matching against getAllTopics(). */
export function topicSlug(topic: string): string {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Markdown → HTML at build time. No client-side parsing. */
export async function renderBody(markdown: string): Promise<string> {
  const out = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown);
  return figures(String(out));
}

/**
 * The source entries write a screenshot as an image paragraph followed by an
 * italic caption paragraph. Fuse the pair into a <figure> so the caption can be
 * set as mono meta rather than floating body italics.
 */
function figures(html: string): string {
  return html
    .replace(
      /<p>(<img [^>]*>)<\/p>\s*<p><em>([\s\S]*?)<\/em><\/p>/g,
      (_m, img, caption) => `<figure>${img}<figcaption>${caption}</figcaption></figure>`,
    )
    .replace(/<p>(<img [^>]*>)<\/p>/g, (_m, img) => `<figure>${img}</figure>`);
}

/** The rail form: `2026.01.17`. */
export function railDate(iso: string): string {
  return iso.replaceAll('-', '.');
}

/** The meta-line form: `2026-01-17`. */
export function metaDate(iso: string): string {
  return iso;
}
