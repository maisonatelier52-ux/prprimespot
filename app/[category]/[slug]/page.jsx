import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";
import { getArticleLayout } from "@/lib/articleLayouts";
import {
  getArticle,
  getRelatedArticles,
  getAllArticleParams,
} from "@/lib/articles";
import {
  getAbsoluteUrl,
  SITE_NAME,
  SITE_URL,
  SITE_TWITTER_HANDLE,
  SITE_LOGO_PATH,
} from "@/lib/site";

const FALLBACK_IMAGE = "/og-image.jpg";

export function generateStaticParams() {
  return getAllArticleParams();
}

// ---------------------------------------------------------------------
// generateMetadata — title, description, canonical URL, OG, Twitter card,
// robots, all sourced from article.json (via getArticle) + author.json.
// Shared by every article regardless of which layout renders its body.
// ---------------------------------------------------------------------
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);

  if (!article) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/${category}/${slug}`;
  const imageUrl = getAbsoluteUrl(article.heroImage || FALLBACK_IMAGE);

  return {
    title: article.headline,
    description: article.dek,
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
      title: article.headline,
      description: article.dek,
      url,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_US",
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt || undefined,
      // article:author expects a profile URL per the OG spec, not a plain name
      authors: article.authorUrl
        ? [article.authorUrl]
        : article.authorSlug
        ? [`${SITE_URL}/authors/${article.authorSlug}`]
        : undefined,
      section: article.category,
      tags: article.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.heroCaption || article.headline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER_HANDLE,
      creator: SITE_TWITTER_HANDLE,
      title: article.headline,
      description: article.dek,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.category, article.slug, 4);
  const categoryLabel = article.category.charAt(0).toUpperCase() + article.category.slice(1);
  const pageUrl = `/${article.category}/${article.slug}`;

  // ---------------------------------------------------------------------
  // JSON-LD — NewsArticle + BreadcrumbList + Organization. Shared by every
  // article regardless of which layout renders its body below.
  // ---------------------------------------------------------------------
  const absoluteUrl = `${SITE_URL}${pageUrl}`;
  const imageUrl = getAbsoluteUrl(article.heroImage || FALLBACK_IMAGE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${absoluteUrl}#article`,
        headline: article.headline,
        description: article.dek,
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
        },
        datePublished: article.publishedAt || undefined,
        dateModified: article.updatedAt || article.publishedAt || undefined,
        author: {
          "@type": "Person",
          name: article.author,
          ...(article.authorSlug ? { url: `${SITE_URL}/authors/${article.authorSlug}` } : {}),
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            // Uses the site's real logo asset (lib/site.js) instead of a
            // non-existent /logo.png at the domain root.
            url: getAbsoluteUrl(SITE_LOGO_PATH),
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl },
        articleSection: categoryLabel,
        inLanguage: "en",
        keywords: article.tags.join(", "),
        ...(article.source ? { creditText: article.source } : {}),
        ...(article.sourceLinks.length ? { citation: article.sourceLinks.map((source) => source.url) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: categoryLabel,
            item: `${SITE_URL}/${article.category}`,
          },
          { "@type": "ListItem", position: 3, name: article.headline, item: absoluteUrl },
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

  // ---------------------------------------------------------------------
  // Layout selection — a slug registered in lib/articleLayouts.js renders
  // through its own custom component; everything else uses the shared
  // ArticleDetail broadsheet template.
  // ---------------------------------------------------------------------
  const CustomLayout = getArticleLayout(article.category, article.slug);

  return (
    <main className="w-full bg-white text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {CustomLayout ? (
        <CustomLayout
          article={article}
          related={related}
          categoryLabel={categoryLabel}
          absoluteUrl={absoluteUrl}
        />
      ) : (
        <ArticleDetail
          article={article}
          related={related}
          categoryLabel={categoryLabel}
          absoluteUrl={absoluteUrl}
        />
      )}
    </main>
  );
}
