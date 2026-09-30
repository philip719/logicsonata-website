/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: every page is pre-rendered to plain files that
  // Hostinger shared hosting can serve without a Node.js server.
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Inline the stylesheet into each page to remove a render-blocking request.
  // globalNotFound: one 404 page for the English and translated root layouts.
  experimental: { inlineCss: true, globalNotFound: true },
};

export default nextConfig;
