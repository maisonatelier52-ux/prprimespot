import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_URL, SITE_NAME, SITE_TWITTER_HANDLE } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime request to Google,
// no render-blocking external call. display: "swap" shows the fallback
// (Arial, via the --font-sans chain in globals.css) immediately and swaps
// to Geist once it's loaded, so there's no invisible-text flash.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Shared with the openGraph/twitter fallback blocks below — kept as
// plain strings (rather than only living inside `metadata.title`/
// `.description`) so those blocks can reuse the exact same copy.
const DEFAULT_TITLE = `${SITE_NAME} – Business, Finance, World & U.S. Politics`;
const DEFAULT_DESCRIPTION =
  "Stay updated with U.S. breaking news, business, finance, world affairs, politics, and sports, with real-time coverage, trusted analysis, and essential daily insights.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },

  // Root-level fallback only. Every real route (home, category, article,
  // author, search, policy pages) sets its own openGraph/twitter in its
  // own generateMetadata/metadata export, which fully overrides this.
  // This exists so a future route added without metadata still gets a
  // usable social preview instead of none at all.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: SITE_TWITTER_HANDLE,
    creator: SITE_TWITTER_HANDLE,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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

export const viewport = {
  themeColor: "#D01418",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}