"use client";

import React from 'react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconArrowUp } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="w-full bg-black py-16 relative border-t border-slate-800 overflow-hidden">
            {/* Consistent background */}
            <div className="absolute inset-0 h-full w-full bg-grid-white/[0.03]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
                {/* Silver Gradient Name */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
                    Mehefuj Ali
                </h2>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
                    <a href="#home" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm md:text-base">Home</a>
                    <a href="#about" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm md:text-base">About</a>
                    <a href="#skills" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm md:text-base">Skills</a>
                    <a href="#projects" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm md:text-base">Projects</a>
                    <a href="#experience" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm md:text-base">Experience</a>
                    <a href="#contact" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm md:text-base">Contact</a>
                </nav>

                {/* Social Media Icons */}
                <div className="flex space-x-6 mb-8">
                    <motion.a whileHover={{ scale: 1.2, y: -2 }} href="https://github.com/mehefujali" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors duration-300">
                        <IconBrandGithub size={24} />
                    </motion.a>
                    <motion.a whileHover={{ scale: 1.2, y: -2 }} href="https://www.linkedin.com/in/mehefujali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-blue-500 transition-colors duration-300">
                        <IconBrandLinkedin size={24} />
                    </motion.a>
                    <motion.a whileHover={{ scale: 1.2, y: -2 }} href="https://twitter.com/mehefujali" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-slate-400 hover:text-white transition-colors duration-300">
                        <IconBrandX size={24} />
                    </motion.a>
                </div>

                {/* Copyright Text */}
                <p className="text-sm text-slate-500 mt-4">
                    &copy; {new Date().getFullYear()} Mehefuj Ali. All rights reserved.
                </p>
            </div>

            {/* Back to Top Button */}
            <div className="absolute bottom-8 right-8">
                <button
                    onClick={scrollToTop}
                    className="h-12 w-12 rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <IconArrowUp size={24} />
                </button>
            </div>
        </footer>
    );
}