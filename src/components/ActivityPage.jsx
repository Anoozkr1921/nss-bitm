import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { activities } from '../data/activities';
import SEO from './SEO';
import { getBreadcrumbSchema } from '../lib/seo.js';

export default function ActivityPage() {
    const { domainId } = useParams();
    const activityData = activities[domainId];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [domainId]);

    if (!activityData) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-700">Activity not found</h1>
            </div>
        );
    }

    const { title, subHeading, heroTitle, content, keyActivities } = activityData;

    return (
        <div className="w-full flex flex-col min-h-screen">
            <SEO
                title={heroTitle || title}
                description={content?.[0] || `${title} activities by NSS BIT Mesra — community service and social outreach.`}
                canonicalUrl={`/activity/${domainId}`}
                image={activityData.image}
                schema={getBreadcrumbSchema([
                    { name: "Home", item: "/" },
                    { name: "About Us", item: "/about" },
                    { name: title, item: `/activity/${domainId}` },
                ])}
            />

            
            <section className="w-full relative">
                <div className="h-[4px] w-full bg-[#F6170F]" />
                <div className="relative w-full">
                    <img
                        src={activityData.image || "/BACKGROUND.webp"}
                        alt={title}
                        className="h-[420px] w-full object-cover sm:h-[520px]"
                        draggable="false"
                    />
                    <div className="absolute inset-0 bg-black/45" /> 

                    <div className="absolute inset-0 flex items-start justify-center">
                        <div className="mt-14 text-center sm:mt-16 px-4">
                            <h1
                                className={["px-4", "text-white", "font-extrabold", "tracking-[0.10em]", "text-3xl sm:text-5xl md:text-6xl", "uppercase"].join(" ")}
                                style={{
                                    fontFamily: `"Creato Display", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
                                    textShadow: "0 2px 10px rgba(255,255,255,0.35), 0 8px 30px rgba(0,0,0,0.55)",
                                }}
                            >
                                {heroTitle || title}
                            </h1>

                            <p
                                className={["mt-5", "text-white", "font-semibold sm:font-bold", "tracking-[0.15em]", "text-base sm:text-xl md:text-2xl",].join(" ")}
                                style={{
                                    fontFamily: `"Montserrat", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
                                    textShadow: "0 2px 14px rgba(0,0,0,0.55)",
                                }}
                            >
                                {subHeading}
                            </p>
                        </div>
                    </div>
                    <div className="h-[4px] w-full bg-[#F6170F]" />
                </div>
            </section>

            
            <main className="flex-grow w-full px-4 py-16 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-[#19366b] mb-6 border-b-4 border-[#F6170F] inline-block pb-2">
                            {title}
                        </h2>
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            {content && content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    
                    <div className="lg:col-span-1">
                        <div className="bg-[#f0f8ff] rounded-xl p-8 border-l-4 border-[#19366b] shadow-sm sticky top-24">
                            <h3 className="text-2xl font-bold text-[#19366b] mb-6">Key Activities</h3>
                            <ul className="space-y-4">
                                {keyActivities && keyActivities.map((activity, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-[#F6170F] mr-3 mt-1 text-xl">•</span>
                                        <span className="text-gray-800 font-medium">{activity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
