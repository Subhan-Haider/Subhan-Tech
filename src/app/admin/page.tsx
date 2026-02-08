"use client";

import { motion } from "framer-motion";
import {
    Activity, Users, MousePointer2, Clock,
    ArrowUpRight, ArrowDownRight, MoreHorizontal,
    ChevronRight, Sparkles
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
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
                    <p className="text-white/40">Real-time status of your neural infrastructure and assets.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all text-sm">
                    Download Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                <stat.icon className="w-5 h-5 text-white/60" />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold ${stat.trend === "up" ? "text-green-500" : "text-red-500"
                                }`}>
                                {stat.change}
                                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </span>
                        </div>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden h-[400px]">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Traffic Distribution</h3>
                            <p className="text-white/40 text-sm">Weekly engagement across all platforms.</p>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ffffff20', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="visits" stroke="#ffffff" fillOpacity={1} fill="url(#colorVisits)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Recent Operations</h3>
                        <MoreHorizontal className="w-5 h-5 text-white/20" />
                    </div>
                    <div className="space-y-6">
                        {[
                            { node: "extension_v2", action: "Build Success", time: "2m ago", status: "success" },
                            { node: "subhan_tech", action: "DDoS Mitigation", time: "14m ago", status: "warning" },
                            { node: "neural_api", action: "Deploying Kernel", time: "1h ago", status: "pending" },
                            { node: "lootops_bot", action: "Sync Completed", time: "3h ago", status: "success" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-green-500" :
                                        item.status === "warning" ? "bg-yellow-500" : "bg-blue-500"
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-sm font-bold leading-none mb-1">{item.action}</p>
                                    <p className="text-xs text-white/40">{item.node}</p>
                                </div>
                                <span className="text-[10px] font-bold text-white/20">{item.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-white/60">
                        View All Logs <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Decorative */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-10 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center border border-white/20 shadow-2xl">
                        <Sparkles className="w-10 h-10" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-2">Neural Engine v2.0 Ready</h2>
                        <p className="text-white/60 text-sm mb-6">Upgrade your kernel to access advanced telemetry and real-time biometric tracking across your extensions.</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <button className="px-6 py-2 bg-white text-black font-bold rounded-lg text-sm">Upgrade Now</button>
                            <button className="px-6 py-2 border border-white/10 rounded-lg text-sm font-bold text-white/60">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
