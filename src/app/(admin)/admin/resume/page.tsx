"use client";

import { useState } from 'react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

export default function ManageResumePage() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select a PDF file to upload.');
            return;
        }
        setLoading(true);
        const toastId = toast.loading('Uploading resume...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/resume/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Resume updated successfully!', { id: toastId });
                (e.target as HTMLFormElement).reset();
                setFile(null);
            } else {
                throw new Error(response.data.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || 'An error occurred.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Resume</h1>
            <div className="card-ui p-8 max-w-2xl">
                <p className="text-slate-300 mb-6">
                    {` Uploading a new resume will automatically replace the old one. The "Download Resume" button on your main site will always serve this latest version.`}
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-slate-300 block mb-2">Upload New Resume (PDF only)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
                            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20"
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="!py-3 !text-base btn-gradient-border">
                        {loading ? 'Uploading...' : 'Upload & Replace'}
                    </Button>
                </form>
            </div>
        </div>
    );
}