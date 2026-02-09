"use client";

import { useEffect, useState } from "react";
import { systemService, SystemConfig } from "@/lib/services/system";
import { ShieldAlert, Cpu, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SystemGuard({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<SystemConfig | null>(null);

    useEffect(() => {
        return systemService.subscribe((c) => setConfig(c));
    }, []);

    if (config?.lockdownMode) {
        return (
            <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl space-y-10 relative"
                >
                    <div className="relative inline-block">
                        <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="w-24 h-24 rounded-[2.5rem] bg-background border border-border flex items-center justify-center relative shadow-2xl">
                            <Lock className="w-10 h-10 text-primary" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter">Emergency <span className="text-primary">Lockdown</span></h1>
                        <div className="flex items-center justify-center gap-2 text-primary/50 text-[10px] font-black uppercase tracking-[0.4em]">
                            <ShieldAlert className="w-3 h-3" /> System Restricted <ShieldAlert className="w-3 h-3" />
                        </div>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                        {config.maintenanceMessage || "The neural network is currently undergoing a critical synchronization phase. Direct access is restricted by the administrator."}
                    </p>

                    <div className="pt-8 flex flex-col items-center gap-6">
                        <div className="h-[1px] w-24 bg-border" />
                        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-border">
                            <Cpu className="w-4 h-4 text-muted-foreground/30 animate-spin" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Pulse Monitoring Active</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            {config?.globalNotice && (
                <div className="fixed top-0 left-0 w-full z-[100] bg-primary text-primary-foreground py-2 text-[10px] font-black uppercase tracking-[0.2em] text-center shadow-lg">
                    {config.globalNotice}
                </div>
            )}
            {children}
        </>
    );
}
