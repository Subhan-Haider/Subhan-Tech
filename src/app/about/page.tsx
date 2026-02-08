"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Code2, Zap, Shield, Terminal, Cpu, Rocket } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const skills = [
        { name: "Full-Stack Development", icon: Code2, level: 95 },
        { name: "Neural Architecture", icon: Cpu, level: 88 },
        { name: "System Security", icon: Shield, level: 92 },
        { name: "DevOps & Cloud", icon: Terminal, level: 85 },
        { name: "Performance Optimization", icon: Zap, level: 90 },
        { name: "Product Launch", icon: Rocket, level: 87 },
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <Navbar />

            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold mb-6 text-glow">About Neural Engineering</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Building the future of tactical software, one neural kernel at a time.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-10 rounded-2xl border border-white/5"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-glow">The Mission</h2>
                        <p className="text-white/60 leading-relaxed mb-4">
                            At Subhan.tech, we're pioneering the intersection of neural design and tactical operations.
                            Our mission is to create software that doesn't just function—it thinks, adapts, and evolves.
                        </p>
                        <p className="text-white/60 leading-relaxed">
                            From browser extensions that enhance productivity to full-scale applications that redefine
                            user experiences, every project is built with precision, security, and innovation at its core.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-10 rounded-2xl border border-white/5"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-glow">The Vision</h2>
                        <p className="text-white/60 leading-relaxed mb-4">
                            We envision a digital ecosystem where software seamlessly integrates into daily workflows,
                            enhancing human capability without adding complexity.
                        </p>
                        <p className="text-white/60 leading-relaxed">
                            Through modular architecture, real-time intelligence, and a commitment to open-source principles,
                            we're building tools that empower developers, creators, and innovators worldwide.
                        </p>
                    </motion.div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center text-glow">Core Competencies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="glass-card p-6 rounded-2xl border border-white/5"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-white/5">
                                        <skill.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold">{skill.name}</h3>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-white/40">
                                        <span>Proficiency</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
                                            className="h-full bg-white/40"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="glass-card p-12 rounded-2xl border border-white/5 text-center"
                >
                    <h2 className="text-3xl font-bold mb-4 text-glow">Join the Neural Network</h2>
                    <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                        Whether you're looking to collaborate, contribute to open-source projects, or explore custom solutions,
                        we're always open to connecting with like-minded innovators.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all">
                            Start a Project
                        </Link>
                        <button className="px-8 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">
                            View Open Source
                        </button>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
