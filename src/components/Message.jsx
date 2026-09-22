import { Link } from "react-router-dom";
import { notices } from "../data/notices";
import { events } from "../data/events";
const sortedNotices = [...notices].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
const latestNotices = sortedNotices.slice(0, 5);
const scrollNotices = [...latestNotices, ...latestNotices];
const latestEvents = [...events]
  .sort((a, b) => b.id - a.id)
  .slice(0, 6);

export default function Message() {
  return (
    <section id="notice" className="w-full bg-[#E0F7FA] py-10">
      <div className="w-full px-4">

        <div className="w-full overflow-hidden rounded-6px border border-slate-300 bg-[#E0F7FA] shadow-[0_10px_28px_rgba(0,0,0,0.18)]">

          <div className="flex items-center justify-between bg-[#19366b] px-3 py-3 sm:px-6">
            <div className="w-28 text-left text-[11px] font-semibold uppercase tracking-wide text-white leading-tight pr-2 sm:w-180px sm:text-sm sm:pr-4">
              RECENT
              <br />
              NOTICES
            </div>

            <div className="flex-1 overflow-hidden notice-ticker">
              <div className="ticker-track flex whitespace-nowrap animate-scroll-left text-[11px] font-semibold uppercase tracking-wide text-white sm:text-sm">
                {scrollNotices.map((item, index) => (
                  <span key={index} className="mx-4 flex-shrink-0 sm:mx-8">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="ml-2 text-right">
              <Link
                to="/notice"
                className="inline-block rounded-full bg-[#F6170F] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white hover:opacity-90 transition sm:px-4 sm:text-xs"
              >
                VIEW ALL <br /> NOTICES
              </Link>
            </div>
          </div>


          <div className="bg-[#E0F7FA] px-6 py-6">

            <div className="rounded-[14px] bg-[#E8E8E8] p-6 shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
              <div className="max-w-none text-[15px] leading-relaxed text-slate-800">
                <p className="mb-4">Dear NSS Family and Friends,</p>

                <p className="mb-4">
                  The National Service Scheme (NSS) at Birla Institute of
                  Technology, Mesra is a student-driven initiative committed to
                  community service and social development. Guided by the motto
                  “Not Me, But You,” NSS BIT Mesra encourages students to look
                  beyond academics and actively contribute to society. Through
                  awareness campaigns, social outreach, environmental
                  initiatives, health drives, and educational programs, our
                  volunteers work towards creating meaningful and lasting
                  impact. NSS serves as a platform for personal growth,
                  leadership development, and social responsibility, shaping
                  students into empathetic and proactive citizens dedicated to
                  nation-building.
                </p>

                <p className="mt-8">Warm Regards</p>
              </div>
            </div>


            <div className="mt-6 space-y-6">

              <div className="flex flex-col items-center gap-4 rounded-[14px] border-2 border-black bg-white p-6 text-center shadow-[0_8px_22px_rgba(0,0,0,0.20)] sm:flex-row sm:items-start sm:gap-5 sm:text-left">
                <img
                  src="/Manna.png"
                  alt="Prof. Indranil Manna"
                  className="h-92px w-92px rounded-full object-cover"
                  draggable="false"
                />
                <div className="min-w-0">
                  <h3 className="text-[18px] font-extrabold text-[#F6170F]">
                    Message from the Vice Chancellor (Prof. Indranil Manna)
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-800">
                    I extend my warm greetings to all members and supporters of
                    the National Service Scheme (NSS) at Birla Institute of
                    Technology, Mesra. NSS plays a vital role in fostering
                    social responsibility, compassion, and leadership among
                    students, creating a positive impact on society. I encourage
                    every student to actively participate in NSS activities to
                    serve the community while developing valuable life skills
                    and lasting friendships. I appreciate the dedication of all
                    NSS volunteers whose efforts make our institution a true
                    agent of change.
                  </p>
                </div>
              </div>


              <div className="flex flex-col items-center gap-4 rounded-[14px] border-2 border-black bg-white p-6 text-center shadow-[0_8px_22px_rgba(0,0,0,0.20)] sm:flex-row sm:items-start sm:gap-5 sm:text-left">
                <img
                  src="/Pandey.png"
                  alt="Dr. O.P. Pandey"
                  className="h-92px w-92px rounded-full object-cover"
                  draggable="false"
                />
                <div className="min-w-0">
                  <h3 className="text-[18px] font-extrabold text-[#F6170F]">
                    Message from the Program Coordinator (Dr. O.P. Pandey)
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-800">
                    Welcome to the NSS Cell of Birla Institute of Technology,
                    Mesra. NSS provides students a platform to serve society
                    while developing leadership, teamwork, and social
                    responsibility. I encourage you to actively participate and
                    contribute your skills to our initiatives. Thank you for
                    your commitment to NSS, and I look forward to our collective
                    efforts.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>


        <div className="mt-8 rounded-[14px] bg-[#E0F7FA] p-6 shadow-[0_6px_18px_rgba(0,0,0,0.12)] sm:p-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-[#19366b] sm:text-3xl">
              Recent Events
            </h2>
            <div className="h-[3px] w-20 bg-[#F6170F]" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-[#19366b] sm:text-lg">
                    {event.name}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
