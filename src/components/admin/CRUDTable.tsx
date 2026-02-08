"use client";

import { motion } from "framer-motion";
import {
    Search, Plus, Filter, Edit3, Trash2,
    ExternalLink, Save, X, Eye
} from "lucide-react";
import { useState } from "react";
import { AddItemModal } from "./AddItemModal";

export interface Item {
    name: string;
    description?: string;
    category?: string;
    url?: string;
    [key: string]: string | number | boolean | undefined | object;
}

interface CRUDTableProps {
    title: string;
    subtitle: string;
    items: Item[];
    typeLabel: string;
    onAdd?: (item: Item) => void;
    onEdit?: (index: number, item: Item) => void;
    onDelete?: (index: number) => void;
    onView?: (item: Item) => void;
}

export function CRUDTable({
    title,
    subtitle,
    items: initialItems,
    typeLabel,
    onAdd,
    onEdit,
    onDelete
}: CRUDTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState<Item[]>(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<Item>>({});

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAdd = (newItem: Item) => {
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        if (onAdd) onAdd(newItem);
    };

    const handleDelete = (index: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            const updatedItems = items.filter((_, i) => i !== index);
            setItems(updatedItems);
            if (onDelete) onDelete(index);
        }
    };

    const startEdit = (index: number) => {
        setEditingIndex(index);
        setEditData({ ...items[index] });
    };

    const saveEdit = (index: number) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], ...editData };
        setItems(updatedItems);
        if (onEdit) onEdit(index, updatedItems[index]);
        setEditingIndex(null);
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditData({});
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
                    <p className="text-muted-foreground/60">{subtitle}</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10"
                >
                    <Plus className="w-5 h-5" />
                    Add New {typeLabel}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-border backdrop-blur-sm shadow-xl shadow-black/5">
                <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-border px-5 py-3 rounded-2xl flex-1 group focus-within:border-primary/50 focus-within:bg-black/10 dark:focus-within:bg-white/10 transition-all w-full lg:w-auto">
                    <Search className="w-5 h-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                    <input
                        placeholder={`Search ${title.toLowerCase()}...`}
                        className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/40 w-full font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 border border-border rounded-2xl text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/60 hover:text-foreground hover:bg-black/10 transition-all">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex-1 lg:flex-none px-6 py-3 bg-black/5 dark:bg-white/5 border border-border rounded-2xl text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/60 hover:text-foreground hover:bg-black/10 transition-all">
                        Export
                    </button>
                </div>
            </div>

            <div className="rounded-3xl border border-border bg-black/[0.01] dark:bg-white/[0.01] overflow-hidden backdrop-blur-xl shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-black/[0.04] dark:bg-white/[0.04]">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/30">Entry Name</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/30">Configuration Details</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/30">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/30 text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                                className="border-b border-border hover:bg-primary/[0.02] dark:hover:bg-primary/[0.04] transition-all group/row"
                            >
                                <td className="px-8 py-8">
                                    {editingIndex === i ? (
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 border border-border focus:border-primary outline-none text-sm"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        />
                                    ) : (
                                        <div>
                                            <p className="font-black text-base tracking-tight mb-2 group-hover/row:text-primary transition-colors">{item.name}</p>
                                            {item.category && (
                                                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/10">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="px-8 py-8 max-w-md">
                                    {editingIndex === i ? (
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 border border-border focus:border-primary outline-none text-sm"
                                            value={editData.description || editData.url}
                                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground/60 font-medium leading-relaxed italic">&quot;{item.description || item.url}&quot;</p>
                                    )}
                                </td>
                                <td className="px-8 py-8">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute inset-0" />
                                            <div className="w-2 h-2 rounded-full bg-green-500 relative shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                        </div>
                                        <span className="text-green-500 font-black text-[9px] tracking-[0.2em] uppercase">Operational</span>
                                    </div>
                                </td>
                                <td className="px-8 py-8 text-right">
                                    {editingIndex === i ? (
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => saveEdit(i)}
                                                className="p-3 rounded-xl bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white transition-all shadow-lg shadow-green-500/10"
                                            >
                                                <Save className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/10 transition-all text-muted-foreground/40 hover:text-foreground"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-all">
                                            <button
                                                onClick={() => startEdit(i)}
                                                className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white transition-all text-muted-foreground/40 group-hover/row:text-muted-foreground"
                                            >
                                                <Edit3 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(i)}
                                                className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-destructive hover:text-white transition-all text-muted-foreground/40 group-hover/row:text-muted-foreground"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                            <a href={item.url} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white transition-all text-muted-foreground/40 group-hover/row:text-muted-foreground">
                                                <Eye className="w-5 h-5" />
                                            </a>
                                            <a href={item.url} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white transition-all text-muted-foreground/40 group-hover/row:text-muted-foreground">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center text-xs font-bold text-muted-foreground/20 uppercase tracking-widest">
                <p>Showing {filteredItems.length} of {items.length} items</p>
            </div>

            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(data) => handleAdd(data as unknown as Item)}
                type={typeLabel.toLowerCase() as "software" | "extension" | "tool" | "website" | "coupon"}
            />
        </div>
    );
}
