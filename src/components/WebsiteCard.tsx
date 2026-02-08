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
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 p-4 glass-card rounded-2xl border border-border hover:border-primary/20 transition-all group shadow-sm"
        >
            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary/5 transition-colors border border-border">
                <Link2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{name}</h4>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">{category}</p>
            </div>
        </motion.a>
    );
}
