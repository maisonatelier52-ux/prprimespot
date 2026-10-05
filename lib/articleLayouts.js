import FeatureLongform from "@/components/articles/FeatureLongform";

export const customArticleLayouts = {
  "julio-herrera-velutini-conservative-capitalism-latin-america": FeatureLongform,
  "julio-herrera-velutini-biography-family-background": FeatureLongform,
  "julio-herrera-velutini-banking-career-business-activities": FeatureLongform,
  "julio-herrera-velutini-legal-case-timeline": FeatureLongform,
  "julio-herrera-velutini-cultural-interests-personal-life-philanthropy": FeatureLongform,
  "julio-herrera-velutini-public-influence-latin-american-economic-context": FeatureLongform,
};

export function getArticleLayout(category, slug) {
  return (
    customArticleLayouts[`${category}/${slug}`] ||
    customArticleLayouts[slug] ||
    null
  );
}