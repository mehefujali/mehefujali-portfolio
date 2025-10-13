'use client';

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import React from "react";


export default function HeroSection() {
    return (
        <BackgroundBeamsWithCollision>
            <section id="hero" className="min-h-screen w-full rounded-md relative flex flex-col items-center justify-center antialiased">
                <div className="max-w-4xl mx-auto p-4 text-center">
                    <h1 className="relative z-10 text-6xl sm:text-7xl md:text-7xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans font-bold">
                        Mehefuj Ali
                    </h1>
                    <p></p>
                    <p className="text-neutral-200 max-w-2xl mx-auto my-4 text-base sm:text-lg md:text-xl relative z-10">
                        A passionate Full-Stack Developer skilled in creating responsive and scalable web applications with a commitment to writing clean, efficient code.
                    </p>
                    <div className="flex   items-center justify-center gap-4 mt-8">
                        <button className="relative inline-flex h-12 w-full sm:w-auto overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a855f7_50%,#3b82f6_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-nowrap text-white backdrop-blur-3xl">
                                Download Resume
                            </span>
                        </button>
                        <button className="inline-flex h-12 w-full sm:w-auto font-semibold animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            Hire Me
                        </button>
                    </div>
                </div>

            </section>
        </BackgroundBeamsWithCollision>
    );
}