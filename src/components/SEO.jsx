import { useEffect } from "react";
import {
  SITE_CONFIG,
  constructMetadata,
  updateDocumentMetadata,
  getRootSchema,
} from "../lib/seo.js";

/**
 * Reusable SEO component for React 19 / Vite SPA.
 * Automatically hoists <title>, <meta>, <link>, and JSON-LD structured data into <head>,
 * and synchronizes DOM tags via updateDocumentMetadata during SPA route transitions.
 */
export default function SEO({
  title,
  description,
  image,
  canonicalUrl,
  type = "website",
  noIndex = false,
  keywords,
  schema,
}) {
  const meta = constructMetadata({
    title,
    description,
    image,
    canonicalUrl,
    type,
    noIndex,
    keywords,
  });

  // Synchronize document.title, canonical link, robots, OG, and Twitter tags in the DOM
  useEffect(() => {
    updateDocumentMetadata({
      title,
      description,
      image,
      canonicalUrl,
      type,
      noIndex,
      keywords,
    });
  }, [title, description, image, canonicalUrl, type, noIndex, keywords]);

  const jsonLdList = (() => {
    const s = schema || getRootSchema();
    return Array.isArray(s) ? s : [s];
  })();

  const ogImage = meta.openGraph.images?.[0];

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && (
        <meta
          name="keywords"
          content={
            Array.isArray(meta.keywords)
              ? meta.keywords.join(", ")
              : meta.keywords
          }
        />
      )}
      <link rel="canonical" href={meta.alternates.canonical} />
      <meta
        name="robots"
        content={meta.robots.index ? "index, follow" : "noindex, nofollow"}
      />

      {/* Open Graph */}
      <meta property="og:title" content={meta.openGraph.title} />
      <meta property="og:description" content={meta.openGraph.description} />
      <meta property="og:url" content={meta.openGraph.url} />
      <meta property="og:site_name" content={meta.openGraph.siteName} />
      <meta property="og:type" content={meta.openGraph.type} />
      <meta property="og:locale" content={meta.openGraph.locale} />
      {ogImage?.url && (
        <>
          <meta property="og:image" content={ogImage.url} />
          {ogImage.width && (
            <meta property="og:image:width" content={String(ogImage.width)} />
          )}
          {ogImage.height && (
            <meta property="og:image:height" content={String(ogImage.height)} />
          )}
          <meta property="og:image:type" content="image/png" />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={meta.twitter.card} />
      {SITE_CONFIG.twitterHandle && (
        <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      )}
      <meta name="twitter:title" content={meta.twitter.title} />
      <meta name="twitter:description" content={meta.twitter.description} />
      {meta.twitter.images?.[0] && (
        <meta name="twitter:image" content={meta.twitter.images[0]} />
      )}
      {meta.twitter.creator && (
        <meta name="twitter:creator" content={meta.twitter.creator} />
      )}

      {/* Structured Data (JSON-LD) — one <script> per schema */}
      {jsonLdList.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
    </>
  );
}

export { SEO, SITE_CONFIG };

