import { Footer } from './ds/navigation/Footer.jsx';
import { ThemeToggle } from './ThemeToggle';
import { LINKS } from '@/lib/links';

export function SiteFooter() {
  return (
    <>
      <Footer
        brand="David's Tech Journal"
        note="Navigating contemporary AI and cyber security. Written as the work happens — corrections welcome."
        links={[
          { label: 'GitHub', href: LINKS.github },
          { label: 'LinkedIn', href: LINKS.linkedin },
        ]}
      />
      <div className="dtj-rail" style={{ marginTop: '1.4em' }}>
        <div />
        <ThemeToggle />
      </div>
    </>
  );
}
