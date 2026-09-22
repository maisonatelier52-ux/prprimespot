import Link from "next/link";
import { SITE_NAME, SITE_URL, SITE_TWITTER_HANDLE, getAbsoluteUrl } from "@/lib/site";

const CONTACT_EMAIL = "prprimespot@gmail.com";

const PAGE_TITLE = "Privacy Policy";

const PAGE_DESCRIPTION = `How ${SITE_NAME} collects, uses, and protects information from visitors to this site.`;

const LAST_UPDATED = "September 17, 2026";

const SECTIONS = [
  {
    heading: "Overview",
    body: [
      `This Privacy Policy explains what information ${SITE_NAME} ("we", "us", "our") collects when you visit this website, how it's used, and the choices available to you. ${SITE_NAME} publishes news and commentary across business, finance, world affairs, U.S. news, politics, and sports.`,
      "This site does not require an account, does not process payments, and does not ask visitors to submit personal information to read articles. Most of what follows concerns the limited data collected automatically as part of operating a website — server logs, analytics, and similar technical information.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "Information you provide directly: if you contact us by email, we receive whatever information is contained in that message — typically your email address and the content of your message. We use this only to respond to you.",
      "Information collected automatically: like most websites, our hosting and analytics tools may automatically log technical information when you visit, such as your IP address, browser and device type, pages viewed, referring page, and timestamps. This data is used in aggregate to understand traffic patterns and improve the site — we do not use it to identify individual visitors.",
    ],
  },
  {
    heading: "Cookies and Similar Technologies",
    body: [
      "Cookies are small text files stored on your device. We may use strictly necessary cookies (to keep the site functioning correctly) and, where analytics tools are enabled, analytics cookies (to understand aggregate traffic and usage patterns).",
      "Most browsers let you refuse or delete cookies through their settings. Refusing cookies may affect how some parts of the site behave, but you can still read articles with cookies disabled.",
    ],
  },
  {
    heading: "Third-Party Links and Services",
    body: [
      "Our articles link out to external sources — government records, press releases, other publications, and similar primary material cited in our reporting. We aren't responsible for the privacy practices or content of those external sites, and we encourage you to review their own policies before sharing information with them.",
      "If we use third-party services for hosting, analytics, or similar infrastructure, those providers may process technical data (such as the automatically-collected information described above) on our behalf, under their own privacy and security terms.",
    ],
  },
  {
    heading: "How We Use Information",
    body: [
      "We use the information described above to operate and maintain the site, understand how it's used in aggregate so we can improve it, respond to messages sent to us directly, and meet legal or security obligations where applicable.",
      "We do not sell personal information, and we do not use visitor data to build advertising profiles.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "Automatically-collected technical data (such as server or analytics logs) is retained only as long as needed for the purposes described above, consistent with the retention settings of the tools we use. Direct correspondence, such as emails, is retained as long as reasonably necessary to address the matter it concerns.",
    ],
  },
  {
    heading: "Your Choices",
    body: [
      "You can control cookies through your browser settings, as described above. If you've contacted us directly and want us to delete that correspondence, email us using the address below and we'll act on that request.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: [
      "This site is intended for a general audience and is not directed at children under 13. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this policy from time to time to reflect changes in our practices or for legal or operational reasons. The date at the top of this page reflects the most recent revision. Material changes will be reflected here when they occur.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      `If you have questions about this Privacy Policy or how your information is handled, contact us at ${CONTACT_EMAIL}.`,
    ],
  },
];

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/privacy-policy`,
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

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/privacy-policy`,
        url: `${SITE_URL}/privacy-policy`,
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
            name: "Privacy Policy",
            item: `${SITE_URL}/privacy-policy`,
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
          <span className="text-[#1A1A1A]">Privacy Policy</span>
        </nav>

        {/* Header — centered hero block, same pattern as the About page */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              Privacy Policy
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