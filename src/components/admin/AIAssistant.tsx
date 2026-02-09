"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, Terminal, Shield, FileText } from "lucide-react";

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const generate = async (type: string) => {
        setLoading(true);
        // This is a simulation of the Neural Intelligence AI
        await new Promise(r => setTimeout(r, 1500));

        let result = "";
        if (type === "privacy") {
            result = "# Privacy Protocol\n\n- Data Retention: Pulse-only encryption.\n- Third Party: No neural leakage detected.\n- User Rights: Full sovereignty over synaptic data.";
        } else if (type === "terms") {
            result = "# Terms of Engagement\n\n1. No reverse-engineering of the neural core.\n2. Redistribution requires Level 5 Clearance.\n3. Operational integrity is user responsibility.";
        } else {
            result = "I am the Neural Assistant. I can help you generate legal manifests, asset descriptions, or changelogs. What do you need?";
        }

        setResponse(result);
        setLoading(false);
    };

    return (
        <div className="fixed bottom-12 right-12 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-[400px] glass-card rounded-[2.5rem] border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden flex flex-col"
                    >
                        <div className="p-6 bg-primary/10 border-b border-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest">Neural assistant</h4>
                                    <p className="text-[8px] text-primary font-black uppercase tracking-[0.2em] mt-0.5 animate-pulse">Online & Synchronized</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 p-6 space-y-6 h-[400px] overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {response ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-4"
                                    >
                                        <div className="p-4 bg-muted/50 rounded-2xl text-[11px] font-mono leading-relaxed whitespace-pre-wrap">
                                            {response}
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(response);
                                                setResponse("Copied to Neural Buffer!");
                                            }}
                                            className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline"
                                        >
                                            Copy to Buffer
                                        </button>
                                        <button
                                            onClick={() => setResponse("")}
                                            className="ml-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:underline"
                                        >
                                            New Query
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black italic">Select Neural Protocol:</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => generate("privacy")} className="flex items-center gap-3 p-4 border border-border rounded-2xl hover:bg-primary/5 transition-all group">
                                                <Shield className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                                <span className="text-[10px] font-black uppercase">Privacy</span>
                                            </button>
                                            <button onClick={() => generate("terms")} className="flex items-center gap-3 p-4 border border-border rounded-2xl hover:bg-primary/5 transition-all group">
                                                <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                                <span className="text-[10px] font-black uppercase">Terms</span>
                                            </button>
                                        </div>
                                        <div className="relative mt-8">
                                            <textarea
                                                placeholder="Ask the Neural Core..."
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                className="w-full bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-4 text-[11px] outline-none focus:border-primary transition-all h-24"
                                            />
                                            <button
                                                onClick={() => generate("custom")}
                                                className="absolute bottom-4 right-4 p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {loading && (
                                <div className="flex items-center gap-3 text-primary animate-pulse">
                                    <Terminal className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Processing Data Pulse...</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${isOpen ? 'bg-primary text-white' : 'bg-background border border-primary/20 text-primary hover:bg-primary/5'}`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
