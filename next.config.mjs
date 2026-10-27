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
      { source: '/backlogs', destination: '/changelog', permanent: true },
      { source: '/backlogs/:slug', destination: '/changelog', permanent: true },
    ]
  },
}

export default nextConfig
