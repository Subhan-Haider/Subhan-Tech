"use client"

import { useState } from "react"
import { LegalPage } from "@/lib/services/legal"
import {
    Save, Globe, Mail, Building
} from "lucide-react"

interface LegalPageBuilderProps {
    initialPage: Partial<LegalPage>
    onSave: (page: Partial<LegalPage>) => void
    onCancel: () => void
}

export function LegalPageBuilder({ initialPage, onSave, onCancel }: LegalPageBuilderProps) {
    const [page, setPage] = useState<Partial<LegalPage>>(initialPage)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[calc(100vh-250px)]">
            {/* Editor */}
            <div className="space-y-8 h-full overflow-y-auto pr-4 custom-scrollbar">
                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 mb-3 block">Policy Metadata</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Extension Name</span>
                                <div className="flex items-center gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 border border-border rounded-xl">
                                    <Globe className="w-4 h-4 text-muted-foreground/40" />
                                    <input
                                        type="text"
                                        value={page.config?.extensionName || ""}
                                        onChange={(e) => setPage({ ...page, config: { ...page.config!, extensionName: e.target.value } })}
                                        className="bg-transparent border-none outline-none text-sm w-full"
                                        placeholder="e.g. CodeLens"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Company Name</span>
                                <div className="flex items-center gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 border border-border rounded-xl">
                                    <Building className="w-4 h-4 text-muted-foreground/40" />
                                    <input
                                        type="text"
                                        value={page.config?.companyName || ""}
                                        onChange={(e) => setPage({ ...page, config: { ...page.config!, companyName: e.target.value } })}
                                        className="bg-transparent border-none outline-none text-sm w-full"
                                        placeholder="e.g. LootOps Lab"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Support Email</span>
                        <div className="flex items-center gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 border border-border rounded-xl">
                            <Mail className="w-4 h-4 text-muted-foreground/40" />
                            <input
                                type="email"
                                value={page.config?.contactEmail || ""}
                                onChange={(e) => setPage({ ...page, config: { ...page.config!, contactEmail: e.target.value } })}
                                className="bg-transparent border-none outline-none text-sm w-full"
                                placeholder="support@domain.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Policy Content (Markdown)</span>
                        <textarea
                            value={page.content}
                            onChange={(e) => setPage({ ...page, content: e.target.value })}
                            className="w-full h-80 bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-6 text-sm outline-none focus:border-primary transition-all font-mono"
                            placeholder="# Privacy Policy\n\nStarting with..."
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-8">
                    <button
                        onClick={() => onSave(page)}
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-xs"
                    >
                        <Save className="w-5 h-5" />
                        Save Policy
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-8 py-4 border border-border font-black rounded-2xl hover:bg-muted transition-all uppercase tracking-widest text-xs"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Live Preview */}
            <div className="glass-card rounded-[2.5rem] border border-border overflow-hidden flex flex-col h-full bg-white dark:bg-slate-950">
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Visualizer: {page.type} module</span>
                </div>
                <div className="flex-1 overflow-y-auto p-12 prose dark:prose-invert prose-slate max-w-none">
                    <h1 className="uppercase tracking-tight text-4xl font-black mb-8">{page.config?.extensionName} Privacy Policy</h1>
                    <p className="text-muted-foreground text-sm italic mb-8">Generated for {page.config?.companyName} • Last updated {new Date().toLocaleDateString()}</p>
                    <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: page.content?.replace(/\n/g, '<br/>') || "Policy brain initializing..." }} />
                </div>
            </div>
        </div>
    )
}
