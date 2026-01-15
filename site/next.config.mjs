/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gpdt',
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
}

export default nextConfig
