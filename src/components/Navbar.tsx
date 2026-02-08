"use client";

import { motion } from "framer-motion";
import { Search, Settings, User, Hexagon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-card flex items-center gap-8 px-6 py-3 rounded-2xl border border-white/10"
            >
                <Link href="/" className="flex items-center gap-2 group">
                    <Hexagon className="w-6 h-6 text-white transition-transform group-hover:rotate-180 duration-500" />
                    <span className="font-bold tracking-tight text-glow">subhan.tech</span>
                </Link>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-6">
                    <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
                    <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
                    <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                    <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
                    <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Search className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </motion.div>
        </nav>
    );
}
