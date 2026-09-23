import React from "react";
import teamData from "../data/TeamData";
import { FaLinkedin, FaInstagram, FaEnvelope, FaUser } from "react-icons/fa";
import SEO from "../components/SEO";
import { getBreadcrumbSchema } from "../lib/seo.js";

const TeamCard = ({ image, name, role, linkedin, instagram, email }) => {
  return (
    <div
      className="relative group bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] 
                 w-full max-w-[280px] h-[360px] mx-auto
                 flex flex-col items-center justify-start
                 pt-9 pb-6 px-6 text-center
                 border border-slate-100
                 transition-all duration-300
                 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10"
    >
      {/* NSS tricolor accent (top line) */}
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Soft patriotic glow on hover */}
      <span
        className="pointer-events-none absolute -inset-1 rounded-3xl
                   bg-gradient-to-r from-[#FF9933]/10 via-white/10 to-[#138808]/10
                   opacity-0 blur-lg transition-opacity duration-300
                   group-hover:opacity-100"
      />

      {/* Avatar */}
      <div className="w-36 h-36 rounded-full overflow-hidden 
                      border-4 border-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-10 bg-slate-50 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextSibling) {
                e.currentTarget.nextSibling.style.display = "flex";
              }
            }}
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center bg-[#f4f7fb] text-[#19366b] ${image ? "hidden" : ""}`}>
          <FaUser size={48} className="text-[#19366b]" />
        </div>
      </div>

      {/* Text */}
      <h3 className="mt-5 text-xl font-bold text-[#19366b] z-10 leading-snug">
        {name}
      </h3>
      <p className="mt-1 text-sm md:text-base font-medium text-[#19366b]/80 z-10">
        {role}
      </p>

      {/* Social Icons */}
      <div className="mt-3 flex items-center justify-center gap-3 z-10 min-h-[30px]">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A66C2] hover:scale-110 transition-transform"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E1306C] hover:scale-110 transition-transform"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-[#19366b] hover:text-[#FF9933] hover:scale-110 transition-transform"
            aria-label="Email"
          >
            <FaEnvelope size={22} />
          </a>
        )}
      </div>
    </div>
  );
};

const Teams = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      <SEO
        title="Our Team"
        description="Meet the student coordinators and faculty advisors leading NSS BIT Mesra."
        canonicalUrl="/teams"
        image="/teams/President.jpg"
        schema={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Teams", item: "/teams" },
        ])}
      />

      {/* Background Patriotic Mesh Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-0 pointer-events-none">
        {/* Saffron Blob (Top Left) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF9933]/10 blur-[120px]" />

        {/* Green Blob (Bottom Right) */}
        <div className="absolute bottom-[5%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#138808]/10 blur-[120px]" />

        {/* Blue Accent Blob (Middle Left) */}
        <div className="absolute top-[40%] left-[-5%] w-[30%] h-[30%] rounded-full bg-blue-700/5 blur-[100px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">

        {/* PRESIDENTIAL BODY */}
        <h2 className="text-4xl font-extrabold mb-14 text-center text-[#19366b] tracking-tight">
          PRESIDENTIAL BODY
        </h2>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 mb-32">
          {teamData.executive.map((m, i) => (
            <TeamCard
              key={i}
              image={m.image}
              name={m.name}
              role={m.role}
              linkedin={m.linkedin}
              instagram={m.instagram}
              email={m.email}
            />
          ))}
        </div>

        {/* SUB TEAMS */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-20" />

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#19366b] tracking-tight">
            Sub Teams
          </h2>
          {/* NSS Tricolor underline */}
          <div className="w-20 h-1 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#FF9933] via-slate-200 to-[#138808] shadow-sm" />
        </div>

        <div className="space-y-16">
          {teamData.teams.map((team, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Team Name Pill */}
              <div className="inline-flex items-center justify-center bg-white/90 border border-blue-200/80 shadow-sm px-8 py-2 md:px-10 md:py-2.5 rounded-full mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-[#19366b]">
                  {team.teamName}
                </h3>
              </div>

              {/* Team Cards */}
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 w-full max-w-5xl">
                {(team.incharges || team.assistantCoordinators || []).map((m, cIdx) => (
                  <TeamCard
                    key={cIdx}
                    image={m?.image}
                    name={m?.name}
                    role="Team Incharge"
                    linkedin={m?.linkedin}
                    instagram={m?.instagram}
                    email={m?.email}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
