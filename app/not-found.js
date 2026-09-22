import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const CATEGORY_LINKS = [
  { href: "/business", label: "Business" },
  { href: "/finance", label: "Finance" },
  { href: "/world", label: "World" },
  { href: "/us", label: "U.S." },
  { href: "/politics", label: "Politics" },
  { href: "/sports", label: "Sports" },
];

export default function NotFound() {
  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-[#8A8A8A] mb-6">
          <Link href="/" className="hover:text-[#D01418] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">Page Not Found</span>
        </nav>

        {/* Header — centered hero block, same pattern as About/Contact/Privacy */}
        <div className="bg-[#F7F5EF] px-6 py-10 sm:px-8 sm:py-14 mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#D01418] px-6 py-3 shadow-sm">
            <h1 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
              404 — Page Not Found
            </h1>
          </div>
          <div className="h-[3px] w-16 bg-[#E8B23D] mt-2 mx-auto" />
          <p className="mt-4 max-w-xl font-serif text-base sm:text-lg leading-relaxed text-[#595959]">The page 
          you&apos;re looking for doesn&apos;t exist — it may have been moved, renamed, or the link may be out 
          of date. Try one of the sections below, or head back to the {SITE_NAME} homepage.</p>
        </div>

        {/* Primary action */}
        <div className="flex justify-center mb-12">
          <Link href="/" className="inline-block bg-[#D01418] px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#a80f12] transition-colors">
            Back to Homepage
          </Link>
        </div>

        {/* Category shortcuts */}
        <div className="border-t border-[#E5E5E5] pt-8">
          <h2 className="font-serif text-base font-bold text-[#1A1A1A] text-center mb-5">Or browse a section</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORY_LINKS.map((cat) => (
              <Link key={cat.href} href={cat.href} className="border border-[#E5E5E5] bg-white px-5 py-2 font-sans text-sm font-semibold text-[#1A1A1A] hover:border-[#D01418] hover:text-[#D01418] transition-colors">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}