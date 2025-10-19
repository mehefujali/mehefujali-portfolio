"use client";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 mb-8">
                Welcome, Admin!
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Use the sidebar to manage your portfolio content. You can manage projects, blogs, and update your resume. All changes will be reflected on your live site immediately.
            </p>
        </div>
    );
}