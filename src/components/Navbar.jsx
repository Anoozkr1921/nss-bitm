import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
function NavItem({ label, to, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "w-full sm:flex-1",
          "text-center",
          "block",
          "px-4 py-3 sm:px-6",
          "text-white",
          "text-[12px] sm:text-sm font-semibold uppercase",
          "transition-colors duration-200 ease-out",
          "hover:text-white",
          "hover:bg-[#F65A57]",
          isActive ? "bg-[#F6170F]" : "",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "Notice", to: "/notice" },
      { label: "Events", to: "/events" },
      { label: "Government Schemes", to: "/schemes" },
      { label: "Teams", to: "/teams" },
      { label: "About Us", to: "/about" },
    ],
    []
  );

  return (
      <div className="w-full px-0 pt-0">
        <div className="w-full overflow-hidden bg-white ring-1 ring-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.10)]">

          
          <div className="bg-white px-4 py-4 sm:px-10 sm:py-6">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-3 sm:gap-6">
              <img src="/logos/bit_mesra.png" className="h-10 sm:h-20 w-auto object-contain" />
              <img src="/logos/mybharat-logo 1.png" className="h-9 sm:h-16 w-auto object-contain" />
              <img src="/logos/yas-logo 1.png" className="h-9 sm:h-16 w-auto object-contain" />
              <img src="/logos/digital-india 1.png" className="h-8 sm:h-14 w-auto object-contain" />
              <img src="/logos/nss_logo.png" className="h-10 sm:h-20 w-auto object-contain" />
            </div>
          </div>

          
          <div className="relative w-full bg-[#19366b]">
            <div className="flex items-center justify-between px-4 py-3 sm:hidden">
              <span className="text-sm font-semibold uppercase tracking-wide text-white">
                Menu
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-white/40 p-2 text-white hover:bg-white/10"
                aria-label="Toggle navigation"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isOpen ? (
                    <path d="M6 6l12 12M18 6l-12 12" />
                  ) : (
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  )}
                </svg>
              </button>
            </div>

            <nav className="hidden items-center justify-between sm:flex">
              {nav.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </nav>

            {isOpen && (
              <nav className="flex flex-col border-t border-white/20 sm:hidden">
                {nav.map((item) => (
                  <NavItem
                    key={item.label}
                    {...item}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </nav>
            )}
          </div>

        </div>
      </div>
  );
}
