"use client";

import { motion } from "framer-motion";
import {
    Link as LinkIcon, Plus, Edit3, Trash2, Copy,
    ExternalLink, BarChart3, Search, Filter
} from "lucide-react";
import { useState } from "react";

interface URLRedirect {
    id: number;
    shortUrl: string;
    destination: string;
    clicks: number;
    createdAt: string;
    status: "Active" | "Inactive";
}

export default function URLManager() {
    const [urls, setUrls] = useState<URLRedirect[]>([
        {
            id: 1,
            shortUrl: "subhan.tech/gh",
            destination: "https://github.com/Subhan-Haider",
            clicks: 1243,
            createdAt: "2026-02-01",
            status: "Active",
        },
        {
            id: 2,
            shortUrl: "subhan.tech/docs",
            destination: "https://docs.subhan.tech/getting-started",
            clicks: 856,
            createdAt: "2026-01-28",
            status: "Active",
        },
        {
            id: 3,
            shortUrl: "subhan.tech/lootops",
            destination: "https://lootops.subhan.tech",
            clicks: 2341,
            createdAt: "2026-01-15",
            status: "Active",
        },
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [newUrl, setNewUrl] = useState({
        shortUrl: "",
        destination: "",
    });

    const handleCreate = () => {
        const url: URLRedirect = {
            id: urls.length + 1,
            shortUrl: `subhan.tech/${newUrl.shortUrl}`,
            destination: newUrl.destination,
            clicks: 0,
            createdAt: new Date().toISOString().split('T')[0],
            status: "Active",
        };
        setUrls([...urls, url]);
        setNewUrl({ shortUrl: "", destination: "" });
        setIsCreating(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this URL redirect?")) {
            setUrls(urls.filter(u => u.id !== id));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(`https://${text}`);
        alert("Copied to clipboard!");
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">URL Manager</h1>
                    <p className="text-white/40">Create and manage short URLs and redirects for your platform.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Create Short URL
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total URLs", value: urls.length },
                    { label: "Total Clicks", value: urls.reduce((acc, u) => acc + u.clicks, 0).toLocaleString() },
                    { label: "Active URLs", value: urls.filter(u => u.status === "Active").length },
                    { label: "Avg. Clicks/URL", value: Math.round(urls.reduce((acc, u) => acc + u.clicks, 0) / urls.length) },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/5"
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Create URL Form */}
            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-8 rounded-2xl border border-white/5 overflow-hidden"
                >
                    <h2 className="text-2xl font-bold mb-6">Create New Short URL</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Short URL Slug</label>
                            <div className="flex items-center gap-2">
                                <span className="text-white/40 text-sm">subhan.tech/</span>
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                    placeholder="my-link"
                                    value={newUrl.shortUrl}
                                    onChange={(e) => setNewUrl({ ...newUrl, shortUrl: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Destination URL</label>
                            <input
                                type="url"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="https://example.com/destination"
                                value={newUrl.destination}
                                onChange={(e) => setNewUrl({ ...newUrl, destination: e.target.value })}
                            />
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
                                Create URL
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Search & Filter */}
            <div className="flex gap-4">
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-xl flex-1 group focus-within:border-white/20 transition-all">
                    <Search className="w-4 h-4 text-white/20 group-focus-within:text-white/60" />
                    <input
                        placeholder="Search URLs..."
                        className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* URLs Table */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Short URL</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Destination</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Clicks</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url, i) => (
                            <motion.tr
                                key={url.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                            >
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2">
                                        <LinkIcon className="w-4 h-4 text-white/40" />
                                        <code className="text-sm font-mono text-blue-400">{url.shortUrl}</code>
                                        <button
                                            onClick={() => copyToClipboard(url.shortUrl)}
                                            className="p-1 rounded hover:bg-white/10 transition-colors"
                                        >
                                            <Copy className="w-3 h-3 text-white/40" />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-6 max-w-md">
                                    <p className="text-sm text-white/60 truncate">{url.destination}</p>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-white/40" />
                                        <span className="font-bold">{url.clicks.toLocaleString()}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${url.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-white/10 text-white/40"
                                        }`}>
                                        {url.status}
                                    </span>
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <a
                                            href={`https://${url.shortUrl}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(url.id)}
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
