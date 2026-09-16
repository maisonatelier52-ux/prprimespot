import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Global Times Blog",
    template: "%s | Global Times Blog",
  },
  description: "A source-linked blog offering context and analysis across business, finance, world affairs, U.S. public life, politics, and sports.",
  alternates: {
    canonical: "/",
  },
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
// test