/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { newNextLinkBehavior: false },
  images: {
    unoptimized: true, // 画像最適化を行わない
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/signup': { page: '/signup' },
      '/signin': { page: '/signin' },
      '/questionnaire': { page: '/questionnaire' },
      '/mypage': { page: '/mypage' },
    }
  },
}
module.exports = nextConfig
