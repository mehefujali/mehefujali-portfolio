import React from 'react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';

export default function Footer() {
    return (
        <footer className="w-full bg-black py-10 md:py-16 relative border-t border-slate-800">
            <div className="absolute inset-0 h-full w-full bg-grid-white/[0.03]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
                <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                    Mehefuj Ali
                </p>

                <nav className="flex space-x-6 mb-8">
                    <a href="#home" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 text-sm md:text-base">Home</a>
                    <a href="#about" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 text-sm md:text-base">About</a>
                    <a href="#skills" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 text-sm md:text-base">Skills</a>
                    <a href="#projects" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 text-sm md:text-base">Projects</a>
                    <a href="#experience" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 text-sm md:text-base">Experience</a>
                    {/* <a href="#contact" className="text-slate-400 hover:text-blue-500 transition-colors duration-300 text-sm md:text-base">Contact</a> */}
                </nav>

                <div className="flex space-x-6 mb-8">
                    <a
                        href="https://github.com/mehefujali"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-slate-400 hover:text-white transition-colors duration-300"
                    >
                        <IconBrandGithub size={24} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mehefujali"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-slate-400 hover:text-blue-600 transition-colors duration-300"
                    >
                        <IconBrandLinkedin size={24} />
                    </a>
                    <a
                        href="https://twitter.com/mehefujali"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X (Twitter)"
                        className="text-slate-400 hover:text-white transition-colors duration-300"
                    >
                        <IconBrandX size={24} />
                    </a>
                </div>

                <p className="text-sm text-slate-500 mt-4">
                    &copy; {new Date().getFullYear()} Mehefuj Ali. All rights reserved.
                </p>
            </div>
        </footer>
    );
}