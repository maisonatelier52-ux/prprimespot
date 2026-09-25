import Business from "@/components/business";
import Finance from "@/components/finance";
import World from "@/components/world";
import US from "@/components/us";
import Sports from "@/components/sports";
import Politics from "@/components/politics";
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOGO_PATH,
  SITE_SOCIAL_LINKS,
  getAbsoluteUrl,
} from "@/lib/site";

// ─────────────────────────────────────────────────────────────
// Site identity (domain, name, logo, socials) now comes from
// lib/site.js instead of being hardcoded here — see that file to
// change the domain, name, handle, or logo path in one place.
// ⚠️  Drop a real 1200x630 image at /public/og-image.jpg (used
//     for Open Graph + Twitter card previews).
// ─────────────────────────────────────────────────────────────
const PAGE_TITLE = `${SITE_NAME} – Business, Finance, World & U.S. Politics`;
const PAGE_DESCRIPTION =
  "Stay updated with U.S. breaking news, business, finance, world affairs, politics, and sports, with real-time coverage, trusted analysis, and essential daily insights.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_DESCRIPTION,
  keywords: [
    SITE_NAME,
    "U.S. news",
    "breaking news",
    "business news",
    "finance news",
    "world news",
    "politics",
    "sports news",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: `${SITE_NAME} Editorial Team` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "news",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@prprimespot",
    creator: "@prprimespot",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

// JSON-LD: describes the site/org for rich results. Two @graph nodes —
// Organization and WebSite — linked together.
//
// WebSite carries a SearchAction pointing at /search?q={term} (see
// app/search/page.js), which is what lets Google show a sitelinks
// searchbox directly under a branded result for this site. Only add this
// back if /search is ever removed — a stale SearchAction 404s real
// visitors and gets flagged in Search Console.
function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          // Real logo asset (lib/site.js) instead of a non-existent
          // /logo.png at the domain root.
          url: getAbsoluteUrl(SITE_LOGO_PATH),
        },
        sameAs: [
          SITE_SOCIAL_LINKS.instagram,
          SITE_SOCIAL_LINKS.twitter,
          SITE_SOCIAL_LINKS.substack,
          SITE_SOCIAL_LINKS.medium,
        ].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: PAGE_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function HomePage() {
  return (
    <main>
      <JsonLd />

      {/* The single <h1> for the homepage. Visually hidden (sr-only) but
          readable by search engines and screen readers. Remove "sr-only"
          if you want it visible. Section components should use <h2>. */}
      <h1 className="sr-only">
        {SITE_NAME} – U.S. Breaking News, Business, Finance, World, Politics
        &amp; Sports
      </h1>

      <Business />
      <Finance />
      <World />
      <US />
      <Politics />
      <Sports />
    </main>
  );
}