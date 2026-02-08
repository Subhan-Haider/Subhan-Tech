"use client";

import { Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-border relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h2 className="text-xl font-black tracking-tight uppercase">SUBHAN<span className="text-foreground/20 dark:text-foreground/10">.TECH</span></h2>
                    <p className="text-xs font-medium text-muted-foreground/80 dark:text-muted-foreground">© 2026 Neural Engineering Lab. All rights reserved.</p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/admin" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 dark:text-muted-foreground/30 hover:text-primary transition-all border border-border px-4 py-1.5 rounded-full cursor-pointer bg-black/5 dark:bg-white/5">
                        Access HQ
                    </Link>
                    <a href="#" className="text-muted-foreground/60 hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground/60 hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground/60 hover:text-primary transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-border shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">System Online</span>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </footer>
    );
}
