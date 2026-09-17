import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

const CONTACT_EMAIL = "legal@prprimespot.com";

const PAGE_TITLE = "Terms and Conditions";

const PAGE_DESCRIPTION = `The terms and conditions governing your use of ${SITE_NAME} and its content.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "Acceptance of Terms",
    body: [
      `These Terms and Conditions ("Terms") govern your access to and use of ${SITE_NAME} ("we", "us", "our"), including all articles, pages, and content published on this site. By visiting or using this site, you agree to be bound by these Terms. If you do not agree, please do not use the site.`,
      "We may update these Terms from time to time, as described in the Changes to These Terms section below. Continued use of the site after an update constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "Use of the Site",
    body: [
      `${SITE_NAME} publishes news and commentary across business, finance, world affairs, U.S. news, politics, and sports for general informational purposes. You may access and read this content for personal, non-commercial use.`,
      "You agree not to use the site in any way that violates applicable law, attempts to interfere with its normal operation, or attempts to gain unauthorized access to any part of the site or its underlying systems.",
    ],
  },
  {
    heading: "Content and Intellectual Property",
    body: [
      `Unless otherwise noted, articles, text, graphics, logos, and other material on this site are owned by or licensed to ${SITE_NAME} and are protected by copyright and other intellectual property laws.`,
      "You may share links to our articles and quote brief excerpts with proper attribution and a link back to the original article, consistent with fair use. Reproducing, republishing, or distributing our content in full, or using it for commercial purposes, without our prior written permission is not permitted.",
    ],
  },
  {
    heading: "Editorial Content and Accuracy",
    body: [
      "We aim to publish accurate, well-sourced reporting and commentary, and we correct errors when they're identified — see our Corrections Policy for how that process works. However, news evolves quickly, and we make no warranty that any article is complete, error-free, or up to date at the time you read it.",
      "Opinion and commentary pieces reflect the views of their authors and not necessarily those of the site as a whole.",
    ],
  },
  {
    heading: "Third-Party Links",
    body: [
      "Our articles may link to external websites, source documents, or third-party services for reference and context. These links are provided for convenience, and we don't control or endorse the content, accuracy, or practices of those external sites. Visiting a linked site is at your own risk and subject to that site's own terms and policies.",
    ],
  },
  {
    heading: "No Professional Advice",
    body: [
      "Content on this site — including articles covering finance, business, health, or legal topics — is provided for general informational purposes only and does not constitute financial, legal, medical, or other professional advice. You should consult a qualified professional before making decisions based on anything published here.",
    ],
  },
  {
    heading: "Disclaimer of Warranties",
    body: [
      'This site and its content are provided "as is" and "as available," without warranties of any kind, whether express or implied, including but not limited to warranties of accuracy, completeness, reliability, or fitness for a particular purpose.',
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      `To the fullest extent permitted by law, ${SITE_NAME} and its authors, editors, and contributors will not be liable for any indirect, incidental, consequential, or special damages arising out of or in connection with your use of, or inability to use, the site or its content.`,
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may revise these Terms from time to time to reflect changes in our practices, the site, or for legal or operational reasons. The date at the top of this page reflects the most recent revision. Material changes will be reflected here when they occur.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      `If you have questions about these Terms and Conditions, contact us at ${CONTACT_EMAIL}.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/terms-and-conditions`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: getAbsoluteUrl("/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${PAGE_TITLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_TWITTER_HANDLE,
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  },
};

export default function TermsAndConditionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/terms-and-conditions`,
        url: `${SITE_URL}/terms-and-conditions`,
        name: `${PAGE_TITLE} | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Terms and Conditions",
            item: `${SITE_URL}/terms-and-conditions`,
          },
        ],
      },
    ],
  };

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-[#8A8A8A] mb-6">
          <Link href="/" className="hover:text-[#D01418] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Terms and Conditions</span>
        </nav>

        {/* Header — centered hero block, same pattern as the About page */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Terms and Conditions
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <p className="mt-4 font-sans text-sm text-[#8A8A8A]">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Sections — left-aligned long-form legal text */}
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="font-sans text-[15px] leading-[1.8] text-[#595959]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}