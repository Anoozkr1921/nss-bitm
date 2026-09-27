/**
 * NSS BIT MESRA — Launch Experience Configuration
 * ─────────────────────────────────────────────────
 *
 * QUICK GUIDE
 * ───────────
 * enabled        : Set to false to skip the launch experience entirely.
 * showEveryVisit : true  → Show on EVERY page open (great for event day).
 *                  false → Show only on the user's first visit (uses localStorage).
 *
 * RESET DURING DEVELOPMENT
 * ─────────────────────────
 * Run this in the browser console to clear the "seen" flag and see the
 * launch experience again on next refresh:
 *
 *   localStorage.removeItem("nss-launch-experienced");
 *
 * Or set showEveryVisit: true during development.
 */

export const LAUNCH_CONFIG = {
  /** Master switch. false = skip the experience, go straight to the website. */
  enabled: false,

  /** true  → launch overlay appears on every visit.
   *  false → appears only once per browser (tracked via localStorage). */
  showEveryVisit: false,

  /** localStorage key used to track whether the user has already seen it. */
  storageKey: "nss-launch-experienced",
};
