'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const checkActive = () => {
            if (typeof window !== 'undefined') {
                setIsActive(window.location.hash === href || (href === "#hero" && window.location.hash === ""));
            }
        };
        window.addEventListener('hashchange', checkActive);
        checkActive();
        return () => window.removeEventListener('hashchange', checkActive);
    }, [href]);

    return (
        <a
            href={href}
            className={cn(
                "transition duration-300 px-4 py-2 rounded-lg text-base font-medium relative",
                "hover:text-white",
                isActive ? 'text-white font-semibold' : 'text-gray-400'
            )}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-white rounded-full transition-all duration-300"></span>
            )}
        </a>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 w-full z-[100] transition-all duration-300">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={cn(
                        "flex items-center justify-between h-20 mt-4 px-6 rounded-2xl transition-all duration-300",
                        scrolled ? "bg-[rgba(10,10,20,0.5)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)]" : "bg-transparent border-none"
                    )}
                >
                    <a href="#hero" className="text-2xl font-bold tracking-wide">
                        <span className="text-white">Mehefuj<span className="brand-text"> A.</span></span>
                    </a>
                    <div className="hidden md:flex space-x-2 items-center">
                        <NavLink href="#hero">Home</NavLink>
                        <NavLink href="#about">About</NavLink>
                        <NavLink href="#skills">Skills</NavLink>
                        <NavLink href="#projects">Projects</NavLink>
                        <NavLink href="#experience">Experience</NavLink>
                        <Button asChild>
                            <a href="#contact">Contact Me</a>
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;