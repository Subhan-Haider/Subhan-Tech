"use client";

import { CRUDTable, Item } from "@/components/admin/CRUDTable";
import { useState } from "react";
import { Ticket, Percent, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface Coupon {
    name: string;
    code: string;
    discount: string;
    description: string;
    category: string;
    [key: string]: string | number | boolean | undefined | object;
}

export default function CouponsManager() {
    const [coupons, setCoupons] = useState<Coupon[]>([
        { name: "Early Access", code: "NEURAL2026", discount: "100% OFF", description: "Full access to all extensions for beta testers.", category: "Premium" },
        { name: "Summer Launch", code: "SUMMER25", discount: "50% OFF", description: "Seasonal discount for software licenses.", category: "General" },
        { name: "Developer Perk", code: "DEV_MODE", discount: "Free Lifetime", description: "Complimentary access for open source contributors.", category: "Extension" },
    ]);

    const stats = [
        { label: "Active Coupons", value: coupons.length, icon: Ticket, color: "text-blue-500" },
        { label: "Total Redemptions", value: "1,284", icon: Zap, color: "text-yellow-500" },
        { label: "Revenue Saved", value: "$12.4k", icon: Percent, color: "text-green-500" },
        { label: "Fraud Protection", value: "Active", icon: Shield, color: "text-purple-500" },
    ];

    return (
        <div className="space-y-10">
            {/* Promo Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</span>
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <stat.icon className="w-20 h-20" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <CRUDTable
                title="Coupon Management"
                subtitle="Generate and manage discount codes for your neural assets."
                items={coupons as unknown as Item[]}
                typeLabel="Coupon"
                onAdd={(item) => setCoupons([...coupons, item as unknown as Coupon])}
                onDelete={(i) => setCoupons(coupons.filter((_, idx) => idx !== i))}
            />
        </div>
    );
}
