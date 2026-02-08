"use client";

import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Minimize2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const INITIAL_LINES = [
    "Initializing SubhanOS v1.0.4...",
    "Loading neural kernels...",
    "Establishing secure handshake with subhan.tech...",
    "Network: Stable [124ms latency]",
    "System: Ready.",
];

export function LiveTerminal() {
    const [isOpen, setIsOpen] = useState(true);
    const [lines, setLines] = useState<string[]>(INITIAL_LINES);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    // Simulate incoming "system logs"
    useEffect(() => {
        const interval = setInterval(() => {
            const logs = [
                `Incoming request from node_${Math.floor(Math.random() * 999)}`,
                `Analyzing extension performance metrics...`,
                `Cache cleared: 0.4s`,
                `Neural sync completed at ${new Date().toLocaleTimeString()}`,
                `Ping: ${Math.floor(Math.random() * 50 + 20)}ms`,
            ];
            setLines(prev => [...prev, logs[Math.floor(Math.random() * logs.length)]].slice(-10));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!isOpen) return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 glass-card rounded-full hover:border-border transition-all z-40"
        >
            <TerminalIcon className="w-6 h-6 text-foreground" />
        </button>
    );

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 glass-card rounded-2xl overflow-hidden shadow-2xl z-40"
        >
            <div className="flex items-center justify-between px-4 py-2 bg-black/5 dark:bg-white/5 border-b border-border">
                <div className="flex items-center gap-2">
                    <TerminalIcon className="w-3 h-3 text-muted-foreground/60" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Neural Console</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsOpen(false)} className="hover:text-foreground text-muted-foreground/60 transition-colors">
                        <Minimize2 className="w-3 h-3" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="p-4 h-48 overflow-y-auto font-mono text-[10px] space-y-1 selection:bg-primary/20"
            >
                {lines.map((line, i) => (
                    <div key={i} className="flex gap-2">
                        <span className="text-muted-foreground/40">{">"}</span>
                        <span className={i === lines.length - 1 ? "text-foreground" : "text-muted-foreground"}>{line}</span>
                    </div>
                ))}
                <div className="flex gap-2 text-muted-foreground">
                    <span className="text-muted-foreground/40">{">"}</span>
                    <span className="w-2 h-4 bg-primary/40 animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
}
