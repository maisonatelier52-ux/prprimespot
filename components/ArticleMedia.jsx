// components/ArticleMedia.jsx
//
// Small image helpers shared by every article detail layout (the common
// ArticleDetail component and any custom per-slug layout in
// components/articles/). Kept separate so a custom layout doesn't need to
// duplicate the placeholder/fill logic to render a hero or thumbnail image.

import Image from "next/image";

export function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-[#EDEDED] text-[#A0A0A0] font-sans text-[11px] uppercase tracking-wide ${className}`}
      aria-label={`${label} image placeholder`}
    >
      {label}
    </div>
  );
}

export function ArticleImage({ imageUrl, alt, className = "", priority = false, sizes }) {
  if (!imageUrl) {
    return <ImagePlaceholder label={alt || "image"} className={className} />;
  }
  return (
    <div className={`relative overflow-hidden max-w-full ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes || "100vw"}
        className="object-cover"
      />
    </div>
  );
}
