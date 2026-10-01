/**
 * NSSEmblemSVG — A clean SVG representation of the NSS emblem silhouette
 * used only in the launch burst animation. The actual /logos/nss_logo.png
 * is used for the logo reveal scene.
 *
 * This is a stylised geometric abstraction of the NSS eight-line motif
 * that serves as a radial-burst focal point.
 */
export default function NSSEmblemSVG({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {/* Inner ring */}
      <circle
        cx="60"
        cy="60"
        r="42"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* 8 radial lines — NSS motif */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 60 + Math.cos(angle) * 20;
        const y1 = 60 + Math.sin(angle) * 20;
        const x2 = 60 + Math.cos(angle) * 50;
        const y2 = 60 + Math.sin(angle) * 50;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.7"
            strokeLinecap="round"
          />
        );
      })}

      {/* Centre dot */}
      <circle cx="60" cy="60" r="5" fill="currentColor" opacity="0.85" />

      {/* Decorative corner stars */}
      {[
        [60, 10],
        [110, 60],
        [60, 110],
        [10, 60],
      ].map(([cx, cy], i) => (
        <circle
          key={`star-${i}`}
          cx={cx}
          cy={cy}
          r="2.5"
          fill="currentColor"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}
