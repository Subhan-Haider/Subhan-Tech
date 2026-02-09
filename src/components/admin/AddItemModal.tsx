import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface FormData {
    name: string;
    description: string;
    url: string;
    category: string;
    platform: string;
    code: string;
    discount: string;
}

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
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

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                setUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setFormData({ ...formData, url: downloadURL });
                setUploadedFile(file.name);
                setUploading(false);
            }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setFormData({ name: "", description: "", url: "", category: "", platform: "chrome", code: "", discount: "" });
        setUploadProgress(0);
        setUploadedFile(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 backdrop-blur-sm bg-black/60 dark:bg-black/80">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-2xl glass-card rounded-3xl shadow-2xl overflow-hidden border border-border"
                    >
                        <div className="flex items-center justify-between px-8 py-6 border-b border-border bg-black/[0.02] dark:bg-white/[0.02]">
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">Authorize New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                                <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1">Central Asset Registration</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Asset Identifier *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-medium"
                                        placeholder={`Enter ${type} name`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                {type === "coupon" ? (
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Authorization Code *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-black tracking-widest uppercase"
                                            placeholder="e.g., FREE100"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest mb-2 text-muted-foreground/60">Source Link / Direct URL *</label>
                                        <input
                                            type="url"
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-medium"
                                            placeholder="https://v2.subhan.tech/..."
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Direct File Upload Section for Software/Tools */}
                            {(type === "software" || type === "tool") && (
                                <div className="p-1 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-border border-dashed">
                                    <div className="p-6 text-center">
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                        />
                                        {uploading ? (
                                            <div className="space-y-4">
                                                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                                                <div className="space-y-1">
                                                    <p className="text-xs font-black uppercase tracking-widest text-primary">Uploading Payload...</p>
                                                    <div className="h-1.5 w-full max-w-[200px] mx-auto bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-primary"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${uploadProgress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : uploadedFile ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="p-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-500">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs font-black uppercase tracking-wider text-green-500">Direct Link Generated</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium truncate max-w-[250px]">{uploadedFile}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="mt-2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                                                >
                                                    Replace File
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border">
                                                    <Upload className="w-6 h-6 text-muted-foreground/30" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest mb-1">Direct Upload</p>
                                                    <p className="text-[10px] text-muted-foreground/40 font-medium">Auto-generate secure download link (exe, zip, dmg)</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-6 py-2.5 bg-black/10 dark:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-black/20 transition-all border border-border mt-2"
                                                >
                                                    Initialize Upload
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Telemetry Description *</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-medium resize-none leading-relaxed"
                                    placeholder={`Describe the core function of this asset...`}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {type === "coupon" && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Discount Value *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-bold"
                                                placeholder="e.g., 100% OFF, Free Lifetime"
                                                value={formData.discount}
                                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Classification *</label>
                                            <select
                                                className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="General">General</option>
                                                <option value="Extension">Extension</option>
                                                <option value="Software">Software</option>
                                                <option value="Premium">Premium</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {type === "software" && (
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Classification *</label>
                                        <select
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="" className="dark:bg-background text-foreground">Select category</option>
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
                                        <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Platform Architecture *</label>
                                        <select
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                                            value={formData.platform}
                                            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        >
                                            <option value="chrome">Chrome Engine</option>
                                            <option value="edge">Edge Architecture</option>
                                            <option value="firefox">Firefox System</option>
                                            <option value="all">Universal Platform</option>
                                        </select>
                                    </div>
                                )}

                                {type === "website" && (
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest mb-3 text-muted-foreground/60">Network Category *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-sm font-bold"
                                            placeholder="e.g., Personal, GitHub, Social"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-8 py-4 border border-border rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20"
                                >
                                    Authorize Entry
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
