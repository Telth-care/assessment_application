/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Blocks the page being embedded in an <iframe> elsewhere (anti-cheat: no wrapping in another site)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
