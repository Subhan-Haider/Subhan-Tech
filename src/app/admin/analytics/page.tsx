"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3, TrendingUp, Download,
    Eye, Activity,
    Clock, Smartphone, Globe, Code2, Package
} from "lucide-react";
import { useState, useEffect } from "react";
import { eventService, SystemEvent } from "@/lib/services/events";

export default function AnalyticsDashboard() {
    const [events, setEvents] = useState<SystemEvent[]>([]);

    const fetchData = async () => {
        const data = await eventService.getRecent(500);
        setEvents(data);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30s pulse
        return () => clearInterval(interval);
    }, []);

    const stats = {
        totalViews: events.filter(e => e.type === "view").length,
        totalDownloads: events.filter(e => e.type === "download").length,
        totalInstalls: events.filter(e => e.type === "install").length,
        engagementRate: Math.round((events.filter(e => e.type === "download").length / (events.filter(e => e.type === "view").length || 1)) * 100)
    };

    const typeIcons = {
        software: <Package className="w-4 h-4" />,
        extension: <Code2 className="w-4 h-4" />,
        download: <Download className="w-4 h-4" />,
        view: <Eye className="w-4 h-4" />,
        install: <Activity className="w-4 h-4" />
    };

    return (
        <div className="space-y-10">
            {/* Intel Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tight flex items-center gap-4">
                        <BarChart3 className="w-10 h-10 text-primary" />
                        Neural <span className="text-primary">Intelligence</span>
                    </h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mt-1 text-glow">Real-time Signal Analysis & Engagement Telemetry</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Feed Active
                    </div>
                </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Signal Impressions", value: stats.totalViews.toLocaleString(), icon: Eye, color: "blue" },
                    { label: "Asset Extractions", value: stats.totalDownloads.toLocaleString(), icon: Download, color: "emerald" },
                    { label: "Neural Integrations", value: stats.totalInstalls.toLocaleString(), icon: Activity, color: "amber" },
                    { label: "Protocol Intensity", value: `${stats.engagementRate}%`, icon: TrendingUp, color: "primary" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-[2rem] border border-border flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">{stat.label}</p>
                            <stat.icon className={`w-4 h-4 opacity-30`} style={{ color: `var(--${stat.color})` }} />
                        </div>
                        <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Real-time Event Stream */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card rounded-[2.5rem] border border-border overflow-hidden">
                        <div className="p-8 border-b border-border bg-black/5 dark:bg-white/5">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                                <Activity className="w-4 h-4 text-primary" /> Live Signal Stream
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border bg-black/[0.01]">
                                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/20">Protocol</th>
                                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/20">Target Asset</th>
                                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/20">Extraction ID</th>
                                        <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/20 text-right">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {events.slice(0, 50).map((event, i) => (
                                            <motion.tr
                                                key={event.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="border-b border-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${event.type === 'download' ? 'bg-emerald-500/10 text-emerald-500' :
                                                            event.type === 'view' ? 'bg-blue-500/10 text-blue-500' :
                                                                'bg-amber-500/10 text-amber-500'
                                                            }`}>
                                                            {typeIcons[event.type as keyof typeof typeIcons]}
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-tight">{event.type}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="font-bold text-xs">{event.productName}</p>
                                                    <p className="text-[10px] text-muted-foreground/40 font-mono">{event.productId.slice(0, 8)}...</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-3 h-3 text-muted-foreground/20" />
                                                        <span className="text-[10px] font-mono text-muted-foreground/60">NODE-{Math.floor(Math.random() * 9999)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="text-[10px] font-black uppercase text-muted-foreground/30">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Device & Platform Breakdown (Mock logic for UI demo) */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 rounded-[2.5rem] border border-border"
                    >
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 border-b border-border pb-6 flex items-center justify-between">
                            Device Distribution <Smartphone className="w-4 h-4 text-primary" />
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: "Synapse Desktop", value: 72, color: "primary" },
                                { label: "Neural Mobile", value: 18, color: "emerald" },
                                { label: "Virtual Environments", value: 10, color: "amber" }
                            ].map(item => (
                                <div key={item.label} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                                        <span>{item.label}</span>
                                        <span className="text-primary">{item.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full bg-${item.color}`} style={{ width: `${item.value}%`, backgroundColor: `var(--${item.color})` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20"
                    >
                        <div className="flex gap-4">
                            <Globe className="w-6 h-6 text-indigo-500 shrink-0" />
                            <div>
                                <p className="text-xs font-black uppercase tracking-tight text-indigo-500 mb-1">Global Presence</p>
                                <p className="text-[10px] text-indigo-500/70 font-medium leading-relaxed">
                                    Signals detected from 24 countries. Primary node concentration in North America and Western Europe.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
