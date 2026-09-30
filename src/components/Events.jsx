import { useState, useMemo } from "react";
import { events } from "../data/events";
import SEO from "./SEO";
import { getBreadcrumbSchema } from "../lib/seo.js";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  X,
  ChevronRight,
  Search
} from "lucide-react";

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

const inferCategory = (name) => {
  const lowercaseName = name.toLowerCase();
  if (/blood|health|medical|checkup/.test(lowercaseName)) {
    return "Health";
  }
  if (/tree|environment|swachh|clean|plantation/.test(lowercaseName)) {
    return "Environment";
  }
  if (/education|digital|literacy|teach|school/.test(lowercaseName)) {
    return "Education";
  }
  if (/food|distribution|community|village|clothes/.test(lowercaseName)) {
    return "Community";
  }
  return "Awareness";
};

const EventCard = ({ event, openModal, formatDate }) => {
  return (
    <div
      onClick={() => openModal(event)}
      className="group relative bg-white border border-[#19366b]/20 hover:-translate-y-[2px] hover:shadow-sm active:translate-y-0 active:shadow-none rounded-2xl overflow-hidden shadow-sm flex flex-col h-full cursor-pointer select-none transition-all duration-200 ease-out animate-fade-in"
    >
      

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-[#19366b] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {event.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-zinc-400 mb-3.5">
          <span className="flex items-center gap-1.5 bg-zinc-50 text-zinc-500 px-2.5 py-1 rounded-lg shadow-sm">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5 bg-zinc-50 text-zinc-500 px-2.5 py-1 rounded-lg shadow-sm max-w-[120px] sm:max-w-[150px] lg:max-w-[180px] truncate">
            <MapPin className="h-3.5 w-3.5" />
            {event.location}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#19366b] mb-3 leading-snug">
          {event.name}
        </h3>

        <p className="text-zinc-650 text-sm leading-relaxed mb-6 border-l-2 border-[#f6170f] pl-3 line-clamp-3">
          {event.description}
        </p>

        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-xs font-bold text-[#19366b] flex items-center gap-1 group-hover:underline underline-offset-4">
            View Details
          </span>
          
          <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-[#19366b] shadow-sm">
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Events() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    "All",
    "Health",
    "Environment",
    "Education",
    "Community",
    "Awareness"
  ];

  const enrichedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      category: inferCategory(event.name)
    }));
  }, []);

  const filteredEvents = useMemo(() => {
    return enrichedEvents
      .filter((event) => {
        const matchesCategory =
          activeCategory === "All" || event.category === activeCategory;

        const matchesQuery = event.name
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [enrichedEvents, search, activeCategory]);

  const openModal = (event) => {
    setActiveEvent(event);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 font-sans pb-24 text-zinc-800">
      <SEO
        title="Events & Camps"
        description="NSS BIT Mesra events, community camps, and volunteer drives."
        canonicalUrl="/events"
        image="/health.jpeg"
        schema={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Events", item: "/events" },
        ])}
      />
      <div className="relative w-full h-[35vh] sm:h-[45vh] lg:h-[50vh] min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] overflow-hidden flex items-center justify-center">
        <img
          src="/health.jpeg"
          alt="NSS Events"
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide uppercase mt-3.5 sm:mt-4 mb-3 sm:mb-4 drop-shadow-md">
            Events & Activities
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-200 font-medium max-w-2xl mx-auto leading-relaxed">
            Engage With Our Community Initiatives
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        <div className="mb-8">
          <div className="hidden sm:flex items-center justify-between gap-4">
            <div className="border border-[#D9DEE7] rounded-md bg-white w-64 flex items-center pl-3">
              <Search size={14} color="#9CA3AF" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events"
                className="flex-1 pl-3 pr-4 py-2.5 text-sm text-[#1F2937] bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex-1 flex border border-[#D9DEE7] rounded-md bg-white overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-1 text-center py-2.5 text-sm font-medium transition-colors border-r border-[#D9DEE7] last:border-r-0 cursor-pointer ${
                    activeCategory === category
                      ? "bg-[#F6170F] text-white"
                      : "text-[#374151] hover:bg-[#F65A57] hover:!text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex sm:hidden flex-col gap-3 relative">
            <div className="border border-[#D9DEE7] rounded-md bg-white w-full flex items-center pl-3">
              <Search size={14} color="#9CA3AF" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events"
                className="flex-1 pl-3 pr-4 py-2.5 text-sm text-[#1F2937] bg-transparent focus:outline-none"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-full px-4 py-2.5 text-sm font-medium border border-[#D9DEE7] rounded-md bg-white text-[#374151] flex justify-between items-center cursor-pointer"
              >
                <span>{activeCategory === "All" ? "Filter" : activeCategory}</span>
                <span className="text-[10px] text-[#6B7280]">▼</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-1 w-44 border border-[#D9DEE7] rounded-md bg-white shadow-md z-20">
                  <div className="py-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category);
                          setMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                          activeCategory === category
                            ? "bg-[#F6170F] text-white"
                            : "text-[#374151] hover:bg-[#F65A57] hover:!text-white"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1F2937]">
            {activeCategory === "All" ? "All Events" : activeCategory}
          </h2>
          <span className="text-sm text-[#6B7280]">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center text-[#6B7280] py-20">
            No events match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                openModal={openModal}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>

      {activeEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-6 transition-all animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-[95vw] sm:max-w-2xl md:max-w-3xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative animate-scale-up border border-zinc-200">
            <button
              onClick={() => setActiveEvent(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none cursor-pointer"
              title="Close modal"
            >
              <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </button>

            <div className="overflow-y-auto flex-grow scrollbar-thin">
              <div className="relative h-44 sm:h-64 md:h-80 w-full bg-zinc-100">
                <img
                  src={activeEvent.image}
                  alt={activeEvent.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="bg-[#f6170f] text-white text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {activeEvent.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-2 sm:mt-3 drop-shadow-md leading-tight">
                    {activeEvent.name}
                  </h2>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 bg-zinc-50 border border-zinc-150 p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-5 sm:mb-6 text-xs sm:text-sm text-zinc-700">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Calendar className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#f6170f] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Date</span>
                      <span className="font-semibold text-[#19366b]">{formatDate(activeEvent.date)}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Clock className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#f6170f] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Time</span>
                      <span className="font-semibold text-zinc-800">{activeEvent.time}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <MapPin className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#f6170f] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Location</span>
                      <span className="font-semibold text-zinc-800">{activeEvent.location}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <User className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#f6170f] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Coordinator</span>
                      <span className="font-semibold text-zinc-800">{activeEvent.coordinator}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#19366b] uppercase tracking-wider mb-2.5 sm:mb-3">
                    Event Overview
                  </h4>
                  <p className="text-zinc-650 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {activeEvent.detailedDescription || activeEvent.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}