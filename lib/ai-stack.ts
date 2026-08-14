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

export type DiffStatus = 'new' | 'unchanged' | 'removed';
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

/** Keyed on category/group/item, all lowercased, with the display headings
    carried alongside so a group that disappears can still be labelled. A
    renamed item reads as one removal plus one addition — which is what
    actually happened. */
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
 * Compare a snapshot against the one before it. Items are marked `new` or
 * `unchanged`; anything the previous month had and this one does not is
 * appended to its group as `removed`, so a dropped tool is still visible
 * rather than silently absent. Groups and categories that disappear entirely
 * come back the same way.
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
      for (const [k, item] of beforeGroup?.items ?? []) {
        if (present.has(k)) continue;
        items.push({ ...item, status: 'removed' });
        removed += 1;
      }

      // Consumed — whatever is left in `before` was dropped whole.
      beforeCategory?.groups.delete(key(group.heading));
      return { heading: group.heading, items };
    });

    for (const dropped of beforeCategory?.groups.values() ?? []) {
      groups.push(...droppedGroup(dropped));
      removed += dropped.items.size;
    }

    before.delete(key(category.heading));
    return { heading: category.heading, groups };
  });

  // Categories dropped whole.
  for (const beforeCategory of before.values()) {
    const groups: DiffGroup[] = [];
    for (const dropped of beforeCategory.groups.values()) {
      groups.push(...droppedGroup(dropped));
      removed += dropped.items.size;
    }
    if (groups.length) categories.push({ heading: beforeCategory.heading, groups });
  }

  return { categories, added, removed, since: previous.month };
}

/** A group present last month and gone this one, rendered entirely as removals.
    Returns nothing for an empty group so no bare heading is left behind. */
function droppedGroup(group: IndexedGroup): DiffGroup[] {
  if (!group.items.size) return [];
  return [
    {
      heading: group.heading,
      items: [...group.items.values()].map((item) => ({ ...item, status: 'removed' as const })),
    },
  ];
}
