"use client";

import { motion } from "framer-motion";
import {
    Settings, Bell, Save, Lock,
    AlertTriangle, Terminal
} from "lucide-react";
import { useState, useEffect } from "react";
import { systemService, SystemConfig } from "@/lib/services/system";
import { auditService, AuditLog } from "@/lib/services/audit";

export default function SettingsPage() {
    const [config, setConfig] = useState<SystemConfig>({
        lockdownMode: false,
        maintenanceMessage: "",
        globalNotice: ""
    });
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

    const fetchData = async () => {
        const [c, logs] = await Promise.all([
            systemService.getConfig(),
            auditService.getRecent(10)
        ]);
        setConfig(c);
        setAuditLogs(logs);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        await systemService.updateConfig(config);
        alert("Neural configuration updated.");
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tight flex items-center gap-4">
                        <Settings className="w-10 h-10 text-primary" />
                        System <span className="text-primary">Intel</span>
                    </h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mt-1">Core Architecture & Protocol Management</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                >
                    <Save className="w-4 h-4" />
                    Commit Protocol
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Protocol Controls */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Emergency Kill Switch */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className={`p-10 rounded-[2.5rem] border ${config.lockdownMode ? 'bg-red-500/10 border-red-500/30' : 'bg-black/5 dark:bg-white/5 border-border'} transition-all`}
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${config.lockdownMode ? 'bg-red-500 text-white' : 'bg-black/10 dark:bg-white/10 text-muted-foreground'}`}>
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-tight">Emergency Lockdown</h3>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${config.lockdownMode ? 'text-red-500' : 'text-muted-foreground/40'}`}>
                                        {config.lockdownMode ? 'Active Mitigation Protocol' : 'Standby Protocol'}
                                    </p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={config.lockdownMode}
                                    onChange={(e) => setConfig({ ...config, lockdownMode: e.target.checked })}
                                />
                                <div className="w-16 h-8 bg-black/10 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary-foreground after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-foreground after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                            </label>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Mitigation Message (Maintenance Text)</label>
                                <textarea
                                    className="w-full h-24 bg-black/5 dark:bg-white/5 border border-border rounded-2xl px-5 py-4 text-xs font-medium outline-none focus:border-red-500/50 transition-all"
                                    placeholder="Explain the restriction to users..."
                                    value={config.maintenanceMessage}
                                    onChange={(e) => setConfig({ ...config, maintenanceMessage: e.target.value })}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Global Notifications */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-10 rounded-[2.5rem] border border-border"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                                <Bell className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-tight">Global Signal Notice</h3>
                                <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest">Site-wide Announcement Banner</p>
                            </div>
                        </div>
                        <input
                            type="text"
                            className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border outline-none focus:border-primary transition-all text-xs font-bold"
                            placeholder="e.g. Critical extension update available. Deploying version 2.4.0..."
                            value={config.globalNotice}
                            onChange={(e) => setConfig({ ...config, globalNotice: e.target.value })}
                        />
                    </motion.div>
                </div>

                {/* Audit & Logs Sidecar */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card rounded-[2.5rem] border border-border overflow-hidden flex flex-col h-full"
                    >
                        <div className="p-8 border-b border-border bg-black/5 dark:bg-white/5 flex items-center justify-between">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-primary" /> Audit Logs
                            </h3>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 max-h-[600px] custom-scrollbar">
                            {auditLogs.map((log, i) => (
                                <div key={log.id} className="relative pl-6 border-l-2 border-border group">
                                    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
                                    <p className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest mb-1">
                                        {new Date(log.timestamp).toLocaleTimeString()}
                                    </p>
                                    <p className="text-xs font-bold leading-relaxed mb-1">
                                        <span className="text-primary">{log.adminName}</span> {log.action.toLowerCase().replace('_', ' ')}: {log.targetName}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground opacity-50 font-medium italic">{log.details}</p>
                                </div>
                            ))}
                        </div>
                        <button className="p-6 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 border-t border-border hover:text-primary transition-colors bg-black/5 dark:bg-white/5">
                            View Full History
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-[2rem] bg-amber-500/10 border border-amber-500/20"
                    >
                        <div className="flex gap-4">
                            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                            <div>
                                <p className="text-xs font-black uppercase tracking-tight text-amber-500 mb-1">Warning: Core Stability</p>
                                <p className="text-[10px] text-amber-500/70 font-medium leading-relaxed">
                                    Changes to system protocols are immediate and affects all connected users. Verify all mitigation messages before commitment.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
