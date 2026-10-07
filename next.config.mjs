/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  
  async redirects() {
    return [
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
      ...["business", "finance", "world", "us", "politics", "sports"].map(
        (c) => ({
          source: `/${c}/${c}.php`,
          destination: `/${c}`,
          permanent: true,
        })
      ),
      { source: "/:page.php", destination: "/:page", permanent: true },
      {
        source: "/:category/:slug.php",
        destination: "/:category/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;