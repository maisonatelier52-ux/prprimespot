import Link from "next/link";
import Image from "next/image";
import { searchArticles } from "@/lib/articles";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// ---------------------------------------------------------------------------
// /search — a real, linkable, crawlable URL behind the header's search
// dropdown (components/header.jsx). Exists so:
//   1. a search can be shared/bookmarked instead of living only in client UI
//      state, and
//   2. schema.org's WebSite `potentialAction` / SearchAction (app/page.js)
//      has a real urlTemplate to point at — Google's sitelinks searchbox
//      would otherwise send visitors to a URL that doesn't exist.
//
// Deliberately noindexed below: a `?q=` results page is classic thin /
// near-duplicate content (infinite param combinations, same layout every
// time), so it should be reachable and functional but never compete with
// real article/category pages in search results.
// ---------------------------------------------------------------------------

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: query
      ? `Articles matching "${query}" on ${SITE_NAME}.`
      : `Search ${SITE_NAME} for articles by headline or topic.`,
    alternates: {
      canonical: "/search",
    },
    // Functional but not for search engines to index — see file header note.
    robots: { index: false, follow: true },
  };
}

function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-[#EDEDED] text-[#A0A0A0] font-sans text-[11px] uppercase tracking-wide ${className}`}
      aria-label={`${label} image placeholder`}
    >
      {label}
    </div>
  );
}

function ArticleImage({ imageUrl, alt, className = "" }) {
  if (!imageUrl) {
    return <ImagePlaceholder label={alt || "image"} className={className} />;
  }
  return (
    <div className={`relative overflow-hidden max-w-full ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ResultCard({ article }) {
  const dateLabel = formatDate(article.publishedAt);
  return (
    <Link href={`/${article.category}/${article.slug}`} className="group flex gap-4 py-6">
      <ArticleImage
        imageUrl={article.heroImage}
        alt={article.heroCaption || article.headline}
        className="w-28 h-28 sm:w-36 sm:h-36 shrink-0"
      />
      <div className="min-w-0">
        <span className="font-sans text-[11px] font-bold uppercase tracking-wide text-[#D01418]">
          {article.category}
        </span>
        <h2 className="mt-1 font-serif text-lg sm:text-xl font-bold leading-snug text-[#1A1A1A] group-hover:text-[#D01418] transition-colors break-words">
          {article.headline}
        </h2>
        {article.dek && (
          <p className="mt-1 font-sans text-sm leading-relaxed text-[#595959] break-words line-clamp-2">
            {article.dek}
          </p>
        )}
        {dateLabel && <p className="mt-1 font-sans text-xs text-[#A0A0A0]">{dateLabel}</p>}
      </div>
    </Link>
  );
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  // The header dropdown caps at 8 for a compact list; the full page can
  // afford to show more.
  const results = query ? searchArticles(query, 30) : [];

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-[#8A8A8A] mb-6">
          <Link href="/" className="hover:text-[#D01418] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Search</span>
        </nav>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] break-words">
          {query ? `Search results for "${query}"` : "Search"}
        </h1>

        {/* Lets a visitor refine the search without going back to the header. */}
        <form role="search" action="/search" method="GET" className="mt-6">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search articles..."
            autoFocus
            className="w-full border border-[#E5E5E5] rounded-sm px-4 py-2 font-sans text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D01418]"
          />
        </form>

        <div className="mt-8 divide-y divide-[#E5E5E5]">
          {!query ? (
            <p className="py-4 font-sans text-sm text-[#8A8A8A]">
              Enter a search term above to find articles by headline or topic.
            </p>
          ) : results.length === 0 ? (
            <p className="py-4 font-sans text-sm text-[#8A8A8A]">
              No results for &ldquo;{query}&rdquo;. Try a different search term, or browse by{" "}
              <Link href="/" className="text-[#D01418] hover:underline">
                category
              </Link>
              .
            </p>
          ) : (
            results.map((article) => (
              <ResultCard key={`${article.category}-${article.slug}`} article={article} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}