"use client";

import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
    const { user, loading, isAdmin, signInWithGoogle } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!loading && user && isAdmin) {
            router.push("/admin");
        }
    }, [user, loading, isAdmin, router]);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to sign in. Please check your credentials.";
            setError(errorMessage);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError("Please enter your email address first.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage("Password reset email sent. Check your inbox.");
            setError("");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to send reset email.";
            setError(errorMessage);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-10 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500" />

                    <div className="mb-10 text-center relative">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
                        />
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border-2 border-primary/20 relative z-10 backdrop-blur-xl shadow-2xl shadow-primary/20">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">Neural<span className="text-primary">.HQ</span></h1>
                        <p className="text-muted-foreground/30 text-[9px] font-black uppercase tracking-[0.4em]">&quot;Decrypting session protocol...&quot;</p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40 ml-1">Email Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-border focus:border-primary px-12 py-3 rounded-xl outline-none transition-all text-sm"
                                    placeholder="admin@subhan.tech"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">Access Key</label>
                                <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="text-[10px] uppercase tracking-widest text-primary hover:underline"
                                >
                                    Recovery?
                                </button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-border focus:border-primary px-12 py-3 rounded-xl outline-none transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-xl flex items-center gap-3 text-destructive text-xs animate-shake">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {user && !isAdmin && !loading && (
                            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-center gap-3 text-amber-500 text-xs italic">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>Access Denied: Your account does not have administrative privileges.</span>
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex items-center gap-3 text-green-500 text-xs">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{successMessage}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/30 uppercase tracking-[0.2em] text-xs border border-white/10"
                        >
                            <LogIn className="w-5 h-5" />
                            Synchronize Access
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-border" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/20">Biometric Sync</span>
                        <div className="h-[1px] flex-1 bg-border" />
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        className="w-full bg-black/5 dark:bg-white/5 border border-border hover:bg-black/10 dark:hover:bg-white/10 text-foreground font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                            />
                        </svg>
                        Initiate Google Scan
                    </button>

                    <p className="mt-8 text-[10px] text-center text-muted-foreground/20 font-bold uppercase tracking-[0.2em]">
                        Restricted Area · Unauthorized access is logged
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
