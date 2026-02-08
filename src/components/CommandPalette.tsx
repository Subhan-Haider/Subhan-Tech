"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Globe } from "lucide-react";
import { EXTENSIONS, SOFTWARE, WEBSITES, TOOLS } from "@/data/config";

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const results = [
        ...SOFTWARE.map(s => ({ ...s, type: 'Software' })),
        ...EXTENSIONS.map(e => ({ ...e, type: 'Extension' })),
        ...TOOLS.map(t => ({ ...t, type: 'Tool' })),
        ...WEBSITES.map(w => ({ ...w, type: 'Link' })),
    ].filter(item => {
        const searchStr = query.toLowerCase();
        const hasDescription = 'description' in item && typeof item.description === 'string';
        return item.name.toLowerCase().includes(searchStr) || (hasDescription && item.description!.toLowerCase().includes(searchStr));
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-black/40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="w-full max-w-2xl glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-4 py-3 border-b border-white/5">
                            <Search className="w-5 h-5 text-muted-foreground mr-3" />
                            <input
                                autoFocus
                                placeholder="Search across the neural hub... (Extensions, Apps, Links)"
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-muted-foreground"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/5">
                                <span className="text-[10px] text-muted-foreground font-mono">ESC</span>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                            {results.length > 0 ? (
                                <div className="space-y-1">
                                    {results.map((item, i) => (
                                        <button
                                            key={item.name}
                                            autoFocus={i === 0}
                                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                                    {'icon' in item ? <item.icon className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <p className="text-[10px] text-muted-foreground line-clamp-1">
                                                        {('description' in item ? item.description : item.url)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold px-2 py-1 rounded bg-white/5">
                                                {item.type}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-sm text-muted-foreground">No neural matches found.</p>
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest font-bold">
                            <div className="flex gap-4">
                                <span>↑↓ Navigate</span>
                                <span>↵ Select</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Command className="w-3 h-3" />
                                <span>K to toggle</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
