"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import Modal from '@/components/admin/Modal';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

interface Blog {
    id: string; // Changed to string
    title: string;
    content: string;
    tags: string[];
    views: number;
    createdAt: string;
}

interface BlogFormState {
    title: string;
    content: string;
    tags: string; // Stored as comma-separated string
}

export default function ManageBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [formState, setFormState] = useState<BlogFormState>({ title: '', content: '', tags: ''});
    const [file, setFile] = useState<File | null>(null);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await api.get('/blogs');
            // Assuming the API returns data in response.data.data
            setBlogs(response.data.data);
        } catch {
            toast.error("Failed to fetch blogs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleOpenModal = (blog: Blog | null) => {
        setSelectedBlog(blog);
        if (blog) {
             setFormState({
                title: blog.title,
                content: blog.content,
                tags: blog.tags.join(', '),
            });
        } else {
            setFormState({ title: '', content: '', tags: '' });
        }
        setFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleOpenDeleteModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading(selectedBlog ? 'Updating blog...' : 'Creating blog...');
        try {
            let response;
            if (selectedBlog) {
                response = await api.patch(`/blogs/${selectedBlog.id}`, formState);
            } else {
                if (!file) {
                    toast.error("Blog image is required.", { id: toastId });
                    return;
                }
                const formData = new FormData();
                Object.entries(formState).forEach(([key, value]) => {
                    formData.append(key, value as string);
                });
                formData.append('file', file);

                response = await api.post('/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (response.data.success) {
                toast.success(`Blog ${selectedBlog ? 'updated' : 'created'} successfully!`, { id: toastId });
                fetchBlogs();
                handleCloseModal();
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred.', { id: toastId });
        }
    };

    const handleDelete = async () => {
        if (!selectedBlog) return;
        const toastId = toast.loading('Deleting blog...');
        try {
            await api.delete(`/blogs/${selectedBlog.id}`);
            toast.success('Blog deleted successfully!', { id: toastId });
            fetchBlogs();
            handleCloseDeleteModal();
        } catch {
            toast.error('Failed to delete blog.', { id: toastId });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Blogs</h1>
                <Button onClick={() => handleOpenModal(null)} className="flex items-center gap-2"><IconPlus size={18} /> New Blog Post</Button>
            </div>

            {loading ? <p>Loading blogs...</p> : (
                <div className="admin-card">
                    <table className="w-full text-left">
                        <thead className="border-b border-slate-800 text-sm text-slate-400">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4 hidden sm:table-cell">Views</th>
                                <th className="p-4 hidden md:table-cell">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30">
                                    <td className="p-4 font-medium text-white">{blog.title}</td>
                                    <td className="p-4 hidden sm:table-cell">{blog.views}</td>
                                    <td className="p-4 text-sm text-slate-400 hidden md:table-cell">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <Button onClick={() => handleOpenModal(blog)} size="sm" variant="outline"><IconEdit size={16} /></Button>
                                        <Button onClick={() => handleOpenDeleteModal(blog)} size="sm" variant="destructive"><IconTrash size={16} /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formState.title || ''} onChange={handleChange} placeholder="Title" required className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    <textarea name="content" value={formState.content || ''} onChange={handleChange} placeholder="Content" required rows={8} className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    <input name="tags" value={formState.tags || ''} onChange={handleChange} placeholder="Tags (comma-separated)" required className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                    {!selectedBlog && (
                        <div>
                            <label className="text-sm font-medium text-slate-300 block mb-1">Blog Image</label>
                            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required className="mt-1 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20" />
                        </div>
                    )}
                    <Button type="submit" className="w-full !py-3">{selectedBlog ? 'Update Post' : 'Create Post'}</Button>
                </form>
            </Modal>

            <ConfirmationModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleDelete} title="Delete Blog Post" message={`Are you sure you want to delete "${selectedBlog?.title}"?`} />
        </div>
    );
}