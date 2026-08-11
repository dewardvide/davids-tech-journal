import { JournalEntry } from './ds/journal/JournalEntry.jsx';
import { railDate, type Post } from '@/lib/posts';

/** A post rendered as the system's rail entry. The rail carries the dotted date. */
export function EntryRow({ post }: { post: Post }) {
  return (
    <JournalEntry
      date={railDate(post.date)}
      category={post.topics[0]}
      title={post.title}
      summary={post.summary}
      href={`/journal/${post.slug}`}
    />
  );
}
