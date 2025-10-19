/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import Modal from '@/components/admin/Modal';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';

interface Project {
    id: string; // Changed to string
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    liveLink?: string;
    clientRepo?: string;
    serverRepo?: string;
}

// Form state can be simpler
interface ProjectFormState {
    title: string;
    description: string;
    technologies: string; // Stored as comma-separated string in form
    liveLink?: string;
    clientRepo?: string;
    serverRepo?: string;
}

export default function ManageProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [formState, setFormState] = useState<ProjectFormState>({
        title: '', description: '', technologies: '', liveLink: '', clientRepo: '', serverRepo: ''
    });
    const [file, setFile] = useState<File | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await api.get('/projects');
            setProjects(response.data.data);
        } catch {
            toast.error("Failed to fetch projects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenModal = (project: Project | null) => {
        setSelectedProject(project);
        if (project) {
            setFormState({
                ...project,
                technologies: project.technologies.join(', '),
            });
        } else {
            setFormState({ title: '', description: '', technologies: '', liveLink: '', clientRepo: '', serverRepo: '' });
        }
        setFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleOpenDeleteModal = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedProject(null);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading(selectedProject ? 'Updating project...' : 'Creating project...');

        try {
            let response;
            const formData = new FormData();

            // For both create and update, append text fields
            Object.entries(formState).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            if (selectedProject) { // This is an UPDATE operation
                // Note: Image update is not handled here for simplicity.
                // We're sending a JSON payload for updates.
                response = await api.patch(`/projects/${selectedProject.id}`, formState);
            } else { // This is a CREATE operation
                if (!file) {
                    toast.error("Please select a project image.", { id: toastId });
                    return;
                }
                formData.append('projectImage', file);
                response = await api.post('/projects', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (response.data.success) {
                toast.success(`Project ${selectedProject ? 'updated' : 'created'} successfully!`, { id: toastId });
                fetchProjects();
                handleCloseModal();
            } else {
                throw new Error(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred.', { id: toastId });
        }
    };

    const handleDelete = async () => {
        if (!selectedProject) return;
        const toastId = toast.loading('Deleting project...');
        try {
            await api.delete(`/projects/${selectedProject.id}`);
            toast.success('Project deleted successfully!', { id: toastId });
            fetchProjects();
            handleCloseDeleteModal();
        } catch {
            toast.error('Failed to delete project.', { id: toastId });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <Button onClick={() => handleOpenModal(null)} className="flex items-center gap-2">
                    <IconPlus size={18} /> Add New Project
                </Button>
            </div>

            {loading ? <p>Loading projects...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="admin-card p-5 flex flex-col">
                            {project.imageUrl && <Image src={project.imageUrl} alt={project.title} width={400} height={200} className="rounded-lg mb-4 w-full h-40 object-cover" />}
                            <h3 className="text-lg font-bold text-white flex-grow">{project.title}</h3>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button onClick={() => handleOpenModal(project)} size="sm" variant="outline" className="flex items-center gap-1.5"><IconEdit size={16} /> Edit</Button>
                                <Button onClick={() => handleOpenDeleteModal(project)} size="sm" variant="destructive" className="flex items-center gap-1.5"><IconTrash size={16} /> Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedProject ? 'Edit Project' : 'Create New Project'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formState.title || ''} onChange={handleChange} placeholder="Title" required className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    <textarea name="description" value={formState.description || ''} onChange={handleChange} placeholder="Description" required rows={4} className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    <input name="technologies" value={formState.technologies || ''} onChange={handleChange} placeholder="Technologies (comma-separated)" required className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    <input name="liveLink" value={formState.liveLink || ''} onChange={handleChange} placeholder="Live Site URL" type="url" className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    <input name="clientRepo" value={formState.clientRepo || ''} onChange={handleChange} placeholder="Client Repo URL" type="url" className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    <input name="serverRepo" value={formState.serverRepo || ''} onChange={handleChange} placeholder="Server Repo URL" type="url" className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    {!selectedProject && (
                        <div>
                            <label className="text-sm font-medium text-slate-300 block mb-1">Project Image</label>
                            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required className="mt-1 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20" />
                        </div>
                    )}
                    <Button type="submit" className="w-full !py-3">{selectedProject ? 'Update Project' : 'Create Project'}</Button>
                </form>
            </Modal>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDelete}
                title="Delete Project"
                message={`Are you sure you want to delete the project "${selectedProject?.title}"? This action cannot be undone.`}
            />
        </div>
    );
}