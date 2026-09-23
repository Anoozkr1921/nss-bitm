/**
 * Reusable JSON-LD script component for React 19 / Vite SPA.
 * Automatically hoists structured data into document <head>.
 *
 * @param {Object} props
 * @param {Object|Array} props.data - Schema.org structured data object or array
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
