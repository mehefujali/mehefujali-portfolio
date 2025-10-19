"use client";

import React, { useState, useEffect } from 'react';
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';
import api from '@/services/api'; // <-- IMPORT API SERVICE

import 'swiper/css';
import 'swiper/css/navigation';

interface Project {
    _id: string;
    title: string;
    description: string;
    imageUrl: string; // Updated from 'image'
    technologies: string[];
    liveLink?: string;
    clientRepo?: string;
    serverRepo?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    // Card component remains the same...
    return (
        <div className="card-ui flex h-full flex-col group">
            <div className="h-52 overflow-hidden rounded-t-2xl relative">
                <Image
                    fill
                    src={project.imageUrl || 'https://placehold.co/600x400/0f172a/3b82f6?text=Project'}
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="flex flex-grow flex-col p-5">
                <h3 className="mb-2 text-xl font-bold text-slate-50">{project.title}</h3>
                <p className="mb-4 flex-grow text-sm leading-relaxed text-slate-400">
                    {project.description.substring(0, 120)}{project.description.length > 120 ? '...' : ''}
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map(tech =>
                        <span key={tech} className="inline-block rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                            {tech}
                        </span>
                    )}
                </div>
                <div className="mt-auto flex items-center space-x-4 text-sm font-semibold">
                    {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="brand-text flex items-center gap-1.5 hover:underline"><IconExternalLink size={16} /> Live Site</a>}
                    {project.clientRepo && <a href={project.clientRepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 transition hover:text-white"><IconBrandGithub size={16} /> GitHub</a>}
                </div>
            </div>
        </div>
    );
};


export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                // Use the new API service to fetch projects
                const response = await api.get('/projects');
                if (response.data.success) {
                    setProjects(response.data.data);
                } else {
                    throw new Error("Failed to fetch projects.");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="w-full relative py-20 md:py-32 bg-black overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-black bg-grid-white/[0.05]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            <div className="container mx-auto z-10 relative px-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
                    Featured Projects
                </h2>

                {loading && <p className="text-center text-xl text-slate-400">Loading projects...</p>}
                {error && <p className="text-center text-red-500">Error loading projects. Please try again later.</p>}

                {!loading && !error && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            loop={projects.length > 2} // Loop only if there are enough slides
                            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            slidesPerView={1}
                            spaceBetween={30}
                            navigation
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            className="w-full py-4"
                        >
                            {projects.map((project) => (
                                <SwiperSlide key={project._id} className="h-auto">
                                    <ProjectCard project={project} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                )}
            </div>
        </section>
    );
}