"use client";

import { motion } from "framer-motion";
import {
    Search, Plus, Filter, Edit3, Trash2,
    ExternalLink
} from "lucide-react";
import { useState } from "react";

interface Item {
    name: string;
    description?: string;
    category?: string;
    url: string;
    [key: string]: string | number | boolean | undefined | object;
}

interface ManagementTableProps {
    title: string;
    subtitle: string;
    items: Item[];
    typeLabel: string;
}

export function ManagementTable({ title, subtitle, items, typeLabel }: ManagementTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
                    <p className="text-white/40">{subtitle}</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all">
                    <Plus className="w-5 h-5" />
                    Add New {typeLabel}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-xl flex-1 group focus-within:border-white/20 transition-all w-full md:w-auto">
                    <Search className="w-4 h-4 text-white/20 group-focus-within:text-white/60" />
                    <input
                        placeholder={`Search ${title.toLowerCase()}...`}
                        className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Details</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/20 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, i) => (
                            <motion.tr
                                key={item.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                            >
                                <td className="px-6 py-6">
                                    <div>
                                        <p className="font-bold text-sm mb-1">{item.name}</p>
                                        {item.category && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/20 px-2 py-0.5 rounded bg-white/5">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-6 max-w-md">
                                    <p className="text-sm text-white/40 line-clamp-1">{item.description || item.url}</p>
                                </td>
                                <td className="px-6 py-6 font-mono text-[10px]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                        <span className="text-green-500 font-bold tracking-widest uppercase">Live</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <a href={item.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
