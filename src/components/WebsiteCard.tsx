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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5 hover:border-white/20 transition-all group"
        >
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Link2 className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            </div>
            <div className="flex-1">
                <h4 className="font-medium text-sm group-hover:text-glow">{name}</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{category}</p>
            </div>
        </motion.a>
    );
}
