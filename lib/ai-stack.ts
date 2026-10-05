import { STACKS, type StackCategory, type StackGroup, type StackItem, type StackMonth } from '@/content/ai-stack';

export type { StackCategory, StackGroup, StackItem, StackMonth };

/* ---- lookups ---- */

/** Newest first, same ordering as the journal. */
export function getAllStacks(): StackMonth[] {
  return [...STACKS].sort((a, b) => b.month.localeCompare(a.month));
}

export function getLatestStack(): StackMonth {
  return getAllStacks()[0];
}

export function getStackByMonth(month: string): StackMonth | undefined {
  return STACKS.find((s) => s.month === month);
}

/** The snapshot published before this one, or undefined for the first one. */
export function getPreviousStack(month: string): StackMonth | undefined {
  const all = getAllStacks();
  const i = all.findIndex((s) => s.month === month);
  return i === -1 ? undefined : all[i + 1];
}

/* ---- month labels ---- */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2026-08" → "August 2026". Built from a table, not toLocaleDateString, so
    the label cannot shift with the build machine's locale or time zone. */
export function monthLabel(month: string): string {
  const [year, m] = month.split('-');
  return `${MONTH_NAMES[Number(m) - 1] ?? month} ${year}`;
}

/** "2026-08" → "AUG 2026", for the mono month switcher. */
export function monthShort(month: string): string {
  const [year, m] = month.split('-');
  const name = MONTH_NAMES[Number(m) - 1];
  return name ? `${name.slice(0, 3).toUpperCase()} ${year}` : month;
}

/* ---- the diff ---- */

export type DiffStatus = 'new' | 'unchanged';
export type DiffItem = StackItem & { status: DiffStatus };
export type DiffGroup = { heading: string; items: DiffItem[] };
export type DiffCategory = { heading: string; groups: DiffGroup[] };

export type StackDiff = {
  categories: DiffCategory[];
  added: number;
  removed: number;
  /** The month compared against; absent on the first published snapshot. */
  since?: string;
};

const key = (s: string) => s.trim().toLowerCase();

type IndexedGroup = { heading: string; items: Map<string, StackItem> };
type IndexedCategory = { heading: string; groups: Map<string, IndexedGroup> };

/** Keyed on category/group/item, all lowercased. A renamed item reads as one
    removal plus one addition — which is what actually happened. */
function index(stack: StackMonth): Map<string, IndexedCategory> {
  const categories = new Map<string, IndexedCategory>();
  for (const category of stack.categories) {
    const groups = new Map<string, IndexedGroup>();
    for (const group of category.groups) {
      const items = new Map<string, StackItem>();
      for (const item of group.items) items.set(key(item.name), item);
      groups.set(key(group.heading), { heading: group.heading, items });
    }
    categories.set(key(category.heading), { heading: category.heading, groups });
  }
  return categories;
}

/**
 * Compare a snapshot against the one before it. Current items are marked `new`
 * or `unchanged`. Removed items are counted for the change summary but are not
 * rendered in the current snapshot; they remain available in the linked
 * historical snapshot.
 *
 * With no previous snapshot nothing is marked and the counts are zero.
 */
export function diffStack(current: StackMonth, previous?: StackMonth): StackDiff {
  if (!previous) {
    return {
      categories: current.categories.map((category) => ({
        heading: category.heading,
        groups: category.groups.map((group) => ({
          heading: group.heading,
          items: group.items.map((item) => ({ ...item, status: 'unchanged' as const })),
        })),
      })),
      added: 0,
      removed: 0,
    };
  }

  const before = index(previous);
  let added = 0;
  let removed = 0;

  const categories: DiffCategory[] = current.categories.map((category) => {
    const beforeCategory = before.get(key(category.heading));

    const groups: DiffGroup[] = category.groups.map((group) => {
      const beforeGroup = beforeCategory?.groups.get(key(group.heading));

      const items: DiffItem[] = group.items.map((item) => {
        const isNew = !beforeGroup?.items.has(key(item.name));
        if (isNew) added += 1;
        return { ...item, status: isNew ? ('new' as const) : ('unchanged' as const) };
      });

      const present = new Set(group.items.map((i) => key(i.name)));
      for (const k of beforeGroup?.items.keys() ?? []) {
        if (present.has(k)) continue;
        removed += 1;
      }

      // Consumed — whatever is left in `before` was dropped whole.
      beforeCategory?.groups.delete(key(group.heading));
      return { heading: group.heading, items };
    });

    for (const dropped of beforeCategory?.groups.values() ?? []) {
      removed += dropped.items.size;
    }

    before.delete(key(category.heading));
    return { heading: category.heading, groups };
  });

  // Categories dropped whole are counted but live only in the older snapshot.
  for (const beforeCategory of before.values()) {
    for (const dropped of beforeCategory.groups.values()) {
      removed += dropped.items.size;
    }
  }

  return { categories, added, removed, since: previous.month };
}
