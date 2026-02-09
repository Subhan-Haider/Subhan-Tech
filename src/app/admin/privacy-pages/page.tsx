"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Trash2, FileText,
    Shield, CheckCircle, AlertCircle, Link,
    FileEdit, X, Save, ExternalLink, Globe
} from "lucide-react";
import { useState } from "react";

interface PrivacyPage {
    id: number;
    name: string;
    identifier: string;
    type: "software" | "extension" | "general";
    status: "Published" | "Draft" | "Needs Update";
    mode: "content" | "url";
    content?: string;
    externalUrl?: string;
    lastUpdated: string;
}

export default function PrivacyPagesManager() {
    const [pages, setPages] = useState<PrivacyPage[]>([
        {
            id: 1,
            name: "CodeLens Extension",
            identifier: "chrome_codelens",
            type: "extension",
            status: "Published",
            mode: "content",
            content: "# Privacy Policy for CodeLens\n\nWe value your privacy...",
            lastUpdated: "2026-02-05",
        },
        {
            id: 2,
            name: "LootOps Software",
            identifier: "lootops_exe",
            type: "software",
            status: "Published",
            mode: "url",
            externalUrl: "https://lootops.tech/privacy",
            lastUpdated: "2026-01-28",
        }
    ]);

    const [editingPage, setEditingPage] = useState<PrivacyPage | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newPage, setNewPage] = useState({
        name: "",
        identifier: "",
        type: "extension" as const,
    });

    const handleCreate = () => {
        const page: PrivacyPage = {
            id: Date.now(),
            name: newPage.name,
            identifier: newPage.identifier,
            type: newPage.type,
            status: "Draft",
            mode: "content",
            content: "",
            lastUpdated: new Date().toISOString().split('T')[0],
        };
        setPages([...pages, page]);
        setNewPage({ name: "", identifier: "", type: "extension" });
        setIsCreating(false);
        setEditingPage(page);
    };

    const handleSave = () => {
        if (!editingPage) return;
        setPages(pages.map(p => p.id === editingPage.id ? editingPage : p));
        setEditingPage(null);
    };

    const handleDelete = (id: number) => {
        if (confirm("Permanently de-authorize this privacy manifest?")) {
            setPages(pages.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">Privacy <span className="text-primary">Console</span></h1>
                    <p className="text-muted-foreground/40 text-xs font-black uppercase tracking-[0.3em] mt-1">Compliance & Authorization Management</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/30 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5" />
                    Register Manifest
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Manifests", value: pages.length, icon: Shield },
                    { label: "Live Policies", value: pages.filter(p => p.status === "Published").length, icon: CheckCircle },
                    { label: "Direct URLs", value: pages.filter(p => p.mode === "url").length, icon: Globe },
                    { label: "Encrypted Content", value: pages.filter(p => p.mode === "content").length, icon: FileText },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 rounded-[2rem] border border-border group hover:border-primary/20 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-border group-hover:bg-primary/5 transition-colors">
                                <stat.icon className="w-6 h-6 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-3xl font-black tracking-tight">{stat.value}</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Create Modal */}
            <AnimatePresence>
                {isCreating && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full max-w-lg glass-card p-10 rounded-[2.5rem] border border-border shadow-2xl"
                        >
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Register New Asset Manifest</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-muted-foreground/40">Asset Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold"
                                        placeholder="e.g., SubhanOS v2"
                                        value={newPage.name}
                                        onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-muted-foreground/40">System Identifier</label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all font-mono text-zinc-400"
                                        placeholder="asset_uid_01"
                                        value={newPage.identifier}
                                        onChange={(e) => setNewPage({ ...newPage, identifier: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-muted-foreground/40">Classification</label>
                                    <select
                                        className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold cursor-pointer"
                                        value={newPage.type}
                                        onChange={(e) => setNewPage({ ...newPage, type: e.target.value as any })}
                                    >
                                        <option value="extension">Browser Extension</option>
                                        <option value="software">Desktop Software</option>
                                        <option value="general">General Protocol</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-6">
                                    <button onClick={() => setIsCreating(false)} className="flex-1 py-4 font-black uppercase tracking-widest text-xs border border-border rounded-2xl hover:bg-white/5">Abort</button>
                                    <button onClick={handleCreate} className="flex-1 py-4 font-black uppercase tracking-widest text-xs bg-primary text-primary-foreground rounded-2xl shadow-xl shadow-primary/20">Initialize</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* manifest List */}
            <div className="grid grid-cols-1 gap-6">
                {pages.map((page, i) => (
                    <motion.div
                        key={page.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 rounded-[2rem] border border-border bg-black/[0.01] hover:border-primary/40 transition-all group"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
                                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Shield className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="text-2xl font-black tracking-tight">{page.name}</h3>
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${page.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                                            }`}>
                                            {page.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                        <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/40 uppercase">{page.identifier}</p>
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">{page.mode === 'content' ? 'Internal Policy' : 'External Link'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={() => setEditingPage(page)} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border hover:border-primary hover:text-primary transition-all">
                                    <FileEdit className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDelete(page.id)} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border hover:border-red-500 hover:text-red-500 transition-all">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                {page.mode === 'url' && page.externalUrl && (
                                    <a href={page.externalUrl} target="_blank" className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* content Editor Modal */}
            <AnimatePresence>
                {editingPage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/80">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-full max-w-4xl glass-card p-12 rounded-[3rem] border border-border shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tight">Policy Configuration</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">Editing: {editingPage.name}</p>
                                </div>
                                <button onClick={() => setEditingPage(null)} className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                                <button
                                    onClick={() => setEditingPage({ ...editingPage, mode: 'content' })}
                                    className={`p-6 rounded-[2rem] border border-border flex flex-col items-center gap-3 transition-all ${editingPage.mode === 'content' ? 'bg-primary/10 border-primary text-primary shadow-xl shadow-primary/10' : 'hover:border-white/20'}`}
                                >
                                    <FileEdit className="w-6 h-6" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Write Policy</span>
                                </button>
                                <button
                                    onClick={() => setEditingPage({ ...editingPage, mode: 'url' })}
                                    className={`p-6 rounded-[2rem] border border-border flex flex-col items-center gap-3 transition-all ${editingPage.mode === 'url' ? 'bg-primary/10 border-primary text-primary shadow-xl shadow-primary/10' : 'hover:border-white/20'}`}
                                >
                                    <Link className="w-6 h-6" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">External URL</span>
                                </button>

                                <div className="md:col-span-2 flex flex-col justify-center">
                                    <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-muted-foreground/40">Policy Status</label>
                                    <select
                                        className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border font-bold text-sm"
                                        value={editingPage.status}
                                        onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as any })}
                                    >
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Needs Update">Needs Update</option>
                                    </select>
                                </div>
                            </div>

                            <div className="min-h-[300px] mb-10">
                                {editingPage.mode === 'content' ? (
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Policy Payload (Markdown Supported)</label>
                                        <textarea
                                            className="w-full h-80 px-8 py-6 rounded-3xl bg-black/10 dark:bg-white/[0.02] border border-border focus:border-primary outline-none transition-all font-mono text-sm leading-relaxed"
                                            placeholder="# Privacy Policy..."
                                            value={editingPage.content}
                                            onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Compliance Redirect URL</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <input
                                                type="url"
                                                className="w-full pl-16 pr-8 py-6 rounded-3xl bg-black/10 dark:bg-white/[0.02] border border-border focus:border-primary outline-none transition-all font-bold"
                                                placeholder="https://example.com/privacy"
                                                value={editingPage.externalUrl}
                                                onChange={(e) => setEditingPage({ ...editingPage, externalUrl: e.target.value })}
                                            />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground/40 font-medium">This will redirect users to an external authority for legal disclosure.</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full py-6 bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] text-xs rounded-3xl shadow-2xl shadow-primary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-4"
                            >
                                <Save className="w-6 h-6" />
                                Synchronize Manifest
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
