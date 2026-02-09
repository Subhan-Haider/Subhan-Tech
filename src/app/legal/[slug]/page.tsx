import { legalService } from "@/lib/services/legal";
import { notFound } from "next/navigation";
import { Shield, Lock, FileText, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function LegalPage({ params }: { params: { slug: string } }) {
    const page = await legalService.getBySlug(params.slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-32">
            <header className="py-20 border-b border-border bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.05)_0%,transparent_50%)]">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group text-[10px] font-bold uppercase tracking-widest">
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Hub
                    </Link>

                    <div className="flex items-center gap-6 mb-8">
                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                            {page.type === 'privacy' ? <Shield className="w-8 h-8 text-primary" /> : <FileText className="w-8 h-8 text-primary" />}
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Authorized Legal Manifest</span>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                                {page.type} <span className="text-primary">Policy</span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-border flex items-center gap-2">
                            <Lock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">ENCRYPTED {page.slug.toUpperCase()}</span>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Last Revised: {new Date(page.lastUpdated).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </header>

            <article className="max-w-4xl mx-auto px-6 py-20">
                <div className="glass-card rounded-[2.5rem] p-8 md:p-16 border border-border shadow-2xl relative overflow-hidden">
                    <div className="prose dark:prose-invert prose-slate max-w-none text-muted-foreground leading-relaxed">
                        <p className="text-sm italic mb-12 opacity-80">
                            Note: This manifest governing the {page.config.extensionName} module is maintained by {page.config.companyName}.
                            Direct inquiries to <span className="text-primary font-bold underline cursor-help">{page.config.contactEmail}</span>.
                        </p>

                        <div className="space-y-8" dangerouslySetInnerHTML={{ __html: page.content.replace(/\n\n/g, '<br/><br/>').replace(/# (.*)/g, '<h2 class="text-xl font-bold text-foreground uppercase tracking-tight">$1</h2>') }} />
                    </div>

                    {/* Decorative watermark */}
                    <div className="absolute top-10 right-10 rotate-12 opacity-[0.02] pointer-events-none">
                        <Shield className="w-96 h-96" />
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30 leading-relaxed">
                        End of Transmission • {page.config.companyName} Neural Data Lab
                    </p>
                </div>
            </article>
        </div>
    );
}
