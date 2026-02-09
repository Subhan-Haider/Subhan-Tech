"use client";

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from "framer-motion";

interface AnalyticsChartsProps {
    redirectData: { createdAt: string; clickCount: number }[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function AnalyticsCharts({ redirectData }: AnalyticsChartsProps) {
    // Process redirect data for clicks by date
    const clicksByDate = redirectData.reduce((acc: Record<string, number>, curr) => {
        const date = new Date(curr.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + curr.clickCount;
        return acc;
    }, {});

    const chartData = Object.keys(clicksByDate).map(date => ({
        date,
        clicks: clicksByDate[date]
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Process survey types
    const surveyDistribution = [
        { name: 'Product Feedback', value: 400 },
        { name: 'Installation', value: 300 },
        { name: 'Uninstalls', value: 100 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Click Volume Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 rounded-[2.5rem] border border-border"
            >
                <h3 className="text-sm font-black uppercase tracking-widest mb-8">Redirect Performance (30D)</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="date"
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="clicks"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Distribution Pie */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-[2.5rem] border border-border"
            >
                <h3 className="text-sm font-black uppercase tracking-widest mb-8">Segment Distribution</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={surveyDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {surveyDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
