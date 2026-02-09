import { productService } from "@/lib/services/products";
import { notFound } from "next/navigation";
import { Shield, Lock, FileText, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function PrivacyPolicy({ params }: { params: { slug: string } }) {
    const product = await productService.getById(params.slug);

    if (!product) notFound();

    const privacyText = product.meta?.privacyPolicy || `This privacy policy describes how ${product.name} collects, uses, and shares your personal information. We take your privacy seriously and only collect the minimum data necessary to provide our services.`;

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <Link
                href={`/products/${params.slug}`}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
            >
                <ChevronLeft className="w-4 h-4" /> Back to Product
            </Link>

            <div className="glass-card p-12 rounded-[3rem] border border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                    <Shield className="w-64 h-64" />
                </div>

                <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tight">{product.name} <span className="text-primary">Privacy</span></h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 mt-1 text-glow">Legal Manifest v{product.version || "1.0"}</p>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none">
                    <div className="space-y-8 text-muted-foreground leading-relaxed">
                        <p className="font-medium text-foreground italic bg-primary/5 p-6 rounded-2xl border border-primary/10">
                            Last Intel Update: {product.lastUpdated || new Date().toLocaleDateString()}
                        </p>

                        <div className="whitespace-pre-wrap font-sans text-lg">
                            {privacyText}
                        </div>

                        <section className="pt-12 border-t border-border">
                            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-primary" /> Data Sovereignty
                            </h2>
                            <p>
                                All data handled by {product.name} is processed in accordance with our global security standards.
                                We do not sell your data to third parties. If you have questions, please contact the administrator.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="mt-12 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/20">
                &copy; {new Date().getFullYear()} Subhan Neural Network. All Rights Reserved.
            </footer>
        </main>
    );
}
