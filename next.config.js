/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'picsum.photos',
      'scontent.cdninstagram.com',
      'scontent-lhr8-1.cdninstagram.com',
      'instagram.com',
      'cdninstagram.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent*.cdninstagram.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;