import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

const CONTACT_EMAIL = "prprimespot@gmail.com";

const PAGE_TITLE = "Advertising Policy";

const PAGE_DESCRIPTION = `How ${SITE_NAME} handles advertising, sponsorships, and disclosure of paid content.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "Current Status",
    body: [
      `${SITE_NAME} does not currently run display advertising, sponsorships, sponsored content, or affiliate links. There is no paid placement of any kind on the site today, and no article has been influenced by an advertiser or sponsor, because there are none.`,
      "We're publishing this policy now so the rules are already in place before any of that changes, not after.",
    ],
  },
  {
    heading: "Editorial and Advertising Are Separate",
    body: [
      "If we introduce advertising or sponsorships, editorial and advertising decisions will remain separate functions. Advertisers and sponsors will not receive advance review of, edit rights over, or influence over editorial content in exchange for payment, and no story will be published, altered, or suppressed because of an advertiser's or sponsor's preferences.",
    ],
  },
  {
    heading: "Labeling Sponsored or Paid Content",
    body: [
      'Any content created in partnership with, or paid for by, an advertiser will be clearly and conspicuously labeled as such — for example, "Sponsored" or "Paid Partnership" — near the top of the piece, and will be visually distinguishable from our regular editorial content. It will never be styled to pass as an ordinary staff-written article.',
    ],
  },
  {
    heading: "Affiliate Links",
    body: [
      "We don't currently use affiliate links. If we do in the future — for instance, an earnings-per-click link in a product or service mention — the article will disclose that fact plainly, near the link or in a standard disclosure line, so readers know we may earn a commission from it.",
    ],
  },
  {
    heading: "Display Advertising",
    body: [
      "If we run display advertising (banner or similar ad units placed by an ad network), those units will be visually set apart from editorial content — for example, by placement, spacing, or a label such as \"Advertisement\" — so they aren't mistaken for our own content or recommendations.",
    ],
  },
  {
    heading: "What We Won't Do",
    body: [
      "We won't accept payment in exchange for favorable coverage, for the removal or softening of accurate reporting, or for advance editorial review by an advertiser or sponsor. Any of that would defeat the purpose of this policy, and of our Editorial Policy.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We'll rewrite this page the moment any of the above changes — specifically, the day we introduce advertising, sponsorships, or affiliate links — to describe the real arrangement in place rather than leaving outdated language here. The date at the top reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Advertising or partnership inquiries can be sent to ${CONTACT_EMAIL}. If you believe a piece of sponsored or paid content wasn't labeled clearly, tell us at the same address.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/advertising-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/advertising-policy`,
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

export default function AdvertisingPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/advertising-policy`,
        url: `${SITE_URL}/advertising-policy`,
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
            name: "Advertising Policy",
            item: `${SITE_URL}/advertising-policy`,
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
          <span className="text-[#1A1A1A]">Advertising Policy</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms/Legal */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Advertising Policy
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <p className="mt-4 font-sans text-sm text-[#8A8A8A]">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Sections — left-aligned long-form content */}
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