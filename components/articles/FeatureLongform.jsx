import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import { ArticleImage } from "@/components/ArticleMedia";
import { formatDate } from "@/lib/articles";

const ACCENT = "#B53030";       // warm red — lighter than oxblood, still editorial
const ACCENT_DEEP = "#8C2020";  // darker red for panel headers
const GOLD = "#C9A227";         // site gold
const GOLD_SOFT = "#E3CD8A";    // light gold for hairlines and ornaments
const RULE = "#E4E1DA";
const RULE_SOFT = "#EFECE6";
const MUTED = "#6B6F76";
const FAINT = "#8A8A8A";
const PAPER = "#FAF8F4";
const PAPER_WARM = "#F5F1E8";
const CHIP = "#F3F0E9";
const QUOTE_BG = "#FDF8EE";     // warm ivory for pull quotes

function Ornament({ color = GOLD_SOFT, width = 28 }) {
  return (
    <span aria-hidden="true" className="inline-block align-middle" style={{ width, height: "1px", backgroundColor: color }}/>
  );
}

function EndMark() {
  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      <span aria-hidden="true" className="inline-block" style={{ height: 1, width: 48, backgroundColor: RULE }}/>
      <span aria-hidden="true" className="inline-block rotate-45" style={{ width: 7, height: 7, backgroundColor: GOLD }}/>
      <span aria-hidden="true" className="inline-block" style={{ height: 1, width: 48, backgroundColor: RULE }}/>
    </div>
  );
}

function Eyebrow({ children, color = ACCENT }) {
  return (
    <div className="flex items-center gap-3">
      <Ornament color={color} />
      <span className="font-sans text-[11px] uppercase tracking-[0.2em]" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

function AuthorAvatar({ src, name, size = 40 }) {
  if (!src) return null;
  return (
    <span
      className="inline-block shrink-0 rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 0 2px #FFFFFF, 0 0 0 3px ${GOLD_SOFT}`,
      }}
    >
      <ArticleImage imageUrl={src} alt={name || "Author"} className="w-full h-full object-cover" sizes={`${size}px`}/>
    </span>
  );
}

function DropCapParagraph({ text }) {
  if (!text) return null;
  const first = text.slice(0, 1);
  const rest = text.slice(1);
  return (
    <p className="font-serif text-[19px] leading-[1.85] text-[#16181D] break-words mb-7">
      <span
        className="float-left font-serif font-bold leading-[0.8] pr-3 pt-1 mr-1"
        style={{
          fontSize: "3.8rem",
          color: ACCENT,
          borderBottom: `2px solid ${GOLD_SOFT}`,
        }}
        aria-hidden="true"
      >
        {first}
      </span>
      {rest}
    </p>
  );
}

function PullQuote({ text, attribution }) {
  if (!text) return null;
  return (
    <figure
      className="relative my-14 -mx-2 sm:-mx-6 px-6 sm:px-10 py-10 rounded-sm overflow-hidden"
      style={{
        backgroundColor: QUOTE_BG,
        borderLeft: `4px solid ${ACCENT}`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute font-serif italic leading-none pointer-events-none select-none"
        style={{
          top: "-14px",
          right: "14px",
          fontSize: "9rem",
          color: GOLD_SOFT,
          opacity: 0.3,
        }}
      >
        &rdquo;
      </span>

      <blockquote
        className="relative font-serif italic text-[#16181D]"
        style={{
          fontSize: "clamp(22px, 2.2vw, 28px)",
          lineHeight: 1.4,
          letterSpacing: "-0.005em",
        }}
      >
        {text}
      </blockquote>

      {attribution && (
        <figcaption className="relative mt-6 flex items-center gap-3">
          <span aria-hidden="true" style={{ width: 40, height: 2, backgroundColor: GOLD }}/>
          <span className="font-sans text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
            {attribution}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

function SectionHeading({ text, index }) {
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const numeral = roman[index] || String(index + 1);
  return (
    <div className="mt-16 mb-6">
      <div className="flex items-start gap-3">
        <span
          className="font-serif italic shrink-0 pt-[10px]"
          style={{
            color: ACCENT,
            fontSize: "18px",
            minWidth: 28,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {numeral}.
        </span>
        <h2 className="font-serif text-[26px] sm:text-[30px] font-bold leading-[1.2] tracking-[-0.005em] text-[#16181D] break-words flex-1 min-w-0">
          {text}
        </h2>
      </div>
    </div>
  );
}

function FactRow({ fact, index }) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <div
      className="flex gap-3 py-3"
      style={{
        borderTop: index === 0 ? "none" : `1px solid ${RULE_SOFT}`,
      }}
    >
      <span className="font-serif italic text-[12px] pt-[3px] shrink-0" style={{ color: GOLD, minWidth: 18 }} aria-hidden="true">
        {n}
      </span>
      <div className="min-w-0">
        <dt className="font-sans text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: FAINT }}>
          {fact.label}
        </dt>
        <dd className="font-serif text-[15px] leading-snug text-[#16181D] break-words">
          {fact.value}
        </dd>
      </div>
    </div>
  );
}

function AtAGlanceCard({ facts }) {
  if (!facts || facts.length === 0) return null;
  return (
    <aside
      className="rounded-md overflow-hidden"
      style={{
        border: `1px solid ${RULE}`,
        boxShadow:
          "0 1px 2px rgba(22,24,29,0.04), 0 8px 24px rgba(22,24,29,0.05)",
      }}
    >
      <div className="relative px-5 py-4" style={{ backgroundColor: ACCENT_DEEP }}>
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 8px)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <span aria-hidden="true" className="inline-block" style={{ width: 24, height: 1, backgroundColor: GOLD_SOFT }}/>
          <h2 className="font-sans text-[11px] uppercase tracking-[0.22em] text-white">At a Glance</h2>
        </div>
      </div>

      <div style={{ backgroundColor: PAPER }}>
        <dl className="px-5">
          {facts.map((fact, i) => (
            <FactRow key={i} fact={fact} index={i} />
          ))}
        </dl>
        <span aria-hidden="true" className="block" style={{ height: 3, backgroundColor: GOLD }}/>
      </div>
    </aside>
  );
}

function TagsPanel({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div
      className="rounded-md p-5"
      style={{
        border: `1px solid ${RULE}`,
        backgroundColor: PAPER_WARM,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Ornament color={ACCENT} />
        <h2 className="font-sans text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Tags</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 font-sans text-[11px] uppercase tracking-[0.12em]"
            style={{
              backgroundColor: CHIP,
              color: ACCENT,
              border: `1px solid ${RULE}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SourcesCard({ sources }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-10 rounded-md p-5" style={{ border: `1px solid ${RULE}`, backgroundColor: PAPER }}>
      <Eyebrow>Sources &amp; Further Reading</Eyebrow>
      <ul className="mt-4 space-y-2">
        {sources.map((source, i) => (
          <li key={source.url} className="font-sans text-[13px] leading-relaxed flex gap-3">
            <span className="font-serif italic text-[12px] shrink-0 pt-[2px]" style={{ color: GOLD }} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#D8D8D8] underline-offset-2 hover:text-[#16181D]"
              style={{ color: MUTED }}
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQSection({ faq }) {
  if (!faq || faq.length === 0) return null;
  return (
    <div className="mt-12">
      <Eyebrow>Frequently Asked Questions</Eyebrow>
      <div className="mt-5 rounded-md overflow-hidden" style={{ border: `1px solid ${RULE}` }}>
        {faq.map((item, i) => (
          <details
            key={i}
            className="group"
            style={{
              backgroundColor: i % 2 === 0 ? PAPER : "#FFFFFF",
              borderTop: i === 0 ? "none" : `1px solid ${RULE_SOFT}`,
            }}
          >
            <summary
              className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none"
            >
              <span className="flex items-start gap-3 min-w-0">
                <span
                  className="font-serif italic text-[12px] shrink-0 pt-[2px]"
                  style={{ color: GOLD }}
                  aria-hidden="true"
                >
                  Q{i + 1}
                </span>
                <span className="font-serif text-[16px] sm:text-[17px] leading-snug text-[#16181D] break-words">
                  {item.question}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 mt-1 font-sans text-[13px] transition-transform duration-200 group-open:rotate-45"
                style={{ color: ACCENT }}
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 pl-[42px]">
              <p className="font-sans text-[14px] leading-relaxed" style={{ color: MUTED }}>
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function AuthorBioCard({ article }) {
  if (!article.authorBio) return null;
  return (
    <div className="mt-12 rounded-md p-6" style={{ border: `1px solid ${RULE}`, backgroundColor: PAPER }}>
      <Eyebrow>About the Author</Eyebrow>
      <div className="mt-4 flex items-start gap-4">
        <AuthorAvatar src={article.authorImage} name={article.author} size={56}/>
        <div className="min-w-0">
          <p className="font-serif text-[17px] font-bold text-[#16181D]">
            {article.author}
          </p>
          <p className="mt-2 font-sans text-[13px] leading-relaxed" style={{ color: MUTED }}>
            {article.authorBio}
          </p>
        </div>
      </div>
    </div>
  );
}

function buildFallbackFacts(article, categoryLabel) {
  const facts = [];
  if (article.source) facts.push({ label: "Filed under", value: article.source });
  if (categoryLabel) facts.push({ label: "Section", value: categoryLabel });
  const published = formatDate(article.publishedAt);
  if (published) facts.push({ label: "Published", value: published });
  if (article.author) facts.push({ label: "Author", value: article.author });
  return facts;
}

export default function FeatureLongform({
  article,
  related, // kept in signature for API compatibility; not rendered
  categoryLabel,
  absoluteUrl,
}) {
  const publishedLabel = formatDate(article.publishedAt);
  const updatedLabel =
    article.updatedAt && article.updatedAt !== article.publishedAt
      ? formatDate(article.updatedAt)
      : null;

  const kicker = article.source ? article.source : "Feature";

  const firstBlockIsParagraph =
    Array.isArray(article.body) &&
    article.body.length > 0 &&
    article.body[0].type === "paragraph";

  const facts =
    Array.isArray(article.atAGlance) && article.atAGlance.length > 0
      ? article.atAGlance
      : buildFallbackFacts(article, categoryLabel);

  // Precompute each block's heading index and "is this the very first
  // paragraph" flag BEFORE any JSX is built, using reduce (no reassigned
  // `let` counters) so nothing is mutated anywhere in this render function
  // — what react-hooks/immutability (React Compiler's rule) requires.
  const bodyMeta = article.body.reduce((acc, block) => {
    const { list, headingIndex, paragraphIndex } = acc;
    if (block.type === "heading") {
      return {
        list: [...list, { headingIndex }],
        headingIndex: headingIndex + 1,
        paragraphIndex,
      };
    }
    if (block.type === "paragraph") {
      const nextParagraphIndex = paragraphIndex + 1;
      return {
        list: [
          ...list,
          { isFirstParagraph: firstBlockIsParagraph && nextParagraphIndex === 1 },
        ],
        headingIndex,
        paragraphIndex: nextParagraphIndex,
      };
    }
    return { list: [...list, {}], headingIndex, paragraphIndex };
  }, { list: [], headingIndex: 0, paragraphIndex: 0 }).list;

  return (
    <article className="pb-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-16">
          {/* ---------- MAIN COLUMN ---------- */}
          <main className="min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.14em] mt-8 pb-5" style={{ color: FAINT, borderBottom: `1px solid ${RULE}` }}>
              <Link href="/" className="hover:text-[#16181D] transition-colors">Home</Link>
              <span style={{ color: GOLD }}>/</span>
              <a href={`/${article.category}`} className="hover:text-[#16181D] transition-colors">
                {categoryLabel}
              </a>
            </nav>

            {/* Kicker badge */}
            <div className="mt-10">
              <span
                className="inline-flex items-center gap-3 rounded-full px-3 py-1"
                style={{
                  backgroundColor: PAPER_WARM,
                  border: `1px solid ${GOLD_SOFT}`,
                }}
              >
                <span aria-hidden="true" className="inline-block" style={{ width: 18, height: 1, backgroundColor: ACCENT }}/>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                  {kicker}
                </span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 font-serif text-[34px] sm:text-[46px] font-bold leading-[1.08] tracking-[-0.015em] text-[#16181D] break-words">
              {article.headline}
            </h1>

            {/* Dek */}
            {article.dek && (
              <p className="mt-5 font-serif text-[20px] leading-[1.55] text-[#4B4F58] break-words">
                {article.dek}
              </p>
            )}

            {/* Hero image */}
            {article.heroImage && (
              <figure className="mt-8">
                <div className="overflow-hidden rounded-sm" style={{ boxShadow: "0 1px 2px rgba(22,24,29,0.06)" }}>
                  <ArticleImage
                    imageUrl={article.heroImage}
                    alt={article.headline}
                    className="w-full aspect-[16/9]"
                    priority
                    sizes="(min-width: 1100px) 760px, 100vw"
                  />
                </div>
                {(article.heroCaption || article.heroCredit) && (
                  <figcaption className="mt-3 font-sans text-[12px] leading-relaxed" style={{ color: FAINT }}>
                    {article.heroCaption}
                    {article.heroCredit && (
                      <span style={{ color: "#B0B0B0" }}>
                        {" "}
                        — Credit: {article.heroCredit}
                      </span>
                    )}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Byline row */}
            <div className="mt-8 pt-6 pb-6 border-y flex items-center gap-3" style={{ borderColor: RULE }}>
              <AuthorAvatar src={article.authorImage} name={article.author} size={40}/>
              <div className="font-sans text-[13px] leading-tight min-w-0" style={{ color: MUTED }}>
                <div className="truncate">
                  By{" "}
                  {article.authorSlug ? (
                    <a href={`/authors/${article.authorSlug}`} className="font-semibold text-[#16181D] hover:opacity-70 transition-opacity">
                      {article.author}
                    </a>
                  ) : (
                    <span className="font-semibold text-[#16181D]">
                      {article.author}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[12px]" style={{ color: FAINT }}>
                  {publishedLabel && <>Published {publishedLabel}</>}
                  {updatedLabel && (
                    <>
                      {publishedLabel && (
                        <span style={{ color: GOLD }}> · </span>
                      )}
                      Updated {updatedLabel}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="mt-10">
              {article.body.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <SectionHeading key={i} text={block.text} index={bodyMeta[i].headingIndex} />
                  );
                }
                if (block.type === "subheading") {
                  return (
                    <h3 key={i} className="font-serif text-xl font-semibold text-[#16181D] mt-10 mb-3 break-words">
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <PullQuote key={i} text={block.text} attribution={block.attribution}/>
                  );
                }

                const isFirstParagraph = bodyMeta[i].isFirstParagraph;

                return (
                  <div key={i}>
                    {isFirstParagraph ? (
                      <DropCapParagraph text={block.text} />
                    ) : (
                      <p className="font-serif text-[19px] leading-[1.85] text-[#16181D] break-words mb-7">
                        {block.text}
                      </p>
                    )}
                  </div>
                );
              })}

              <EndMark />
            </div>

            <SourcesCard sources={article.sourceLinks} />

            <FAQSection faq={article.faq} />

            <div className="mt-8">
              <ShareButtons url={absoluteUrl} title={article.headline} />
            </div>

            <AuthorBioCard article={article} />
          </main>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="min-w-0 lg:pt-[104px]">
            <div className="lg:sticky lg:top-8 space-y-6">
              <AtAGlanceCard facts={facts} />
              <TagsPanel tags={article.tags} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}