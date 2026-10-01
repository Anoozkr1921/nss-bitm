export const SITE_CONFIG = {
  name: "NSS BIT Mesra",
  fullTitle: "NSS BIT Mesra — National Service Scheme, BIT Mesra",
  description:
    "Official website of NSS BIT Mesra (National Service Scheme, Birla Institute of Technology, Mesra, Ranchi). Student-led social outreach, community camps, blood donation drives, and volunteer initiatives in Jharkhand.",
  url: "https://nss.bitmesra.ac.in",
  locale: "en_IN",
  ogImage: "https://nss.bitmesra.ac.in/og-image.webp",
  twitterHandle: "@nssbitmesra",
  keywords: [
    // Primary exact-match terms
    "NSS BIT Mesra",
    "NSS BITM",
    "nss bitmesra",
    "NSS Bit Mesra",
    "nss bit mesra website",
    // Full-form variants
    "National Service Scheme BIT Mesra",
    "National Service Scheme Birla Institute of Technology Mesra",
    "NSS BIT Mesra Ranchi",
    "NSS BIT Mesra Jharkhand",
    // Institution variants
    "BIT Mesra NSS",
    "Birla Institute of Technology Mesra NSS",
    "BITM NSS",
    "BIT Mesra student volunteer",
    "BIT Mesra community service",
    // Activity-based searches
    "NSS blood donation camp Ranchi",
    "NSS BIT Mesra events",
    "NSS BIT Mesra camps",
    "NSS BIT Mesra volunteer",
    "NSS BIT Mesra activities",
    "NSS BIT Mesra notice",
    "NSS BIT Mesra team",
    "NSS Ranchi college",
    // Generic NSS
    "National Service Scheme",
    "NSS India",
    "student social service",
    "community outreach Ranchi",
    "social outreach Jharkhand",
    "student volunteer program India",
  ],
};

/**
 * Safely converts a relative or absolute path into an absolute URL.
 * Prevents double-prefixing and handles leading slashes.
 *
 * @param {string} pathOrUrl
 * @param {string} [baseUrl=SITE_CONFIG.url]
 * @returns {string}
 */
export function toAbsoluteUrl(pathOrUrl, baseUrl = SITE_CONFIG.url) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") {
    return baseUrl;
  }
  const trimmed = pathOrUrl.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const cleanPath = trimmed.replace(/^\/+/, "");
  return cleanPath ? `${cleanBase}/${cleanPath}` : cleanBase;
}

/**
 * Constructs an SEO metadata object for NSS BIT Mesra.
 * Fully compatible with React (React 19 document metadata, SPA) and standard metadata consumers.
 *
 * @param {Object} [params]
 * @param {string} [params.title]
 * @param {string} [params.description]
 * @param {string} [params.image]
 * @param {string} [params.canonicalUrl]
 * @param {"website" | "article"} [params.type]
 * @param {boolean} [params.noIndex]
 * @param {string[]} [params.keywords]
 * @param {Object} [params.icons]
 * @returns {Object} Metadata object
 */
export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonicalUrl,
  type = "website",
  noIndex = false,
  keywords = SITE_CONFIG.keywords,
  icons,
} = {}) {
  let pageTitle = SITE_CONFIG.fullTitle;
  if (title && typeof title === "string" && title.trim()) {
    const trimmedTitle = title.trim();
    if (
      trimmedTitle === SITE_CONFIG.name ||
      trimmedTitle === SITE_CONFIG.fullTitle
    ) {
      pageTitle = SITE_CONFIG.fullTitle;
    } else if (trimmedTitle.endsWith(`| ${SITE_CONFIG.name}`)) {
      pageTitle = trimmedTitle;
    } else {
      pageTitle = `${trimmedTitle} | ${SITE_CONFIG.name}`;
    }
  }

  const url = toAbsoluteUrl(canonicalUrl);
  const imageUrl = toAbsoluteUrl(image);
  const isDefaultOg = imageUrl === SITE_CONFIG.ogImage;

  return {
    title: pageTitle,
    description,
    keywords,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        isDefaultOg
          ? { url: imageUrl, width: 1774, height: 887, alt: pageTitle }
          : { url: imageUrl, alt: pageTitle },
      ],
      locale: SITE_CONFIG.locale || "en_IN",
      type,
    },
    twitter: {
      card: isDefaultOg ? "summary_large_image" : "summary",
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.twitterHandle,
    },
    icons: icons || {
      icon: "/logos/nss_logo.png",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    verification: {
      google: "xfIR7MTPpQtj0Yh_H8H02hF9RwJfXw-OVElGkqgHKNc",
    },
  };
}

/**
 * Returns JSON-LD structured data for NSS BIT Mesra (Organization + WebSite).
 * Semantically represents NSS as an Organization unit under Birla Institute of Technology, Mesra.
 *
 * @returns {Object} Schema.org @graph object
 */
export function getRootSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: [
          "National Service Scheme BIT Mesra",
          "NSS BITM",
          "NSS Birla Institute of Technology Mesra",
          "nss bitmesra",
        ],
        url: SITE_CONFIG.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_CONFIG.url}/logos/nss_logo.png`,
          width: 512,
          height: 512,
        },
        image: SITE_CONFIG.ogImage,
        description: SITE_CONFIG.description,
        foundingDate: "1969",
        email: "nss@bitmesra.ac.in",
        keywords: "NSS BIT Mesra, National Service Scheme, student volunteer, community service, Ranchi, Jharkhand",
        areaServed: {
          "@type": "State",
          name: "Jharkhand",
          containedInPlace: {
            "@type": "Country",
            name: "India",
          },
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "nss@bitmesra.ac.in",
          contactType: "general",
          areaServed: "IN",
          availableLanguage: "English",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "NSS Office, Sports Complex, BIT Mesra",
          addressLocality: "Ranchi",
          addressRegion: "Jharkhand",
          postalCode: "835215",
          addressCountry: "IN",
        },
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "Birla Institute of Technology, Mesra",
          alternateName: ["BIT Mesra", "BITM"],
          url: "https://www.bitmesra.ac.in/",
        },
        sameAs: [
          "https://www.instagram.com/nss_bitmesra/",
          "https://x.com/nssbitmesra",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        alternateName: "NSS BIT Mesra Official Website",
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_CONFIG.url}/events?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

/**
 * Returns JSON-LD FAQPage structured data for NSS BIT Mesra.
 * Helps Google show rich FAQ results for "nss bit mesra" searches.
 *
 * @returns {Object} Schema.org FAQPage object
 */
export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is NSS BIT Mesra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSS BIT Mesra is the National Service Scheme unit of Birla Institute of Technology, Mesra (BIT Mesra), Ranchi, Jharkhand. It is a student-led volunteer organization that conducts community service activities, social outreach camps, blood donation drives, environmental campaigns, and educational programs since 1969.",
        },
      },
      {
        "@type": "Question",
        name: "How can I join NSS BIT Mesra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students enrolled at BIT Mesra can join NSS BIT Mesra by contacting the NSS office at nss@bitmesra.ac.in or visiting the NSS office in the Sports Complex on campus during enrollment drives at the start of each academic year.",
        },
      },
      {
        "@type": "Question",
        name: "What activities does NSS BIT Mesra conduct?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSS BIT Mesra conducts a wide range of activities including blood donation camps, tree plantation drives, cleanliness campaigns (Swachh Bharat), health awareness camps, digital literacy programs, rural outreach, and special camps in nearby villages of Jharkhand.",
        },
      },
      {
        "@type": "Question",
        name: "Where is NSS BIT Mesra located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NSS BIT Mesra is located at the NSS Office, Sports Complex, Birla Institute of Technology, Mesra, Ranchi, Jharkhand - 835215, India.",
        },
      },
      {
        "@type": "Question",
        name: "What is the motto of NSS BIT Mesra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The motto of NSS BIT Mesra (and all NSS units in India) is 'Not Me, But You' — reflecting the spirit of selfless service and democratic living.",
        },
      },
    ],
  };
}

/**
 * Returns JSON-LD BreadcrumbList structured data.
 *
 * @param {Array<{ name?: string, label?: string, title?: string, item?: string, url?: string, href?: string, to?: string } | string>} [breadcrumbs]
 * @returns {Object} Schema.org BreadcrumbList object
 */

export function getBreadcrumbSchema(breadcrumbs = []) {
  const itemListElement = breadcrumbs.map((crumb, index) => {
    let name = "";
    let itemUrl = SITE_CONFIG.url;

    if (typeof crumb === "string") {
      name = crumb;
    } else if (crumb && typeof crumb === "object") {
      name = crumb.name || crumb.label || crumb.title || "";
      const path = crumb.item || crumb.url || crumb.href || crumb.to;
      if (path) {
        itemUrl = toAbsoluteUrl(path);
      }
    }

    return {
      "@type": "ListItem",
      position: index + 1,
      name,
      item: itemUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/**
 * Returns JSON-LD Event structured data.
 *
 * @param {Object} [event]
 * @param {string} [event.name]
 * @param {string} [event.title]
 * @param {string} [event.description]
 * @param {string} [event.detailedDescription]
 * @param {string} [event.date]
 * @param {string} [event.startDate]
 * @param {string} [event.endDate]
 * @param {string|Object} [event.location]
 * @param {string} [event.image]
 * @param {string} [event.url]
 * @returns {Object} Schema.org Event object
 */
export function getEventSchema(event = {}) {
  const eventName = event.name || event.title || "NSS BIT Mesra Event";
  const eventDescription =
    event.detailedDescription ||
    event.description ||
    `Event organized by ${SITE_CONFIG.name}`;

  const eventImage = toAbsoluteUrl(event.image || SITE_CONFIG.ogImage);

  let locationObj;
  if (typeof event.location === "object" && event.location !== null) {
    locationObj = event.location;
  } else {
    locationObj = {
      "@type": "Place",
      name: event.location || "BIT Mesra, Ranchi",
      address: {
        "@type": "PostalAddress",
        streetAddress: "BIT Mesra Campus",
        addressLocality: "Ranchi",
        addressRegion: "Jharkhand",
        postalCode: "835215",
        addressCountry: "IN",
      },
    };
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    description: eventDescription,
    image: eventImage ? [eventImage] : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: locationObj,
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  if (event.startDate) {
    schema.startDate = event.startDate;
  } else if (event.date) {
    schema.startDate = event.date;
  }

  if (event.endDate) {
    schema.endDate = event.endDate;
  }

  if (event.url) {
    schema.url = toAbsoluteUrl(event.url);
  }

  return schema;
}

/**
 * Imperatively updates the document title and standard meta/link tags in the browser DOM.
 * Updates existing tags without creating duplicates across SPA client route transitions.
 *
 * @param {Object} [params]
 */
export function updateDocumentMetadata(params = {}) {
  if (typeof document === "undefined") return;

  const meta = constructMetadata(params);

  // 1. Document title
  if (meta.title) {
    document.title = meta.title;
  }

  // 2. Helper to set/update <meta> tags by attribute (name or property)
  const setMetaTag = (attrName, attrValue, content) => {
    if (content === undefined || content === null) return;
    let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // Standard metadata
  setMetaTag("name", "description", meta.description);
  if (meta.keywords) {
    setMetaTag(
      "name",
      "keywords",
      Array.isArray(meta.keywords) ? meta.keywords.join(", ") : meta.keywords
    );
  }

  // Robots
  const robotsContent = meta.robots?.index
    ? "index, follow"
    : "noindex, nofollow";
  setMetaTag("name", "robots", robotsContent);

  // Open Graph
  setMetaTag("property", "og:title", meta.openGraph.title);
  setMetaTag("property", "og:description", meta.openGraph.description);
  setMetaTag("property", "og:url", meta.openGraph.url);
  setMetaTag("property", "og:site_name", meta.openGraph.siteName);
  setMetaTag("property", "og:type", meta.openGraph.type);
  setMetaTag("property", "og:locale", meta.openGraph.locale);
  if (meta.openGraph.images?.[0]?.url) {
    setMetaTag("property", "og:image", meta.openGraph.images[0].url);
  }

  // Twitter
  setMetaTag("name", "twitter:card", meta.twitter.card);
  setMetaTag("name", "twitter:title", meta.twitter.title);
  setMetaTag("name", "twitter:description", meta.twitter.description);
  if (meta.twitter.images?.[0]) {
    setMetaTag("name", "twitter:image", meta.twitter.images[0]);
  }
  if (meta.twitter.creator) {
    setMetaTag("name", "twitter:creator", meta.twitter.creator);
  }

  // Google site verification
  if (meta.verification?.google) {
    setMetaTag("name", "google-site-verification", meta.verification.google);
  }

  // Canonical link tag (<link rel="canonical" href="...">)
  const canonicalHref = meta.alternates?.canonical;
  if (canonicalHref) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalHref);
  }
}

export default {
  SITE_CONFIG,
  toAbsoluteUrl,
  constructMetadata,
  updateDocumentMetadata,
  getRootSchema,
  getFaqSchema,
  getBreadcrumbSchema,
  getEventSchema,
};
