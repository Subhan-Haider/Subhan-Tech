import { productService } from "@/lib/services/products";
import { eventService } from "@/lib/services/events";
import { notFound } from "next/navigation";
import {
    ChevronLeft, ExternalLink, Shield,
    Zap, Rocket, History, HelpCircle,
    Download, Globe, Terminal, Box,
    Monitor, Layout, Code2, LinkIcon,
    Cpu, Lock, Package, Smartphone
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ProductPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = await productService.getById(params.id);
    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | Subhan Neural Registry`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            type: "website",
        }
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await productService.getById(params.id);

    if (!product) {
        notFound();
    }

    // Capture Neural Signal
    eventService.log({
        type: "view",
        productId: params.id,
        productName: product.name
    }).catch(console.error);

    const typeIcons = {
        software: <Package className="w-4 h-4" />,
        extension: <Code2 className="w-4 h-4" />,
        app: <Smartphone className="w-4 h-4" />,
        website: <Globe className="w-4 h-4" />
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Nav */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${product.status === 'Live' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                    product.status === 'Beta' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                        'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                                    }`}>
                                    {product.status} Edition
                                </span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    {product.type} / {product.category}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase">{product.name}</h1>
                            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
                            >
                                <Rocket className="w-4 h-4" />
                                Launch Application
                            </a>
                            {product.type === 'extension' && product.meta?.surveyId && (
                                <Link
                                    href={`/survey/${product.meta.surveyId}`}
                                    className="px-8 py-4 border border-border rounded-xl font-bold hover:bg-muted transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    Provide Feedback
                                </Link>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border">
                            {[
                                { label: "Protocol Version", value: product.version || "v1.0.0", icon: Terminal },
                                { label: "Last Sync", value: product.lastUpdated ? new Date(product.lastUpdated).toLocaleDateString() : "Operational", icon: History },
                                { label: "Environment", value: product.meta?.platforms?.join(", ") || "Universal", icon: Cpu },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <stat.icon className="w-3 h-3" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest">{stat.label}</span>
                                    </div>
                                    <p className="font-bold text-sm tracking-tight capitalize">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual Stage */}
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass-card border border-border group shadow-2xl">
                        {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center">
                                <Box className="w-24 h-24 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        )}
                        <div className="absolute top-8 right-8">
                            <div className="px-5 py-2.5 rounded-2xl bg-background/80 backdrop-blur-xl border border-border text-[9px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                System Monitoring Active
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Manifests */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-32">
                    <div className="lg:col-span-2 space-y-16">
                        {product.longDescription && (
                            <section>
                                <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Technical Overview</h2>
                                <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    {product.longDescription}
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-primary" />
                                Core Capabilities
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(product.features && product.features.length > 0 ? product.features : [
                                    "Neural Optimized Architecture",
                                    "Real-time Data Streaming",
                                    "Encrypted Command Kernels",
                                    "Dynamic Asset Loading",
                                    "Cross-platform Synchronization"
                                ]).map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-black/5 dark:bg-white/5 hover:border-primary/30 transition-all group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span className="text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {product.meta?.requirements && (
                            <section className="p-8 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-border">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Monitor className="w-4 h-4 text-primary" /> System Prerequisites
                                </h3>
                                <p className="text-sm text-muted-foreground font-mono">{product.meta.requirements}</p>
                            </section>
                        )}
                    </div>

                    {/* Asset Hub */}
                    <div className="space-y-8">
                        <div className="glass-card p-10 rounded-[3rem] border border-border sticky top-10 shadow-2xl">
                            <h3 className="font-black flex items-center gap-3 mb-8 uppercase text-sm tracking-[0.2em] italic">
                                <Download className="w-5 h-5 text-primary" />
                                Resource <span className="text-primary">Hub</span>
                            </h3>

                            <div className="space-y-3">
                                {product.assets && product.assets.length > 0 ? (
                                    product.assets.map((asset) => (
                                        <Link
                                            key={asset.id}
                                            href={`/download/${product.id}/${asset.id}`}
                                            className="w-full text-left px-6 py-5 rounded-2xl border border-border bg-black/5 dark:bg-white/5 text-xs font-black uppercase tracking-widest text-muted-foreground hover:border-primary hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-3">
                                                {asset.type === 'exe' ? <Terminal className="w-4 h-4" /> :
                                                    asset.type === 'source' ? <Code2 className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                                                {asset.label}
                                            </div>
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] text-center py-8 border-2 border-dashed border-border rounded-2xl">
                                        No assets deployed to manifest
                                    </p>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                                    <Lock className="w-4 h-4 text-primary" />
                                    <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                                        Every binary build undergoes formal verification and CVE scanning.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
