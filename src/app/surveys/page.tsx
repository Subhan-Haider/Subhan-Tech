"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Plus, ListFilter, ClipboardCheck, BarChart3, ArrowRight } from "lucide-react";
import { useState } from "react";

const mockSurveys = [
    { id: 1, title: "Extension UX Feedback v1", responses: 45, status: "Active" },
    { id: 2, title: "Beta Tester Survey - CodeLens", responses: 128, status: "Completed" },
    { id: 3, title: "LootOps New Feature Poll", responses: 89, status: "Active" },
];

export default function SurveysPage() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <Navbar />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-glow mb-2">Extension Surveys</h1>
                    <p className="text-muted-foreground">Manage and analyze feedback for your browser extensions.</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg shadow-white/10"
                >
                    <Plus className="w-5 h-5" />
                    Create New Survey
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 border border-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Filter By</h3>
                        <div className="space-y-2">
                            {["All Surveys", "Active", "Archived", "Drafts"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.toLowerCase()
                                            ? "bg-white/10 text-white"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 border border-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Key Metrics</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Total Responses</p>
                                <p className="text-2xl font-bold tracking-tight">2,412</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Avg. Completion Rate</p>
                                <p className="text-2xl font-bold tracking-tight">84%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Surveys List */}
                <div className="lg:col-span-3 space-y-4">
                    {mockSurveys.map((survey, i) => (
                        <motion.div
                            key={survey.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card group p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all flex flex-col sm:flex-row items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${survey.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-white/5 text-muted-foreground"
                                    }`}>
                                    <ClipboardCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg group-hover:text-glow transition-colors">{survey.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                            <BarChart3 className="w-3 h-3" /> {survey.responses} Responses
                                        </span>
                                        <span>•</span>
                                        <span className={survey.status === "Active" ? "text-green-500" : ""}>{survey.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                                    View Data
                                </button>
                                <button className="flex-1 sm:flex-none p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
