"use client";

import { motion } from "framer-motion";
import {
    Plus, Edit3, Trash2, Eye, FileText,
    Globe
} from "lucide-react";
import { useState } from "react";

interface Page {
    id: number;
    title: string;
    slug: string;
    status: "Published" | "Draft" | "Archived";
    createdAt: string;
    views: number;
    type: "Blog" | "Documentation" | "Landing";
}

export default function PagesManager() {
    const [pages, setPages] = useState<Page[]>([
        {
            id: 1,
            title: "Building Neural Extensions",
            slug: "/blog/neural-extensions",
            status: "Published",
            createdAt: "2026-02-05",
            views: 1243,
            type: "Blog",
        },
        {
            id: 2,
            title: "API Documentation v2",
            slug: "/docs/api-v2",
            status: "Draft",
            createdAt: "2026-02-07",
            views: 0,
            type: "Documentation",
        },
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [newPage, setNewPage] = useState({
        title: "",
        slug: "",
        type: "Blog" as "Blog" | "Documentation" | "Landing",
    });

    const handleCreate = () => {
        const page: Page = {
            id: pages.length + 1,
            title: newPage.title,
            slug: newPage.slug,
            status: "Draft",
            createdAt: new Date().toISOString().split('T')[0],
            views: 0,
            type: newPage.type,
        };
        setPages([...pages, page]);
        setNewPage({ title: "", slug: "", type: "Blog" });
        setIsCreating(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this page?")) {
            setPages(pages.filter(p => p.id !== id));
        }
    };

    const handlePublish = (id: number) => {
        setPages(pages.map(p =>
            p.id === id ? { ...p, status: "Published" as const } : p
        ));
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Pages Manager</h1>
                    <p className="text-white/40">Create and manage blog posts, documentation, and landing pages.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Create New Page
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Pages", value: pages.length, icon: FileText },
                    { label: "Published", value: pages.filter(p => p.status === "Published").length, icon: Globe },
                    { label: "Drafts", value: pages.filter(p => p.status === "Draft").length, icon: Edit3 },
                    { label: "Total Views", value: pages.reduce((acc, p) => acc + p.views, 0).toLocaleString(), icon: Eye },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-white/5">
                                <stat.icon className="w-5 h-5 text-white/60" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Create Page Form */}
            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-8 rounded-2xl border border-white/5 overflow-hidden"
                >
                    <h2 className="text-2xl font-bold mb-6">Create New Page</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Page Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="e.g., Getting Started with Neural Hub"
                                value={newPage.title}
                                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">URL Slug</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="/blog/getting-started"
                                value={newPage.slug}
                                onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Page Type</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                value={newPage.type}
                                onChange={(e) => setNewPage({ ...newPage, type: e.target.value as Page['type'] })}
                            >
                                <option value="Blog">Blog Post</option>
                                <option value="Documentation">Documentation</option>
                                <option value="Landing">Landing Page</option>
                            </select>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setIsCreating(false)}
                                className="flex-1 px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                            >
                                Create Page
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Pages List */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Page</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Type</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Views</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((page, i) => (
                            <motion.tr
                                key={page.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                            >
                                <td className="px-6 py-6">
                                    <div>
                                        <p className="font-bold mb-1">{page.title}</p>
                                        <p className="text-xs text-white/40">{page.slug}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                                        {page.type}
                                    </span>
                                </td>
                                <td className="px-6 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${page.status === "Published" ? "bg-green-500/20 text-green-500" :
                                        page.status === "Draft" ? "bg-yellow-500/20 text-yellow-500" :
                                            "bg-white/10 text-white/40"
                                        }`}>
                                        {page.status}
                                    </span>
                                </td>
                                <td className="px-6 py-6 text-sm text-white/60">
                                    {page.views.toLocaleString()}
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <a
                                            href={page.slug}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </a>
                                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        {page.status === "Draft" && (
                                            <button
                                                onClick={() => handlePublish(page.id)}
                                                className="px-3 py-1 bg-green-500/20 text-green-500 rounded-lg text-xs font-bold hover:bg-green-500/30 transition-colors"
                                            >
                                                Publish
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(page.id)}
                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
