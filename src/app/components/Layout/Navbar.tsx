'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration ---
const bottomNavLinks = [
    { href: "#hero", label: "Home", icon: "fa-solid fa-house" },
    { href: "#about", label: "About", icon: "fa-solid fa-user" },
    { href: "#skills", label: "Skills", icon: "fa-solid fa-code" },
    { href: "#projects", label: "Projects", icon: "fa-solid fa-briefcase" },
    { href: "#experience", label: "Experience", icon: "fa-solid fa-building" },
];

const drawerLinks = [
    { href: "#blog", label: "Blog" },
];

const allDesktopLinks = [
    ...bottomNavLinks.map(({ href, label }) => ({ href, label })),
    ...drawerLinks,
];

// --- Helper Components ---
const DesktopNavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const checkActive = () => setIsActive(window.location.hash === href || (href === "#hero" && window.location.hash === ""));
        window.addEventListener('hashchange', checkActive, true);
        checkActive();
        return () => window.removeEventListener('hashchange', checkActive, true);
    }, [href]);

    return (
        <a href={href} className={cn("relative rounded-lg px-4 py-2 text-base font-medium transition duration-300 hover:text-white", isActive ? 'text-white' : 'text-gray-400')}>
            {children}
            {isActive && <motion.span layoutId="underline" className="absolute bottom-1 left-0 right-0 h-0.5 bg-white" />}
        </a>
    );
};

const MobileBottomNavLink: React.FC<{ href: string, label: string, icon: string }> = ({ href, label, icon }) => {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const checkActive = () => setIsActive(window.location.hash === href || (href === "#hero" && window.location.hash === ""));
        window.addEventListener('hashchange', checkActive, true);
        checkActive();
        return () => window.removeEventListener('hashchange', checkActive, true);
    }, [href]);

    return (
        <a href={href} className={cn("flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all duration-300", isActive ? "text-white scale-110" : "text-gray-400")}>
            <i className={icon}></i>
            <span className="text-xs font-medium">{label}</span>
        </a>
    );
};

// --- Main Navbar Component ---
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        // Scroll detection for navbar background effect
        const handleScroll = () => setScrolled(window.scrollY > 50); // 50px scroll korar por effect ashbe
        window.addEventListener('scroll', handleScroll);

        // Body scroll lock jokhon drawer open thakbe
        document.body.style.overflow = isDrawerOpen ? 'hidden' : 'auto';

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, [isDrawerOpen]);

    const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

    return (
        <>
            {/* ====== Header (Top Bar for All Devices) ====== */}
            <header className={cn(
                "fixed top-0 w-full z-[100] transition-all duration-300",
                // Scroll korle ei class gulo add hobe
                scrolled
                    ? "bg-slate-900/50 backdrop-blur-lg border-b border-slate-800"
                    : "bg-transparent border-b border-transparent"
            )}>
                <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <a href="#hero" className="text-2xl font-bold tracking-wide">
                        <span className="text-white md:hidden">M<span className="brand-text">.A.</span></span>
                        <span className="hidden text-white md:inline">Mehefuj<span className="brand-text"> A.</span></span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-2 md:flex">
                        {allDesktopLinks.map(link => <DesktopNavLink key={link.href} href={link.href}>{link.label}</DesktopNavLink>)}
                        <Button asChild className="btn-gradient-border"><a href="#contact">Contact Me</a></Button>
                    </nav>

                    {/* Mobile Hamburger Menu Icon */}
                    <div className="md:hidden">
                        <button onClick={toggleDrawer} className="text-gray-300 transition-colors hover:text-white z-[120] relative">
                            <i className={cn("fa-solid text-2xl transition-all duration-300", isDrawerOpen ? "fa-xmark rotate-180" : "fa-bars")}></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* ====== Mobile Bottom Navigation Bar ====== */}
            <motion.nav
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Smooth ease out cubic animation
                className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-lg -translate-x-1/2 rounded-full border border-slate-800 bg-slate-900/60 p-1.5 backdrop-blur-lg md:hidden">
                <div className="flex items-center justify-around">
                    {bottomNavLinks.map(link => <MobileBottomNavLink key={link.href} {...link} />)}
                </div>
            </motion.nav>

            {/* ====== Mobile Drawer ====== */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
                            onClick={toggleDrawer}
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 z-[110] flex h-full w-[80%] max-w-xs flex-col bg-slate-900/95 backdrop-blur-xl p-6 pt-24 shadow-2xl md:hidden">
                            <nav className="flex flex-col space-y-6 text-center text-lg">
                                {drawerLinks.map(link => (
                                    <a key={link.href} href={link.href} onClick={toggleDrawer} className="font-medium text-gray-300 transition-colors hover:text-white">{link.label}</a>
                                ))}
                            </nav>
                            <Button asChild className="btn-gradient-border mt-auto w-full"><a href="#contact" onClick={toggleDrawer}>Contact Me</a></Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}