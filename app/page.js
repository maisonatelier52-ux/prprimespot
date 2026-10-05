import Business from "@/components/business";
import Finance from "@/components/finance";
import World from "@/components/world";
import US from "@/components/us";
import Sports from "@/components/sports";
import Politics from "@/components/politics";
import {
  SITE_URL,
  SITE_NAME,
  ORGANIZATION_REF,
  getOrganizationSchema,
} from "@/lib/site";

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

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: PAGE_DESCRIPTION,
        publisher: ORGANIZATION_REF,
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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
  );
}

export default function HomePage() {
  return (
    <main>
      <JsonLd />
      
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