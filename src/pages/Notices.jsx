import { useMemo, useState } from "react";
import { notices } from "../data/notices";
import { Search, Bell, Calendar } from "lucide-react";
import SEO from "../components/SEO";
import { getBreadcrumbSchema } from "../lib/seo.js";

import NoticeTable from "../components/Notices/NoticeTable";

import {
  CATEGORIES,
  inferCategory,
  isUpcoming,
} from "../components/Notices/noticeUtils";

const enriched = notices.map((n) => ({
  ...n,
  category: inferCategory(n),
}));

const sortedAll = [...enriched].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export default function Notices() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    return sortedAll.filter((n) => {
      const matchCat =
        activeCategory === "All" ||
        n.category === activeCategory;

      const q = search.toLowerCase();

      const matchSearch =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const upcoming = filtered.filter((n) =>
    isUpcoming(n.date)
  );

  const past = filtered.filter(
    (n) => !isUpcoming(n.date)
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-sans">
      <SEO
        title="Notices"
        description="Official announcements, circulars, and notifications from NSS BIT Mesra."
        canonicalUrl="/notice"
        image="/notice.jpg"
        schema={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Notices", item: "/notice" },
        ])}
      />
      <div className="relative w-full h-[60vh] min-h-[450px] overflow-hidden">
        <img
          src="/notice.jpg"
          alt="Notices"
          className="absolute inset-0 w-full h-full object-cover object-[center_73%]"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-widest uppercase">
            Notice Board
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-white font-medium tracking-wide">
            Stay Updated With NSS BIT Mesra Announcements
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center border border-[#D9DEE7] rounded-md bg-white shrink-0 w-64">
            <Search
              size={14}
              className="ml-3 text-[#9CA3AF] shrink-0"
            />

            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 pl-3 pr-4 py-2.5 text-sm text-[#1F2937] bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex flex-1 border border-[#D9DEE7] rounded-md bg-white overflow-hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(cat)
                }
                className={`flex-1 py-2.5 text-sm font-medium text-center border-r border-[#D9DEE7] last:border-r-0 transition-colors ${
                  activeCategory === cat
                    ? "bg-[#F6170F] text-white"
                    : "text-[#374151] hover:bg-[#F65A57] hover:!text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex sm:hidden items-center border border-[#D9DEE7] rounded-md bg-white overflow-visible">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
            />

            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-9 pr-4 py-2.5 text-sm text-[#1F2937] bg-transparent focus:outline-none"
            />
          </div>

          <div className="w-px h-6 bg-[#D9DEE7] shrink-0" />

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() =>
                setMenuOpen((o) => !o)
              }
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-[#19366B] hover:bg-[#F8FAFC] transition-colors"
              aria-expanded={menuOpen}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6l-12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>

              <span className="text-xs">
                {activeCategory === "All"
                  ? "Filter"
                  : activeCategory}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 w-44 border border-[#D9DEE7] rounded-md bg-white shadow-md overflow-hidden z-20">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium border-b border-[#E6EAF0] last:border-b-0 transition-colors ${
                      activeCategory === cat
                        ? "bg-[#F6170F] text-white"
                        : "text-[#374151] hover:bg-[#F65A57] hover:!text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-[#1F2937]">
          {activeCategory === "All"
            ? "All Notices"
            : activeCategory}
        </h2>

        <span className="text-sm text-[#6B7280]">
          {filtered.length} notice
          {filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-20 space-y-10">
        {filtered.length === 0 && (
          <div className="text-center text-[#6B7280] py-20">
            No notices match your search.
          </div>
        )}

        {upcoming.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Bell
                size={15}
                className="text-[#F6170F]"
              />

              <h3 className="text-sm font-semibold text-[#19366B] border-b-2 border-[#F6170F] pb-0.5">
                Upcoming
              </h3>

              <span className="text-xs text-[#6B7280]">
                ({upcoming.length})
              </span>
            </div>

            <NoticeTable
              notices={upcoming}
              highlight
            />
          </section>
        )}

        {past.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar
                size={15}
                className="text-[#6B7280]"
              />

              <h3 className="text-sm font-semibold text-[#1F2937] border-b-2 border-[#D9DEE7] pb-0.5">
                Past Notices
              </h3>

              <span className="text-xs text-[#6B7280]">
                ({past.length})
              </span>
            </div>

            <NoticeTable notices={past} />
          </section>
        )}
      </div>
    </div>
  );
}