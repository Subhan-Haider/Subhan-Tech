"use client";

import { motion } from "framer-motion";
import {
    Users, UserPlus, Trash2, ShieldCheck,
    Mail, Calendar
} from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
    collection, getDocs, doc, setDoc,
    deleteDoc, query, orderBy, Timestamp
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface AdminUser {
    email: string;
    addedAt: Timestamp;
    addedBy: string;
    role: string;
}

export default function AdminUsers() {
    const { user: currentUser } = useAuth();
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [newEmail, setNewEmail] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "admins"), orderBy("addedAt", "desc"));
            const querySnapshot = await getDocs(q);
            const adminList: AdminUser[] = [];
            querySnapshot.forEach((doc) => {
                adminList.push(doc.data() as AdminUser);
            });
            setAdmins(adminList);
        } catch (error) {
            console.error("Error fetching admins:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        setIsAdding(true);
        try {
            const adminData: AdminUser = {
                email: newEmail.toLowerCase().trim(),
                addedAt: Timestamp.now(),
                addedBy: currentUser?.email || "Unknown",
                role: "Admin"
            };

            await setDoc(doc(db, "admins", adminData.email), adminData);

            setMessage({ type: "success", text: `Success! ${newEmail} is now an admin.` });
            setNewEmail("");
            fetchAdmins();
        } catch (error) {
            setMessage({ type: "error", text: "Failed to add admin. Check permissions." });
            console.error(error);
        } finally {
            setIsAdding(false);
            setTimeout(() => setMessage({ type: "", text: "" }), 5000);
        }
    };

    const handleRemoveAdmin = async (email: string) => {
        if (email === currentUser?.email) {
            alert("You cannot remove yourself!");
            return;
        }

        if (confirm(`Are you sure you want to remove ${email} as an admin?`)) {
            try {
                await deleteDoc(doc(db, "admins", email));
                fetchAdmins();
            } catch (error) {
                console.error("Error removing admin:", error);
            }
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Team Management</h1>
                    <p className="text-muted-foreground/60">Invite and manage administrative access.</p>
                </div>
                <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Secure Access</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Invite Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-8 rounded-2xl border border-border bg-black/[0.02] dark:bg-white/[0.02]"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-primary/10">
                            <UserPlus className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold">Invite Admin</h2>
                    </div>

                    <form onSubmit={handleAddAdmin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-muted-foreground/60">Email Address</label>
                            <input
                                type="email"
                                required
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border focus:border-primary outline-none transition-all text-foreground"
                                placeholder="new-admin@subhan.tech"
                            />
                        </div>

                        <button
                            disabled={isAdding}
                            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
                        >
                            {isAdding ? "Adding..." : "Authorize Access"}
                        </button>

                        {message.text && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl text-xs font-bold ${message.type === "success"
                                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                                    }`}
                            >
                                {message.text}
                            </motion.div>
                        )}
                    </form>

                    <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-amber-500 mb-2">Notice</p>
                        <p className="text-xs text-muted-foreground/60 leading-relaxed">
                            Authorized users will be able to access all administrative features. Only invite trusted team members.
                        </p>
                    </div>
                </motion.div>

                {/* Admins List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground/60" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/40">Active Admins</h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 bg-black/5 dark:bg-white/5 rounded border border-border text-muted-foreground/60">
                            {admins.length} Systems Authorized
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        admins.map((admin, i) => (
                            <motion.div
                                key={admin.email}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="glass-card p-6 rounded-2xl border border-border bg-black/[0.02] dark:bg-white/[0.02] group hover:border-primary/20 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-border group-hover:border-primary/20 transition-all">
                                            <Mail className="w-5 h-5 text-muted-foreground/40" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">{admin.email}</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded">
                                                    {admin.role}
                                                </span>
                                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground/40 font-medium">
                                                    <Calendar className="w-3 h-3" />
                                                    {admin.addedAt?.toDate().toLocaleDateString() || "System Default"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button
                                            onClick={() => handleRemoveAdmin(admin.email)}
                                            className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground/40 hover:text-red-500 transition-all"
                                            title="Revoke Access"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                {admin.addedBy && admin.addedBy !== "Unknown" && (
                                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                                        <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/20">Authorized By:</span>
                                        <span className="text-[10px] font-medium text-muted-foreground/60">{admin.addedBy}</span>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}

                    {!loading && admins.length === 0 && (
                        <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-border">
                            <Users className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
                            <p className="text-muted-foreground/40 font-bold">No registered admins found.</p>
                            <p className="text-[10px] text-muted-foreground/20 uppercase tracking-widest mt-2">Initialize your team system</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
