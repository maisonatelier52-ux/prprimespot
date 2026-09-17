import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, SITE_SOCIAL_LINKS, getAbsoluteUrl } from "@/lib/site";

/**
 * app/contact/page.jsx — Contact
 *
 * Route: /contact
 *
 * Static page — no form, no API route, no server-side database (see
 * README/project notes). Every "get in touch" action here is a mailto:
 * link that opens the visitor's own email client; nothing is submitted
 * to or stored by this site. Structure and styling intentionally mirror
 * app/privacy-policy/page.jsx and app/terms-and-conditions/page.jsx.
 *
 * PLACEHOLDER CONTENT: the addresses in CONTACT_CHANNELS are reasonable
 * defaults for a small editorial site's inbox structure, but they're not
 * live mailboxes — swap in real addresses (and make sure each one is
 * actually monitored) before shipping.
 *
 * Domain / site identity: SITE_URL, SITE_NAME, SITE_TWITTER_HANDLE, and
 * SITE_SOCIAL_LINKS all come from lib/site.js — nothing here hardcodes
 * the domain.
 *
 * Palette (matches the rest of the site):
 *   masthead-red  #D01418
 *   gold rule     #E8B23D
 *   ink           #1A1A1A
 *   ink-soft      #595959
 *   cream         #F7F5EF
 *   rule          #E5E5E5
 */

const PAGE_TITLE = "Contact";

// Short, meta-description length — kept under ~160 chars so it isn't
// truncated in search results or link previews.
const PAGE_DESCRIPTION = `How to get in touch with ${SITE_NAME} — editorial, corrections, advertising, and general inquiries.`;

// Each channel maps a reason to get in touch to a specific inbox, so
// messages land with whoever actually handles that kind of request
// rather than all piling into one general address.
const CONTACT_CHANNELS = [
  {
    label: "General Inquiries",
    email: "hello@prprimespot.com",
    body: "Questions, feedback, or anything that doesn't fit the categories below.",
  },
  {
    label: "News Tips & Story Ideas",
    email: "tips@prprimespot.com",
    body: "Have a lead, a document, or a story we should be covering? Send it our way.",
  },
  {
    label: "Corrections",
    email: "corrections@prprimespot.com",
    body: "Spotted an error in something we published? Tell us the article and what's wrong — see our Corrections Policy for how we handle these.",
  },
  {
    label: "Editorial",
    email: "editorial@prprimespot.com",
    body: "Questions about a specific story, byline, or our editorial approach.",
  },
  {
    label: "Advertising & Partnerships",
    email: "advertising@prprimespot.com",
    body: "Sponsorship, advertising, or partnership inquiries.",
  },
  {
    label: "Legal & Privacy",
    email: "legal@prprimespot.com",
    body: "Terms, privacy, rights of reply, or other legal matters.",
  },
];

function mailtoHref(email, subject) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/contact`,
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

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact`,
        url: `${SITE_URL}/contact`,
        name: `${PAGE_TITLE} | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        contactPoint: CONTACT_CHANNELS.map((c) => ({
          "@type": "ContactPoint",
          contactType: c.label,
          email: c.email,
        })),
        sameAs: Object.values(SITE_SOCIAL_LINKS),
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
          <span className="text-[#1A1A1A]">Contact</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Privacy/Terms */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Contact
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <p className="mt-4 max-w-xl font-serif text-base sm:text-lg leading-relaxed text-[#595959]">
            Pick the address that best matches what you're reaching out about, and
            it'll go straight to the right desk. Every link below opens your own
            email app — nothing is submitted through this site.
          </p>
        </div>

        {/* Contact channels */}
        <div className="grid gap-4 sm:grid-cols-2">
          {CONTACT_CHANNELS.map((channel) => (
            <div
              key={channel.email}
              className="border border-[#E5E5E5] bg-white p-5 hover:border-[#D01418] transition-colors"
            >
              <h2 className="font-serif text-base font-bold text-[#1A1A1A]">
                {channel.label}
              </h2>
              <p className="font-sans text-sm leading-relaxed text-[#595959] mt-1.5 mb-3">
                {channel.body}
              </p>
              <a
                href={mailtoHref(channel.email, `${channel.label} — ${SITE_NAME}`)}
                className="font-sans text-sm font-semibold text-[#D01418] hover:underline break-all"
              >
                {channel.email}
              </a>
            </div>
          ))}
        </div>

        {/* Social + related links */}
        <div className="mt-12 border-t border-[#E5E5E5] pt-8">
          <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-[#1A1A1A] mb-4">
            Follow Us
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.entries(SITE_SOCIAL_LINKS).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#E0DDD5] px-4 py-1.5 font-sans text-sm capitalize text-[#1A1A1A] hover:bg-[#D01418] hover:border-[#D01418] hover:text-white transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>

          <p className="font-sans text-sm leading-relaxed text-[#595959]">
            Looking for something else? See our{" "}
            <Link href="/about" className="text-[#D01418] hover:underline">
              About page
            </Link>
            , our{" "}
            <Link href="/corrections-policy" className="text-[#D01418] hover:underline">
              Corrections Policy
            </Link>
            , or our{" "}
            <Link href="/right-of-reply-policy" className="text-[#D01418] hover:underline">
              Right of Reply Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}