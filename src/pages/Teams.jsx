import React from "react";
import teamData from "../data/TeamData";
import { FaLinkedin, FaInstagram, FaEnvelope, FaUser } from "react-icons/fa";
import SEO from "../components/SEO";
import { getBreadcrumbSchema } from "../lib/seo.js";

const TeamCard = ({ image, name, role, linkedin, instagram, email }) => {
  return (
    <div
      className="relative group bg-white rounded-3xl shadow-lg 
                 w-full max-w-[280px] h-[360px] mx-auto
                 flex flex-col items-center justify-start
                 pt-10 pb-6 px-6 text-center
                 transition-all duration-300
                 hover:-translate-y-2 hover:shadow-2xl"
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
      <div className="w-40 h-40 rounded-full overflow-hidden 
                      border-4 border-white shadow-md z-10 bg-slate-100 flex items-center justify-center">
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
        <div className={`w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 ${image ? "hidden" : ""}`}>
          <FaUser size={56} />
        </div>
      </div>

      {/* Text */}
      <h3 className="mt-6 text-xl font-bold text-gray-900 z-10">
        {name}
      </h3>
      <p className="text-base text-gray-500 z-10">
        {role}
      </p>

      {/* Social Icons (HOVER ONLY) */}
      <div
        className="mt-5 flex gap-4 z-10
                   opacity-0 translate-y-2
                   transition-all duration-300
                   group-hover:opacity-100 group-hover:translate-y-0"
      >
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#0A66C2] transition-colors"
          >
            <FaLinkedin size={22} />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#E1306C] transition-colors"
          >
            <FaInstagram size={22} />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-gray-600 hover:text-gray-900 transition-colors"
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
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-24" />

        <h2 className="text-4xl font-extrabold mb-14 text-center text-[#19366b] tracking-tight">
          Sub Teams
        </h2>

        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.teams.map((team, idx) => {
            const m = team.assistantCoordinators?.[0];
            return (
              <div key={idx} className="flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-8 text-[#19366b] text-center bg-white/50 px-4 py-1 rounded-full border border-blue-900/10 shadow-sm">
                  {team.teamName}
                </h3>

                <TeamCard
                  image={m?.image}
                  name={m?.name}
                  role="Assistant Coordinator"
                  linkedin={m?.linkedin}
                  instagram={m?.instagram}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Teams;
