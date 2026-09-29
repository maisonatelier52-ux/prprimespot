import { notFound } from "next/navigation";
// Adjust this path if this file moves relative to /public/data
import articlesData from "../../public/data/article.json";
import Link from "next/link";
import Image from "next/image";
import {
  getAbsoluteUrl,
  SITE_NAME,
  SITE_URL,
  SITE_TWITTER_HANDLE,
  getOrganizationSchema,
} from "@/lib/site";
import { CATEGORY_LABELS, getCategoryLabel } from "@/lib/categories";

const FALLBACK_IMAGE = "/og-image.jpg";

// Fixed 140-155 character meta descriptions, one per category. Keys must
// match the top-level keys in public/data/article.json.
const CATEGORY_DESCRIPTIONS = {
  business:
    "Business news from PR Primespot: mergers, earnings, company strategy and market-moving deals, with clear analysis of what they mean for the U.S. economy.",
  finance:
    "Finance news from PR Primespot: markets, banking, interest rates, investing and economic data, explained clearly for readers who follow money and policy.",
  world:
    "World news from PR Primespot: international politics, diplomacy, conflicts and global economic developments, reported with context and trusted sources.",
  us:
    "U.S. news from PR Primespot: national headlines, government, courts and public policy affecting Americans, with clear reporting and essential context.",
  politics:
    "Politics news from PR Primespot: Congress, elections, the White House and policy debates in Washington, covered with clear, sourced and balanced reporting.",
  sports:
    "Sports news from PR Primespot: scores, results, standings and major stories across leagues and tournaments, with timely reporting and analysis.",
  "julio-herrera-velutini":
    "In-depth coverage of Julio Herrera Velutini: his background, banking career, legal case timeline, philanthropy and influence on Latin American finance.",
};

function getCategoryDescription(category, label, titleWord) {
  return (
    CATEGORY_DESCRIPTIONS[category.toLowerCase()] ||
    `${label} ${titleWord.toLowerCase()} and analysis from ${SITE_NAME}.`
  );
}

export const dynamicParams = false;

function isKnownCategory(category) {
  return typeof category === "string" && Object.hasOwn(articlesData, category);
}

function getArticlesByCategory(category) {
  const key = category?.toLowerCase();
  const posts = articlesData[key] || [];
  // Real nav categories (business, finance, world, us, politics, sports)
  // hide `hideFromListings: true` posts, since those are client/pillar
  // pieces filed elsewhere that shouldn't clutter a general news listing.
  // A client/pillar hub category (e.g. "julio-herrera-velutini") is NOT
  // in CATEGORY_LABELS and exists specifically to host those pieces —
  // hiding them from *this* page too would make the hub permanently
  // empty. They're already excluded from the homepage and author pages
  // (those filters are separate and unaffected by this).
  const isNavCategory = Object.hasOwn(CATEGORY_LABELS, key);

  return posts
    .filter((post) => isNavCategory ? !post.hideFromListings : true)
    .map((post) => ({
      category: key,
      slug: post.slug,
      headline: post.headline,
      excerpt: post.dek,
      heroImage: post.heroImage,
      publishedAt: post.publishedAt,
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function generateStaticParams() {
  return Object.keys(articlesData).map((category) => ({ category }));
}

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// generateMetadata — title, description, canonical URL, OG, Twitter card,
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { category } = await params;

  if (!isKnownCategory(category)) {
    return {
      title: "Category not found",
      robots: { index: false, follow: false },
    };
  }

  const articles = getArticlesByCategory(category);
  const label = getCategoryLabel(category);
  const titleWord = Object.hasOwn(CATEGORY_LABELS, category.toLowerCase()) ? "News" : "Coverage";

  const url = `${SITE_URL}/${category.toLowerCase()}`;
  const description = getCategoryDescription(category, label, titleWord);
  const imageUrl = getAbsoluteUrl(articles[0]?.heroImage || FALLBACK_IMAGE);

  return {
    title: `${label} ${titleWord}`,
    description,
    alternates: {
      canonical: url,
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
      title: `${label} ${titleWord} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER_HANDLE,
      creator: SITE_TWITTER_HANDLE,
      title: `${label} ${titleWord} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
    },
  };
}

function ImagePlaceholder({ label, className = "" }) {
  return (
    <div className={`flex items-center justify-center bg-[#EDEDED] text-[#A0A0A0] font-sans text-[11px] uppercase tracking-wide ${className}`} aria-label={`${label} image placeholder`}>
      {label}
    </div>
  );
}

function ArticleImage({ imageUrl, alt, className = "", sizes }) {
  if (!imageUrl) {
    return <ImagePlaceholder label={alt || "image"} className={className} />;
  }
  return (
    <div className={`relative overflow-hidden max-w-full ${className}`}>
      <Image src={imageUrl} alt={alt} fill sizes={sizes || "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} className="object-cover"/>
    </div>
  );
}

function ArticleCard({ article }) {
  const dateLabel = formatDate(article.publishedAt);
  return (
    <Link href={`/${article.category}/${article.slug}`} className="group block">
      <ArticleImage imageUrl={article.heroImage} alt={article.heroCaption || article.headline} className="w-full aspect-[4/3] mb-3"/>
      <h3 className="font-serif text-lg font-bold leading-snug text-[#1A1A1A] group-hover:text-[#D01418] transition-colors break-words">
        {article.headline}
      </h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-[#595959] break-words line-clamp-2">
        {article.excerpt}
      </p>
      {dateLabel && (
        <p className="mt-2 font-sans text-xs text-[#A0A0A0]">{dateLabel}</p>
      )}
    </Link>
  );
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  // Unknown category slug -> real 404, not a silently-rendered empty page.
  if (!isKnownCategory(category)) {
    notFound();
  }

  const articles = getArticlesByCategory(category);
  const label = getCategoryLabel(category);
  const titleWord = Object.hasOwn(CATEGORY_LABELS, category.toLowerCase()) ? "News" : "Coverage";

  // ---------------------------------------------------------------------
  // JSON-LD — CollectionPage + ItemList (articles in this category)
  // ---------------------------------------------------------------------
  const url = `${SITE_URL}/${category.toLowerCase()}`;
  const description = getCategoryDescription(category, label, titleWord);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collectionpage`,
        name: `${label} ${titleWord} | ${SITE_NAME}`,
        description,
        url,
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#articles`,
        name: `${label} ${titleWord}`,
        numberOfItems: articles.length,
        itemListElement: articles.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/${post.category}/${post.slug}`,
          name: post.headline,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: label, item: url },
        ],
      },
      getOrganizationSchema(),
    ],
  };

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-[#8A8A8A] mb-6">
          <Link href="/" className="hover:text-[#D01418] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{label}</span>
        </nav>

        {/* Category header — badge box sits inside a lighter background panel */}
        <div className="bg-[#F7F5EF] px-6 py-6 sm:px-8 sm:py-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
              <h1 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
                {label}
              </h1>
            </div>
            <span className="font-sans text-sm text-[#8A8A8A]">
              {articles.length} {articles.length === 1 ? "post" : "posts"}
            </span>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2" />
        </div>

        {articles.length === 0 ? (
          <p className="font-sans text-[#595959]">No posts in this category yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}