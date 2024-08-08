/ @type {import('next').NextConfig} /
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['openai.com', 'platform.openai.com', 'unsplash.com'],
  },
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: '/api/:path',
      },
    ];
  },
};

module.exports = nextConfig;