import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

const CONTACT_EMAIL = "prprimespot@gmail.com";

const PAGE_TITLE = "Right of Reply Policy";

const PAGE_DESCRIPTION = `How individuals and organizations named in our coverage can request the chance to respond.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "What This Policy Covers",
    body: [
      `If you're an individual or organization named in an article on ${SITE_NAME} in a way that reflects on you — criticized, blamed, or otherwise characterized — you can request the opportunity to respond. This is separate from our Corrections Policy, which covers factual errors: a right-of-reply request is about giving your side a voice, not necessarily about something being factually wrong.`,
    ],
  },
  {
    heading: "Who Can Request a Reply",
    body: [
      "Anyone named or clearly identifiable in one of our articles, or someone authorized to speak on their behalf (a spokesperson, attorney, or representative), can submit a request under this policy.",
    ],
  },
  {
    heading: "How to Submit a Request",
    body: [
      `Email ${CONTACT_EMAIL} with the article's URL, the specific passage you're responding to, and your response. Keep it factual and on point — a right-of-reply addition is meant to give your account of the specific claim in question, not to serve as a general statement or rebuttal of unrelated coverage.`,
    ],
  },
  {
    heading: "How We Handle Requests",
    body: [
      "We review each request to confirm it's a genuine reply to something specific in the article, rather than an attempt to remove or water down accurate reporting. Where a request is warranted, we add your response to the article — typically as an appended statement near the relevant passage — and the article's updated date reflects that change, consistent with our Corrections Policy.",
      "We aim to acknowledge requests within a few business days and to resolve most of them within two weeks, though complex cases may take longer.",
    ],
  },
  {
    heading: "What This Policy Doesn't Guarantee",
    body: [
      "Requesting a reply doesn't guarantee removal, retraction, or rewriting of the original reporting — accurate reporting stands, alongside your response. If you believe the article itself contains a factual error rather than a characterization you disagree with, use our Corrections Policy instead, and we'll handle it as a correction.",
    ],
  },
  {
    heading: "If We Decline a Request",
    body: [
      "If we decide a request doesn't warrant a published reply — for example, because it disputes an accurately reported fact rather than offering a response to a characterization — we'll explain why in our reply to you.",
    ],
  },
  {
    heading: "Related Policies",
    body: [
      "See our Editorial Policy for the broader standards behind our coverage, and our Corrections Policy for how factual errors are handled.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We'll update this page if our right-of-reply process changes. The date at the top reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `To request a reply, email ${CONTACT_EMAIL} with the article link and your response.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/right-of-reply-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/right-of-reply-policy`,
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

export default function RightOfReplyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/right-of-reply-policy`,
        url: `${SITE_URL}/right-of-reply-policy`,
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
            name: "Right of Reply Policy",
            item: `${SITE_URL}/right-of-reply-policy`,
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
          <span className="text-[#1A1A1A]">Right of Reply Policy</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms/Legal */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Right of Reply Policy
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