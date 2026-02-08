"use client";

import { motion } from "framer-motion";
import {
    Plus, Edit3, Trash2, Eye, FileText,
    Shield, CheckCircle, AlertCircle
} from "lucide-react";
import { useState } from "react";


interface PrivacyPage {
    id: number;
    extensionName: string;
    extensionId: string;
    status: "Published" | "Draft" | "Needs Update";
    lastUpdated: string;
    dataCollected: string[];
    permissions: string[];
}

export default function PrivacyPagesManager() {
    const [pages, setPages] = useState<PrivacyPage[]>([
        {
            id: 1,
            extensionName: "CodeLens",
            extensionId: "chrome_codelens_v2",
            status: "Published",
            lastUpdated: "2026-02-05",
            dataCollected: ["Usage statistics", "Error logs"],
            permissions: ["activeTab", "storage"],
        },
        {
            id: 2,
            extensionName: "LootOps Tracker",
            extensionId: "chrome_lootops_v1",
            status: "Published",
            lastUpdated: "2026-01-28",
            dataCollected: ["Game data", "User preferences"],
            permissions: ["storage", "tabs", "webRequest"],
        },
        {
            id: 3,
            extensionName: "Neural Assistant",
            extensionId: "chrome_neural_v1",
            status: "Draft",
            lastUpdated: "2026-02-07",
            dataCollected: ["None"],
            permissions: ["activeTab"],
        },
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [newPage, setNewPage] = useState({
        extensionName: "",
        extensionId: "",
    });

    const handleCreate = () => {
        const page: PrivacyPage = {
            id: pages.length + 1,
            extensionName: newPage.extensionName,
            extensionId: newPage.extensionId,
            status: "Draft",
            lastUpdated: new Date().toISOString().split('T')[0],
            dataCollected: [],
            permissions: [],
        };
        setPages([...pages, page]);
        setNewPage({ extensionName: "", extensionId: "" });
        setIsCreating(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this privacy page?")) {
            setPages(pages.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Pages Manager</h1>
                    <p className="text-muted-foreground/60">Create and manage privacy policies for browser extensions.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10"
                >
                    <Plus className="w-5 h-5" />
                    Create Privacy Page
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Pages", value: pages.length, icon: FileText },
                    { label: "Published", value: pages.filter(p => p.status === "Published").length, icon: CheckCircle },
                    { label: "Drafts", value: pages.filter(p => p.status === "Draft").length, icon: Edit3 },
                    { label: "Needs Update", value: pages.filter(p => p.status === "Needs Update").length, icon: AlertCircle },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-border bg-black/[0.02] dark:bg-white/[0.02]"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                                <stat.icon className="w-5 h-5 text-muted-foreground/60" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">{stat.label}</p>
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Create Form */}
            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-8 rounded-2xl border border-border bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden"
                >
                    <h2 className="text-2xl font-bold mb-6">Create New Privacy Page</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-muted-foreground/60">Extension Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-foreground"
                                placeholder="e.g., CodeLens"
                                value={newPage.extensionName}
                                onChange={(e) => setNewPage({ ...newPage, extensionName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-muted-foreground/60">Extension ID</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-foreground"
                                placeholder="chrome_extension_v1"
                                value={newPage.extensionId}
                                onChange={(e) => setNewPage({ ...newPage, extensionId: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setIsCreating(false)}
                                className="flex-1 px-6 py-3 border border-border rounded-xl font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all text-foreground"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10"
                            >
                                Create Page
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Privacy Pages List */}
            <div className="space-y-4">
                {pages.map((page, i) => (
                    <motion.div
                        key={page.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-border bg-black/10 dark:bg-white/[0.02] hover:border-primary/20 transition-all"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-xl font-bold">{page.extensionName}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${page.status === "Published" ? "bg-green-500/20 text-green-500" :
                                        page.status === "Draft" ? "bg-yellow-500/20 text-yellow-500" :
                                            "bg-red-500/20 text-red-500"
                                        }`}>
                                        {page.status}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground/40 mb-3">Extension ID: <code className="text-blue-400">{page.extensionId}</code></p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Data Collected</p>
                                        <div className="flex flex-wrap gap-2">
                                            {page.dataCollected.length > 0 ? page.dataCollected.map((data, idx) => (
                                                <span key={idx} className="px-2 py-1 rounded bg-black/5 dark:bg-white/5 text-xs text-muted-foreground/60 border border-border">
                                                    {data}
                                                </span>
                                            )) : <span className="text-xs text-muted-foreground/40">None</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Permissions</p>
                                        <div className="flex flex-wrap gap-2">
                                            {page.permissions.map((perm, idx) => (
                                                <span key={idx} className="px-2 py-1 rounded bg-blue-500/10 text-xs text-blue-400 border border-blue-500/10">
                                                    {perm}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground/40">Last updated: {page.lastUpdated}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground/40 hover:text-foreground">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground/40 hover:text-foreground">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(page.id)}
                                    className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-muted-foreground/40 hover:text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-border rounded-lg text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-foreground">
                                    Generate Policy
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Template Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 rounded-2xl border border-border"
            >
                <h2 className="text-2xl font-bold mb-4">Privacy Policy Template</h2>
                <p className="text-muted-foreground/60 mb-4">
                    Our privacy policy generator automatically creates compliant policies based on:
                </p>
                <ul className="space-y-2 text-muted-foreground/60">
                    <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Chrome Web Store requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>GDPR compliance guidelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Extension permissions and data usage</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>User rights and data handling procedures</span>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}
