import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

const CONTACT_EMAIL = "prprimespot@gmail.com";

const PAGE_TITLE = "Source Methodology";

const PAGE_DESCRIPTION = `How ${SITE_NAME} sources, credits, and links to the reporting behind our stories.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "Overview",
    body: [
      `${SITE_NAME} doesn't do original newsgathering in the sense of reporters in the field — we synthesize and contextualize reporting that's already been published by wire services, primary records, and other outlets, and we credit and link to that reporting on every article. This page explains how that works.`,
    ],
  },
  {
    heading: "Source Credit Line",
    body: [
      'Every article carries a "Source:" credit naming the outlet or outlets whose original reporting it draws on — for example, a single wire service, or a combination like "NPR / NBC News" when a story synthesizes multiple outlets\' coverage of the same event. This credit reflects who broke or reported the underlying facts, not necessarily every outlet mentioned in the piece.',
    ],
  },
  {
    heading: "Sources and Further Reading",
    body: [
      'At the end of each article, a "Sources and further reading" section links out to the specific articles, reports, filings, or records the piece is built on. These are the same primary and secondary sources named in the credit line, linked directly so you can read them yourself rather than take our word for it.',
      "We link to the original reporting or the underlying record wherever we can find a stable, public link. Where a claim traces back to something not publicly linkable — a press release since taken down, for instance — we say so in the article text rather than presenting it as a live link.",
    ],
  },
  {
    heading: "How We Select and Synthesize Sources",
    body: [
      "For most stories, we start from established outlets' own reporting — wire services, beat reporters at major outlets, and primary records like earnings releases, government data, or court filings. When multiple outlets have covered the same event, we cross-reference their reporting for consistency before writing our own synthesis, and we note where accounts meaningfully differ.",
      "We distinguish confirmed, on-the-record facts from projections, estimates, and analysis, and we label opinion and commentary pieces as such rather than presenting them as straight news.",
    ],
  },
  {
    heading: "Images and Illustrations",
    body: [
      'Hero images are captioned and, where applicable, credited on the article page — for example, "Illustration: AI-assisted original illustration." Many of our hero images are AI-assisted illustrations created to represent a story\'s subject matter, not photographs of the actual people, places, or events described in the article. We label these as illustrations rather than presenting them as photojournalism.',
    ],
  },
  {
    heading: "Corrections",
    body: [
      "If we misattribute a source, link to the wrong record, or get a sourced fact wrong, that's handled the same way as any other correction. See our Corrections Policy for how we log and disclose corrections once an article has been published.",
    ],
  },
  {
    heading: "What This Methodology Doesn't Cover",
    body: [
      "We don't grant or rely on anonymous sourcing — every source we cite is a named, publicly identifiable outlet or record. This page describes how we credit and link existing reporting; it isn't a claim that every underlying source has itself been independently re-verified by us beyond the cross-referencing described above.",
    ],
  },
  {
    heading: "Changes to This Page",
    body: [
      "We'll update this page if our sourcing or attribution practices change. The date at the top reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Spotted a sourcing or attribution issue in a specific article? Tell us at ${CONTACT_EMAIL} and include the article link.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/source-methodology",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/source-methodology`,
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

export default function SourceMethodologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/source-methodology`,
        url: `${SITE_URL}/source-methodology`,
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
            name: "Source Methodology",
            item: `${SITE_URL}/source-methodology`,
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
          <span className="text-[#1A1A1A]">Source Methodology</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms/Legal */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Source Methodology
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