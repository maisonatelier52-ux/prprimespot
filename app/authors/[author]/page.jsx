import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getAbsoluteUrl,
  SITE_NAME,
  SITE_URL,
  SITE_TWITTER_HANDLE,
  ORGANIZATION_REF,
  getOrganizationSchema,
} from "@/lib/site";

import articlesData from "../../../public/data/article.json";
import authorsData from "../../../public/data/author.json";

const FALLBACK_AVATAR = "/default-avatar.jpg";

function getAuthorBySlug(authorSlug) {
  const info = authorsData[authorSlug?.toLowerCase()];
  return info ? { slug: authorSlug.toLowerCase(), ...info } : null;
}

function getArticlesByAuthor(authorSlug) {
  const slug = authorSlug?.toLowerCase();

  return Object.entries(articlesData)
    .flatMap(([category, posts]) =>
      posts
        .filter((post) => post.authorSlug === slug && !post.hideFromListings)
        .map((post) => ({
          category,
          slug: post.slug,
          headline: post.headline,
          excerpt: post.dek,
          heroImage: post.heroImage,
          publishedAt: post.publishedAt,
        }))
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function generateStaticParams() {
  return Object.keys(authorsData).map((author) => ({ author }));
}

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({ params }) {
  const { author } = await params;
  const authorData = getAuthorBySlug(author);

  if (!authorData) {
    return {
      title: "Author not found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/authors/${authorData.slug}`;
  const description =
    authorData.bio || `${authorData.name}, ${authorData.role || "contributor"} at ${SITE_NAME}.`;
  const imageUrl = getAbsoluteUrl(authorData.avatarImage || FALLBACK_AVATAR);

  return {
    title: authorData.name,
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
      title: authorData.name,
      description,
      url,
      siteName: SITE_NAME,
      type: "profile",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 400,
          alt: authorData.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      site: SITE_TWITTER_HANDLE,
      creator: SITE_TWITTER_HANDLE,
      title: authorData.name,
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

export default async function AuthorPage({ params }) {
  const { author } = await params;
  const authorData = getAuthorBySlug(author);

  if (!authorData) {
    notFound();
  }

  const articles = getArticlesByAuthor(author);

  // ---------------------------------------------------------------------
  // JSON-LD — Person + BreadcrumbList + ItemList (author's articles) +
  // ---------------------------------------------------------------------
  const url = `${SITE_URL}/authors/${authorData.slug}`;
  const imageUrl = getAbsoluteUrl(authorData.avatarImage || FALLBACK_AVATAR);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: authorData.name,
        description: authorData.bio,
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 400,
          height: 400,
        },
        url,
        jobTitle: authorData.role || undefined,
        knowsAbout: authorData.category || undefined,
        sameAs: [authorData.social?.twitter, authorData.social?.linkedin].filter(
          Boolean
        ),
        worksFor: ORGANIZATION_REF,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: authorData.name, item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#articles`,
        name: `Articles by ${authorData.name}`,
        numberOfItems: articles.length,
        itemListElement: articles.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/${post.category}/${post.slug}`,
          name: post.headline,
        })),
      },
      getOrganizationSchema(),
    ],
  };

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb — matches the BreadcrumbList JSON-LD above node-for-node */}
        <nav className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-[#8A8A8A] mb-6">
          <Link href="/" className="hover:text-[#D01418] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{authorData.name}</span>
        </nav>
        
        <div className="bg-[#F7F5EF] px-6 py-8 sm:px-10 sm:py-10 mb-10 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6 sm:gap-8">
          <ArticleImage imageUrl={authorData.avatarImage} alt={authorData.name} className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shrink-0" sizes="160px"/>
          <div className="min-w-0 w-full">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] break-words">
              {authorData.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1.5">
              {authorData.category && (
                <Link href={`/${authorData.category}`} className="rounded-full bg-[#D01418] px-3 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wide text-white hover:bg-[#a80f13] transition-colors">
                  {authorData.category}
                </Link>
              )}
              {authorData.role && (
                <p className="font-sans text-sm text-[#8A8A8A]">{authorData.role}</p>
              )}
            </div>
            {authorData.bio && (
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#595959] break-words max-w-2xl mx-auto sm:mx-0">
                {authorData.bio}
              </p>
            )}
          </div>
        </div>

        {/* Posts by this author */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-[#1A1A1A]">Posts</h2>
          <span className="font-sans text-sm text-[#8A8A8A]">
            {articles.length} {articles.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {articles.length === 0 ? (
          <p className="font-sans text-[#595959]">No posts from this author yet.</p>
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