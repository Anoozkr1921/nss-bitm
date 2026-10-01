/**
 * LaunchExperience.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * NSS BIT MESRA — Cinematic Website Launch Overlay
 *
 * State machine:
 *   WELCOME → COUNTDOWN → BURST → LIVE → EXIT → (hidden)
 *
 * The existing website is rendered *underneath* at all times, ensuring
 * zero loading delay after the transition completes.
 *
 * To reset during development:
 *   localStorage.removeItem("nss-launch-experienced");
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "./LaunchExperience.css";
import { LAUNCH_CONFIG } from "./launchConfig.js";
import NSSEmblemSVG from "./NSSEmblemSVG.jsx";

/* ─── Phase constants ────────────────────────────────────────────────────── */
const PHASE = Object.freeze({
  WELCOME:   "WELCOME",
  COUNTDOWN: "COUNTDOWN",
  BURST:     "BURST",
  LIVE:      "LIVE",
  EXIT:      "EXIT",
  DONE:      "DONE",
});

/* ─── Timing constants (ms) ─────────────────────────────────────────────── */
const T = Object.freeze({
  WELCOME_EXIT:   260,  // fade-out of welcome content
  COUNT_REVEAL:    60,  // brief pause before first number appears
  COUNT_HOLD:    1000,  // each number holds for ~1s
  COUNT_EXIT:     400,  // exit animation duration
  COUNT_GAP:       80,  // gap between exit finish and next number enter
  ONE_GLOW:       300,  // extra dramatic hold on "1"
  BURST:          520,  // burst animation
  LOGO_DELAY:     160,  // logo starts appearing mid-burst
  LOGO_DUR:       550,
  LIVE_DELAY:     320,  // "WE ARE LIVE" starts after logo begins
  LIVE_HOLD:     1050,  // how long WE ARE LIVE is visible before exit starts
  EXIT_DUR:      1300,  // cinematic overlay exit
});

/* ─── Particles data ─────────────────────────────────────────────────────── */
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 2.5,
    opacity: 0.08 + Math.random() * 0.18,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    dx: (Math.random() - 0.5) * 60,
    dy: (Math.random() - 0.5) * 60,
  }));
}

/* ─── Burst ray data ─────────────────────────────────────────────────────── */
function generateRays(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i * 360) / count,
    length: 80 + Math.random() * 120,
    opacity: 0.3 + Math.random() * 0.45,
  }));
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOOK — controls whether the launch experience should be shown
   ═══════════════════════════════════════════════════════════════════════════ */
function useShouldShowLaunch() {
  return useMemo(() => {
    if (!LAUNCH_CONFIG.enabled) return false;
    if (LAUNCH_CONFIG.showEveryVisit) return true;
    try {
      return !localStorage.getItem(LAUNCH_CONFIG.storageKey);
    } catch {
      return true; // privacy mode / no localStorage → show
    }
  }, []);
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUBCOMPONENT — FloatingParticles
   ═══════════════════════════════════════════════════════════════════════════ */
function FloatingParticles({ particles, bursting = false }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#ffffff",
            "--p-opacity": p.opacity,
            "--p-dx": `${p.dx}px`,
            "--p-dy": `${p.dy}px`,
            "--pb-dx": `${(p.x > 50 ? 1 : -1) * (60 + Math.random() * 100)}px`,
            "--pb-dy": `${-(50 + Math.random() * 120)}px`,
            animation: bursting
              ? `le-particle-burst ${0.45 + Math.random() * 0.2}s cubic-bezier(0.16, 1, 0.3, 1) ${Math.random() * 0.15}s forwards`
              : `le-particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUBCOMPONENT — BurstEffect
   ═══════════════════════════════════════════════════════════════════════════ */
function BurstEffect({ rays }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {/* Central expanding circle */}
      <div
        className="le-burst-circle"
        style={{
          position: "absolute",
          width: "min(55vw, 55vh)",
          height: "min(55vw, 55vh)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(246,23,15,0.55) 0%, rgba(25,54,107,0.35) 45%, transparent 75%)",
        }}
      />

      {/* Outer softer ring */}
      <div
        className="le-burst-circle"
        style={{
          position: "absolute",
          width: "min(85vw, 85vh)",
          height: "min(85vw, 85vh)",
          borderRadius: "50%",
          background: "radial-gradient(circle, transparent 30%, rgba(246,23,15,0.15) 60%, transparent 80%)",
          animationDelay: "80ms",
        }}
      />

      {/* Rays */}
      {rays.map((ray) => (
        <div
          key={ray.id}
          style={{
            position: "absolute",
            width: 1.5,
            height: ray.length,
            background: `linear-gradient(to top, transparent, rgba(255,255,255,${ray.opacity}))`,
            transformOrigin: "bottom center",
            transform: `rotate(${ray.angle}deg) translateY(-28px)`,
            animation: `le-burst-ray 0.52s cubic-bezier(0.16, 1, 0.3, 1) ${ray.id * 8}ms forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUBCOMPONENT — CountdownNumber
   ═══════════════════════════════════════════════════════════════════════════ */
function CountdownNumber({ value, isExiting, isFinal }) {
  const cls = isExiting
    ? "le-num-exit"
    : isFinal
    ? "le-num-one-glow"
    : "le-num-enter";

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {/* Radial swell behind final number */}
      {isFinal && !isExiting && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "min(60vw, 60vh)",
            height: "min(60vw, 60vh)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(246,23,15,0.18) 0%, transparent 70%)",
            animation: "le-radial-swell 0.9s ease-out forwards",
          }}
        />
      )}

      <span
        className={cls}
        style={{
          fontSize: "clamp(120px, 18vw, 260px)",
          fontWeight: 900,
          lineHeight: 1,
          color: "#ffffff",
          letterSpacing: "-0.04em",
          fontFamily: `"Segoe UI", system-ui, -apple-system, sans-serif`,
          textShadow: isFinal
            ? "0 0 40px rgba(246,23,15,0.6), 0 0 80px rgba(246,23,15,0.3)"
            : "0 4px 40px rgba(255,255,255,0.15), 0 2px 60px rgba(25,54,107,0.5)",
          userSelect: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        {value}
      </span>

      {/* Small label */}
      <p
        aria-hidden="true"
        style={{
          margin: 0,
          fontSize: "clamp(10px, 1.6vw, 14px)",
          fontWeight: 600,
          letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}
      >
        THE WEBSITE GOES LIVE IN
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT — LaunchExperience
   ═══════════════════════════════════════════════════════════════════════════ */
export default function LaunchExperience() {
  const shouldShow = useShouldShowLaunch();
  const [phase, setPhase]           = useState(PHASE.WELCOME);
  const [countNum, setCountNum]     = useState(null);   // 3 | 2 | 1
  const [numExiting, setNumExiting] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [welcomeExiting, setWelcomeExiting] = useState(false);

  const timers = useRef([]);
  const particles = useRef(generateParticles(24));
  const rays      = useRef(generateRays(16));

  /* Cleanup helper */
  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const after = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => () => clearAll(), [clearAll]);

  /* ── Mark as experienced ─────────────────────────────────────────────── */
  const markExperienced = useCallback(() => {
    if (!LAUNCH_CONFIG.showEveryVisit) {
      try {
        localStorage.setItem(LAUNCH_CONFIG.storageKey, "1");
      } catch {
        /* privacy mode */
      }
    }
  }, []);

  /* ── Step 1: user clicks LAUNCH WEBSITE ─────────────────────────────── */
  const handleLaunch = useCallback(() => {
    if (btnDisabled) return;
    setBtnDisabled(true);
    setWelcomeExiting(true);

    let t = 0;

    /* 0 – 260ms: welcome fades out */
    t += T.WELCOME_EXIT + T.COUNT_REVEAL;
    after(() => {
      setPhase(PHASE.COUNTDOWN);
      setCountNum(3);
    }, t);

    /* 3 */
    t += T.COUNT_HOLD - T.COUNT_EXIT;
    after(() => setNumExiting(true), t);

    t += T.COUNT_EXIT + T.COUNT_GAP;
    after(() => {
      setNumExiting(false);
      setCountNum(2);
    }, t);

    /* 2 */
    t += T.COUNT_HOLD - T.COUNT_EXIT;
    after(() => setNumExiting(true), t);

    t += T.COUNT_EXIT + T.COUNT_GAP;
    after(() => {
      setNumExiting(false);
      setCountNum(1);
    }, t);

    /* 1 — extra dramatic hold */
    t += T.COUNT_HOLD + T.ONE_GLOW - T.COUNT_EXIT;
    after(() => setNumExiting(true), t);

    /* micro pause then BURST */
    t += T.COUNT_EXIT + 120;
    after(() => {
      setPhase(PHASE.BURST);
      setCountNum(null);
      setNumExiting(false);
    }, t);

    /* LOGO */
    t += T.LOGO_DELAY;
    after(() => setPhase(PHASE.BURST), t); // still BURST during logo fade-in

    /* LIVE — triggered after burst completes */
    t += T.BURST - T.LOGO_DELAY + T.LIVE_DELAY;
    after(() => setPhase(PHASE.LIVE), t);

    /* HOLD then EXIT */
    t += T.LIVE_HOLD;
    after(() => {
      setPhase(PHASE.EXIT);
      markExperienced();
    }, t);

    /* DONE — remove overlay entirely */
    t += T.EXIT_DUR;
    after(() => setPhase(PHASE.DONE), t);
  }, [btnDisabled, after, markExperienced]);

  /* ── Keyboard: Enter / Space on button ──────────────────────────────── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleLaunch();
      }
    },
    [handleLaunch]
  );

  /* Don't render if not needed */
  if (!shouldShow || phase === PHASE.DONE) return null;

  const isBurst = phase === PHASE.BURST;
  const isLive  = phase === PHASE.LIVE;
  const isExit  = phase === PHASE.EXIT;
  const isPostBurst = isBurst || isLive || isExit;

  return (
    <div
      className={`le-overlay${isExit ? " le-overlay-exit-anim" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="NSS BIT Mesra website launch"
    >
      {/* ─── Background radial glow ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(25,54,107,0.22) 0%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* ─── Subtle background NSS emblem watermark ──────────────────────── */}
      <NSSEmblemSVG
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "min(55vw, 55vh)",
          height: "min(55vw, 55vh)",
          color: "rgba(25,54,107,0.08)",
          pointerEvents: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ─── Floating particles ───────────────────────────────────────────── */}
      <FloatingParticles
        particles={particles.current}
        bursting={isBurst}
      />

      {/* ══════════════════════════════════════════════════════════════════
          PHASE: WELCOME
         ══════════════════════════════════════════════════════════════════ */}
      {phase === PHASE.WELCOME && (
        <div
          className="le-welcome-enter"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(1.5rem, 5vw, 4rem)",
            gap: "clamp(1.2rem, 3vw, 2.2rem)",
            width: "100%",
            maxWidth: 680,
            opacity: welcomeExiting ? 0 : 1,
            filter: welcomeExiting ? "blur(5px)" : "none",
            transform: welcomeExiting ? "scale(0.97)" : "scale(1)",
            transition: welcomeExiting
              ? "opacity 0.26s ease-in, filter 0.26s ease-in, transform 0.26s ease-in"
              : "none",
          }}
        >
          {/* Logo */}
          <div className="le-logo-wrap">
            <img
              src="/logos/nss_logo.png"
              alt="NSS Logo"
              style={{
                height: "clamp(64px, 10vw, 96px)",
                width: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 0 18px rgba(246,23,15,0.35))",
              }}
            />
          </div>

          {/* NSS BIT MESRA heading */}
          <div>
            <p
              className="le-heading"
              style={{
                margin: 0,
                fontSize: "clamp(10px, 1.6vw, 13px)",
                fontWeight: 700,
                letterSpacing: "0.45em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              NATIONAL SERVICE SCHEME
            </p>
            <h1
              className="le-heading"
              style={{
                margin: 0,
                fontSize: "clamp(28px, 5.5vw, 56px)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "#ffffff",
                textTransform: "uppercase",
                lineHeight: 1.1,
                textShadow: "0 2px 30px rgba(246,23,15,0.3)",
                animationDelay: "0.1s",
              }}
            >
              NSS BIT MESRA
            </h1>
          </div>

          {/* Thin red separator */}
          <div
            aria-hidden="true"
            style={{
              width: "clamp(40px, 8vw, 64px)",
              height: 2,
              background: "linear-gradient(to right, transparent, #f6170f, transparent)",
              borderRadius: 2,
            }}
          />

          {/* Subtitle */}
          <div className="le-subtitle" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(18px, 3.2vw, 30px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.04em",
              }}
            >
              THE WAIT IS OVER.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(13px, 1.8vw, 16px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.06em",
                lineHeight: 1.7,
                maxWidth: 440,
              }}
            >
              A new digital experience for National Service Scheme, BIT Mesra
              is about to begin.
            </p>
          </div>

          {/* CTA button */}
          <div className="le-cta-wrap">
            <button
              type="button"
              onClick={handleLaunch}
              onKeyDown={handleKeyDown}
              disabled={btnDisabled}
              aria-label="Launch the NSS BIT Mesra website"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6em",
                padding: "clamp(12px, 2vw, 16px) clamp(28px, 4vw, 44px)",
                background: "transparent",
                color: "#ffffff",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: 3,
                fontSize: "clamp(11px, 1.5vw, 13px)",
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                cursor: btnDisabled ? "not-allowed" : "pointer",
                opacity: btnDisabled ? 0.4 : 1,
                transition: "border-color 0.25s, box-shadow 0.25s, transform 0.12s",
                outline: "none",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (btnDisabled) return;
                e.currentTarget.style.borderColor = "rgba(246,23,15,0.7)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(246,23,15,0.25), inset 0 0 16px rgba(246,23,15,0.06)";
                e.currentTarget.style.transform = "scale(1.03)";
                const arrow = e.currentTarget.querySelector(".le-arrow");
                if (arrow) arrow.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
                const arrow = e.currentTarget.querySelector(".le-arrow");
                if (arrow) arrow.style.transform = "translateX(0)";
              }}
              onMouseDown={(e) => {
                if (btnDisabled) return;
                e.currentTarget.style.transform = "scale(0.96)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid rgba(246,23,15,0.7)";
                e.currentTarget.style.outlineOffset = "3px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              LAUNCH WEBSITE
              <span
                className="le-arrow"
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  transition: "transform 0.2s ease",
                  marginLeft: 2,
                }}
              >
                →
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PHASE: COUNTDOWN
         ══════════════════════════════════════════════════════════════════ */}
      {phase === PHASE.COUNTDOWN && countNum !== null && (
        <CountdownNumber
          value={countNum}
          isExiting={numExiting}
          isFinal={countNum === 1 && !numExiting}
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PHASE: BURST
         ══════════════════════════════════════════════════════════════════ */}
      {isBurst && <BurstEffect rays={rays.current} />}

      {/* ══════════════════════════════════════════════════════════════════
          PHASE: BURST + LIVE + EXIT — Logo & "WE ARE LIVE"
         ══════════════════════════════════════════════════════════════════ */}
      {isPostBurst && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1rem, 2.5vw, 1.8rem)",
            textAlign: "center",
            padding: "clamp(1.5rem, 5vw, 3rem)",
            position: "absolute",
            inset: 0,
          }}
        >
          {/* NSS Logo reveal */}
          <div className={isBurst ? "le-logo-reveal-anim" : ""}>
            <img
              src="/logos/nss_logo.png"
              alt="NSS BIT Mesra"
              style={{
                height: "clamp(72px, 11vw, 110px)",
                width: "auto",
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 24px rgba(246,23,15,0.5)) drop-shadow(0 0 48px rgba(246,23,15,0.25))",
              }}
            />
          </div>

          {/* WE ARE LIVE */}
          {(isLive || isExit) && (
            <>
              <h2
                className="le-live-anim"
                style={{
                  margin: 0,
                  fontSize: "clamp(32px, 6vw, 68px)",
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  textShadow:
                    "0 0 30px rgba(246,23,15,0.45), 0 4px 40px rgba(0,0,0,0.6)",
                }}
              >
                WE ARE LIVE
              </h2>

              <p
                className="le-live-sub-anim"
                style={{
                  margin: 0,
                  fontSize: "clamp(10px, 1.6vw, 13px)",
                  fontWeight: 700,
                  letterSpacing: "0.4em",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                }}
              >
                NSS BIT MESRA
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
