"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Link as LinkIcon, Plus, Trash2,
    ExternalLink, BarChart3, Search,
    Activity, ArrowRight, CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { redirectService, RedirectLink } from "@/lib/services/redirects";

export default function URLManager() {
    const [urls, setUrls] = useState<RedirectLink[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState("");
    const [newUrl, setNewUrl] = useState<Partial<RedirectLink>>({
        slug: "",
        targetUrl: "",
        type: "custom"
    });

    const fetchData = async () => {
        const data = await redirectService.getAll();
        setUrls(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        if (!newUrl.slug || !newUrl.targetUrl) return;
        await redirectService.create(newUrl as Omit<RedirectLink, "id" | "clickCount" | "createdAt">);
        setNewUrl({ slug: "", targetUrl: "", type: "custom" });
        setIsCreating(false);
        fetchData();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Decommission this neural bridge? This will break live links.")) {
            await redirectService.delete(id);
            fetchData();
        }
    };

    const copyToClipboard = (slug: string) => {
        const fullUrl = `${window.location.origin}/go/${slug}`;
        navigator.clipboard.writeText(fullUrl);
    };

    const filteredUrls = urls.filter(u =>
        u.slug.toLowerCase().includes(search.toLowerCase()) ||
        u.targetUrl.toLowerCase().includes(search.toLowerCase())
    );

    const totalClicks = urls.reduce((acc, u) => acc + u.clickCount, 0);

    return (
        <div className="space-y-10">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tight flex items-center gap-4">
                        <LinkIcon className="w-10 h-10 text-primary" />
                        Neural <span className="text-primary">Router</span>
                    </h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mt-1">Short-URL Aliases & Telemetry Redirects</p>
                </div>

                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                >
                    {isCreating ? <ArrowRight className="w-4 h-4 rotate-180" /> : <Plus className="w-4 h-4" />}
                    {isCreating ? "Abort Command" : "Initialize Link"}
                </button>
            </div>

            {/* Signal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Nodes", value: urls.length, icon: Activity },
                    { label: "Total Signal Volume", value: totalClicks.toLocaleString(), icon: BarChart3 },
                    { label: "Average Intensity", value: Math.round(totalClicks / (urls.length || 1)), icon: LinkIcon },
                    { label: "Uptime Pulse", value: "99.9%", icon: CheckCircle2 },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-[2rem] border border-border flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">{stat.label}</p>
                            <stat.icon className="w-4 h-4 text-primary opacity-20" />
                        </div>
                        <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isCreating && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-card p-10 rounded-[3rem] border border-primary/20 shadow-2xl shadow-primary/5"
                    >
                        <h2 className="text-xl font-black uppercase italic mb-8 tracking-tight">Configure <span className="text-primary">Bridge</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Neural Slug (subhan.tech/go/...)</label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border outline-none focus:border-primary transition-all font-mono text-sm"
                                    placeholder="e.g. extension-feedback"
                                    value={newUrl.slug}
                                    onChange={(e) => setNewUrl({ ...newUrl, slug: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Target Protocol (Destination)</label>
                                <input
                                    type="url"
                                    className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border outline-none focus:border-primary transition-all font-mono text-sm"
                                    placeholder="https://..."
                                    value={newUrl.targetUrl}
                                    onChange={(e) => setNewUrl({ ...newUrl, targetUrl: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={handleCreate}
                                className="flex-1 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all uppercase tracking-widest text-xs"
                            >
                                Deploy Link
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Neural Stream Registry */}
            <div className="glass-card rounded-[2.5rem] border border-border overflow-hidden">
                <div className="p-8 border-b border-border flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-border px-6 py-3 rounded-xl flex-1 w-full md:max-w-md group focus-within:border-primary/50 transition-all">
                        <Search className="w-4 h-4 text-muted-foreground/30 group-focus-within:text-primary" />
                        <input
                            placeholder="Filter neural links..."
                            className="bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground/20 w-full font-bold"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-black/[0.01]">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">Bridge Slug</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">Target Protocol</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 text-center">Signals</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUrls.map((url, i) => (
                                <motion.tr
                                    key={url.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="border-b border-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <LinkIcon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-mono text-sm text-primary font-bold">go/{url.slug}</p>
                                                <button
                                                    onClick={() => copyToClipboard(url.slug)}
                                                    className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 hover:text-primary transition-colors mt-1"
                                                >
                                                    Copy Signal Link
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs text-muted-foreground font-mono truncate max-w-xs">{url.targetUrl}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-border">
                                            <Activity className="w-3 h-3 text-emerald-500" />
                                            <span className="text-xs font-black">{url.clickCount.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a
                                                href={url.targetUrl}
                                                target="_blank"
                                                className="p-3 rounded-xl hover:bg-primary hover:text-white transition-all text-muted-foreground/30 shadow-sm"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(url.id!)}
                                                className="p-3 rounded-xl hover:bg-destructive hover:text-white transition-all text-muted-foreground/30"
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
        </div>
    );
}
