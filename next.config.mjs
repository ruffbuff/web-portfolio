/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Removed pages: permanent (308) redirects so old links and search results keep working.
  async redirects() {
    return [
      { source: '/skills', destination: '/', permanent: true },
      { source: '/work', destination: '/', permanent: true },
      { source: '/backlogs', destination: '/projects', permanent: true },
      { source: '/backlogs/:slug', destination: '/projects', permanent: true },
      // Changelog now lives on the sites of the products themselves.
      { source: '/changelog', destination: '/projects', permanent: false },
      { source: '/changelog/:slug', destination: '/projects', permanent: false },
    ]
  },
}

export default nextConfig
