"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconCode,
    IconDatabase,
    IconApi,
    IconTool,
} from "@tabler/icons-react";

// Icon-gular jonno ekta sundor style component
const SkillIcon = ({ icon }: { icon: React.ReactNode }) => (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900/50 text-neutral-400 transition-all duration-300 group-hover/bento:bg-slate-800/50 group-hover/bento:scale-110 group-hover/bento:text-white">
        <div className="absolute inset-0 bg-neutral-500/10 blur-md transition-all duration-300 group-hover/bento:blur-xl rounded-2xl"></div>
        <div className="relative">{icon}</div>
    </div>
);

const skillsData = [
    {
        title: "Frontend Development",
        description: "Building responsive, dynamic, and intuitive user interfaces with modern technologies.",
        header: <SkillIcon icon={<IconCode size={40} />} />,
        className: "md:col-span-2",
        skills: ["React.js", "Next.js", "Redux", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"]
    },
    {
        title: "Backend Development",
        description: "Creating robust, secure, and scalable server-side applications and APIs.",
        header: <SkillIcon icon={<IconApi size={40} />} />,
        className: "md:col-span-1",
        skills: ["Node.js", "Express.js", "GraphQL", "Prisma", "REST API"]
    },
    {
        title: "Databases & Cloud",
        description: "Managing data efficiently and deploying applications on scalable cloud platforms.",
        header: <SkillIcon icon={<IconDatabase size={40} />} />,
        className: "md:col-span-1",
        skills: ["MongoDB", "PostgreSQL", "Firebase", "AWS", "Vercel", "Netlify"]
    },
    {
        title: "Tools & Practices",
        description: "Utilizing modern tools for efficient, collaborative, and maintainable code.",
        header: <SkillIcon icon={<IconTool size={40} />} />,
        className: "md:col-span-2",
        skills: ["Git & GitHub", "Docker", "Linux", "CI/CD", "Figma", "Postman", "VS Code"]
    },
];

export default function Skills() {
    return (
        <section id="skills" className="w-full relative py-20 md:py-32 bg-black">
            {/* Consistent background */}
            <div className="absolute inset-0 h-full w-full bg-black bg-grid-white/[0.05]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            <div className="container mx-auto z-10 relative px-4">
                {/* === UPDATED SILVER GRADIENT HEADING === */}
                <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
                    My Technical Toolkit
                </h2>

                <BentoGrid className="md:auto-rows-[22rem]">
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