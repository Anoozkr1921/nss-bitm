import { SITE_CONFIG } from "../src/lib/seo.js";

/**
 * Next.js MetadataRoute.Sitemap compatible generator.
 *
 * NOTE: For Vite + React SPAs, production search engines directly read the
 * static XML file at /sitemap.xml (located in public/sitemap.xml).
 *
 * @returns {Promise<Array<{ url: string, lastModified: string, changeFrequency: string, priority: number }>>}
 */
export default async function sitemap() {
  const base = SITE_CONFIG.url;
  const now = new Date().toISOString();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/notice`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/teams`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/schemes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
