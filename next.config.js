/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        destination: `${process.env.BACKEND_URL}/:path*`,
        source: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
