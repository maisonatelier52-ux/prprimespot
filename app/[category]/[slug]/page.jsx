import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";
import { getArticleLayout } from "@/lib/articleLayouts";
import {
  getArticle,
  getRelatedArticles,
  getClientRelatedArticles,
  getAllArticleParams,
} from "@/lib/articles";
import {
  getAbsoluteUrl,
  SITE_NAME,
  SITE_URL,
  SITE_TWITTER_HANDLE,
  ORGANIZATION_REF,
  getOrganizationSchema,
} from "@/lib/site";
import { getCategoryLabel } from "@/lib/categories";
import { getLocalImageSize } from "@/lib/imageSize";

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
  const imagePath = article.heroImage || FALLBACK_IMAGE;
  const imageUrl = getAbsoluteUrl(imagePath);
  // Real dimensions read from the file (null for remote/unreadable images,
  // in which case width/height are simply left out).
  const imageDims = getLocalImageSize(imagePath);

  return {
    // absolute = skip the "| PR Primespot" template from app/layout.js,
    // so the <title> is just the headline (or the optional seoTitle
    // override from article.json for unusually long headlines).
    title: { absolute: article.seoTitle || article.headline },
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
          ...(imageDims ? { width: imageDims.width, height: imageDims.height } : {}),
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
  // Client pillar/profile pages (see lib/articleLayouts.js) get their own
  // related set: only other posts about the same client, never generic
  // same-category news.
  const clientRelated = getClientRelatedArticles(article.client, article.slug, 5);
  // "us" -> "U.S.", hub slugs -> the client's name (see lib/categories.js)
  const categoryLabel = getCategoryLabel(article.category);
  const pageUrl = `/${article.category}/${article.slug}`;

  // ---------------------------------------------------------------------
  // JSON-LD — NewsArticle + BreadcrumbList + Organization. Shared by every
  // article regardless of which layout renders its body below.
  // ---------------------------------------------------------------------
  const absoluteUrl = `${SITE_URL}${pageUrl}`;
  const imagePath = article.heroImage || FALLBACK_IMAGE;
  const imageUrl = getAbsoluteUrl(imagePath);
  const imageDims = getLocalImageSize(imagePath);

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
          ...(imageDims ? { width: imageDims.width, height: imageDims.height } : {}),
        },
        datePublished: article.publishedAt || undefined,
        dateModified: article.updatedAt || article.publishedAt || undefined,
        author: {
          "@type": "Person",
          name: article.author,
          ...(article.authorSlug ? { url: `${SITE_URL}/authors/${article.authorSlug}` } : {}),
        },
        publisher: ORGANIZATION_REF,
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
      getOrganizationSchema(),
      ...(article.faq && article.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${absoluteUrl}#faq`,
              mainEntity: article.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  // ---------------------------------------------------------------------
  // Layout selection — a slug registered in lib/articleLayouts.js renders
  // through its own custom component; everything else uses the shared
  // ArticleDetail broadsheet template.
  //
  // getArticleLayout() is a pure lookup into a static, module-level object
  // (lib/articleLayouts.js); it always returns the same stable component
  // reference (or null) for a given category/slug, never a freshly created
  // one. The react-hooks/static-components rule's "resets state on remount"
  // concern also doesn't apply here regardless: this is an async Server
  // Component (no "use client", no hooks, no client-side reconciliation)
  // rendered once per page at build/request time. Suppressed below at the
  // JSX usage site, where the rule actually reports it.
  const CustomLayout = getArticleLayout(article.category, article.slug);

  return (
    <main className="w-full bg-white text-[#1A1A1A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {CustomLayout ? (
        // eslint-disable-next-line react-hooks/static-components -- see note above CustomLayout
        <CustomLayout
          article={article}
          related={related}
          clientRelated={clientRelated}
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