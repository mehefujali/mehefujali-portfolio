/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';

const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

export default function Contact() {
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Sending your message...');

        try {
            const response = await api.post('/contact', formData);
            if (response.data.success) {
                toast.success('Message sent successfully!', { id: toastId });
                setFormData(initialFormState);
            } else {
                throw new Error(response.data.message || 'Failed to send message.');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An error occurred.';
            toast.error(errorMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="w-full relative py-20 md:py-32 bg-black overflow-hidden">
            <div className="absolute inset-0 h-full w-full bg-black bg-grid-white/[0.05]" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />

            <div className="container mx-auto z-10 relative px-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
                    Get in Touch
                </h2>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white">Contact Information</h3>
                        <p className="text-slate-400">
                            Have a project in mind or just want to say hello? Fill out the form or use the contact details below.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <IconMail className="text-blue-400 w-6 h-6" />
                                <span className="text-slate-300">mehefujalim@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <IconPhone className="text-blue-400 w-6 h-6" />
                                <span className="text-slate-300">+91 8391977901</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <IconMapPin className="text-blue-400 w-6 h-6" />
                                <span className="text-slate-300">West Bengal, India</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required rows={5} className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3" />
                        <Button type="submit" disabled={loading} className="w-full !py-3 !text-base btn-gradient-border">
                            {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}