/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { newNextLinkBehavior: false },
  images: {
    unoptimized: true, // 画像最適化を行わない
  },
}
module.exports = nextConfig
