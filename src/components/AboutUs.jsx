import { Link } from "react-router-dom";
import SEO from "./SEO";
import { getBreadcrumbSchema } from "../lib/seo.js";

export default function AboutUs() {
  return (
    <section id="about" className="w-full">
      <SEO
        title="About Us"
        description="Learn about NSS BIT Mesra — our mission, history, and student volunteers."
        canonicalUrl="/about"
        image="/aboutus/aboutus.jpeg"
        schema={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "About Us", item: "/about" },
        ])}
      />
      
      <div className="relative w-full h-[60vh] min-h-[450px] overflow-hidden">
        <img
          src="/aboutus/aboutus.jpeg"
          alt="NSS BIT Mesra"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
          draggable="false"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-widest uppercase">
            About Us
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white font-medium tracking-wide">
            National Service Scheme · BIT Mesra
          </p>
        </div>
      </div>

      <div className="w-full px-4 py-16 max-w-6xl mx-auto">
        
        <div className="mb-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h3 className="text-3xl font-bold text-[#19366b] mb-4">NSS at BIT Mesra</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            NSS BIT Mesra works with the objective of developing student youth into socially responsible citizens.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            The unit actively organizes community outreach programs, awareness campaigns, cleanliness drives, blood donation camps and rural development activities.
          </p>
        </div>

        
        <div className="mb-12 bg-[#f0f8ff] rounded-xl p-8 border-l-4 border-[#F6170F]">
          <h3 className="text-3xl font-bold text-[#19366b] mb-4">Motto of NSS</h3>
          <div className="text-center py-6">
            <p className="text-3xl font-bold text-[#F6170F] mb-2">“Not Me, But You”</p>
            <p className="text-gray-700 text-lg">
              This motto reflects the essence of democratic living and selfless service, encouraging students to prioritize community welfare over individual interests.
            </p>
          </div>
        </div>

        
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-[#19366b] mb-8 text-center">Vision & Mission</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h4 className="text-2xl font-bold text-[#19366b] mb-4 text-center">Vision</h4>
              <p className="text-gray-700 text-lg text-center">
                To build socially responsible and empathetic youth committed to the service of the nation.
              </p>
            </div>

            
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <h4 className="text-2xl font-bold text-[#19366b] mb-4 text-center">Mission</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
                  <span className="text-lg">To involve students in community service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
                  <span className="text-lg">To develop leadership qualities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
                  <span className="text-lg">To promote national integration and social harmony</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
                  <span className="text-lg">To encourage social awareness and civic responsibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        
        <div className="mb-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h3 className="text-3xl font-bold text-[#19366b] mb-6 text-center">Objectives of NSS</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start">
              <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
              <span className="text-gray-700 text-lg">Understand the community and its problems</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
              <span className="text-gray-700 text-lg">Develop social and civic responsibility</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
              <span className="text-gray-700 text-lg">Apply classroom knowledge to practical life situations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
              <span className="text-gray-700 text-lg">Develop leadership qualities</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
              <span className="text-gray-700 text-lg">Promote national integration</span>
            </li>
          </ul>
        </div>

        
        
        <div className="mb-12">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#D9DEE7]" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] shrink-0">
              Explore Our Domains
            </h3>
            <div className="h-px flex-1 bg-[#D9DEE7]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                name: "Education",
                id: "education",
                img: "/education.png",
                tagline: "Bridging knowledge gaps in rural communities",
              },
              {
                name: "Society",
                id: "society",
                img: "/society.jpeg",
                tagline: "Empowering people through outreach & awareness",
              },
              {
                name: "Environment",
                id: "environment",
                img: "/aboutus/environment.jpeg",
                tagline: "Preserving nature through sustainable action",
              },
              {
                name: "Health",
                id: "health",
                img: "/health.png",
                tagline: "Promoting wellbeing across communities",
              },
            ].map((domain) => (
              <Link
                key={domain.id}
                to={`/activity/${domain.id}`}
                className=" group relative overflow-hidden rounded-md border border-[#D9DEE7] bg-white block no-underline transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-sm hover:border-[#19366B]/40 active:translate-y-0 active:shadow-none"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={domain.img}
                    alt={domain.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  {/* Domain name badge overlay */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-3">
                    <span className="text-white font-extrabold text-2xl tracking-wide uppercase drop-shadow">
                      {domain.name}
                    </span>
                  </div>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-[#E6EAF0]">
                  <p className="text-sm text-[#4B5563] leading-snug">{domain.tagline}</p>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 ml-3 text-[#19366B]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}