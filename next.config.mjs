/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All current hero/author images live under /public/images, which
    // next/image optimizes automatically with no config needed.
    //
    // If you ever set an article's heroImage (or authorImage) to a full
    // URL on another domain — a CDN, S3 bucket, Cloudinary, etc. — add
    // that host here first, or next/image will throw at build/runtime:
    //   "hostname \"...\" is not configured under images in next.config.mjs"
    //
    // Example:
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cdn.example.com",
    //     // pathname: "/photos/**", // optional: restrict to a path
    //   },
    // ],
    remotePatterns: [],
  },
};

export default nextConfig;