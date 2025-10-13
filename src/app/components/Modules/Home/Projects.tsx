"use client";

import React, { useState, useEffect } from 'react';
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveLink?: string;
    clientRepo?: string;
    serverRepo?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div id='projects' className="card-ui flex flex-col group h-full mx-2">
            <div className="h-48 overflow-hidden rounded-t-2xl relative">
                <Image
                    height={600}
                    width={300}
                    src={project.image || 'https://placehold.co/600x400/0f172a/3b82f6?text=Project'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://placehold.co/600x400/0f172a/3b82f6?text=Image+Error';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-slate-50">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-4">
                    {project.description.substring(0, 100)}{project.description.length > 100 ? '...' : ''}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map(tech =>
                        <span key={tech} className="inline-block bg-slate-800 rounded-full px-3 py-1 text-xs font-semibold text-slate-300">
                            {tech}
                        </span>
                    )}
                </div>
                <div className="mt-auto flex space-x-4 items-center text-sm font-semibold">

                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="brand-text hover:underline flex items-center gap-1.5">
                        <IconExternalLink size={16} />
                        Live Site
                    </a>


                    <a href={project.clientRepo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:brand-text transition flex items-center gap-1.5">
                        <IconBrandGithub size={16} />
                        GitHub
                    </a>

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
                const response = await fetch("https://mehefujali-server.vercel.app/projects");
                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                if (error instanceof Error) setError(error.message);
                else setError("An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="w-full relative py-20 md:py-32 bg-black overflow-hidden">
            <div className="absolute inset-0 h-full w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.2]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            <div className="container mx-auto z-10 relative px-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
                    Featured <span className="brand-text">Projects</span>
                </h2>

                {loading && (
                    <p className="text-center text-xl text-slate-400">Loading projects... <i className="fas fa-spinner fa-spin ml-2"></i></p>
                )}
                {error && (
                    <p className="text-center text-red-500">Error loading projects. Please try again later.</p>
                )}
                {!loading && !error && (
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        slidesPerView={1}
                        spaceBetween={30}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="w-full py-4"
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project._id}>
                                <ProjectCard project={project} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
}