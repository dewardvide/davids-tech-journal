import type { Metadata } from 'next';
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { themeScript } from '@/components/ThemeToggle';
import './styles/styles.css';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://davidstechjournal.com'),
  title: {
    default: "David's Tech Journal",
    template: "%s — David's Tech Journal",
  },
  description: 'Navigating contemporary AI and cyber security. Notes from David Omurwa on detection engineering, applied AI, and the work in between.',
  openGraph: {
    type: 'website',
    siteName: "David's Tech Journal",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies an explicit dark pick before first paint. React logs a
            dev-only warning about script tags in components; the tag is in the
            server-rendered HTML and does run. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="dtj-page">
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
