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
  SITE_LOGO_PATH,
} from "@/lib/site";

const CATEGORY_LABELS = {
  business: "Business",
  finance: "Finance",
  world: "World",
  us: "U.S.",
  politics: "Politics",
  sports: "Sports",
};

const FALLBACK_IMAGE = "/og-image.jpg";

export const dynamicParams = false;

function isKnownCategory(category) {
  return typeof category === "string" && Object.hasOwn(articlesData, category);
}

function getArticlesByCategory(category) {
  const posts = articlesData[category?.toLowerCase()] || [];

  return posts
    // Client pillar/profile pieces marked `hideFromListings: true` don't
    // appear on this category listing — only via their direct URL or
    // another client page's related-posts section. The main pillar article
    // itself isn't marked this way, so it still shows here normally.
    .filter((post) => !post.hideFromListings)
    .map((post) => ({
      category: category.toLowerCase(),
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

  const label = CATEGORY_LABELS[category.toLowerCase()] || category;
  const articles = getArticlesByCategory(category);

  const url = `${SITE_URL}/${category.toLowerCase()}`;
  const description =
    articles.length > 0
      ? `${label} news and coverage from ${SITE_NAME}: ${articles
          .slice(0, 3)
          .map((a) => a.headline)
          .join(", ")}.`
      : `${label} news and coverage from ${SITE_NAME}.`;
  const imageUrl = getAbsoluteUrl(articles[0]?.heroImage || FALLBACK_IMAGE);

  return {
    title: `${label} News`,
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
      title: `${label} News | ${SITE_NAME}`,
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
      title: `${label} News | ${SITE_NAME}`,
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
      <ArticleImage imageUrl={article.heroImage} alt={article.headline} className="w-full aspect-[4/3] mb-3"/>
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

  const label = CATEGORY_LABELS[category.toLowerCase()] || category;
  const articles = getArticlesByCategory(category);

  // ---------------------------------------------------------------------
  // JSON-LD — CollectionPage + ItemList (articles in this category)
  // ---------------------------------------------------------------------
  const url = `${SITE_URL}/${category.toLowerCase()}`;
  const description =
    articles.length > 0
      ? `${label} news and coverage from ${SITE_NAME}.`
      : `${label} news and coverage from ${SITE_NAME}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collectionpage`,
        name: `${label} News | ${SITE_NAME}`,
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
        name: `${label} News`,
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
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: getAbsoluteUrl(SITE_LOGO_PATH),
        },
      },
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