"use client";

import { useState, useEffect } from "react";
import {
    extensionService, ExtensionProfile
} from "@/lib/services/extensions";
import {
    Plus, Globe,
    Shield, ListTodo, LinkIcon,
    RefreshCcw, Settings2
} from "lucide-react";
import { motion } from "framer-motion";
import { SurveyBuilder } from "@/components/admin/SurveyBuilder";
import { LegalPageBuilder } from "@/components/admin/LegalPageBuilder";

export default function ExtensionManager() {
    const [extensions, setExtensions] = useState<ExtensionProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeExtension, setActiveExtension] = useState<ExtensionProfile | null>(null);
    const [mode, setMode] = useState<"list" | "edit" | "survey" | "privacy">("list");

    const fetchExtensions = async () => {
        setLoading(true);
        const data = await extensionService.getAll();
        setExtensions(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchExtensions();
    }, []);

    const handleCreate = async () => {
        const name = prompt("Extension Name:");
        if (!name) return;
        const chromeId = prompt("Chrome Extension ID:");
        if (!chromeId) return;

        const id = await extensionService.create({
            name,
            chromeId,
            status: "active",
            urls: {}
        });
        fetchExtensions();
    };

    if (mode === "survey" && activeExtension) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tight">Survey <span className="text-primary">Architect</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mt-1">Design completion flow for {activeExtension.name}</p>
                </div>
                <SurveyBuilder
                    onSave={(qs) => {
                        console.log("Saving survey for", activeExtension.id, qs);
                        setMode("list");
                    }}
                    onCancel={() => setMode("list")}
                />
            </div>
        );
    }

    if (mode === "privacy" && activeExtension) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tight">Legal <span className="text-primary">Compliance</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mt-1">Generate policy for {activeExtension.name}</p>
                </div>
                <LegalPageBuilder
                    initialPage={{
                        config: {
                            extensionName: activeExtension.name,
                            companyName: "Subhan Neural Ops",
                            contactEmail: "privacy@subhan.tech"
                        }
                    }}
                    onSave={(page) => {
                        console.log("Saving legal for", activeExtension.id, page);
                        setMode("list");
                    }}
                    onCancel={() => setMode("list")}
                />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tight">Extension <span className="text-primary">Control</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mt-1">Lifecycle, Surveys & Compliance Dashboard</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5" />
                    Initialize Extension
                </button>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <RefreshCcw className="w-6 h-6 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {extensions.map((ext) => (
                        <motion.div
                            key={ext.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-[2rem] p-8 border border-border group hover:border-primary/20 transition-all relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                                    <Globe className="w-6 h-6 text-primary" />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${ext.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                                    }`}>
                                    {ext.status}
                                </div>
                            </div>

                            <div className="space-y-1 mb-8">
                                <h3 className="text-2xl font-black tracking-tight">{ext.name}</h3>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest font-mono opacity-50">ID: {ext.chromeId.substring(0, 12)}...</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { setActiveExtension(ext); setMode("survey"); }}
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group/btn"
                                >
                                    <ListTodo className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Surveys</span>
                                </button>
                                <button
                                    onClick={() => { setActiveExtension(ext); setMode("privacy"); }}
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group/btn"
                                >
                                    <Shield className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Legal</span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group/btn"
                                >
                                    <LinkIcon className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Router</span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group/btn"
                                >
                                    <Settings2 className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Config</span>
                                </button>
                            </div>

                            {/* Background decoration */}
                            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
