import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

/**
 * app/corrections-policy/page.jsx — Corrections Policy
 *
 * Route: /corrections-policy
 *
 * Explains, in plain terms, the mechanism already visible on every
 * article page: an "Updated {date}" label driven by article.updatedAt in
 * public/data/article.json (see app/[category]/[slug]/page.jsx). This
 * page is the plain-language explanation of what that label means and
 * how corrections are handled, not a new mechanism of its own. Builds on
 * the "Corrections, not silent edits" principle already stated on
 * app/about/page.jsx and app/editorial-policy/page.jsx.
 *
 * Static page, plain long-form content. Section copy lives directly in
 * this file (SECTIONS below) rather than in public/data, since this text
 * isn't rendered anywhere else on the site. Structure and styling
 * intentionally mirror app/privacy-policy/page.jsx,
 * app/terms-and-conditions/page.jsx, app/legal/page.jsx, and
 * app/editorial-policy/page.jsx.
 *
 * PLACEHOLDER CONTENT: this describes the site's actual updatedAt-based
 * mechanism honestly, but the process (e.g. whether a standalone
 * correction note is appended in-article) should be kept in sync with
 * whatever the site actually does as it evolves. Not legal advice.
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

const CONTACT_EMAIL = "corrections@prprimespot.com";

const PAGE_TITLE = "Corrections Policy";

// Short, meta-description length — kept under ~160 chars so it isn't
// truncated in search results or link previews.
const PAGE_DESCRIPTION = `How ${SITE_NAME} handles, discloses, and lets you report corrections to published articles.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "Our Commitment",
    body: [
      `We aim to get every story right the first time, but errors happen. When they do, we correct them openly rather than quietly rewriting the record. This page explains how that works on ${SITE_NAME}.`,
    ],
  },
  {
    heading: "The \"Updated\" Label",
    body: [
      'Every article page shows an "Updated {date}" line alongside its original publish date. Any time an article\'s text changes after publication — whether to fix an error, add new information, or reflect a developing story — that date moves forward, so you can always see whether what you\'re reading has been touched since it first went up.',
    ],
  },
  {
    heading: "Minor Corrections",
    body: [
      "Small fixes that don't change the substance of a story — typos, formatting, a broken link, a misspelled name — are corrected in place and reflected in the article's updated date, without a separate note, since they don't change what the article actually claims or means.",
    ],
  },
  {
    heading: "Substantive Corrections",
    body: [
      "Errors that affect a factual claim, a figure, a quote, an attribution, or the overall meaning of a story are corrected in the article text itself, and the article's updated date reflects when that happened. We don't delete or silently rewrite a substantive claim — the fix is made transparently, in the place a reader would naturally encounter it.",
    ],
  },
  {
    heading: "What We Don't Do",
    body: [
      "We don't unpublish an article to avoid acknowledging an error, and we don't backdate an update to obscure when a correction was made. If a story turns out to be wrong at its core, we say so within the article rather than removing it from the site.",
    ],
  },
  {
    heading: "How to Report an Error",
    body: [
      `If you spot something wrong in one of our articles, email ${CONTACT_EMAIL} with the article's URL and a description of the issue. Include a link to a source if you have one — it helps us verify and fix the error faster.`,
      "We review every report we receive. Not every report turns out to describe an actual error, but we'll look into each one and correct the article where it's warranted.",
    ],
  },
  {
    heading: "Related Policies",
    body: [
      "See our Editorial Policy for the broader standards governing how stories are reported and written, and our Right of Reply Policy if you're the subject of a story and want to respond to how you were characterized.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We'll update this page if our corrections process changes. The date at the top reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `To report an error or ask about a correction, email ${CONTACT_EMAIL}.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/corrections-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/corrections-policy`,
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

export default function CorrectionsPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/corrections-policy`,
        url: `${SITE_URL}/corrections-policy`,
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
            name: "Corrections Policy",
            item: `${SITE_URL}/corrections-policy`,
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
          <span className="text-[#1A1A1A]">Corrections Policy</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms/Legal */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Corrections Policy
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <p className="mt-4 font-sans text-sm text-[#8A8A8A]">
            Last updated: {LAST_UPDATED}
          </p>
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