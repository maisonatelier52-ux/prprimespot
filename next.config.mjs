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

  // Permanent (308) redirects from the old PHP-era URLs. Next.js applies
  // these before any page routing; order matters, so specific rules come
  // before the catch-alls at the bottom.
  async redirects() {
    return [
      // Send the default Vercel address to the real domain so Google only
      // ever sees one version of the site. Preview deployments (other
      // *.vercel.app hosts) are intentionally left alone.
      {
        source: "/:path*",
        has: [{ type: "host", value: "prprimespot.vercel.app" }],
        destination: "https://www.prprimespot.com/:path*",
        permanent: true,
      },
      { source: "/index.php", destination: "/", permanent: true },
      {
        source: "/business/business.php",
        destination: "/business",
        permanent: true,
      },
      {
        source:
          "/business/julio-herrera-velutini-an-icon-of-conservative-capitalism.php",
        destination:
          "/business/julio-herrera-velutini-conservative-capitalism-latin-america",
        permanent: true,
      },
      // Old section pages: /finance/finance.php -> /finance, etc.
      ...["business", "finance", "world", "us", "politics", "sports"].map(
        (c) => ({
          source: `/${c}/${c}.php`,
          destination: `/${c}`,
          permanent: true,
        })
      ),
      // Any other top-level page: /about.php -> /about,
      // /privacy-policy.php -> /privacy-policy, ...
      { source: "/:page.php", destination: "/:page", permanent: true },
      // Any other nested old article: /business/some-slug.php -> /business/some-slug.
      // Replace with specific rules (or 410s) for articles that no longer exist.
      {
        source: "/:category/:slug.php",
        destination: "/:category/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;