"use client";

import { useState } from "react";
import { Database, RefreshCcw } from "lucide-react";
import { seedDatabase } from "@/scripts/seedProducts";
import { CRUDTable } from "@/components/admin/CRUDTable";
import { TOOLS } from "@/data/config";

export default function AdminTools() {
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        if (!confirm("This will synchronize static data to Firestore. Continue?")) return;
        setIsSeeding(true);
        try {
            await seedDatabase();
            alert("Database synchronized successfully!");
        } catch (error) {
            console.error(error);
            alert("Synchronization failed.");
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black uppercase italic">System <span className="text-primary">Tools</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">Advanced Utility Management</p>
                </div>
                <button
                    onClick={handleSeed}
                    disabled={isSeeding}
                    className="flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-black rounded-xl hover:opacity-90 transition-all disabled:opacity-50 uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
                >
                    <RefreshCcw className={`w-4 h-4 ${isSeeding ? 'animate-spin' : ''}`} />
                    {isSeeding ? "Synchronizing..." : "Sync Static to cloud"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-8 rounded-2xl border border-border group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                            <Database className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase">Data Migrator</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Firestore Operations</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">Move your local configuration data to the live cloud database for dynamic rendering.</p>
                    <button
                        onClick={handleSeed}
                        disabled={isSeeding}
                        className="w-full py-4 border border-border rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    >
                        Execute Migration
                    </button>
                </div>
            </div>

            <CRUDTable
                title="Micro-Utilities"
                subtitle="Manage focused neural workflows."
                items={TOOLS.map(t => ({ ...t, url: '#' }))}
                typeLabel="Tool"
                onAdd={(item) => console.log("Add tool:", item)}
                onEdit={(i, item) => console.log("Edit tool:", i, item)}
                onDelete={(i) => console.log("Delete tool:", i)}
            />
        </div>
    );
}
