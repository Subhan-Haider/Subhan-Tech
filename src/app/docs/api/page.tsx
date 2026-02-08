"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Code, Lock, Zap, Database } from "lucide-react";
import Link from "next/link";

export default function APIReferencePage() {
    const endpoints = [
        {
            method: "GET",
            path: "/api/extensions",
            description: "Retrieve all browser extensions",
            auth: true,
            params: [
                { name: "platform", type: "string", required: false, desc: "Filter by platform (chrome, firefox, edge)" },
                { name: "limit", type: "number", required: false, desc: "Number of results (default: 50)" },
            ],
            response: `{
  "success": true,
  "data": [
    {
      "id": "ext_123",
      "name": "CodeLens",
      "platform": "chrome",
      "version": "2.1.0",
      "downloads": 15420
    }
  ]
}`,
        },
        {
            method: "POST",
            path: "/api/extensions",
            description: "Create a new extension",
            auth: true,
            params: [
                { name: "name", type: "string", required: true, desc: "Extension name" },
                { name: "description", type: "string", required: true, desc: "Extension description" },
                { name: "platform", type: "string", required: true, desc: "Target platform" },
            ],
            response: `{
  "success": true,
  "data": {
    "id": "ext_456",
    "name": "New Extension",
    "createdAt": "2026-02-07T23:00:00Z"
  }
}`,
        },
        {
            method: "GET",
            path: "/api/software",
            description: "List all software applications",
            auth: true,
            params: [
                { name: "category", type: "string", required: false, desc: "Filter by category" },
            ],
            response: `{
  "success": true,
  "data": [
    {
      "id": "soft_789",
      "name": "LootOps",
      "category": "Gaming",
      "status": "production"
    }
  ]
}`,
        },
        {
            method: "POST",
            path: "/api/auth/token",
            description: "Generate API access token",
            auth: false,
            params: [
                { name: "email", type: "string", required: true, desc: "User email" },
                { name: "password", type: "string", required: true, desc: "User password" },
            ],
            response: `{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}`,
        },
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/docs" className="text-sm text-white/40 hover:text-white transition-colors mb-4 inline-block">
                        ← Back to Documentation
                    </Link>
                    <h1 className="text-5xl font-bold mb-4 text-glow">API Reference</h1>
                    <p className="text-xl text-white/60">
                        Complete REST API documentation for the Neural Hub platform.
                    </p>
                </motion.div>

                {/* Authentication */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8 rounded-2xl border border-white/5 mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <Lock className="w-8 h-8" />
                        Authentication
                    </h2>
                    <p className="text-white/60 mb-6">
                        All API requests require authentication using an API key. Include your key in the request header:
                    </p>
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-sm overflow-x-auto mb-6">
                        <code className="text-blue-400">Authorization</code>: <code className="text-yellow-400">Bearer YOUR_API_KEY</code>
                    </div>
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-sm text-yellow-500 font-bold mb-1">⚠️ Security Notice</p>
                        <p className="text-sm text-white/60">Never expose your API key in client-side code. Use environment variables and server-side requests.</p>
                    </div>
                </motion.section>

                {/* Base URL */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-8 rounded-2xl border border-white/5 mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <Database className="w-8 h-8" />
                        Base URL
                    </h2>
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-sm">
                        <code className="text-green-400">https://api.subhan.tech/v1</code>
                    </div>
                </motion.section>

                {/* Endpoints */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Code className="w-8 h-8" />
                        Endpoints
                    </h2>

                    {endpoints.map((endpoint, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="glass-card p-8 rounded-2xl border border-white/5"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`px-3 py-1 rounded-lg font-bold text-xs uppercase ${endpoint.method === "GET" ? "bg-blue-500/20 text-blue-500" :
                                        endpoint.method === "POST" ? "bg-green-500/20 text-green-500" :
                                            endpoint.method === "PUT" ? "bg-yellow-500/20 text-yellow-500" :
                                                "bg-red-500/20 text-red-500"
                                    }`}>
                                    {endpoint.method}
                                </span>
                                <code className="text-lg font-mono text-white/80">{endpoint.path}</code>
                                {endpoint.auth && (
                                    <span className="ml-auto px-3 py-1 rounded-lg bg-white/5 text-xs font-bold text-white/40 flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> Auth Required
                                    </span>
                                )}
                            </div>

                            <p className="text-white/60 mb-6">{endpoint.description}</p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-3">Parameters</h4>
                                    <div className="space-y-2">
                                        {endpoint.params.map((param, j) => (
                                            <div key={j} className="flex items-start gap-4 p-3 rounded-lg bg-white/5">
                                                <code className="text-sm font-mono text-blue-400 mt-0.5">{param.name}</code>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs text-white/40">{param.type}</span>
                                                        {param.required && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-500 font-bold uppercase">Required</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-white/60">{param.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-3">Example Response</h4>
                                    <div className="bg-black/40 rounded-xl p-4 border border-white/10 font-mono text-sm overflow-x-auto">
                                        <pre className="text-green-400">{endpoint.response}</pre>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Rate Limits */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="glass-card p-8 rounded-2xl border border-white/5 mt-12"
                >
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <Zap className="w-8 h-8" />
                        Rate Limits
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { tier: "Free", limit: "100 requests/hour" },
                            { tier: "Pro", limit: "1,000 requests/hour" },
                            { tier: "Enterprise", limit: "Unlimited" },
                        ].map((tier) => (
                            <div key={tier.tier} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                <p className="text-sm text-white/40 mb-1">{tier.tier}</p>
                                <p className="text-xl font-bold">{tier.limit}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </div>

            <Footer />
        </main>
    );
}
