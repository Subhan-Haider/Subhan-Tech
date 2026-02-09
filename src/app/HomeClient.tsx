"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { WebsiteCard } from "@/components/WebsiteCard";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { LiveTerminal } from "@/components/LiveTerminal";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { ProductCard } from "@/components/ProductCard";
import { SITE_CONFIG, TOOLS, WEBSITES } from "@/data/config";
import { Sparkles, Package, LayoutGrid, Zap, Code2, Layers, Heart } from "lucide-react";
import { Product } from "@/lib/services/products";
import { HomeSection } from "@/lib/services/sections";
import { useFavorites } from "@/hooks/useFavorites";

interface HomeClientProps {
    products: Product[];
    sections: HomeSection[];
}

export function HomeClient({ products, sections }: HomeClientProps) {
    const { favorites } = useFavorites();
    const favoritedProducts = products.filter(p => favorites.includes(p.id!));
    const getIcon = (type?: string) => {
        switch (type) {
            case "software": return <Package className="w-6 h-6" />;
            case "extension": return <Code2 className="w-6 h-6" />;
            case "website": return <LayoutGrid className="w-6 h-6" />;
            default: return <Layers className="w-6 h-6" />;
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto relative">
            <CommandPalette />
            <CursorSpotlight />
            <LiveTerminal />
            <Navbar />

            {/* Hero Section */}
            <section className="mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-muted-foreground tracking-wide uppercase">Neural Engineering v1.0</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-glow uppercase leading-tight"
                >
                    {SITE_CONFIG.name}
                    <span className="opacity-20">.TECH</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                    {SITE_CONFIG.tagline}. Managing personal projects, software, and browser extensions through a centralized neural interface.
                </motion.p>
            </section>

            {/* Favorites / Stored Manifests */}
            {favoritedProducts.length > 0 && (
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            <Heart className="w-6 h-6 text-red-500 fill-current" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-glow">Stored Manifests</h2>
                            <p className="text-muted-foreground text-sm">Your pinned neural assets and prioritized software.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoritedProducts.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </section>
            )}

            {/* Dynamic Sections */}
            {sections.length > 0 ? (
                sections.map((section, idx) => {
                    const sectionProducts = products.filter(p =>
                        section.productType === "all" || p.type === section.productType
                    );

                    if (sectionProducts.length === 0 && section.productType !== "all") return null;

                    return (
                        <section key={section.id || idx} className="mb-32">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
                                    {getIcon(section.productType)}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-glow">{section.title}</h2>
                                    <p className="text-muted-foreground text-sm">{section.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sectionProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        </section>
                    );
                })
            ) : (
                <>
                    {/* Fallback Static Sections if no DB sections exist */}
                    <section className="mb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
                                <Package className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-glow">Software & Apps</h2>
                                <p className="text-muted-foreground text-sm">Standalone applications and experimental software.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.filter(p => p.type === 'software').map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>

                    <section className="mb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
                                <Code2 className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-glow">Browser Extensions</h2>
                                <p className="text-muted-foreground">Custom tools for Edge, Chrome, and Firefox.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.filter(p => p.type === 'extension').map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                </>
            )}

            {/* Tactical Tools Section (Keep static or migrate to DB later) */}
            <section id="tools" className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
                        <Zap className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-glow">Tactical Tools</h2>
                        <p className="text-muted-foreground">Micro-utilities for focused neural workflows.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TOOLS.map((tool, i) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 glass-card rounded-xl border border-white/5 flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm tracking-tight">{tool.name}</h4>
                                <p className="text-[10px] text-muted-foreground">{tool.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Websites & Platforms */}
            <section id="websites" className="mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {WEBSITES.map((site) => (
                        <WebsiteCard key={site.name} {...site} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
