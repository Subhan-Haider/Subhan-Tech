"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    type: "software" | "extension" | "tool" | "website" | "coupon";
}

export function AddItemModal({ isOpen, onClose, onSubmit, type }: AddItemModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        url: "",
        category: "",
        platform: "chrome",
        code: "",
        discount: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", description: "", url: "", category: "", platform: "chrome", code: "", discount: "" });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-sm bg-black/60">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-2xl glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                            <h2 className="text-2xl font-bold">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-white/60">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                        placeholder={`Enter ${type} name`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                {type === "coupon" ? (
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/60">Coupon Code *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20 font-mono"
                                            placeholder="e.g., FREE100"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/60">URL *</label>
                                        <input
                                            type="url"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                            placeholder="https://example.com"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Description *</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20 resize-none"
                                    placeholder={`Describe this ${type}`}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            {type === "coupon" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/60">Discount Value *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                            placeholder="e.g., 100% OFF, Free Lifetime"
                                            value={formData.discount}
                                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/60">Category *</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="General">General</option>
                                            <option value="Extension">Extension</option>
                                            <option value="Software">Software</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {type === "software" && (
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-white/60">Category *</label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select category</option>
                                        <option value="System">System</option>
                                        <option value="DevTool">DevTool</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Security">Security</option>
                                        <option value="DevOps">DevOps</option>
                                    </select>
                                </div>
                            )}

                            {type === "extension" && (
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-white/60">Platform *</label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                    >
                                        <option value="chrome">Chrome</option>
                                        <option value="edge">Edge</option>
                                        <option value="firefox">Firefox</option>
                                        <option value="all">All Platforms</option>
                                    </select>
                                </div>
                            )}

                            {type === "website" && (
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-white/60">Category *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                        placeholder="e.g., Personal, GitHub, Social"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                                >
                                    Add {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
