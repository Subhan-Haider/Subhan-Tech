"use client";

import { motion } from "framer-motion";
import { Terminal, ExternalLink, Shield, Zap, Chrome, Sidebar, Globe, Heart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/services/products";
import { useFavorites } from "@/hooks/useFavorites";

interface ProductCardProps {
    product: Product;
    index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const favoritized = product.id ? isFavorite(product.id) : false;

    const getIcon = () => {
        if (product.type === "extension") {
            const platform = product.meta?.platforms?.[0];
            switch (platform) {
                case "chrome": return <Chrome className="w-5 h-5" />;
                case "edge": return <Sidebar className="w-5 h-5" />;
                case "firefox": return <Globe className="w-5 h-5" />;
                default: return <Chrome className="w-5 h-5" />;
            }
        }
        return <Zap className="w-5 h-5" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 border border-border relative overflow-hidden group hover:border-primary/20 transition-all shadow-sm flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border group-hover:bg-primary/5 transition-colors relative">
                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                            {getIcon()}
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (product.id) toggleFavorite(product.id);
                        }}
                        className={`p-3 rounded-xl border transition-all ${favoritized ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-black/5 dark:bg-white/5 border-border text-muted-foreground hover:text-red-400'}`}
                    >
                        <Heart className={`w-4 h-4 ${favoritized ? 'fill-current' : ''}`} />
                    </button>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex flex-wrap justify-end gap-1">
                        {product.featured && (
                            <span className="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                Featured
                            </span>
                        )}
                        {/* Auto Badges */}
                        {(() => {
                            const isNew = product.createdAt ? (new Date().getTime() - new Date(product.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000 : false;
                            const isUpdated = product.lastUpdated ? (new Date().getTime() - new Date(product.lastUpdated).getTime()) < 7 * 24 * 60 * 60 * 1000 : false;

                            const badges = [...(product.meta?.badges || [])];
                            if (isNew && !badges.includes("New")) badges.push("New");
                            if (isUpdated && !isNew && !badges.includes("Updated")) badges.push("Updated");

                            return badges.map(badge => (
                                <span key={badge} className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${badge === "New" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                        badge === "Updated" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                            badge === "Beta" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                                "bg-primary/10 text-primary border-primary/20"
                                    }`}>
                                    {badge}
                                </span>
                            ));
                        })()}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 dark:text-muted-foreground/30 px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-border">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex-1">
                <Link href={`/products/${product.id}`} className="block group/title">
                    <h3 className="text-xl font-bold mb-2 group-hover/title:text-primary transition-colors flex items-center gap-2">
                        {product.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/title:opacity-100 transition-all -translate-y-1 group-hover/title:translate-y-0" />
                    </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
            </div>

            <div className="pt-6 border-t border-border flex items-center justify-between">
                <div className="flex -space-x-1">
                    {[1, 2].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-background bg-muted" />
                    ))}
                </div>
                <a
                    href={product.url}
                    target="_blank"
                    className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all inline-flex items-center gap-2 group/link"
                >
                    Deploy <Terminal className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
            </div>

            {/* Status Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5 dark:bg-white/5">
                <div className={`h-full transition-all duration-1000 ${product.status === 'Live' ? 'w-full bg-green-500/20' :
                    product.status === 'Beta' ? 'w-2/3 bg-blue-500/20' :
                        'w-1/3 bg-zinc-500/20'
                    }`} />
            </div>
        </motion.div>
    );
}
