"use client";

import { useState } from "react";
import { Product, ProductType, ProductStatus, AssetType, ProductAsset } from "@/lib/services/products";
import {
    Save, Plus, Trash2,
    Code2, Layout, LinkIcon,
    Upload, Settings2, Info,
    Monitor,
    Terminal, Lock, Shield, Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductBuilderProps {
    initialProduct: Partial<Product>;
    onSave: (product: Partial<Product>) => void;
    onCancel: () => void;
}

export function ProductBuilder({ initialProduct, onSave, onCancel }: ProductBuilderProps) {
    const [product, setProduct] = useState<Partial<Product>>(initialProduct);
    const [activeSection, setActiveSection] = useState<"general" | "type-specific" | "assets" | "media" | "legal">("general");

    const updateMeta = (updates: Partial<NonNullable<Product["meta"]>>) => {
        setProduct({
            ...product,
            meta: { ...(product.meta || {}), ...updates }
        });
    };

    const smartDetectType = (url: string) => {
        if (!url) return;
        const lowerUrl = url.toLowerCase();

        if (lowerUrl.includes('chrome.google.com/webstore') || lowerUrl.includes('chromewebstore.google.com')) {
            setProduct(prev => ({ ...prev, type: 'extension', category: 'Browser Extension' }));
        } else if (lowerUrl.endsWith('.exe') || lowerUrl.includes('/releases/download/')) {
            setProduct(prev => ({ ...prev, type: 'software', category: 'Windows App' }));
        } else if (lowerUrl.includes('github.com') && !lowerUrl.includes('/releases/')) {
            setProduct(prev => ({ ...prev, type: 'website', category: 'Open Source' }));
        }
    };

    const addAsset = () => {
        const newAsset: ProductAsset = {
            id: Math.random().toString(36).substr(2, 9),
            type: "url",
            label: "New Link",
            url: "",
            active: true
        };
        setProduct({
            ...product,
            assets: [...(product.assets || []), newAsset]
        });
    };

    const updateAsset = (id: string, updates: Partial<ProductAsset>) => {
        setProduct({
            ...product,
            assets: product.assets?.map(a => a.id === id ? { ...a, ...updates } : a)
        });
    };

    const removeAsset = (id: string) => {
        setProduct({
            ...product,
            assets: product.assets?.filter(a => a.id !== id)
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-250px)]">
            {/* Sidebar Navigation */}
            <div className="space-y-2">
                {[
                    { id: "general", label: "General Intel", icon: Info },
                    { id: "type-specific", label: "Spec Layout", icon: Settings2 },
                    { id: "assets", label: "Asset Manifest", icon: LinkIcon },
                    { id: "media", label: "Visual Media", icon: Layout },
                    { id: "legal", label: "Legal & Deployment", icon: Shield },
                ].map((sec) => (
                    <button
                        key={sec.id}
                        onClick={() => setActiveSection(sec.id as any)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${activeSection === sec.id
                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                            : 'bg-black/5 dark:bg-white/5 border-border text-muted-foreground hover:border-primary/50'
                            }`}
                    >
                        <sec.icon className="w-4 h-4" />
                        {sec.label}
                    </button>
                ))}

                <div className="pt-8 space-y-3">
                    <button
                        onClick={() => onSave(product)}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                    >
                        <Save className="w-4 h-4" />
                        Deploy Changes
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-border text-muted-foreground font-black rounded-2xl hover:bg-muted transition-all uppercase tracking-widest text-xs"
                    >
                        Abort Mission
                    </button>
                </div>
            </div>

            {/* Content Stage */}
            <div className="lg:col-span-3 glass-card rounded-[2.5rem] border border-border p-10 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeSection === "general" && (
                        <motion.div
                            key="general"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Asset Identity</label>
                                    <input
                                        type="text"
                                        value={product.name || ""}
                                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-primary transition-all"
                                        placeholder="e.g. CodeLens Extension"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Deployment Slug</label>
                                    <input
                                        type="text"
                                        value={product.slug || ""}
                                        onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-primary transition-all"
                                        placeholder="e.g. codelens-ext"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Primary Transmission (Operational URL)</label>
                                <input
                                    type="text"
                                    value={product.url || ""}
                                    onChange={(e) => {
                                        setProduct({ ...product, url: e.target.value });
                                        smartDetectType(e.target.value);
                                    }}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-primary transition-all"
                                    placeholder="https://chrome.google.com/webstore/..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Brief Transmission (Description)</label>
                                <textarea
                                    value={product.description || ""}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    className="w-full h-24 bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-all"
                                    placeholder="Enter short technical summary..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Asset Classification</label>
                                    <select
                                        value={product.type}
                                        onChange={(e) => setProduct({ ...product, type: e.target.value as ProductType })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-primary transition-all"
                                    >
                                        <option value="software">Software / Desktop App</option>
                                        <option value="extension">Browser Extension</option>
                                        <option value="app">Mobile Web App</option>
                                        <option value="website">Platform / Website</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Lifecycle Phase</label>
                                    <select
                                        value={product.status}
                                        onChange={(e) => setProduct({ ...product, status: e.target.value as ProductStatus })}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-primary transition-all"
                                    >
                                        <option value="Live">Operational (Live)</option>
                                        <option value="Beta">Experimental (Beta)</option>
                                        <option value="Coming Soon">Scheduled (Coming Soon)</option>
                                        <option value="Archived">Decommissioned (Archived)</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === "type-specific" && (
                        <motion.div
                            key="type-specific"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            {product.type === 'extension' && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                                        <Code2 className="w-6 h-6 text-primary" />
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-tight">Extension Core Config</h4>
                                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Chrome Web Store & Survey Synchronization</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Chrome Extension ID</label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 border border-border rounded-xl">
                                                <Lock className="w-4 h-4 text-muted-foreground/30" />
                                                <input
                                                    type="text"
                                                    value={product.meta?.chromeId || ""}
                                                    onChange={(e) => updateMeta({ chromeId: e.target.value })}
                                                    className="bg-transparent border-none outline-none text-sm w-full font-mono"
                                                    placeholder="e.g. jhgfedcba0987654321..."
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Linked Survey ID</label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 border border-border rounded-xl">
                                                <Terminal className="w-4 h-4 text-muted-foreground/30" />
                                                <input
                                                    type="text"
                                                    value={product.meta?.surveyId || ""}
                                                    onChange={(e) => updateMeta({ surveyId: e.target.value })}
                                                    className="bg-transparent border-none outline-none text-sm w-full font-mono"
                                                    placeholder="Paste Survey ID here..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(product.type === 'software' || product.type === 'app') && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                                        <Monitor className="w-6 h-6 text-primary" />
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-tight">Software Environment Specs</h4>
                                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Hardware Requirements & Licensing</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Target Platforms</label>
                                            <div className="flex gap-2">
                                                {["windows", "mac", "linux", "web"].map(p => (
                                                    <button
                                                        key={p}
                                                        onClick={() => {
                                                            const current = product.meta?.platforms || [];
                                                            const next = current.includes(p as any) ? current.filter(x => x !== p) : [...current, p];
                                                            updateMeta({ platforms: next as any });
                                                        }}
                                                        className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${product.meta?.platforms?.includes(p as any) ? 'bg-primary text-white border-primary' : 'bg-black/5 dark:bg-white/5 border-border'
                                                            }`}
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Minimum Requirements</label>
                                            <input
                                                type="text"
                                                value={product.meta?.requirements || ""}
                                                onChange={(e) => updateMeta({ requirements: e.target.value })}
                                                className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm"
                                                placeholder="e.g. 8GB RAM, Windows 10+"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeSection === "assets" && (
                        <motion.div
                            key="assets"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black uppercase italic tracking-tight">Manifest <span className="text-primary">Links</span></h3>
                                <button
                                    onClick={addAsset}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Add Asset
                                </button>
                            </div>

                            <div className="space-y-4">
                                {product.assets?.map((asset) => (
                                    <div key={asset.id} className="p-6 rounded-3xl border border-border bg-black/5 dark:bg-white/5 flex flex-wrap gap-6 items-end">
                                        <div className="flex-1 min-w-[200px] space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Label</label>
                                            <input
                                                type="text"
                                                value={asset.label}
                                                onChange={(e) => updateAsset(asset.id, { label: e.target.value })}
                                                className="w-full bg-transparent border-b border-border outline-none py-1 text-sm font-bold"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-[200px] space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Type</label>
                                            <select
                                                value={asset.type}
                                                onChange={(e) => updateAsset(asset.id, { type: e.target.value as AssetType })}
                                                className="w-full bg-transparent border-b border-border outline-none py-1 text-sm"
                                            >
                                                <option value="exe">Executable (.exe)</option>
                                                <option value="zip">Archive (.zip)</option>
                                                <option value="url">External Link</option>
                                                <option value="source">Source Code</option>
                                                <option value="docs">Documentation</option>
                                            </select>
                                        </div>
                                        <div className="flex-[2] min-w-[300px] space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Resource URL</label>
                                            <input
                                                type="text"
                                                value={asset.url}
                                                onChange={(e) => updateAsset(asset.id, { url: e.target.value })}
                                                className="w-full bg-transparent border-b border-border outline-none py-1 text-sm font-mono"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeAsset(asset.id)}
                                            className="p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeSection === "media" && (
                        <motion.div
                            key="media"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground/30 flex items-center gap-2">
                                        <Upload className="w-4 h-4" /> Identify Icon
                                    </h4>
                                    <div className="aspect-square w-32 rounded-[2rem] border-2 border-dashed border-border flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 hover:border-primary/50 cursor-pointer transition-all">
                                        <Plus className="w-6 h-6 text-muted-foreground/30" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Icon URL..."
                                        className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-2 text-xs"
                                        value={product.icon || ""}
                                        onChange={(e) => setProduct({ ...product, icon: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground/30 flex items-center gap-2">
                                        <Layout className="w-4 h-4" /> Intel Showcase (Screenshots)
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2].map(i => (
                                            <div key={i} className="aspect-video rounded-2xl border-2 border-dashed border-border flex items-center justify-center bg-black/5 dark:bg-white/5" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === "legal" && (
                        <motion.div
                            key="legal"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 italic flex items-center gap-2">
                                            <Activity className="w-3 h-3 text-primary" /> Staged Rollout (Canary)
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="0" max="100"
                                                value={product.meta?.stagedRollout || 100}
                                                onChange={(e) => updateMeta({ stagedRollout: parseInt(e.target.value) })}
                                                className="flex-1 accent-primary"
                                            />
                                            <span className="text-sm font-black mono text-primary w-12 text-right">{product.meta?.stagedRollout || 100}%</span>
                                        </div>
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-loose">
                                            Only this percentage of users will fetch latest version metadata via Remote API.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 italic">Neural Certification (Badges)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["New", "Popular", "Updated", "Beta"].map(badge => (
                                                <button
                                                    key={badge}
                                                    onClick={() => {
                                                        const current = product.meta?.badges || [];
                                                        const next = current.includes(badge as any) ? current.filter(b => b !== badge) : [...current, badge];
                                                        updateMeta({ badges: next as any });
                                                    }}
                                                    className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${product.meta?.badges?.includes(badge as any) ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-black/5 dark:bg-white/5 border-border text-muted-foreground'}`}
                                                >
                                                    {badge}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Privacy Protocol (Markdown)</label>
                                        <textarea
                                            value={product.meta?.privacyPolicy || ""}
                                            onChange={(e) => updateMeta({ privacyPolicy: e.target.value })}
                                            className="w-full h-32 bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-xs outline-none focus:border-primary transition-all custom-scrollbar"
                                            placeholder="Neural data handling policies..."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Terms of Engagement (Markdown)</label>
                                        <textarea
                                            value={product.meta?.termsOfService || ""}
                                            onChange={(e) => updateMeta({ termsOfService: e.target.value })}
                                            className="w-full h-32 bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-xs outline-none focus:border-primary transition-all custom-scrollbar"
                                            placeholder="User operational restrictions..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
