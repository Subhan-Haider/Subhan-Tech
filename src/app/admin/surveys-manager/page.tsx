"use client";

import { motion } from "framer-motion";
import {
    Plus, Edit3, Trash2, BarChart3, Users,
    Calendar, CheckCircle, Clock, Eye
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Survey {
    id: number;
    title: string;
    description: string;
    responses: number;
    status: "Active" | "Completed" | "Draft";
    createdAt: string;
    questions: number;
}

export default function SurveysManager() {
    const [surveys, setSurveys] = useState<Survey[]>([
        {
            id: 1,
            title: "Extension UX Feedback v1",
            description: "Gather user feedback on the new extension interface",
            responses: 45,
            status: "Active",
            createdAt: "2026-02-01",
            questions: 8,
        },
        {
            id: 2,
            title: "Beta Tester Survey - CodeLens",
            description: "Feedback from beta testers on CodeLens features",
            responses: 128,
            status: "Completed",
            createdAt: "2026-01-15",
            questions: 12,
        },
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [newSurvey, setNewSurvey] = useState({
        title: "",
        description: "",
        questions: 5,
    });

    const handleCreate = () => {
        const survey: Survey = {
            id: surveys.length + 1,
            title: newSurvey.title,
            description: newSurvey.description,
            responses: 0,
            status: "Draft",
            createdAt: new Date().toISOString().split('T')[0],
            questions: newSurvey.questions,
        };
        setSurveys([...surveys, survey]);
        setNewSurvey({ title: "", description: "", questions: 5 });
        setIsCreating(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this survey?")) {
            setSurveys(surveys.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Survey Management</h1>
                    <p className="text-white/40">Create, manage, and analyze extension feedback surveys.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Create New Survey
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Surveys", value: surveys.length, icon: BarChart3 },
                    { label: "Active Surveys", value: surveys.filter(s => s.status === "Active").length, icon: CheckCircle },
                    { label: "Total Responses", value: surveys.reduce((acc, s) => acc + s.responses, 0), icon: Users },
                    { label: "Avg Response Rate", value: "84%", icon: Clock },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-white/5">
                                <stat.icon className="w-5 h-5 text-white/60" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Create Survey Form */}
            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-8 rounded-2xl border border-white/5 overflow-hidden"
                >
                    <h2 className="text-2xl font-bold mb-6">Create New Survey</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Survey Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="e.g., LootOps Feature Feedback"
                                value={newSurvey.title}
                                onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Description</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white resize-none"
                                placeholder="Describe the purpose of this survey..."
                                value={newSurvey.description}
                                onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Number of Questions</label>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                value={newSurvey.questions}
                                onChange={(e) => setNewSurvey({ ...newSurvey, questions: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setIsCreating(false)}
                                className="flex-1 px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                            >
                                Create Survey
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Surveys List */}
            <div className="space-y-4">
                {surveys.map((survey, i) => (
                    <motion.div
                        key={survey.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold">{survey.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${survey.status === "Active" ? "bg-green-500/20 text-green-500" :
                                        survey.status === "Completed" ? "bg-blue-500/20 text-blue-500" :
                                            "bg-white/10 text-white/40"
                                        }`}>
                                        {survey.status}
                                    </span>
                                </div>
                                <p className="text-sm text-white/60 mb-4">{survey.description}</p>
                                <div className="flex flex-wrap gap-4 text-xs text-white/40">
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {survey.responses} Responses
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BarChart3 className="w-3 h-3" /> {survey.questions} Questions
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> Created {survey.createdAt}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(survey.id)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <Link
                                    href={`/admin/surveys-manager/${survey.id}`}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={`/admin/surveys-manager/${survey.id}`}
                                    className="px-4 py-2 bg-white/5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors"
                                >
                                    View Results
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
