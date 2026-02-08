"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Book, Code, Zap, Shield, ArrowRight, CheckCircle, Terminal } from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/docs" className="text-sm text-white/40 hover:text-white transition-colors mb-4 inline-block">
                        ← Back to Documentation
                    </Link>
                    <h1 className="text-5xl font-bold mb-4 text-glow">Getting Started</h1>
                    <p className="text-xl text-white/60">
                        Welcome to the Neural Hub ecosystem. This guide will help you get up and running in minutes.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-12"
                >
                    {/* Introduction */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Book className="w-8 h-8" />
                            Introduction
                        </h2>
                        <p className="text-white/60 leading-relaxed mb-4">
                            Neural Hub is a comprehensive platform for building, deploying, and managing browser extensions,
                            web applications, and tactical software tools. Our ecosystem provides:
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Real-time data synchronization across platforms",
                                "Built-in security and encryption",
                                "Modular architecture for rapid development",
                                "Cloud-native deployment infrastructure",
                                "Comprehensive API access",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/60">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Prerequisites */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4">Prerequisites</h2>
                        <p className="text-white/60 mb-4">Before you begin, ensure you have:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: "Node.js", version: "v18.0.0 or higher" },
                                { name: "npm/yarn", version: "Latest stable" },
                                { name: "Git", version: "v2.0 or higher" },
                                { name: "Code Editor", version: "VS Code recommended" },
                            ].map((req) => (
                                <div key={req.name} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <p className="font-bold mb-1">{req.name}</p>
                                    <p className="text-sm text-white/40">{req.version}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Installation */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Terminal className="w-8 h-8" />
                            Installation
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-3">Step 1: Clone the Repository</h3>
                                <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <code className="text-green-400">git clone https://github.com/Subhan-Haider/neural-hub.git</code>
                                    <br />
                                    <code className="text-green-400">cd neural-hub</code>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Step 2: Install Dependencies</h3>
                                <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <code className="text-green-400">npm install</code>
                                    <br />
                                    <code className="text-white/40"># or</code>
                                    <br />
                                    <code className="text-green-400">yarn install</code>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Step 3: Configure Environment</h3>
                                <p className="text-white/60 mb-3">Create a <code className="px-2 py-1 bg-white/10 rounded text-sm">.env.local</code> file:</p>
                                <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <code className="text-blue-400">NEXT_PUBLIC_API_URL</code>=<code className="text-yellow-400">https://api.subhan.tech</code>
                                    <br />
                                    <code className="text-blue-400">NEXT_PUBLIC_API_KEY</code>=<code className="text-yellow-400">your_api_key_here</code>
                                    <br />
                                    <code className="text-blue-400">DATABASE_URL</code>=<code className="text-yellow-400">your_database_url</code>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-3">Step 4: Run Development Server</h3>
                                <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <code className="text-green-400">npm run dev</code>
                                    <br />
                                    <code className="text-white/40"># Server runs on http://localhost:3000</code>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Start */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4">Quick Start Example</h2>
                        <p className="text-white/60 mb-4">Here&apos;s a simple example to get you started:</p>
                        <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                            <code className="text-purple-400">import</code> <code className="text-white">{'{ NeuralClient }'}</code> <code className="text-purple-400">from</code> <code className="text-yellow-400">{`'@neural/sdk'`}</code>;
                            <br /><br />
                            <code className="text-purple-400">const</code> <code className="text-white">client</code> = <code className="text-purple-400">new</code> <code className="text-blue-400">NeuralClient</code>({'{'}
                            <br />
                            <code className="text-white ml-4">apiKey: process.env.NEXT_PUBLIC_API_KEY,</code>
                            <br />
                            {'}'});
                            <br /><br />
                            <code className="text-purple-400">const</code> <code className="text-white">data</code> = <code className="text-purple-400">await</code> <code className="text-white">client</code>.<code className="text-blue-400">fetch</code>(<code className="text-yellow-400">{`'/extensions'`}</code>);
                            <br />
                            <code className="text-white">console</code>.<code className="text-blue-400">log</code>(data);
                        </div>
                    </section>

                    {/* Next Steps */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "API Reference", desc: "Explore all available endpoints", href: "/docs/api", icon: Code },
                                { title: "Build Extensions", desc: "Create your first browser extension", href: "/docs/extensions", icon: Zap },
                                { title: "Security Guide", desc: "Best practices for secure apps", href: "/docs/guides", icon: Shield },
                                { title: "Deployment", desc: "Deploy to production", href: "/docs/guides", icon: ArrowRight },
                            ].map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group"
                                >
                                    <item.icon className="w-6 h-6 mb-3 text-white/60 group-hover:text-white transition-colors" />
                                    <h3 className="font-bold mb-2 group-hover:text-glow transition-all">{item.title}</h3>
                                    <p className="text-sm text-white/40">{item.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
