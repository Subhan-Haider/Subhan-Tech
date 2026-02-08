"use client";

import { motion } from "framer-motion";
import { ExternalLink, Chrome, Sidebar, Globe } from "lucide-react";

interface ExtensionCardProps {
    name: string;
    description: string;
    url: string;
    platform: "chrome" | "edge" | "firefox" | "all";
    image?: string;
}

export function ExtensionCard({ name, description, url, platform }: ExtensionCardProps) {
    const getIcon = () => {
        switch (platform) {
            case "chrome": return <Chrome className="w-6 h-6" />;
            case "edge": return <Sidebar className="w-6 h-6" />;
            case "firefox": return <Globe className="w-6 h-6" />;
            default: return <Chrome className="w-6 h-6" />;
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-[2rem] p-8 relative overflow-hidden group border border-border hover:border-primary/20 transition-all"
        >
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border group-hover:border-primary/20 group-hover:bg-primary/5 transition-all group-hover:rotate-6">
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {getIcon()}
                    </div>
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border hover:bg-primary hover:text-white transition-all text-muted-foreground/40"
                >
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-muted-foreground/80 dark:text-muted-foreground/60 text-sm leading-relaxed mb-8">{description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/10">
                        {platform} platform
                    </span>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-border" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative subtle gradient */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors" />
        </motion.div>
    );
}
