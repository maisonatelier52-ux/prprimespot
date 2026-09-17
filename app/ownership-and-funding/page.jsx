import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

/**
 * app/ownership-and-funding/page.jsx — Ownership and Funding
 *
 * Route: /ownership-and-funding
 *
 * Static page, plain long-form disclosure content. Section copy lives
 * directly in this file (SECTIONS below) rather than in public/data,
 * since this text isn't rendered anywhere else on the site. Structure
 * and styling intentionally mirror app/privacy-policy/page.jsx,
 * app/terms-and-conditions/page.jsx, and app/legal/page.jsx.
 *
 * PLACEHOLDER CONTENT: this describes a small, independent,
 * self-funded editorial site with no outside investors and no current
 * advertising program — a reasonable starting disclosure for a site at
 * that stage (no user logins, no payments, no server-side database —
 * see README/project notes). This is not legal advice, and it is a
 * factual disclosure, not boilerplate — once the site actually takes on
 * advertising, sponsorships, affiliate revenue, or outside investment,
 * this page needs to be rewritten to say so accurately. Misrepresenting
 * ownership or funding here would defeat the point of the page.
 *
 * Domain / site identity: SITE_URL, SITE_NAME, SITE_TWITTER_HANDLE all come
 * from lib/site.js — nothing here hardcodes the domain.
 *
 * Palette (matches the rest of the site):
 *   masthead-red  #D01418
 *   gold rule     #E8B23D
 *   ink           #1A1A1A
 *   ink-soft      #595959
 *   cream         #F7F5EF
 *   rule          #E5E5E5
 */

const CONTACT_EMAIL = "legal@prprimespot.com";

const PAGE_TITLE = "Ownership and Funding";

// Short, meta-description length — kept under ~160 chars so it isn't
// truncated in search results or link previews.
const PAGE_DESCRIPTION = `Who owns and funds ${SITE_NAME}, and how that could affect our coverage.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "Why We Publish This",
    body: [
      `Readers deserve to know who's behind the reporting they read and how it's paid for, since both can shape what gets covered and how. This page lays out ${SITE_NAME}'s ownership and funding as plainly as we can, and we'll update it whenever either changes.`,
    ],
  },
  {
    heading: "Ownership",
    body: [
      `${SITE_NAME} is an independently owned and operated editorial publication. It is not owned by, or affiliated with, any political party, government body, media conglomerate, or the companies, industries, or public figures it covers.`,
      "We aren't currently structured as a company with outside shareholders. If that changes — through incorporation, a change in ownership, or bringing on investors — we'll disclose it here.",
    ],
  },
  {
    heading: "Funding and Revenue",
    body: [
      `${SITE_NAME} does not currently run advertising, sponsorships, or paid subscriptions, and has no outside investors or grant funding. The site is self-funded during this stage of its operation.`,
      "As the site grows, we expect to introduce one or more revenue sources — likely display advertising and, potentially, sponsored content or affiliate links. When we do, this page will be updated to name the specific arrangements, and any sponsored or affiliate content will be clearly labeled where it appears, consistent with our Advertising Policy.",
    ],
  },
  {
    heading: "Editorial Independence",
    body: [
      "Editorial decisions — what we cover, how we cover it, and when a correction is warranted — are made independently of any funding source, current or future. No advertiser, sponsor, or partner is given advance review of, or influence over, editorial content in exchange for financial support.",
      "See our Editorial Policy for more on how coverage decisions are made, and our Corrections Policy for how we handle errors.",
    ],
  },
  {
    heading: "Conflicts of Interest",
    body: [
      "If a writer or editor has a personal, financial, or professional connection to the subject of a story that a reader would reasonably want to know about, we aim to disclose it within the relevant article rather than leaving it to this page alone.",
      `If you believe we've missed a conflict of interest worth disclosing, tell us at ${CONTACT_EMAIL} and we'll look into it.`,
    ],
  },
  {
    heading: "Changes to This Page",
    body: [
      "We'll revise this page whenever our ownership or funding changes in a way that's relevant to readers, and periodically otherwise to keep it accurate. The date at the top reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about who owns or funds ${SITE_NAME} can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/ownership-and-funding",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/ownership-and-funding`,
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

export default function OwnershipAndFundingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/ownership-and-funding`,
        url: `${SITE_URL}/ownership-and-funding`,
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
            name: "Ownership and Funding",
            item: `${SITE_URL}/ownership-and-funding`,
          },
        ],
      },
    ],
  };

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-[#8A8A8A] mb-6">
          <Link href="/" className="hover:text-[#D01418] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Ownership and Funding</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms/Legal */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Ownership and Funding
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <p className="mt-4 font-sans text-sm text-[#8A8A8A]">
            Last updated: {LAST_UPDATED}
          </p>
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
                  <p
                    key={i}
                    className="font-sans text-[15px] leading-[1.8] text-[#595959]"
                  >
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