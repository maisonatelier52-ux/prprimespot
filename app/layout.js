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