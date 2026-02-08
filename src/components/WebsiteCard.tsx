"use client";

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

interface WebsiteCardProps {
    name: string;
    url: string;
    category: string;
}

export function WebsiteCard({ name, url, category }: WebsiteCardProps) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-border hover:border-primary/20 transition-all group"
        >
            <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors border border-border group-hover:border-primary/20">
                <Link2 className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all group-hover:rotate-12" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-base tracking-tight group-hover:text-primary transition-colors">{name}</h4>
                <p className="text-[9px] text-muted-foreground/50 uppercase tracking-[0.2em] font-black">{category}</p>
            </div>
        </motion.a>
    );
}
