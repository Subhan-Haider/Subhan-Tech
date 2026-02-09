"use client";

import { useState } from "react";
import { Question, QuestionType } from "@/lib/services/surveys";
import {
    Plus, Trash2, GripVertical, Settings2,
    ChevronDown, ChevronUp, Save, Eye, X,
    AlignLeft, Type, CheckSquare, Star, CircleDot
} from "lucide-react";
import { motion, Reorder } from "framer-motion";

interface SurveyBuilderProps {
    initialQuestions?: Question[];
    onSave: (questions: Question[]) => void;
    onCancel: () => void;
}

const QUESTION_TYPES: { type: QuestionType, icon: any, label: string }[] = [
    { type: "text", icon: AlignLeft, label: "Text Input" },
    { type: "multiple-choice", icon: CircleDot, label: "Multiple Choice" },
    { type: "yes-no", icon: Type, label: "Yes / No" },
    { type: "rating", icon: Star, label: "Rating (Stars)" },
    { type: "checkbox", icon: CheckSquare, label: "Checkboxes" },
];

export function SurveyBuilder({ initialQuestions = [], onSave, onCancel }: SurveyBuilderProps) {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [activeId, setActiveId] = useState<string | null>(null);

    const addQuestion = (type: QuestionType) => {
        const newQuestion: Question = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            text: "New Question",
            required: true,
            options: type === "multiple-choice" || type === "checkbox" ? ["Option 1"] : undefined
        };
        setQuestions([...questions, newQuestion]);
        setActiveId(newQuestion.id);
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addOption = (qId: string) => {
        const q = questions.find(q => q.id === qId);
        if (q && q.options) {
            updateQuestion(qId, { options: [...q.options, `Option ${q.options.length + 1}`] });
        }
    };

    const removeOption = (qId: string, index: number) => {
        const q = questions.find(q => q.id === qId);
        if (q && q.options) {
            updateQuestion(qId, { options: q.options.filter((_, i) => i !== index) });
        }
    };

    const updateOption = (qId: string, index: number, value: string) => {
        const q = questions.find(q => q.id === qId);
        if (q && q.options) {
            const newOptions = [...q.options];
            newOptions[index] = value;
            updateQuestion(qId, { options: newOptions });
        }
    };

    return (
        <div className="flex gap-8 items-start h-[calc(100vh-200px)]">
            {/* Sidebar: Toolbox */}
            <div className="w-64 glass-card p-6 rounded-2xl border border-border h-full overflow-y-auto">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 mb-6">Question Toolbox</h3>
                <div className="space-y-2">
                    {QUESTION_TYPES.map((qt) => (
                        <button
                            key={qt.type}
                            onClick={() => addQuestion(qt.type)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold group"
                        >
                            <qt.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            {qt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 space-y-4 h-full overflow-y-auto pr-4 custom-scrollbar">
                <Reorder.Group axis="y" values={questions} onReorder={setQuestions} className="space-y-4">
                    {questions.map((q) => (
                        <Reorder.Item
                            key={q.id}
                            value={q}
                            className={`glass-card rounded-2xl border transition-all ${activeId === q.id ? 'border-primary shadow-xl shadow-primary/5' : 'border-border'}`}
                            onClick={() => setActiveId(q.id)}
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab" />
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={q.text}
                                            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                                            className="w-full bg-transparent border-none outline-none font-bold text-lg placeholder:text-muted-foreground/20"
                                            placeholder="Enter question text..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeQuestion(q.id); }}
                                            className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {activeId === q.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="pt-4 border-t border-border space-y-4"
                                    >
                                        {/* Type Specific Fields */}
                                        {(q.type === "multiple-choice" || q.type === "checkbox") && (
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Options</label>
                                                {q.options?.map((opt, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className={`w-4 h-4 rounded-full border border-border ${q.type === 'checkbox' ? 'rounded-md' : ''}`} />
                                                        <input
                                                            type="text"
                                                            value={opt}
                                                            onChange={(e) => updateOption(q.id, idx, e.target.value)}
                                                            className="flex-1 bg-black/5 dark:bg-white/5 border border-border rounded-lg px-3 py-1.5 text-sm"
                                                        />
                                                        <button
                                                            onClick={() => removeOption(q.id, idx)}
                                                            className="p-1.5 text-muted-foreground/30 hover:text-destructive transition-colors"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => addOption(q.id)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline hover:opacity-100 opacity-60 flex items-center gap-1 mt-2"
                                                >
                                                    <Plus className="w-3 h-3" /> Add Option
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={q.required}
                                                    onChange={(e) => updateQuestion(q.id, { required: e.target.checked })}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Required</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-1 rounded border border-border text-muted-foreground/40">
                                                {q.type}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                {questions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl opacity-30">
                        <Settings2 className="w-12 h-12 mb-4" />
                        <p className="font-bold uppercase tracking-[0.2em] text-sm">Design your survey architecture</p>
                    </div>
                )}
            </div>

            {/* Actions Bar */}
            <div className="w-48 space-y-4">
                <button
                    onClick={() => onSave(questions)}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                >
                    <Save className="w-4 h-4" />
                    Publish
                </button>
                <button
                    onClick={onCancel}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-border font-black rounded-2xl hover:bg-muted transition-all uppercase tracking-widest text-xs"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
