"use client";


import {
    LayoutDashboard, Package, Code2, Zap, Globe,
    Settings, Bell, Search, User, LogOut,
    BarChart3, Link as LinkIcon, FileText, Shield, FolderGit2,
    Ticket, Activity
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

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
        { name: "Software", icon: Package, href: "/admin/software" },
        { name: "Extensions", icon: Code2, href: "/admin/extensions" },
        { name: "Tools", icon: Zap, href: "/admin/tools" },
        { name: "Websites", icon: Globe, href: "/admin/websites" },
        { name: "Coupons", icon: Ticket, href: "/admin/coupons" },
        { name: "Surveys", icon: Bell, href: "/admin/surveys-manager" },
        { name: "Pages", icon: FileText, href: "/admin/pages-manager" },
        { name: "Projects", icon: FolderGit2, href: "/admin/projects-manager" },
        { name: "Privacy Pages", icon: Shield, href: "/admin/privacy-pages" },
        { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
        { name: "URL Manager", icon: LinkIcon, href: "/admin/url-manager" },
        { name: "System Logs", icon: Activity, href: "/admin/logs" },
        { name: "Settings", icon: Settings, href: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-background flex text-foreground font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border flex flex-col p-6 fixed inset-y-0 left-0 z-50 bg-background">
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Settings className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">NEURAL<span className="text-muted-foreground/20">.HQ</span></span>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                                <span className="text-sm font-medium">{item.name}</span>
                                {isActive && <div className="ml-auto w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />}
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
            <main className="flex-1 ml-64 min-h-screen pb-20">
                <header className="h-20 border-b border-border flex items-center justify-between px-10 sticky top-0 bg-background/80 backdrop-blur-md z-40">
                    <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-border px-4 py-2 rounded-xl w-96 group focus-within:border-primary transition-all">
                        <Search className="w-4 h-4 text-muted-foreground/40 group-focus-within:text-foreground/60 transition-colors" />
                        <input
                            placeholder="Search assets..."
                            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/20 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground/60" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-none mb-1">{user?.displayName || "Admin"}</p>
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-bold">System Overseer</p>
                            </div>
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Admin"
                                    className="w-10 h-10 rounded-full border border-border"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black/20 to-black/5 dark:from-white/20 dark:to-white/5 border border-border" />
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
