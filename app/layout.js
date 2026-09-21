import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Business, Finance, World & U.S. Politics`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Stay updated with U.S. breaking news, business, finance, world affairs, politics, and sports, with real-time coverage, trusted analysis, and essential daily insights.",
  alternates: {
    canonical: "/",
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
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}