/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/sermon/:path*',
        destination: 'http://localhost:8080/api/sermon/:path*'
      }
    ]
  }
}

module.exports = nextConfig 