"use client";

import { Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-border relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <h2 className="text-lg font-bold tracking-tight uppercase">SUBHAN<span className="opacity-20 text-foreground">.TECH</span></h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Neural Engineering Lab © 2026</p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/admin" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border border-border px-4 py-1.5 rounded-full bg-muted/50">
                        Access HQ
                    </Link>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                    </a>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">System Online</span>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </footer>
    );
}
