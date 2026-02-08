"use client";

import { motion } from "framer-motion";
import {
    Search, Plus, Filter, Edit3, Trash2,
    ExternalLink, Save, X, Eye
} from "lucide-react";
import { useState } from "react";
import { AddItemModal } from "./AddItemModal";

interface Item {
    name: string;
    description?: string;
    category?: string;
    url?: string;
    [key: string]: any;
}

interface CRUDTableProps {
    title: string;
    subtitle: string;
    items: Item[];
    typeLabel: string;
    onAdd?: (item: any) => void;
    onEdit?: (index: number, item: any) => void;
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
    const [editData, setEditData] = useState<any>({});

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAdd = (newItem: any) => {
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
        updatedItems[index] = editData;
        setItems(updatedItems);
        if (onEdit) onEdit(index, editData);
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
                    <p className="text-white/40">{subtitle}</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                >
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
                    <button className="flex-1 md:flex-none px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-colors">
                        Export
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
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                            >
                                <td className="px-6 py-6">
                                    {editingIndex === i ? (
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none text-sm"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        />
                                    ) : (
                                        <div>
                                            <p className="font-bold text-sm mb-1">{item.name}</p>
                                            {item.category && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/20 px-2 py-0.5 rounded bg-white/5">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-6 max-w-md">
                                    {editingIndex === i ? (
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none text-sm"
                                            value={editData.description || editData.url}
                                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        />
                                    ) : (
                                        <p className="text-sm text-white/40 line-clamp-1">{item.description || item.url}</p>
                                    )}
                                </td>
                                <td className="px-6 py-6 font-mono text-[10px]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                        <span className="text-green-500 font-bold tracking-widest uppercase">Live</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-right">
                                    {editingIndex === i ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => saveEdit(i)}
                                                className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors text-green-500"
                                            >
                                                <Save className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => startEdit(i)}
                                                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(i)}
                                                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <a href={item.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <a href={item.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center text-xs font-bold text-white/20 uppercase tracking-widest">
                <p>Showing {filteredItems.length} of {items.length} items</p>
            </div>

            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAdd}
                type={typeLabel.toLowerCase() as any}
            />
        </div>
    );
}
