"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconAward, IconCode, IconUsers } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const sectionRef = useRef(null);

    // GSAP Animation Effect for a smooth reveal
    useEffect(() => {
        const elements = gsap.utils.toArray(".about-reveal");
        gsap.fromTo(
            elements,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative w-full overflow-hidden bg-black py-20 md:py-32">
            {/* Background consistent with other sections */}
            <div className="absolute inset-0 h-full w-full bg-black bg-grid-white/[0.05]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">
                {/* Section Title */}
                <h2 className="about-reveal text-center text-4xl font-bold lg:text-5xl">
                    About <span className="brand-text">Me</span>
                </h2>

                {/* Main Content Card - Blends with the design */}
                <div className="about-reveal mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-md">
                    <div className="flex flex-col items-center gap-12 md:flex-row md:gap-8">

                        {/* Image with a new animated gradient border */}
                        <div className="relative w-64 flex-shrink-0 md:w-1/3">
                            <div className="absolute -inset-1.5 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a855f7_50%,#3b82f6_100%)]" />
                            <Image
                                src="/about-me.png"
                                alt="Mehefuj Ali"
                                height={400}
                                width={400}
                                className="relative z-10 h-full w-full rounded-full border-4 border-slate-900 object-cover"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="flex-grow space-y-4 text-left text-slate-300">
                            <h3 className="text-3xl font-bold text-white">
                                Hello! I&apos;m <span className="brand-text">Mehefuj Ali</span>
                            </h3>
                            <p className="leading-relaxed">
                                A passionate Full-Stack Developer from West Bengal, India. My expertise lies in building modern,
                                scalable, and responsive web applications. I am proficient in the entire MERN stack
                                and enjoy turning complex problems into clean, efficient, and elegant code.
                            </p>
                            <p className="leading-relaxed">
                                I thrive on challenges and am always eager to learn new technologies to create seamless digital experiences that provide an exceptional user experience.
                            </p>

                            {/* Key Strengths Section with Icons */}
                            <div className="flex flex-col space-y-3 pt-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                                <div className="flex items-center gap-3">
                                    <IconCode className="h-6 w-6 text-blue-400" />
                                    <span className="font-medium">Clean & Efficient Code</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IconAward className="h-6 w-6 text-purple-400" />
                                    <span className="font-medium">Problem Solving</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IconUsers className="h-6 w-6 text-blue-400" />
                                    <span className="font-medium">Team Collaboration</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;