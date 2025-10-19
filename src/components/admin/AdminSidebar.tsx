
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { IconLayoutDashboard, IconBriefcase, IconFileText, IconFileUpload, IconLogout } from '@tabler/icons-react';

const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: IconLayoutDashboard },
    { href: '/admin/projects', label: 'Manage Projects', icon: IconBriefcase },
    { href: '/admin/blogs', label: 'Manage Blogs', icon: IconFileText },
    { href: '/admin/resume', label: 'Manage Resume', icon: IconFileUpload },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        toast.success('Logged out successfully!');
        router.push('/admin/login');
    };

    return (
        <aside className="w-64 bg-slate-900 p-6 flex-shrink-0 flex-col border-r border-slate-800 hidden md:flex">
            <h2 className="text-2xl font-bold mb-10 brand-text">Admin Panel</h2>
            <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link key={link.href} href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium",
                                pathname === link.href
                                    ? 'bg-blue-500/20 text-white'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            )}>
                            <Icon size={18} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm font-medium">
                <IconLogout size={18} />
                Logout
            </button>
        </aside>
    );
}