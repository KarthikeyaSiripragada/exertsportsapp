// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // … your existing settings …
  webpackDevMiddleware: config => ({
    ...config,
    stats: 'errors-only'
  }),
};

export default nextConfig;
