"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, AlertTriangle, CheckCircle2, Search, Filter, Download } from "lucide-react";
import { useState } from "react";

const INITIAL_LOGS = [
    { id: 1, type: "info", message: "User subhan_admin logged in from 192.168.1.1", timestamp: "2026-02-07 23:45:12", icon: Shield },
    { id: 2, type: "success", message: "Project 'Neural Dev Kit' updated successfully", timestamp: "2026-02-07 23:40:05", icon: CheckCircle2 },
    { id: 3, type: "warning", message: "High latency detected in extension sync worker", timestamp: "2026-02-07 23:35:18", icon: AlertTriangle },
    { id: 4, type: "error", message: "Failed API request: /api/v1/auth/verify - 403 Forbidden", timestamp: "2026-02-07 23:30:44", icon: AlertTriangle },
    { id: 5, type: "info", message: "New coupon code 'WELCOME2026' created", timestamp: "2026-02-07 23:25:00", icon: Terminal },
];

export default function AdminLogs() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">System Logs</h1>
                    <p className="text-white/40">Real-time audit trail and system performance metrics.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-colors">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-xl flex-1 group focus-within:border-white/20 transition-all w-full md:w-auto">
                    <Search className="w-4 h-4 text-white/20 group-focus-within:text-white/60" />
                    <input
                        placeholder="Search logs, events, or addresses..."
                        className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/20 transition-all">
                        Clear Logs
                    </button>
                </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="p-6 font-mono text-sm space-y-4">
                    {INITIAL_LOGS.map((log, i) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5 group"
                        >
                            <div className={`p-2 rounded-lg ${log.type === 'info' ? 'bg-blue-500/10 text-blue-500' :
                                log.type === 'success' ? 'bg-green-500/10 text-green-500' :
                                    log.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-red-500/10 text-red-500'
                                }`}>
                                <log.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${log.type === 'info' ? 'text-blue-500' :
                                        log.type === 'success' ? 'text-green-500' :
                                            log.type === 'warning' ? 'text-yellow-500' :
                                                'text-red-500'
                                        }`}>{log.type}</span>
                                    <span className="text-[10px] text-white/20 font-bold">{log.timestamp}</span>
                                </div>
                                <p className="text-white/80 group-hover:text-white transition-colors">{log.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center text-xs font-bold text-white/20 uppercase tracking-widest px-4">
                <p>Real-time stream active</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>System Nominal</span>
                </div>
            </div>
        </div>
    );
}
