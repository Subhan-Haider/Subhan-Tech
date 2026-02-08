"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Folder, Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        name: "LootOps",
        description: "Tactical operations dashboard for CS2 players. Track daily missions, inventory, and statistics with military-grade precision.",
        tech: ["Next.js", "Firebase", "TypeScript"],
        stars: 142,
        forks: 23,
        status: "Production",
        link: "https://lootops.subhan.tech",
        github: "https://github.com/Subhan-Haider/LootOps",
    },
    {
        name: "CodeLens Extension",
        description: "Intelligent code analysis browser extension. Real-time syntax highlighting, error detection, and performance insights.",
        tech: ["Chrome API", "React", "WebAssembly"],
        stars: 89,
        forks: 12,
        status: "Beta",
        link: "#",
        github: "#",
    },
    {
        name: "Neural CLI",
        description: "Command-line interface for managing cloud infrastructure with AI-powered suggestions and automated deployments.",
        tech: ["Node.js", "Python", "Docker"],
        stars: 234,
        forks: 45,
        status: "Production",
        link: "#",
        github: "#",
    },
    {
        name: "Subhan Shield",
        description: "AI-powered firewall and network integrity monitor. Real-time threat detection with machine learning algorithms.",
        tech: ["Rust", "TensorFlow", "Redis"],
        stars: 67,
        forks: 8,
        status: "Alpha",
        link: "#",
        github: "#",
    },
    {
        name: "Hex Converter Pro",
        description: "Professional-grade encoding tool for binary, hex, and base64 conversions with batch processing support.",
        tech: ["Vanilla JS", "Web Workers"],
        stars: 156,
        forks: 31,
        status: "Production",
        link: "#",
        github: "#",
    },
    {
        name: "Cloud Weaver",
        description: "Distributed task orchestrator for high-performance computing clusters. Manage thousands of concurrent jobs.",
        tech: ["Go", "Kubernetes", "gRPC"],
        stars: 312,
        forks: 78,
        status: "Production",
        link: "#",
        github: "#",
    },
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <Navbar />

            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold mb-6 text-glow">Project Archive</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A collection of open-source tools, experimental software, and production-grade applications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                    <Folder className="w-6 h-6 text-white/60" />
                                </div>
                                <div className="flex gap-2">
                                    <a href={project.github} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                        <ExternalLink className="w-4 h-4 text-white/40 hover:text-white" />
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-glow transition-all">
                                {project.name}
                            </h3>

                            <p className="text-sm text-white/60 mb-4 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold uppercase tracking-wider text-white/40"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-4 text-xs text-white/40">
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" /> {project.stars}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork className="w-3 h-3" /> {project.forks}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${project.status === "Production" ? "text-green-500" :
                                    project.status === "Beta" ? "text-yellow-500" : "text-blue-500"
                                    }`}>
                                    {project.status}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 glass-card p-12 rounded-2xl border border-white/5 text-center"
                >
                    <h2 className="text-3xl font-bold mb-4 text-glow">Have an Idea?</h2>
                    <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                        Open to collaborations, contributions, and custom project development. Let's build something amazing.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all">
                            Propose a Project
                        </Link>
                        <button className="px-8 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">
                            View on GitHub
                        </button>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
