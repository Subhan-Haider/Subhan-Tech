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
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-border hover:border-primary/20 transition-all shadow-sm"
        >
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border group-hover:bg-primary/5 transition-all">
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {getIcon()}
                    </div>
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border hover:bg-primary hover:text-white transition-all text-muted-foreground/40"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/10">
                        {platform}
                    </span>
                    <div className="flex -space-x-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-5 h-5 rounded-full border-2 border-background bg-muted" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
