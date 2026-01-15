/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gpdt',
  assetPrefix: '/gpdt/',
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
}

export default nextConfig
