"use client";

import { Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-border relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h2 className="text-xl font-bold text-glow">SUBHAN<span className="text-foreground/20">.TECH</span></h2>
                    <p className="text-sm text-muted-foreground">© 2026 Neural Engineering Lab. All rights reserved.</p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/admin" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30 hover:text-foreground transition-colors border border-border px-3 py-1 rounded-full cursor-pointer">
                        Access HQ
                    </Link>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-border">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">System Online</span>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </footer>
    );
}
