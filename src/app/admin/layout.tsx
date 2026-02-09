"use client";


import {
    LayoutDashboard, Package, Code2, Zap, Globe,
    Settings, Bell, Search, User, LogOut,
    BarChart3, Link as LinkIcon, FileText, Shield, FolderGit2,
    Ticket, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { AIAssistant } from "@/components/admin/AIAssistant";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, isAdmin, logout } = useAuth();

    useEffect(() => {
        if (!loading && pathname !== "/admin/login") {
            if (!user || !isAdmin) {
                router.push("/admin/login");
            }
        }
    }, [user, loading, isAdmin, pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (!user || !isAdmin) {
        return null; // or a redirecting message
    }

    const menuItems = [
        { name: "Overview", icon: LayoutDashboard, href: "/admin" },
        { name: "Products", icon: Package, href: "/admin/products" },
        { name: "Tools", icon: Zap, href: "/admin/tools" },
        { name: "Websites", icon: Globe, href: "/admin/websites" },
        { name: "Coupons", icon: Ticket, href: "/admin/coupons" },
        { name: "Surveys", icon: Bell, href: "/admin/surveys-manager" },
        { name: "Pages", icon: FileText, href: "/admin/pages-manager" },
        { name: "Projects", icon: FolderGit2, href: "/admin/projects-manager" },
        { name: "Privacy Pages", icon: Shield, href: "/admin/privacy-pages" },
        { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
        { name: "Users", icon: User, href: "/admin/users" },
        { name: "URL Manager", icon: LinkIcon, href: "/admin/url-manager" },
        { name: "System Logs", icon: Activity, href: "/admin/logs" },
        { name: "Settings", icon: Settings, href: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-background flex text-foreground font-sans">
            {/* Sidebar */}
            <aside className="w-72 border-r border-border flex flex-col p-8 fixed inset-y-0 left-0 z-50 bg-background/50 backdrop-blur-2xl">
                <div className="mb-12 flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-transform">
                        <Settings className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <span className="font-black text-2xl tracking-tighter block leading-none">NEURAL</span>
                        <span className="text-[10px] font-black tracking-[0.4em] text-muted-foreground/30 uppercase leading-none">Intelligence HQ</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 pr-3 -mr-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group relative ${isActive
                                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-bold"
                                    : "text-muted-foreground/50 hover:bg-primary/5 hover:text-primary"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "group-hover:scale-110 transition-transform"}`} />
                                <span className="text-sm tracking-tight">{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-border space-y-4">
                    <button className="flex items-center gap-3 px-4 py-2 w-full text-muted-foreground/60 hover:text-foreground transition-colors text-sm font-medium">
                        <User className="w-4 h-4" />
                        Admin Profile
                    </button>
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-4 py-2 w-full text-muted-foreground/60 hover:text-foreground transition-colors text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Exit Dashboard
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 min-h-screen pb-20">
                <header className="h-24 border-b border-border flex items-center justify-between px-12 sticky top-0 bg-background/60 backdrop-blur-2xl z-40">
                    <div className="flex items-center gap-6 bg-black/5 dark:bg-white/5 border border-border px-6 py-3.5 rounded-2xl w-full max-w-xl group focus-within:border-primary/50 focus-within:bg-black/10 dark:focus-within:bg-white/10 transition-all shadow-sm">
                        <Search className="w-5 h-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                        <input
                            placeholder="Terminal query: search assets, users, or logs..."
                            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/20 w-full font-medium"
                        />
                        <div className="flex items-center gap-1 px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-border text-[10px] font-black text-muted-foreground/40">
                            <span className="opacity-60">⌘</span>
                            <span>K</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <button className="relative p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-border hover:bg-black/10 dark:hover:bg-white/10 transition-all group">
                                <Bell className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse" />
                            </button>
                        </div>

                        <div className="h-10 w-[1px] bg-border" />

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black tracking-tight leading-none mb-1.5">{user?.displayName || "System Overseer"}</p>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-primary font-black">Authorized Level 5</p>
                            </div>
                            {user?.photoURL ? (
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Image
                                        src={user.photoURL}
                                        alt="Admin Profile"
                                        width={48}
                                        height={48}
                                        className="relative rounded-2xl border-2 border-border shadow-lg"
                                    />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center shadow-lg">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>
            <AIAssistant />
        </div>
    );
}
