import articlesData from "../public/data/article.json";
import Image from "next/image";

const CATEGORY = "Finance";
const CATEGORY_SLUG = "finance";
const CATEGORY_HREF = `/${CATEGORY_SLUG}`;

function getFinanceArticles() {
  const posts = articlesData[CATEGORY_SLUG] || [];
  return [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function ImagePlaceholder({ label, className = "" }) {
  return (
    <div className={`flex items-center justify-center bg-[#EDEDED] text-[#A0A0A0] font-sans text-[11px] uppercase tracking-wide ${className}`} aria-label={`${label} image placeholder`}>
      {label}
    </div>
  );
}

// Sizing classes go on the outer wrapper; the <img> just fills it.
function StoryImage({ imageUrl, alt, className = "" }) {
  if (!imageUrl) {
    return <ImagePlaceholder label={alt || "image"} className={className} />;
  }
  return (
        <div className={`relative overflow-hidden max-w-full ${className}`}>
            <Image src={imageUrl} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
    </div>
  );
}

function ArrowBadge() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D01418]" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Divider() {
  return <hr className="border-t border-[#E5E5E5] my-5" />;
}

function MainStory({ article }) {
  const href = `/${CATEGORY_SLUG}/${article.slug}`;
  return (
    <a href={href} className="group block">
      <StoryImage imageUrl={article.heroImage} alt={article.headline} className="w-full aspect-[16/10] mb-4"/>
      <h3 className="font-serif text-2xl font-bold leading-snug text-[#1A1A1A] group-hover:text-[#D01418] transition-colors break-words">
        {article.headline}
      </h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-[#595959] break-words">
        {article.dek}
      </p>
    </a>
  );
}

function SecondaryStory({ article }) {
  const href = `/${CATEGORY_SLUG}/${article.slug}`;
  return (
    <a href={href} className="group block">
      <StoryImage imageUrl={article.heroImage} alt={article.headline} className="w-full aspect-[16/9] sm:w-72 sm:aspect-auto sm:h-36 mb-3"/>
      <h3 className="font-serif text-lg font-bold leading-snug text-[#1A1A1A] group-hover:text-[#D01418] transition-colors break-words">
        {article.headline}
      </h3>
    </a>
  );
}

function TextStory({ article }) {
  const href = `/${CATEGORY_SLUG}/${article.slug}`;
  return (
    <a href={href} className="group block">
      <h3 className="font-serif text-lg font-bold leading-snug text-[#1A1A1A] group-hover:text-[#D01418] transition-colors break-words">
        {article.headline}
      </h3>
      {article.dek && (
        <p className="mt-2 font-sans text-sm leading-relaxed text-[#595959] break-words">
          {article.dek}
        </p>
      )}
    </a>
  );
}

export default function FinanceSection() {
  const sorted = getFinanceArticles();

  // Each article used exactly once across these three slices — no repeats.
  const mainArticle = sorted[0];
  const secondaryArticles = sorted.slice(1, 3); // 2 stories
  const textArticles = sorted.slice(3, 5); // 3 stories

  if (!mainArticle) {
    return null; // no finance articles yet — nothing to show
  }

  return (
    <section className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 border-t-2 border-[#E5E5E5]">
        <a href={CATEGORY_HREF} className="group inline-flex items-center gap-2 mb-6 mt-8">
          <h2 className="font-sans text-xl font-extrabold uppercase tracking-wide text-[#1A1A1A]">{CATEGORY}</h2>
          <ArrowBadge />
        </a>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left — main story */}
          <div className="lg:col-span-5">
            <MainStory article={mainArticle} />
          </div>

          {/* Center — two secondary stories */}
          <div className="lg:col-span-4">
            {secondaryArticles.map((article, i) => (
              <div key={article.slug}>
                <SecondaryStory article={article} />
                {i < secondaryArticles.length - 1 && <Divider />}
              </div>
            ))}
          </div>

          {/* Right — text-only stories */}
          <div className="lg:col-span-3">
            {textArticles.map((article, i) => (
              <div key={article.slug}>
                <TextStory article={article} />
                {i < textArticles.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}