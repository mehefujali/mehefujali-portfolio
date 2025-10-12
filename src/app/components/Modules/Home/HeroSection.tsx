'use client';

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import React from "react";


export default function HeroSection() {
    return (
        <BackgroundBeamsWithCollision>
            <section id="hero" className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="relative z-10 text-5xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
                        Mehefuj Ali
                    </h1>
                    <p></p>
                    <p className="text-muted-foreground max-w-lg mx-auto my-4 text-lg text-center relative z-10">
                        Full-Stack Developer crafting seamless digital experiences with clean code and modern technologies. Future explorer in Artificial Intelligence & Machine Learning.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a855f7_50%,#3b82f6_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Download Resume
                            </span>
                        </button>
                        <button className="inline-flex h-12 font-semibold animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            Hire Me
                        </button>
                    </div>
                </div>

            </section>
        </BackgroundBeamsWithCollision>
    );
}