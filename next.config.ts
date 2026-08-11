import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    // The previous site published entries under /blog. Slugs are unchanged, so
    // every existing link keeps resolving.
    return [
      { source: '/blog', destination: '/journal', permanent: true },
      { source: '/blog/:slug', destination: '/journal/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
