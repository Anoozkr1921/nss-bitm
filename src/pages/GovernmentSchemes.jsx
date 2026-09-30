import { useMemo, useState } from "react";
import schemes from "../components/GovernmentSchemes/schemes";
import SchemeCard from "../components/GovernmentSchemes/SchemeCard";
import SEO from "../components/SEO";
import { getBreadcrumbSchema } from "../lib/seo.js";

function GovernmentSchemes() {
  const [activeButton, setActiveButton] = useState("Central");

  const filteredSchemes = useMemo(
    () => schemes.filter((scheme) => scheme.type === activeButton),
    [activeButton]
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-sans">
      <SEO
        title="Government Schemes"
        description="Government welfare schemes and community initiatives supported by NSS BIT Mesra."
        canonicalUrl="/schemes"
        image="/GovernmentSchemes_Img.png"
        schema={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Government Schemes", item: "/schemes" },
        ])}
      />
      <div className="relative w-full h-[60vh] min-h-[450px] overflow-hidden">

        
        <img
          src="/GovernmentSchemes_Img.png"
          alt="Government Schemes"
          className="absolute inset-0 w-full h-full object-cover"
        />

        
        <div className="absolute inset-0 bg-black/60" />

        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-widest">
            GOVERNMENT SCHEMES
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-white font-medium tracking-wide">
            Empowering Citizens Through Welfare Programs
          </p>

        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="inline-flex border border-[#D9DEE7] rounded-md overflow-hidden bg-white">
          <button
            onClick={() => setActiveButton("Central")}
            className={`
              px-6 py-2.5 text-sm font-medium
              ${
                activeButton === "Central"
                  ? "bg-[#F6170F] text-white"
                  : "text-[#374151] hover:bg-[#F1F5F9]"
              }
            `}
          >
            Central Government
          </button>

          <button
            onClick={() => setActiveButton("State")}
            className={`
              px-6 py-2.5 text-sm font-medium border-l border-[#D9DEE7]
              ${
                activeButton === "State"
                  ? "bg-[#F6170F] text-white"
                  : "text-[#374151] hover:bg-[#F1F5F9]"
              }
            `}
          >
            State Government
          </button>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1F2937]">
            {activeButton} Government Schemes
          </h2>
          <span className="text-sm text-[#6B7280]">
            Showing {filteredSchemes.length} schemes
          </span>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-16">
        {filteredSchemes.length === 0 ? (
          <div className="text-center text-[#6B7280] py-20">
            No schemes available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default GovernmentSchemes;