"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Logging in...');

        try {
            const response = await api.post('/admin/login', { email, password });
            if (response.data.success) {
                localStorage.setItem('authToken', response.data.token);
                toast.success('Login successful!', { id: toastId });
                router.push('/admin');
            } else {
                throw new Error(response.data.message || 'Login failed.');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Invalid credentials.';
            toast.error(errorMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-slate-100">
                    Admin Login
                </h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-400 mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-200"
                            placeholder="your-email@example.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-400 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition duration-200"
                            placeholder="••••••••"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-transform transform active:scale-95"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
}