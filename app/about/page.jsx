import Link from "next/link";
import Image from "next/image";
import {
  getAbsoluteUrl,
  SITE_NAME,
  SITE_URL,
  SITE_TWITTER_HANDLE,
  SITE_LOGO_PATH,
} from "@/lib/site";

import authorsData from "../../public/data/author.json";
import articlesData from "../../public/data/article.json";

/**
 * app/about/page.jsx — About page
 *
 * Route: /about
 *
 * Static page (no dynamic segment, no generateStaticParams needed) — content
 * lives directly in this file except for the writer roster, which is pulled
 * from public/data/author.json so it never drifts out of sync with the real
 * byline list.
 *
 * Layout:
 *   Breadcrumb -> masthead/mission header -> "What we cover" (category
 *   chips) -> "How we work" (editorial approach) -> "Our writers" (roster
 *   grid, links out to each author's own page)
 *
 * SEO: generateMetadata() covers title, description, canonical URL, OG,
 * Twitter card, robots. JSON-LD covers AboutPage, BreadcrumbList,
 * Organization — all sourced from lib/site.js + author.json.
 *
 * Domain / site identity: SITE_URL, SITE_NAME, SITE_TWITTER_HANDLE, and
 * SITE_LOGO_PATH all come from lib/site.js (https://www.prprimespot.com).
 * Nothing in this file hardcodes the domain — update lib/site.js if the
 * domain, name, or handle ever changes.
 *
 * Palette (matches the rest of the site):
 *   masthead-red  #D01418
 *   gold rule     #E8B23D
 *   ink           #1A1A1A
 *   ink-soft      #595959
 *   cream         #F7F5EF
 *   rule          #E5E5E5
 */

const FALLBACK_AVATAR = "/default-avatar.jpg";

const CATEGORY_LABELS = {
  business: "Business",
  finance: "Finance",
  world: "World",
  us: "U.S.",
  politics: "Politics",
  sports: "Sports",
};

const PAGE_TITLE = "About Us";

// Meta description — kept under ~160 characters so Google doesn't truncate
// it in search results, and so OG/Twitter card previews stay readable.
const PAGE_DESCRIPTION = `${SITE_NAME} covers business, finance, world affairs, U.S. news, politics, and sports, with every post linked back to its primary sources.`;

// On-page intro — no length constraint here, since this is read in the
// browser, not clipped in a search snippet. Each entry renders as its own
// paragraph under the header.
const PAGE_INTRO = [
  `${SITE_NAME} is a source-linked current-affairs publication covering business, finance, world affairs, U.S. news, politics, and sports. We exist to give readers a fast, accurate account of what's happening, with a clear path back to the primary records, data, and statements each story is built on.`,
  "We were built around a simple idea: a news story should be easy to verify, not just easy to read. That means citing the report, the transcript, the filing, or the dataset behind a claim, and being upfront about what's confirmed, what's projected, and what's still developing.",
  "Each of our writers covers a consistent beat, so coverage builds on real familiarity with that subject rather than starting from scratch on every story. You can read more about who writes what below, or visit any writer's page to see their full body of work.",
];

const PRINCIPLES = [
  {
    title: "Source-linked reporting",
    body: "Every post links to the public records, primary data, or official statements behind its central claims, so readers can check the sourcing themselves rather than take our word for it.",
  },
  {
    title: "Evidence separated from interpretation",
    body: "Observed figures, official statements, and projections are labeled as what they are. Analysis and interpretation are clearly distinguished from the underlying facts they're built on.",
  },
  {
    title: "Corrections, not silent edits",
    body: "When a published article is updated in a way that changes its meaning, that's reflected in the article's updated date. We don't quietly rewrite the record.",
  },
  {
    title: "One writer, one desk",
    body: "Each writer covers a consistent beat — business, finance, world, U.S., politics, or sports — so coverage builds on domain familiarity rather than starting from zero each time.",
  },
];

function getWriterCount(authorSlug) {
  return Object.values(articlesData)
    .flat()
    .filter((post) => post.authorSlug === authorSlug).length;
}

function getWriters() {
  return Object.entries(authorsData)
    .map(([slug, info]) => ({
      slug,
      name: info.name,
      role: info.role || "",
      category: info.category || "",
      avatarImage: info.avatarImage || FALLBACK_AVATAR,
      postCount: getWriterCount(slug),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: getAbsoluteUrl("/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — About Us`,
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

function WriterCard({ writer }) {
  return (
    <li className="border border-[#E5E5E5] bg-white p-5 hover:border-[#D01418] transition-colors">
      <Link href={`/authors/${writer.slug}`} className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image src={writer.avatarImage} alt={writer.name} fill sizes="64px" className="object-cover"/>
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-base font-bold text-[#1A1A1A] break-words group-hover:text-[#D01418]">
            {writer.name}
          </h3>
          {writer.role && (
            <p className="font-sans text-xs text-[#8A8A8A] mt-0.5">{writer.role}</p>
          )}
          <p className="font-sans text-[11px] text-[#A0A0A0] mt-1">
            {writer.postCount} {writer.postCount === 1 ? "post" : "posts"}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function AboutPage() {
  const writers = getWriters();
  const categories = Object.entries(CATEGORY_LABELS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about`,
        url: `${SITE_URL}/about`,
        name: `${PAGE_TITLE} | ${SITE_NAME}`,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
        about: {
          "@type": "Organization",
          "@id": `${SITE_URL}#organization`,
          name: SITE_NAME,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about` },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: getAbsoluteUrl(SITE_LOGO_PATH),
        },
        employee: writers.map((w) => ({
          "@type": "Person",
          name: w.name,
          jobTitle: w.role || undefined,
          url: `${SITE_URL}/authors/${w.slug}`,
        })),
      },
    ],
  };

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-[#8A8A8A] mb-6">
          <Link href="/" className="hover:text-[#D01418] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">About Us</span>
        </nav>

        {/* Header panel — centered hero-style block, matches the category/
            author page pattern but centered rather than left-aligned since
            this is a short mission statement, not an article list */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              About Us
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <div className="mt-4 max-w-2xl space-y-4">
            {PAGE_INTRO.map((paragraph, i) => (
              <p key={i} className="font-serif text-base sm:text-lg leading-relaxed text-[#595959]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* What we cover */}
        <section className="mb-12">
          <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-[#1A1A1A] mb-4">What We Cover</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(([slug, label]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="rounded-full border border-[#E0DDD5] px-4 py-1.5 font-sans text-sm text-[#1A1A1A] hover:bg-[#D01418] hover:border-[#D01418] hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* How we work */}
        <section className="mb-12">
          <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-[#1A1A1A] mb-6">How We Work</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-l-2 border-[#D01418] pl-4">
                <h3 className="font-serif text-base font-bold text-[#1A1A1A]">
                  {p.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#595959] mt-1.5">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our writers */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-[#1A1A1A]">Our Writers</h2>
            <span className="font-sans text-sm text-[#8A8A8A]">
              {writers.length} {writers.length === 1 ? "writer" : "writers"}
            </span>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {writers.map((writer) => (
              <WriterCard key={writer.slug} writer={writer} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}