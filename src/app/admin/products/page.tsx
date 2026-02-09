"use client";

import { useState, useEffect } from "react";
import {
    Plus, Edit3, Trash2,
    LayoutGrid, Star, ArrowUpRight, Package,
    Settings2, Code2, Globe, Copy
} from "lucide-react";
import { productService, Product } from "@/lib/services/products";
import { sectionService, HomeSection } from "@/lib/services/sections";
import { motion, AnimatePresence } from "framer-motion";
import { ProductBuilder } from "../../../components/admin/ProductBuilder";
import { auditService } from "@/lib/services/audit";
import { useAuth } from "@/context/AuthContext";
import { checkAssetManifest } from "@/lib/utils/linkChecker";
import { HeartPulse, CheckSquare, AlertCircle } from "lucide-react";

export default function RegistryControl() {
    const [products, setProducts] = useState<Product[]>([]);
    const [sections, setSections] = useState<HomeSection[]>([]);
    const [activeTab, setActiveTab] = useState<"products" | "sections">("products");
    const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
    const [healthResults, setHealthResults] = useState<Record<string, any>>({});
    const [scanning, setScanning] = useState(false);
    const { user } = useAuth();

    const fetchData = async () => {
        const [ps, ss] = await Promise.all([
            productService.getAll(),
            sectionService.getAll()
        ]);
        setProducts(ps);
        setSections(ss);
    };

    const runHealthScan = async () => {
        setScanning(true);
        const results: Record<string, any> = {};
        for (const p of products) {
            if (p.assets && p.assets.length > 0) {
                const scan = await checkAssetManifest(p.id!, p.assets);
                results[p.id!] = scan;
            }
        }
        setHealthResults(results);
        setScanning(false);
        await auditService.log(user?.uid || "system", user?.displayName || "Admin", "LINK_HEALTH_SCAN", "all", "Product Registry", "Performed global asset manifest health scan.");
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleFeatured = async (product: Product) => {
        if (!product.id) return;
        await productService.update(product.id, { featured: !product.featured });
        setProducts(products.map(p => p.id === product.id ? { ...p, featured: !p.featured } : p));
    };

    return (
        <div className="space-y-10">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tight flex items-center gap-4">
                        <Package className="w-10 h-10 text-primary" />
                        Neural <span className="text-primary">Registry</span>
                    </h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mt-1">Cross-Platform Asset Lifecycle Intelligence</p>
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        onClick={runHealthScan}
                        disabled={scanning}
                        className={`flex items-center gap-3 px-8 py-4 bg-emerald-500/10 text-emerald-500 font-black rounded-2xl hover:bg-emerald-500/20 transition-all border border-emerald-500/20 shadow-xl shadow-emerald-500/5 uppercase tracking-widest text-[9px] ${scanning ? 'animate-pulse cursor-wait opacity-50' : ''}`}
                    >
                        <HeartPulse className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
                        {scanning ? "Syncing Signals..." : "Neural Pulse Scan"}
                    </button>
                    <div className="w-[1px] h-10 bg-border mx-2" />
                    <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-border">
                        <button
                            onClick={() => setActiveTab("products")}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Assets
                        </button>
                        <button
                            onClick={() => setActiveTab("sections")}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'sections' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Sections
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {editingProduct ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key="builder"
                    >
                        <ProductBuilder
                            initialProduct={editingProduct}
                            onSave={async (data: Partial<Product>) => {
                                if (data.id) {
                                    await productService.update(data.id, data);
                                    await auditService.log(user?.uid || "system", user?.displayName || "Admin", "UPDATE_PRODUCT", data.id, data.name || "Unknown", "Modified product parameters and meta.");
                                } else {
                                    const id = await productService.create(data as Product);
                                    await auditService.log(user?.uid || "system", user?.displayName || "Admin", "CREATE_PRODUCT", id, data.name || "New Product", "Deployed new asset to the neural network.");
                                }
                                setEditingProduct(null);
                                fetchData();
                            }}
                            onCancel={() => setEditingProduct(null)}
                        />
                    </motion.div>
                ) : activeTab === "products" ? (
                    <motion.div
                        key="products-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Create Card */}
                            <button
                                onClick={() => setEditingProduct({ type: 'software', status: 'Live', featured: false })}
                                className="h-full min-h-[250px] border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group hover:border-primary/50 hover:bg-primary/5 transition-all"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all">
                                    <Plus className="w-8 h-8 group-hover:text-white" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Deploy New Asset</span>
                            </button>

                            {products.map((p) => (
                                <div key={p.id} className="glass-card rounded-[2.5rem] p-8 border border-border group hover:border-primary/30 transition-all relative overflow-hidden flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-2">
                                            <div className="p-2 rounded-lg bg-primary/5 text-primary border border-primary/10">
                                                {p.type === 'extension' ? <Code2 className="w-4 h-4" /> : p.type === 'website' ? <Globe className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-border text-muted-foreground/50">
                                                {p.type}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => toggleFeatured(p)}
                                            className={`transition-colors ${p.featured ? 'text-yellow-500' : 'text-muted-foreground/10 hover:text-yellow-500/50'}`}
                                        >
                                            <Star className="w-5 h-5 fill-current" />
                                        </button>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-bold uppercase tracking-tight">{p.name}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${p.status === 'Live' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-blue-500'}`} />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">{p.status}</span>
                                            </div>
                                            {healthResults[p.id!] && (
                                                <div className="flex items-center gap-2">
                                                    {healthResults[p.id!].results.every((r: any) => r.ok) ? (
                                                        <>
                                                            <CheckSquare className="w-3 h-3 text-emerald-500" />
                                                            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500/50">Integrity Optimal</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <AlertCircle className="w-3 h-3 text-red-500" />
                                                            <span className="text-[8px] font-black uppercase tracking-widest text-red-500/50">Signals Distorted</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingProduct({
                                                    ...p,
                                                    id: undefined,
                                                    name: `${p.name} (Copy)`,
                                                    slug: `${p.slug}-copy`
                                                })}
                                                className="p-3 rounded-xl hover:bg-primary hover:text-white transition-all text-muted-foreground/30"
                                                title="Clone Logic"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setEditingProduct(p)}
                                                className="p-3 rounded-xl hover:bg-primary hover:text-white transition-all text-muted-foreground/30"
                                            >
                                                <Settings2 className="w-4 h-4" />
                                            </button>
                                            <a
                                                href={`/products/${p.id}`}
                                                className="p-3 rounded-xl hover:bg-primary hover:text-white transition-all text-muted-foreground/30"
                                            >
                                                <ArrowUpRight className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={async () => {
                                                    if (confirm("Decommission this asset from the neural network?")) {
                                                        await productService.delete(p.id!);
                                                        await auditService.log(user?.uid || "system", user?.displayName || "Admin", "DELETE_PRODUCT", p.id!, p.name, "Asset decommissioned and erased.");
                                                        fetchData();
                                                    }
                                                }}
                                                className="p-3 rounded-xl hover:bg-destructive hover:text-white transition-all text-muted-foreground/30"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="sections-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Section Cards */}
                            {sections.map((sec) => (
                                <div key={sec.id} className="glass-card p-8 rounded-[2.5rem] border border-border flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <LayoutGrid className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-black uppercase tracking-tight">{sec.title}</h4>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Order: {sec.order} • Type: {sec.productType}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all text-muted-foreground/40">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (confirm("Erase this neural section?")) {
                                                    await sectionService.delete(sec.id!);
                                                    fetchData();
                                                }
                                            }}
                                            className="p-3 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all text-muted-foreground/40"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="p-8 border-2 border-dashed border-border rounded-[2.5rem] flex items-center justify-center gap-4 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all">
                                <Plus className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Initialize Neural Section</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
