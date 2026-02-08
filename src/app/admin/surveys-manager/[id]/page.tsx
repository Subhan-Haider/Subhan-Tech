"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import {
    ArrowLeft, Users, Calendar, Download,
    BarChart3
} from "lucide-react";
import {
    PieChart, Pie, Cell, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Mock survey data
interface SurveyResponse {
    rating?: number;
    count: number;
    option?: string;
    color?: string;
    score?: string;
    percentage?: number;
}

interface SurveyQuestion {
    id: number;
    question: string;
    type: string;
    responses: SurveyResponse[];
    npsScore?: number;
}

const surveyData: {
    id: number;
    title: string;
    description: string;
    totalResponses: number;
    createdAt: string;
    questions: SurveyQuestion[];
    textResponses: { question: string; responses: string[] }[];
} = {
    id: 1,
    title: "Extension UX Feedback v1",
    description: "Gather user feedback on the new extension interface",
    totalResponses: 45,
    createdAt: "2026-02-01",
    questions: [
        {
            id: 1,
            question: "How would you rate the overall user experience?",
            type: "rating",
            responses: [
                { rating: 5, count: 18 },
                { rating: 4, count: 15 },
                { rating: 3, count: 8 },
                { rating: 2, count: 3 },
                { rating: 1, count: 1 },
            ],
        },
        {
            id: 2,
            question: "Which feature do you use most frequently?",
            type: "multiple-choice",
            responses: [
                { option: "Code Analysis", count: 22, color: "#3b82f6" },
                { option: "Auto-complete", count: 12, color: "#10b981" },
                { option: "Error Detection", count: 8, color: "#f59e0b" },
                { option: "Performance Insights", count: 3, color: "#ef4444" },
            ],
        },
        {
            id: 3,
            question: "How likely are you to recommend this extension?",
            type: "nps",
            responses: [
                { score: "Promoters (9-10)", count: 28, percentage: 62 },
                { score: "Passives (7-8)", count: 12, percentage: 27 },
                { score: "Detractors (0-6)", count: 5, percentage: 11 },
            ],
            npsScore: 51,
        },
    ],
    textResponses: [
        {
            question: "What improvements would you like to see?",
            responses: [
                "Better dark mode support",
                "Faster loading times",
                "More customization options",
                "Integration with VS Code",
                "Mobile app version",
            ],
        },
    ],
};

export default function SurveyResults() {

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/surveys-manager"
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">{surveyData.title}</h1>
                    <p className="text-white/40">{surveyData.description}</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all">
                    <Download className="w-5 h-5" />
                    Export Results
                </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Responses", value: surveyData.totalResponses, icon: Users },
                    { label: "Completion Rate", value: "89%", icon: BarChart3 },
                    { label: "Created", value: surveyData.createdAt, icon: Calendar },
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

            {/* Question 1: Rating */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <h2 className="text-2xl font-bold mb-6">{surveyData.questions[0].question}</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={surveyData.questions[0].responses}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis dataKey="rating" stroke="#ffffff40" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#ffffff40" tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#111',
                                    border: '1px solid #ffffff20',
                                    borderRadius: '12px'
                                }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm text-blue-400 font-bold">
                        Average Rating: {(
                            surveyData.questions[0].responses.reduce((acc, r) => acc + (r.rating || 0) * r.count, 0) /
                            surveyData.questions[0].responses.reduce((acc, r) => acc + r.count, 0)
                        ).toFixed(1)} / 5.0
                    </p>
                </div>
            </motion.div>

            {/* Question 2: Multiple Choice */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <h2 className="text-2xl font-bold mb-6">{surveyData.questions[1].question}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={surveyData.questions[1].responses}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="count"
                                    label
                                >
                                    {surveyData.questions[1].responses.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#111',
                                        border: '1px solid #ffffff20',
                                        borderRadius: '12px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                        {surveyData.questions[1].responses.map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="font-bold">{item.option}</span>
                                    </div>
                                    <span className="text-white/40">{item.count} responses</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full"
                                        style={{
                                            width: `${(item.count / surveyData.totalResponses) * 100}%`,
                                            backgroundColor: item.color
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Question 3: NPS */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <h2 className="text-2xl font-bold mb-6">{surveyData.questions[2].question}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {surveyData.questions[2].responses.map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/5 text-center">
                            <p className="text-sm text-white/40 mb-2">{item.score}</p>
                            <p className="text-4xl font-bold mb-2">{item.count}</p>
                            <p className="text-sm text-white/60">{item.percentage}%</p>
                        </div>
                    ))}
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/20 text-center">
                    <p className="text-sm text-white/60 mb-2">Net Promoter Score</p>
                    <p className="text-5xl font-bold text-green-400">+{surveyData.questions[2].npsScore}</p>
                    <p className="text-sm text-white/40 mt-2">Excellent Score (Above 50)</p>
                </div>
            </motion.div>

            {/* Text Responses */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <h2 className="text-2xl font-bold mb-6">{surveyData.textResponses[0].question}</h2>
                <div className="space-y-3">
                    {surveyData.textResponses[0].responses.map((response, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-white/80">{response}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
