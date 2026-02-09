"use client";

import { useState, useEffect } from "react";
import { surveyService, Survey } from "@/lib/services/surveys";
import { extensionService, ExtensionProfile } from "@/lib/services/extensions";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight, CheckCircle2, Star,
    ArrowRight, Loader2
} from "lucide-react";

export default function PublicSurveyPage({ params }: { params: { id: string } }) {
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [extension, setExtension] = useState<ExtensionProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(0); // 0 = intro, 1+ = questions, last = thank you
    const [answers, setAnswers] = useState<Record<string, string | number>>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const s = await surveyService.getSurvey(params.id);
            if (s) {
                setSurvey(s);
                const e = await extensionService.getById(s.extensionId);
                setExtension(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [params.id]);

    const handleNext = () => {
        if (step < (survey?.questions.length || 0)) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!survey) return;
        setLoading(true);
        await surveyService.submitResponse({
            surveyId: survey.id!,
            extensionId: survey.extensionId,
            answers,
            metadata: {
                userAgent: navigator.userAgent,
                version: survey.version
            }
        });
        setSubmitted(true);
        setLoading(false);
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Neural synchronization...</p>
        </div>
    );

    if (!survey) return <div>Survey not found.</div>;

    const currentQuestion = step > 0 ? survey.questions[step - 1] : null;
    const progress = (step / survey.questions.length) * 100;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.05)_0%,transparent_50%)]">
            <div className="max-w-xl w-full">
                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-green-500/20">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tight uppercase">Transmission Received</h1>
                                <p className="text-muted-foreground leading-relaxed">
                                    Your tactical feedback has been integrated into the {extension?.name} core.
                                    Synchronizing redirect protocols...
                                </p>
                            </div>
                            {survey.redirectUrl && (
                                <a
                                    href={survey.redirectUrl}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all uppercase tracking-widest text-xs"
                                >
                                    Return to HQ <ArrowRight className="w-4 h-4" />
                                </a>
                            )}
                        </motion.div>
                    ) : step === 0 ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 px-4 py-2 rounded-full glass-card w-fit border border-primary/20">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{extension?.name} Lifecycle</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">{survey.title}</h1>
                                <p className="text-muted-foreground text-lg leading-relaxed">{survey.description || "Experimental feedback module."}</p>
                            </div>
                            <button
                                onClick={() => setStep(1)}
                                className="group flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground font-black rounded-3xl hover:opacity-90 transition-all shadow-2xl shadow-primary/30 uppercase tracking-[0.2em] text-xs"
                            >
                                Initialize Feedback
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`step-${step}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12"
                        >
                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                                    <span>Protocol Phase {step} / {survey.questions.length}</span>
                                    <span>{Math.round(progress)}% Complete</span>
                                </div>
                                <div className="h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question Card */}
                            <div className="space-y-10">
                                <h2 className="text-3xl font-bold tracking-tight leading-tight">{currentQuestion?.text}</h2>

                                <div className="space-y-3">
                                    {currentQuestion?.type === "multiple-choice" && currentQuestion.options?.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setAnswers({ ...answers, [currentQuestion.id]: opt });
                                                handleNext();
                                            }}
                                            className={`w-full text-left p-6 rounded-2xl border transition-all text-sm font-bold flex items-center justify-between group ${answers[currentQuestion.id] === opt
                                                ? 'bg-primary border-primary text-primary-foreground'
                                                : 'glass-card border-border hover:border-primary/50'
                                                }`}
                                        >
                                            {opt}
                                            <div className={`w-2 h-2 rounded-full ${answers[currentQuestion.id] === opt ? 'bg-white' : 'bg-muted-foreground/20 group-hover:bg-primary/50'} transition-colors`} />
                                        </button>
                                    ))}

                                    {currentQuestion?.type === "text" && (
                                        <div className="space-y-8">
                                            <textarea
                                                className="w-full h-40 glass-card bg-transparent border border-border rounded-3xl p-8 text-lg outline-none focus:border-primary transition-colors focus:ring-4 ring-primary/5"
                                                placeholder="Enter mission notes..."
                                                value={answers[currentQuestion.id] || ""}
                                                onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
                                            />
                                            <button
                                                onClick={handleNext}
                                                className="w-full py-5 bg-primary text-primary-foreground font-black rounded-3xl shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                                            >
                                                Next Phase
                                            </button>
                                        </div>
                                    )}

                                    {currentQuestion?.type === "rating" && (
                                        <div className="flex flex-col items-center gap-12">
                                            <div className="flex gap-4">
                                                {[1, 2, 3, 4, 5].map((val) => (
                                                    <button
                                                        key={val}
                                                        onClick={() => {
                                                            setAnswers({ ...answers, [currentQuestion.id]: val });
                                                            setTimeout(handleNext, 300);
                                                        }}
                                                        className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all ${answers[currentQuestion.id] === val
                                                            ? 'bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20'
                                                            : 'glass-card border-border hover:border-primary/50 scale-100'
                                                            }`}
                                                    >
                                                        <Star className={`w-8 h-8 ${(answers[currentQuestion.id] as number) >= val ? 'fill-current' : ''}`} />
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Select Rating Intensity</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(step - 1)}
                                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 hover:text-primary transition-colors"
                            >
                                Return to Previous Phase
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
