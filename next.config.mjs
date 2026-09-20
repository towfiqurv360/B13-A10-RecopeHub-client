/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://b13-a10-recopehub-server.onrender.com/api/:path*',
      },
    ]
  },
};

export default nextConfig;