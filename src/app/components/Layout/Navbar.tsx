'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: "#hero", label: "Home", icon: "fa-solid fa-house" },
    { href: "#about", label: "About", icon: "fa-solid fa-user" },
    { href: "#skills", label: "Skills", icon: "fa-solid fa-code" },
    { href: "#projects", label: "Projects", icon: "fa-solid fa-briefcase" },
    { href: "#experience", label: "Experience", icon: "fa-solid fa-building" },
    { href: "#blog", label: "Blog", icon: "fa-solid fa-blog" },
];

const NavLink: React.FC<{ href: string, children: React.ReactNode, className?: string }> = ({ href, children, className }) => {
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
                isActive ? 'text-white font-semibold' : 'text-gray-400',
                className
            )}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-white rounded-full transition-all duration-300"></span>
            )}
        </a>
    );
};

const MobileNavLink: React.FC<{ href: string, label: string, icon: string }> = ({ href, label, icon }) => {
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
        <a href={href} className={cn("flex flex-col items-center gap-1 transition-all duration-300", isActive ? "text-white scale-110" : "text-gray-400")}>
            <i className={icon}></i>
            <span className="text-xs">{label}</span>
        </a>
    )
}

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
        <>
            {/* Desktop Navbar */}
            <header className="fixed top-0 w-full z-[100] transition-all duration-300 hidden md:block">
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
                            {navLinks.map(link => (
                                <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                            ))}
                            <Button asChild className="btn-gradient-border">
                                <a href="#contact">Contact Me</a>
                            </Button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Dynamic Island Navbar */}
            <AnimatePresence>
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100] md:hidden"
                >
                    <nav className="bg-[rgba(10,10,20,0.7)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] rounded-full p-4">
                        <div className="flex justify-around items-center">
                            {navLinks.map(link => (
                                <MobileNavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
                            ))}
                        </div>
                    </nav>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default Navbar;