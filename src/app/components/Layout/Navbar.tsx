'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const checkActive = () => {
            if (typeof window !== 'undefined') {
                setIsActive(window.location.hash === href);
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
                "hover:text-[var(--accent-violet)] hover:bg-white/5",
                isActive ? 'text-white font-semibold' : 'text-gray-400'
            )}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-[var(--accent-violet)] rounded-full transition-all duration-300"></span>
            )}
        </a>
    );
};

const MobileNavLink: React.FC<{ href: string, icon: string, label: string }> = ({ href, icon, label }) => {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const section = document.querySelector(href);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    setIsActive(rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2);
                }
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [href]);

    const activeClass = 'text-[var(--accent-violet)]';
    const inactiveClass = 'text-gray-500 hover:text-white';

    return (
        <a
            href={href}
            className={cn("flex flex-col items-center justify-center p-2 transition-colors duration-300 relative group w-full h-full", isActive ? activeClass : inactiveClass)}
            aria-label={label}
        >
            <i className={cn(icon, "text-xl relative z-10")} />
            {isActive && (
                <div className="absolute bottom-1 w-8 h-[3px] bg-[var(--accent-violet)] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(150,80,255,0.7)]"></div>
            )}
            <span className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-black font-semibold bg-white px-2 py-1 rounded-md pointer-events-none whitespace-nowrap z-20">
                {label}
            </span>
        </a>
    );
};


const NavbarItems = [
    { href: "#hero", icon: "fas fa-home", label: "Home" },
    { href: "#about", icon: "fas fa-user", label: "About" },
    { href: "#skills", icon: "fas fa-code", label: "Skills" },
    { href: "#projects", icon: "fas fa-folder-open", label: "Projects" },
    { href: "#contact", icon: "fas fa-envelope", label: "Contact" },
];

const Navbar = () => {
    return (
        <>
            <header className="fixed top-0 w-full z-[100] hidden md:block transition-all duration-300">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex items-center justify-between h-20 mt-4 px-6 rounded-2xl"
                        style={{
                            backgroundColor: 'rgba(10, 10, 20, 0.5)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <a href="#hero" className="text-2xl font-bold tracking-wide">
                            <span className="hidden md:inline text-white">Mehefuj<span className="brand-text"> A.</span></span>
                            <span className="md:hidden text-3xl"><span className="text-white">M</span><span className="brand-text">A</span></span>
                        </a>
                        <div className="flex space-x-2 items-center">
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

            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] block md:hidden">
                <div
                    className="flex justify-around items-center w-[95vw] max-w-sm h-16 px-1 rounded-full"
                    style={{
                        backgroundColor: 'rgba(10, 10, 20, 0.7)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {NavbarItems.map((item) => (
                        <MobileNavLink
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Navbar;