"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
    {
        id: 1,
        title: "Building Neural Extensions: A Deep Dive into Browser Architecture",
        excerpt: "Exploring the technical foundations of creating high-performance browser extensions with real-time data processing.",
        author: "Subhan Haider",
        date: "Feb 5, 2026",
        category: "Engineering",
        readTime: "8 min read",
        image: "/blog/neural-extensions.jpg",
    },
    {
        id: 2,
        title: "The Future of Tactical Software Design",
        excerpt: "How minimalist design principles and neural architecture are shaping the next generation of productivity tools.",
        author: "Subhan Haider",
        date: "Jan 28, 2026",
        category: "Design",
        readTime: "6 min read",
        image: "/blog/tactical-design.jpg",
    },
    {
        id: 3,
        title: "Optimizing Performance: From 2s to 200ms",
        excerpt: "A case study on reducing load times and improving user experience through strategic caching and lazy loading.",
        author: "Subhan Haider",
        date: "Jan 15, 2026",
        category: "Performance",
        readTime: "10 min read",
        image: "/blog/performance.jpg",
    },
    {
        id: 4,
        title: "Security First: Protecting User Data in Modern Web Apps",
        excerpt: "Best practices for implementing end-to-end encryption and secure authentication in client-side applications.",
        author: "Subhan Haider",
        date: "Jan 8, 2026",
        category: "Security",
        readTime: "7 min read",
        image: "/blog/security.jpg",
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <Navbar />

            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold mb-6 text-glow">Neural Insights</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Technical deep-dives, design philosophy, and lessons learned from building tactical software.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogPosts.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card rounded-2xl border border-white/5 overflow-hidden group hover:border-white/20 transition-all"
                        >
                            <div className="h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border-b border-white/5">
                                <div className="text-white/20 text-sm font-bold uppercase tracking-widest">
                                    Featured Image
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-white/40">{post.readTime}</span>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-glow transition-all">
                                    {post.title}
                                </h2>

                                <p className="text-white/60 mb-6 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10" />
                                        <div>
                                            <p className="text-xs font-bold">{post.author}</p>
                                            <p className="text-[10px] text-white/40">{post.date}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors group/link"
                                    >
                                        Read More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <button className="px-8 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">
                        Load More Articles
                    </button>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
