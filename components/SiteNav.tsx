'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavBar } from './ds/navigation/NavBar.jsx';

const LINKS = [
  { label: 'Work', href: '/' },
  { label: 'AI stack', href: '/ai-stack' },
  { label: 'Journal', href: '/journal' },
  { label: 'Topics', href: '/topics' },
  { label: 'About', href: '/about' },
];

export function SiteNav() {
  const pathname = usePathname();

  // Longest matching prefix wins, so /journal/<slug> keeps JOURNAL lit.
  const active = LINKS.filter((l) => (l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)))
    .sort((a, b) => b.href.length - a.href.length)[0]?.label;

  return (
    <NavBar
      brand={
        <Link href="/" style={{ color: 'inherit', borderBottom: 'none' }}>
          David&rsquo;s Tech Journal
        </Link>
      }
      links={LINKS}
      active={active}
    />
  );
}
