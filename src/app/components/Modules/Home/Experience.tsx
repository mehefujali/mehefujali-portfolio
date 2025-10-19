"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IconBuildingSkyscraper } from '@tabler/icons-react';

const experienceData = [
    {
        title: "MERN Stack Developer",
        company: "Inforoot Solution",
        date: "April 2024 – September 2024",
        responsibilities: [
            "Developed and maintained full-stack web applications using the MERN stack.",
            "Implemented responsive UI with React.js and Tailwind CSS for optimal user experience.",
            "Built RESTful APIs and integrated third-party services to enhance backend performance.",
            "Collaborated with designers and backend teams using Git & GitHub for version control.",
        ]
    },
    {
        title: "Full Stack Internship",
        company: "Time Digitals",
        date: "January 2024 – April 2024", // === UPDATED DATE ===
        responsibilities: [
            "Assisted in the development of a client's web application using React.js and Node.js.",
            "Learned and applied modern web development practices in a professional environment.",
            "Participated in daily stand-ups and contributed to team discussions on feature implementation.",
            "Gained hands-on experience with version control and collaborative coding workflows.",
        ]
    }
];

const ExperienceCard = ({ experience }: { experience: typeof experienceData[0] }) => {
    return (
        <div className="flex gap-x-4">
            {/* Timeline Graphic */}
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-slate-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-blue-500 ring-4 ring-slate-900"></div>
                </div>
            </div>

            {/* Card Content */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="grow pt-0.5 pb-12"
            >
                <div className="card-ui p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                        <h3 className="text-xl font-semibold text-white mb-1 sm:mb-0">{experience.title}</h3>
                        <p className="text-sm text-slate-400">{experience.date}</p>
                    </div>
                    <p className="text-lg font-medium text-slate-200 mb-4 flex items-center gap-2">
                        <IconBuildingSkyscraper size={18} /> {experience.company}
                    </p>
                    <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm leading-relaxed">
                        {experience.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default function Experience() {
    return (
        // === overflow-hidden ADD KORA HOYECHE RESPONSIVE FIX ER JONNO ===
        <section id="experience" className="w-full relative py-20 md:py-32 bg-black overflow-hidden">
            {/* Consistent background */}
            <div className="absolute inset-0 h-full w-full bg-black bg-grid-white/[0.05]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />

            <div className="container mx-auto z-10 relative px-4">
                {/* Silver Gradient Heading */}
                <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
                    Work Experience
                </h2>

                <div className="max-w-3xl mx-auto">
                    {/* Data is mapped to show the most recent experience first */}
                    {experienceData.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} />
                    ))}
                </div>
            </div>
        </section>
    );
}