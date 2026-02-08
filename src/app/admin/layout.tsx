"use client";

import { motion } from "framer-motion";
import {
    LayoutDashboard, Package, Code2, Zap, Globe,
    Settings, Bell, Search, User, LogOut, ChevronRight,
    BarChart3, Link as LinkIcon, FileText, Shield, FolderGit2,
    Ticket, Activity
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

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
        <div className="min-h-screen bg-[#030303] flex text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 flex flex-col p-6 fixed inset-y-0 left-0 z-50 bg-[#030303]">
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                        <Settings className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">NEURAL<span className="text-white/20">.HQ</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/40 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-white"}`} />
                                <span className="text-sm font-medium">{item.name}</span>
                                {isActive && <div className="ml-auto w-1 h-4 bg-white rounded-full" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                    <button className="flex items-center gap-3 px-4 py-2 w-full text-white/40 hover:text-white transition-colors text-sm font-medium">
                        <User className="w-4 h-4" />
                        Admin Profile
                    </button>
                    <Link href="/" className="flex items-center gap-3 px-4 py-2 w-full text-white/40 hover:text-white transition-colors text-sm font-medium">
                        <LogOut className="w-4 h-4" />
                        Exit Dashboard
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen pb-20">
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 bg-[#030303]/80 backdrop-blur-md z-40">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-xl w-96 group focus-within:border-white/20 transition-all">
                        <Search className="w-4 h-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                        <input
                            placeholder="Search assets..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <Bell className="w-5 h-5 text-white/40" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full border-2 border-[#030303]" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-none mb-1">Subhan Haider</p>
                                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">System Overseer</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10" />
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
