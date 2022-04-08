/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://192.168.53.32/api/:path*',
        },
      ]
    },
};