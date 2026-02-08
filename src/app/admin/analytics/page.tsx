"use client";

import { motion } from "framer-motion";
import {
    BarChart3, Users, Eye, Clock, TrendingUp,
    Download, Calendar, Filter
} from "lucide-react";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const trafficData = [
    { date: 'Feb 1', visitors: 1240, pageViews: 3420 },
    { date: 'Feb 2', visitors: 1398, pageViews: 4120 },
    { date: 'Feb 3', visitors: 2100, pageViews: 5800 },
    { date: 'Feb 4', visitors: 1908, pageViews: 4908 },
    { date: 'Feb 5', visitors: 2400, pageViews: 6200 },
    { date: 'Feb 6', visitors: 2200, pageViews: 5900 },
    { date: 'Feb 7', visitors: 2600, pageViews: 7100 },
];

const deviceData = [
    { name: 'Desktop', value: 58, color: '#3b82f6' },
    { name: 'Mobile', value: 32, color: '#10b981' },
    { name: 'Tablet', value: 10, color: '#f59e0b' },
];

const topPages = [
    { page: '/docs/getting-started', views: 12450, avgTime: '4:32' },
    { page: '/docs/api', views: 8920, avgTime: '6:15' },
    { page: '/projects', views: 7340, avgTime: '3:48' },
    { page: '/blog', views: 5680, avgTime: '5:22' },
    { page: '/contact', views: 3210, avgTime: '2:10' },
];

const referralSources = [
    { source: 'Google Search', visitors: 8420, percentage: 42 },
    { source: 'Direct', visitors: 5200, percentage: 26 },
    { source: 'GitHub', visitors: 3840, percentage: 19 },
    { source: 'Twitter', visitors: 1680, percentage: 8 },
    { source: 'Other', visitors: 1000, percentage: 5 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics Dashboard</h1>
                    <p className="text-white/40">Real-time insights into your platform's performance and user behavior.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                        <Calendar className="w-4 h-4" /> Last 7 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Visitors", value: "14.2k", change: "+12.5%", icon: Users, trend: "up" },
                    { label: "Page Views", value: "42.1k", change: "+8.3%", icon: Eye, trend: "up" },
                    { label: "Avg. Session", value: "4m 32s", change: "-2.1%", icon: Clock, trend: "down" },
                    { label: "Conversion Rate", value: "3.8%", change: "+0.4%", icon: TrendingUp, trend: "up" },
                ].map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-white/5">
                                <metric.icon className="w-5 h-5 text-white/60" />
                            </div>
                            <span className={`text-xs font-bold ${metric.trend === "up" ? "text-green-500" : "text-red-500"
                                }`}>
                                {metric.change}
                            </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">{metric.label}</p>
                        <p className="text-3xl font-bold">{metric.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Traffic Chart */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Traffic Overview</h2>
                        <p className="text-sm text-white/40">Daily visitors and page views</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trafficData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} />
                            <YAxis stroke="#ffffff40" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#111',
                                    border: '1px solid #ffffff20',
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="pageViews" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Device Distribution & Referral Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-8 rounded-2xl border border-white/5"
                >
                    <h2 className="text-2xl font-bold mb-6">Device Distribution</h2>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deviceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deviceData.map((entry, index) => (
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
                    <div className="flex justify-center gap-6 mt-4">
                        {deviceData.map((device) => (
                            <div key={device.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                                <span className="text-sm text-white/60">{device.name} ({device.value}%)</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card p-8 rounded-2xl border border-white/5"
                >
                    <h2 className="text-2xl font-bold mb-6">Referral Sources</h2>
                    <div className="space-y-4">
                        {referralSources.map((source, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold">{source.source}</span>
                                    <span className="text-sm text-white/40">{source.visitors.toLocaleString()} visitors</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${source.percentage}%` }}
                                        transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Top Pages */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden"
            >
                <div className="p-8 border-b border-white/5">
                    <h2 className="text-2xl font-bold">Top Performing Pages</h2>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Page</th>
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Views</th>
                            <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Avg. Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topPages.map((page, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                                <td className="px-8 py-6 font-mono text-sm">{page.page}</td>
                                <td className="px-8 py-6 font-bold">{page.views.toLocaleString()}</td>
                                <td className="px-8 py-6 text-white/60">{page.avgTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
