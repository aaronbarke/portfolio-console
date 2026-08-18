/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `next dev` and `next build` share .next by default, so a production build
  // deletes the running dev server's assets out from under it and the page
  // stops loading until dev is restarted. Giving each its own directory means
  // they can never collide.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
