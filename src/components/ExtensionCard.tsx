"use client";

import { motion } from "framer-motion";
import { ExternalLink, Chrome, Sidebar, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtensionCardProps {
    name: string;
    description: string;
    url: string;
    platform: "chrome" | "edge" | "firefox" | "all";
    image?: string;
}

export function ExtensionCard({ name, description, url, platform, image }: ExtensionCardProps) {
    const getIcon = () => {
        switch (platform) {
            case "chrome": return <Chrome className="w-5 h-5" />;
            case "edge": return <Sidebar className="w-5 h-5" />;
            case "firefox": return <Globe className="w-5 h-5" />;
            default: return <Chrome className="w-5 h-5" />;
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden group border-glow"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                    {getIcon()}
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-glow">{name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>

            <div className="mt-6 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-white/40 px-2 py-1 rounded bg-white/5 border border-white/5">
                    {platform}
                </span>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
        </motion.div>
    );
}
