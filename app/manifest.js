/**
 * Next.js MetadataRoute.Manifest compatible generator.
 *
 * NOTE: For Vite + React SPAs, browsers directly read the
 * static manifest at /manifest.json (located in public/manifest.json).
 */
export default function manifest() {
  return {
    name: "NSS BIT Mesra",
    short_name: "NSS BITM",
    description: "Official app for NSS BIT Mesra — student community service.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#19366B",
    icons: [
      {
        src: "/logos/nss_logo.png",
        sizes: "192x192 512x512",
        type: "image/png",
      },
    ],
  };
}
