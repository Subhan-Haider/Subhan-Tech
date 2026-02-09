import { productService } from "@/lib/services/products";
import { notFound } from "next/navigation";
import { CheckCircle, Zap, ArrowRight, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default async function SuccessPage({ params }: { params: { id: string } }) {
    const product = await productService.getById(params.id);

    if (!product) notFound();

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />

            <div className="max-w-2xl w-full">
                <div className="glass-card p-12 rounded-[3.5rem] border border-border text-center space-y-10 relative">
                    <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-primary/30 rounded-full blur-xl animate-pulse" />
                        <div className="w-24 h-24 rounded-[2rem] bg-background border border-border flex items-center justify-center relative">
                            <CheckCircle className="w-12 h-12 text-primary" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter">
                            Neural <span className="text-primary">Deployed</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                            {product.name} has been successfully integrated into your system.
                            Your environment is now synchronized with version {product.version || "1.0"}.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href={`/products/${params.id}`}
                            className="flex items-center justify-center gap-3 px-8 py-5 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                        >
                            View Docs <ArrowRight className="w-4 h-4" />
                        </Link>
                        {product.meta?.surveyId && (
                            <Link
                                href={`/survey/${product.meta.surveyId}`}
                                className="flex items-center justify-center gap-3 px-8 py-5 bg-black/5 dark:bg-white/5 border border-border text-foreground font-black rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                            >
                                Give Feedback <MessageSquare className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    <div className="pt-10 flex flex-col items-center gap-6">
                        <div className="h-[1px] w-24 bg-border" />
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">
                            <Zap className="w-4 h-4 text-primary" /> System Optimal <Zap className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                    <Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Engagement</Link>
                    <span>&bull;</span>
                    <Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Protocol</Link>
                </div>
            </div>
        </main>
    );
}
