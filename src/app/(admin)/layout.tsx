"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import api from '@/services/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (isLoginPage) {
            setIsLoading(false);
            return;
        }

        const verifyToken = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.replace('/admin/login');
                setIsLoading(false);
                return;
            }

            try {
                await api.get('/admin/me');
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('authToken');
                router.replace('/admin/login');
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [isLoginPage, router]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Authenticating...</p>
            </div>
        );
    }

    if (isAuthenticated) {
        return (
            <div className="flex min-h-screen bg-black text-white">
                <AdminSidebar />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        );
    }

    return null;
}