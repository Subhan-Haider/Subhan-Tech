"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Book, Code, Zap, Shield, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const docCategories = [
    {
        title: "Getting Started",
        icon: Book,
        href: "/docs/getting-started",
        items: [
            { name: "Introduction", desc: "Overview of the Neural Hub ecosystem" },
            { name: "Quick Start Guide", desc: "Get up and running in 5 minutes" },
            { name: "Installation", desc: "Step-by-step setup instructions" },
            { name: "Configuration", desc: "Customize your environment" },
        ],
    },
    {
        title: "API Reference",
        icon: Code,
        href: "/docs/api",
        items: [
            { name: "Authentication", desc: "Secure API access with tokens" },
            { name: "Endpoints", desc: "Complete REST API documentation" },
            { name: "Rate Limits", desc: "Understanding request quotas" },
            { name: "Webhooks", desc: "Real-time event notifications" },
        ],
    },
    {
        title: "Extensions",
        icon: Zap,
        href: "/docs/extensions",
        items: [
            { name: "Building Extensions", desc: "Create your first browser extension" },
            { name: "Manifest Configuration", desc: "Understanding manifest.json" },
            { name: "Content Scripts", desc: "Inject code into web pages" },
            { name: "Background Workers", desc: "Run persistent background tasks" },
        ],
    },
    {
        title: "Security",
        icon: Shield,
        href: "/docs/guides",
        items: [
            { name: "Best Practices", desc: "Security guidelines and recommendations" },
            { name: "Data Encryption", desc: "Protecting sensitive information" },
            { name: "OAuth Integration", desc: "Third-party authentication" },
            { name: "Vulnerability Reporting", desc: "How to report security issues" },
        ],
    },
];

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <Navbar />

            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold mb-6 text-glow">Documentation</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Comprehensive guides, API references, and tutorials for the Neural Hub platform.
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl group focus-within:border-white/30 transition-all">
                            <Search className="w-5 h-5 text-white/20 group-focus-within:text-white/60" />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <kbd className="px-3 py-1 rounded bg-white/5 text-xs font-mono text-white/40">
                                Ctrl K
                            </kbd>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {docCategories.map((category, i) => (
                        <Link key={category.title} href={category.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-white/5">
                                        <category.icon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-glow">{category.title}</h2>
                                </div>

                                <div className="space-y-3">
                                    {category.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="block p-4 rounded-xl hover:bg-white/5 transition-all group/item cursor-pointer"
                                        >
                                            <h3 className="font-bold mb-1 group-hover/item:text-glow transition-all">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-white/40">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="glass-card p-8 rounded-2xl border border-white/5 text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Book className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold mb-2">Tutorials</h3>
                        <p className="text-sm text-white/60 mb-4">
                            Step-by-step guides for common tasks
                        </p>
                        <a href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors">
                            Browse Tutorials →
                        </a>
                    </div>

                    <div className="glass-card p-8 rounded-2xl border border-white/5 text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Code className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold mb-2">Code Examples</h3>
                        <p className="text-sm text-white/60 mb-4">
                            Ready-to-use snippets and templates
                        </p>
                        <a href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors">
                            View Examples →
                        </a>
                    </div>

                    <div className="glass-card p-8 rounded-2xl border border-white/5 text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold mb-2">Changelog</h3>
                        <p className="text-sm text-white/60 mb-4">
                            Latest updates and version history
                        </p>
                        <a href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors">
                            See What&apos;s New →
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
