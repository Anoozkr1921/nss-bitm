export default function Hero() {
    return (
        <section id="home" className="w-full">
            
            <div className="w-full bg-[#F6170F]" />

            <div className="relative w-full">
                
                <img
                    src="/BACKGROUND.webp"
                    alt="NSS BIT Mesra"
                    className="h-[300px] w-full object-cover sm:h-[450px]"
                    draggable="false"
                />

                
                <div className="absolute inset-0 bg-black/35" />

                
                <div className="absolute inset-0 flex items-start justify-center">
                    <div className="mt-14 text-center sm:mt-16">
                        <h1
                            className={[
                                "px-4",
                                "text-white",
                                "font-extrabold",
                                "tracking-[0.18em]",
                                "text-4xl sm:text-6xl md:text-7xl",
                            ].join(" ")}
                            style={{
                                fontFamily: `"Creato Display", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
                                textShadow:
                                    "0 2px 10px rgba(255,255,255,0.35), 0 8px 30px rgba(0,0,0,0.55)",
                            }}
                        >
                            NSS BIT MESRA
                        </h1>

                        <p
                            className={[
                                "mt-5",
                                "text-white",
                                "font-semibold sm:font-bold",
                                "tracking-[0.40em]",
                                "text-base sm:text-2xl md:text-3xl",
                            ].join(" ")}
                            style={{
                                fontFamily: `"Montserrat", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
                                textShadow: "0 2px 14px rgba(0,0,0,0.55)",
                            }}
                        >
                            NOT ME BUT YOU
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
