import Link from "next/link";
import articlesData from "../public/data/article.json";
import Image from "next/image";

const CATEGORY = "business";

function getBusinessArticles() {
  const posts = articlesData[CATEGORY] || [];
  return [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function Divider() {
  return <hr className="border-t border-[#E5E5E5] my-5" />;
}

function ImagePlaceholder({ label, className = "" }) {
  return (
    <div className={`flex items-center justify-center bg-[#EDEDED] text-[#A0A0A0] font-sans text-[11px] uppercase tracking-wide ${className}`} aria-label={`${label} image placeholder`}>
      {label}
    </div>
  );
}

// Sizing classes go on the OUTER wrapper; the <img> just fills it — keeps
// width/aspect-ratio classes from fighting a hardcoded w-full/h-full on the
// same element.
function StoryImage({ imageUrl, alt, className = "", priority = false }) {
  if (!imageUrl) {
    return <ImagePlaceholder label={alt || "image"} className={className} />;
  }
  return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image src={imageUrl} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
    </div>
  );
}

function LeftStoryCard({ article, hasImage }) {
  const href = `/${CATEGORY}/${article.slug}`;
  return (
    <Link href={href} className="group block">
      {hasImage && (
        <StoryImage imageUrl={article.heroImage} alt={article.headline} className="w-full aspect-[16/10] mb-3"/>
      )}
      <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-[#1A1A1A] group-hover:text-[#D01418] transition-colors">
        {article.headline}
      </h3>
      {article.dek && (
        <p className="mt-2 font-sans text-sm leading-relaxed text-[#595959]">{article.dek}</p>
      )}
    </Link>
  );
}

function LeadStory({ article }) {
  const href = `/${CATEGORY}/${article.slug}`;
  return (
    <div>
      <Link href={href} className="group block">
        <div className="flex">
          <div className="w-3 sm:w-4 shrink-0 bg-[#D01418]" aria-hidden="true" />
          <StoryImage imageUrl={article.heroImage} alt={article.headline} className="w-full aspect-[4/3]" priority/>
          <div className="w-3 sm:w-4 shrink-0 bg-[#D01418]" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#1A1A1A] group-hover:text-[#D01418] transition-colors">
          {article.headline}
        </h2>
        <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#595959]">
          {article.dek}
        </p>
      </Link>
    </div>
  );
}

function OpEdCard({ article, isFirst }) {
  const href = `/${CATEGORY}/${article.slug}`;
  return (
    <Link href={href} className="group block">
      <div className={isFirst ? "flex items-start gap-4" : ""}>
        <div className="flex-1">
          <h3 className="font-serif text-base sm:text-lg font-bold leading-snug text-[#1A1A1A] group-hover:text-[#D01418] transition-colors">
            {article.headline}
          </h3>
          {!isFirst && article.source && (
            <p className="mt-2 font-sans text-xs text-[#A0A0A0]">{article.source}</p>
          )}
          {isFirst && article.dek && (
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#595959]">{article.dek}</p>
          )}
        </div>
        {isFirst && (
          <StoryImage imageUrl={article.heroImage} alt={article.headline} className="w-24 sm:w-28 aspect-[4/3] shrink-0"/>
        )}
      </div>
    </Link>
  );
}

export default function BusinessSection() {
  const sorted = getBusinessArticles();

  // Each article is used exactly once across these three slices — no repeats.
  const leadArticle = sorted[0];
  const leftArticles = sorted.slice(1, 3); // 2 stories
  const opEdArticles = sorted.slice(3, 7); // 4 stories

  if (!leadArticle) {
    return null; // no business articles yet — nothing to show
  }

  return (
    <section className="w-full bg-white text-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left column */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {leftArticles.map((article, i) => (
              <div key={article.slug}>
                <LeftStoryCard article={article} hasImage={i === 1} />
                {i < leftArticles.length - 1 && <Divider />}
              </div>
            ))}
          </div>

          {/* Center column — lead story */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <LeadStory article={leadArticle} />
          </div>

          {/* Right column — Op-Ed rail */}
          <div className="lg:col-span-4 order-3">
            <h2 className="font-sans text-lg font-bold tracking-wide text-[#1A1A1A] mb-4">BUSINESS</h2>
            {opEdArticles.map((article, i) => (
              <div key={article.slug}>
                <OpEdCard article={article} isFirst={i === 0} />
                {i < opEdArticles.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}