import { SITE_CONFIG } from "../src/lib/seo.js";

/**
 * Next.js MetadataRoute.Robots compatible generator.
 *
 * NOTE: For Vite + React SPAs, production search engines directly read the
 * static robots file at /robots.txt (located in public/robots.txt).
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
