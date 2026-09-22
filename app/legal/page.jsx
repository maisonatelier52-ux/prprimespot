import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

const CONTACT_EMAIL = "prprimespot@gmail.com";

const PAGE_TITLE = "Legal";

const PAGE_DESCRIPTION = `Publisher information, copyright notice, and legal disclosures for ${SITE_NAME}, plus links to our full policies.`;

const LAST_UPDATED = "September 17, 2026";

const RELATED_POLICIES = [
  { label: "Privacy Policy", href: "/privacy-policy", description: "What we collect when you visit, and how it's used." },
  { label: "Terms and Conditions", href: "/terms-and-conditions", description: "The terms governing your use of this site." },
  { label: "Advertising Policy", href: "/advertising-policy", description: "How sponsored content and advertising are disclosed." },
  { label: "Editorial Policy", href: "/editorial-policy", description: "Our editorial standards and independence." },
  { label: "Corrections Policy", href: "/corrections-policy", description: "How we handle and disclose corrections." },
  { label: "Right of Reply Policy", href: "/right-of-reply-policy", description: "How subjects of our reporting can respond." },
];

const SECTIONS = [
  {
    heading: "About This Page",
    body: [
      `This page collects the legal notices and disclosures that don't belong to any one policy — publisher identity, copyright, a general disclaimer, and how to report a copyright concern. For our other policies, see the directory below.`,
    ],
  },
  {
    heading: "Publisher Information",
    body: [
      `${SITE_NAME} is an independent editorial publication covering business, finance, world affairs, U.S. news, politics, and sports. This site is operated on a self-published basis; it is not affiliated with, and does not claim to represent, any government body, political party, or the outlets, companies, or individuals it reports on.`,
      `For ownership and funding disclosures, see our Ownership and Funding page.`,
    ],
  },
  {
    heading: "Copyright and Intellectual Property",
    body: [
      `© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved. Unless otherwise credited, articles, headlines, graphics, and other original content on this site are the property of ${SITE_NAME} and are protected by copyright and other applicable intellectual property laws.`,
      "Brief excerpts may be quoted with proper attribution and a link back to the original article, consistent with fair use. Republishing or distributing our content in full, or using it for commercial purposes, requires our prior written permission. Images, quotes, and data attributed to third parties remain the property of their respective owners.",
    ],
  },
  {
    heading: "Copyright Complaints (DMCA)",
    body: [
      "If you believe material on this site infringes a copyright you own or control, email us with: (1) a description of the copyrighted work you claim is infringed, (2) the URL of the material you're referring to, (3) your contact information, and (4) a statement that you have a good-faith belief the use isn't authorized by the copyright owner, its agent, or the law.",
      `Send copyright notices to ${CONTACT_EMAIL}. We review each notice and respond or remove material where appropriate.`,
    ],
  },
  {
    heading: "General Disclaimer",
    body: [
      `Content on ${SITE_NAME} is provided for general informational purposes. We work to report accurately and to correct errors when they're identified, but we make no warranty that any article is complete, error-free, or current at the time you read it. Coverage of finance, business, health, or legal topics is not financial, legal, or medical advice — consult a qualified professional before acting on it.`,
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These legal notices, along with our Terms and Conditions, are governed by the laws of the jurisdiction in which this site is operated, without regard to conflict-of-law principles. Any dispute arising from your use of this site will be handled in accordance with those laws.",
    ],
  },
  {
    heading: "Changes to This Page",
    body: [
      "We may update this page from time to time to reflect changes in our practices, our business, or applicable law. The date at the top reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Legal questions, including copyright notices, can be sent to ${CONTACT_EMAIL}. General questions can go through our Contact page instead.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/legal",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/legal`,
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

export default function LegalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/legal`,
        url: `${SITE_URL}/legal`,
        name: `${PAGE_TITLE} | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Legal", item: `${SITE_URL}/legal` },
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
          <span className="text-[#1A1A1A]">Legal</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Legal
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <p className="mt-4 font-sans text-sm text-[#8A8A8A]">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Related policies — directory at the top so visitors can jump
            straight to the specific policy they're after */}
        <section className="mb-12">
          <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-[#1A1A1A] mb-4">Our Policies</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {RELATED_POLICIES.map((policy) => (
              <Link key={policy.href} href={policy.href} className="block border border-[#E5E5E5] bg-white p-4 hover:border-[#D01418] transition-colors">
                <h3 className="font-serif text-sm font-bold text-[#1A1A1A]">
                  {policy.label}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-[#8A8A8A] mt-1">
                  {policy.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

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