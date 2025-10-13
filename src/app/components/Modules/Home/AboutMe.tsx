"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NameSvg from "./NameSvg";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Image animation
        gsap.fromTo(
            imageRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: true,
                },
            }
        );

        // Text animation
        gsap.fromTo(
            textRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: true,
                },
            }
        );
    }, []);

    return (
        <div className="w-full relative py-20 md:py-32" id="about">
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="w-full h-full blur-3xl bg-gradient-to-tr from-purple-900/50 via-blue-900/50 to-transparent"></div>
            </div>

            <div className="container mx-auto z-10 relative px-4">
                <h1 className="relative my-6 z-10 text-2xl text-center md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400 font-sans font-bold">
                    About Me
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto gap-8 md:gap-16 mt-12">

                    <div className="w-full md:w-1/3 about-image" ref={imageRef}>
                        <Image
                            src="/about-me.png"
                            alt="Mehefuj Ali"
                            height={400}
                            width={400}
                            className="rounded-lg shadow-blue-500/20 w-full h-auto"
                        />
                    </div>


                    <div className="max-w-lg space-y-4 text-neutral-300 text-left md:w-2/3 about-text" ref={textRef}>

                        <NameSvg />

                        <p>
                            A passionate Full-Stack Developer from West Bengal, India. My expertise lies in building modern,
                            scalable, and responsive web applications from scratch. I am proficient in the entire MERN stack
                            (MongoDB, Express.js, React.js, Node.js) and enjoy turning complex problems into clean, efficient,
                            and elegant code.
                        </p>
                        <p>
                            I thrive on challenges and am always eager to learn new technologies to enhance my skills. My goal
                            is to create seamless digital experiences that are not only functional but also provide an exceptional
                            user experience. Let&apos;s connect and build something amazing together!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
