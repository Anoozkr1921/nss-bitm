import { useEffect, useState, useRef } from "react";

export default function SecretSignature() {
  const [isOpen, setIsOpen] = useState(false);
  const keySequenceRef = useRef("");
  const hasLoggedRef = useRef(false);

  useEffect(() => {
    // 1. Log signature to DevTools console on initial load (only once)
    if (!hasLoggedRef.current) {
      hasLoggedRef.current = true;
      console.log(
        "%c Made with ❤️ by Kushaagra Bhaiya and Erevos Team %c NSS BIT Mesra ",
        "background: #19366B; color: #ffffff; font-size: 13px; font-weight: bold; padding: 6px 12px; border-radius: 4px 0 0 4px; border-left: 4px solid #F6170F;",
        "background: #F6170F; color: #ffffff; font-size: 13px; font-weight: bold; padding: 6px 12px; border-radius: 0 4px 4px 0;"
      );
    }

    // 2. Add secret DOM attributes to root element
    document.documentElement.setAttribute(
      "data-crafted-by",
      "Kushaagra Bhaiya and Erevos Team"
    );
    document.documentElement.setAttribute("data-tech-team", "NSS BIT Mesra");

    // 3. Secret Keyboard Sequence Listener (triggers only on typing 'erevos' or 'kushaagra')
    const handleKeyDown = (e) => {
      // Don't trigger when user is typing inside text inputs or editable elements
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      // Close modal on Escape key
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      // Sequence buffer for typing 'erevos' or 'kushaagra'
      if (e.key.length === 1) {
        keySequenceRef.current = (keySequenceRef.current + e.key.toLowerCase()).slice(-15);
        if (
          keySequenceRef.current.includes("erevos") ||
          keySequenceRef.current.includes("kushaagra")
        ) {
          setIsOpen(true);
          keySequenceRef.current = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-[#19366B] border border-white/20 text-white rounded-2xl p-8 shadow-2xl overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F6170F]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-xl p-2 transition-colors"
          aria-label="Close signature modal"
        >
          ✕
        </button>

        {/* NSS Logo Emblem */}
        <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center p-3 border border-white/15">
          <img src="/logos/nss_logo.png" alt="NSS Logo" className="h-full w-auto object-contain" />
        </div>

        <p className="text-[#F6170F] text-xs font-bold tracking-[0.3em] uppercase mb-1">
          NSS BIT MESRA • TECH TEAM
        </p>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
          Developer Signature
        </h3>

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#F6170F] to-transparent mx-auto mb-4" />

        <p className="text-white/90 text-base sm:text-lg font-medium leading-relaxed mb-6">
          Made with <span className="text-[#F6170F] text-xl animate-pulse inline-block">❤️</span> by <br />
          <strong className="text-white font-bold">Kushaagra Bhaiya</strong> & <strong className="text-white font-bold">Erevos Team</strong>
        </p>

        <p className="text-white/40 text-xs tracking-wider uppercase">
          Secret Developer Signature • NSS BIT Mesra
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close developer signature"
          className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#F6170F] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#d6130c] transition-colors shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
