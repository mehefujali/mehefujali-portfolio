"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconCode,
    IconDatabase,
    IconApiApp,
    IconTool, // IconWrench পরিবর্তন করে IconTool করা হয়েছে
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const Skeleton = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-white/[0.1] [border:1px_solid_rgba(255,255,255,.1)] bg-black/[0.8] relative">
        {children}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
    </div>
);

const SkillIcon = ({ icon }: { icon: React.ReactNode }) => (
    <div className="relative w-16 h-16 md:w-20 md:h-20 text-gray-400 group-hover/bento:text-white transition-colors duration-300">
        <div className="absolute inset-0 bg-blue-500/10 blur-md group-hover/bento:blur-xl transition-all duration-300 rounded-full"></div>
        <div className="relative flex items-center justify-center w-full h-full">
            {icon}
        </div>
    </div>
);


const skillsData = [
    {
        title: "Frontend Development",
        description: "Building responsive, dynamic, and intuitive user interfaces with modern technologies.",
        header: <Skeleton><div className="absolute inset-0 flex items-center justify-center"><SkillIcon icon={<IconCode size={48} />} /></div></Skeleton>,
        className: "md:col-span-2",
        skills: ["React.js", "Next.js", "Redux", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP"]
    },
    {
        title: "Backend Development",
        description: "Creating robust, secure, and scalable server-side applications and APIs.",
        header: <Skeleton><div className="absolute inset-0 flex items-center justify-center"><SkillIcon icon={<IconApiApp size={48} />} /></div></Skeleton>,
        className: "md:col-span-1",
        skills: ["Node.js", "Express.js", "GraphQL", "Prisma", "TypeScript"]
    },
    {
        title: "Databases & Cloud",
        description: "Managing data efficiently and deploying applications on scalable cloud platforms.",
        header: <Skeleton><div className="absolute inset-0 flex items-center justify-center"><SkillIcon icon={<IconDatabase size={48} />} /></div></Skeleton>,
        className: "md:col-span-1",
        skills: ["MongoDB", "PostgreSQL", "Firebase", "AWS", "Vercel", "Netlify"]
    },
    {
        title: "Tools & Practices",
        description: "Utilizing modern tools and best practices for efficient, collaborative, and maintainable code.",
        header: <Skeleton><div className="absolute inset-0 flex items-center justify-center"><SkillIcon icon={<IconTool size={48} />} /></div></Skeleton>, // IconWrench পরিবর্তন করে IconTool করা হয়েছে
        className: "md:col-span-2",
        skills: ["Git", "GitHub", "Docker", "Linux", "Vite", "CI/CD", "Figma", "Postman", "VS Code"]
    },
];


export default function Skills() {
    return (
        <section id="skills" className="w-full relative py-20 md:py-32 bg-black">
            <div className="absolute inset-0 h-full w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.2]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            <div className="container mx-auto z-10 relative px-4">
                <h1 className="relative my-6 z-10 text-3xl text-center md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400 font-sans font-bold">
                    Technical Skills & Expertise
                </h1>

                <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] mt-12">
                    {skillsData.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            className={item.className}
                            skills={item.skills}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}