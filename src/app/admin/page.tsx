"use client";

import { motion } from "framer-motion";
import {
    Activity, Users, MousePointer2, Clock,
    ArrowUpRight, ArrowDownRight, MoreHorizontal,
    ChevronRight, Sparkles
} from "lucide-react";
import {
    XAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const data = [
    { name: 'Mon', visits: 2400 },
    { name: 'Tue', visits: 1398 },
    { name: 'Wed', visits: 9800 },
    { name: 'Thu', visits: 3908 },
    { name: 'Fri', visits: 4800 },
    { name: 'Sat', visits: 3800 },
    { name: 'Sun', visits: 4300 },
];

export default function AdminOverview() {
    const stats = [
        { label: "Total Asset Traffic", value: "128.4k", change: "+14.2%", icon: Activity, trend: "up" },
        { label: "Active Extensions", value: "24.1k", change: "+5.1%", icon: MousePointer2, trend: "up" },
        { label: "Unique Syncs", value: "3,842", change: "-2.4%", icon: Users, trend: "down" },
        { label: "Avg. Latency", value: "142ms", change: "-12ms", icon: Clock, trend: "up" },
    ];

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Command Overview</h1>
                    <p className="text-muted-foreground/60">Real-time status of your neural infrastructure and assets.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95">
                    <Sparkles className="w-4 h-4" />
                    Generate Intelligence Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: i * 0.1,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="p-8 rounded-3xl border border-border bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md hover:border-primary/40 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border group-hover:border-primary/20 group-hover:bg-primary/10 transition-all">
                                <stat.icon className="w-6 h-6 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                            </div>
                            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${stat.trend === "up"
                                    ? "bg-green-500/10 text-green-500 border border-green-500/10"
                                    : "bg-red-500/10 text-red-500 border border-red-500/10"
                                }`}>
                                {stat.change}
                                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <p className="text-muted-foreground/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                            <p className="text-4xl font-black tracking-tight group-hover:text-primary transition-colors">
                                {stat.value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 p-8 rounded-3xl border border-border bg-black/[0.01] dark:bg-white/[0.03] backdrop-blur-sm relative overflow-hidden h-[450px]"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Activity className="w-64 h-64 text-primary" />
                    </div>

                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                            <h3 className="text-2xl font-black tracking-tight mb-2">Network Traffic Telemetry</h3>
                            <p className="text-muted-foreground/40 text-sm font-medium tracking-wide">Real-time engagement across high-performance nodes.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-border border-2 border-background flex items-center justify-center text-[10px] font-bold">
                                        N{i}
                                    </div>
                                ))}
                            </div>
                            <select className="bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-2 text-xs font-bold outline-none text-foreground focus:border-primary transition-all">
                                <option className="dark:bg-background">Live Feed</option>
                                <option className="dark:bg-background">Historical View</option>
                            </select>
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                                    className="opacity-40 uppercase tracking-widest"
                                />
                                <Tooltip
                                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '16px',
                                        padding: '12px',
                                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{
                                        color: 'hsl(var(--primary))',
                                        fontWeight: 800,
                                        fontSize: '12px',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <div className="p-8 rounded-2xl border border-border bg-black/[0.01] dark:bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Recent Operations</h3>
                        <MoreHorizontal className="w-5 h-5 text-muted-foreground/20" />
                    </div>
                    <div className="space-y-6">
                        {[
                            { node: "extension_v2", action: "Build Success", time: "2m ago", status: "success" },
                            { node: "subhan_tech", action: "DDoS Mitigation", time: "14m ago", status: "warning" },
                            { node: "neural_api", action: "Deploying Kernel", time: "1h ago", status: "pending" },
                            { node: "lootops_bot", action: "Sync Completed", time: "3h ago", status: "success" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" :
                                    item.status === "warning" ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]" : "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.4)]"
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-sm font-bold leading-none mb-1">{item.action}</p>
                                    <p className="text-xs text-muted-foreground/40">{item.node}</p>
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground/20">{item.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-muted-foreground/60 border border-border">
                        View All Logs <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Decorative */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-10 rounded-2xl bg-gradient-to-br from-black/[0.02] to-transparent dark:from-white/10 dark:to-transparent border border-border flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 rounded-3xl bg-black/5 dark:bg-white/10 flex items-center justify-center border border-border shadow-2xl">
                        <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-2">Neural Engine v2.0 Ready</h2>
                        <p className="text-muted-foreground/60 text-sm mb-6">Upgrade your kernel to access advanced telemetry and real-time biometric tracking across your extensions.</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <button className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg text-sm shadow-lg shadow-primary/20">Upgrade Now</button>
                            <button className="px-6 py-2 border border-border rounded-lg text-sm font-bold text-muted-foreground/60 hover:text-foreground transition-colors">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
