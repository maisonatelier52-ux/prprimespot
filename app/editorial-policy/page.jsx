import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

const CONTACT_EMAIL = "prprimespot@gmail.com";

const PAGE_TITLE = "Editorial Policy";

const PAGE_DESCRIPTION = `The editorial standards and independence that guide reporting on ${SITE_NAME}.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "Our Approach",
    body: [
      `${SITE_NAME} synthesizes and contextualizes reporting that's already been published by wire services, primary records, and other outlets — see our Source Methodology page for exactly how that sourcing and linking works. Our job is to give readers a fast, accurate, well-sourced account of a story, not to duplicate original field reporting we haven't done ourselves.`,
    ],
  },
  {
    heading: "Editorial Independence",
    body: [
      "Coverage decisions — what we cover, how we frame it, and when a story warrants a correction — are made independently of any advertiser, sponsor, or outside party. As described in our Advertising Policy and our Ownership and Funding page, no funding source is given advance review of, or influence over, editorial content.",
    ],
  },
  {
    heading: "Evidence Separated From Interpretation",
    body: [
      "We aim to clearly distinguish confirmed, on-the-record facts from projections, estimates, and analysis. Where a figure is a forecast rather than an observed result, or a claim comes from one party to a dispute rather than an independently verified fact, the article says so rather than blurring the two together.",
    ],
  },
  {
    heading: "Opinion and Commentary",
    body: [
      "Pieces that are primarily analysis, commentary, or opinion are labeled as such and reflect the views of their author, not necessarily the publication as a whole. We don't present opinion writing as straight news reporting.",
    ],
  },
  {
    heading: "Bylines and Beats",
    body: [
      "Each writer covers a consistent beat — business, finance, world, U.S., politics, or sports — so coverage builds on real familiarity with that subject area rather than starting from zero on every story. You can see a writer's full body of work on their author page.",
    ],
  },
  {
    heading: "Illustrations, Not Photojournalism",
    body: [
      'Hero images are labeled on each article page, and many are AI-assisted illustrations created to represent a story\'s subject matter rather than photographs of the actual people, places, or events described. We don\'t present illustrations as documentary photography. See our Source Methodology page for more on how images are credited.',
    ],
  },
  {
    heading: "Corrections, Not Silent Edits",
    body: [
      "When a published article is updated in a way that changes its meaning, that's reflected in the article's updated date, and disclosed consistent with our Corrections Policy. We don't quietly rewrite the record after the fact.",
    ],
  },
  {
    heading: "Conflicts of Interest",
    body: [
      "If a writer or editor has a personal, financial, or professional connection to the subject of a story that a reader would reasonably want to know about, we disclose it within the article. See our Ownership and Funding page for broader conflict-of-interest disclosures.",
    ],
  },
  {
    heading: "Right of Reply",
    body: [
      "Individuals or organizations named in our coverage in a way that reflects on them can request the opportunity to respond. See our Right of Reply Policy for how that process works.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We'll update this page if our editorial standards or process change in a way that's relevant to readers. The date at the top reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about a specific story, byline, or our editorial approach generally can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/editorial-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/editorial-policy`,
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

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/editorial-policy`,
        url: `${SITE_URL}/editorial-policy`,
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
            name: "Editorial Policy",
            item: `${SITE_URL}/editorial-policy`,
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
          <span className="text-[#1A1A1A]">Editorial Policy</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms/Legal */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Editorial Policy
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