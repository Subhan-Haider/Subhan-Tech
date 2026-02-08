"use client";

import { motion } from "framer-motion";
import {
    Settings, Bell, Shield, Database,
    Globe, Mail, Users, Save
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "Neural Hub",
        siteUrl: "https://subhan.tech",
        adminEmail: "admin@subhan.tech",
        enableAnalytics: true,
        enableNotifications: true,
        maintenanceMode: false,
        apiRateLimit: 100,
        sessionTimeout: 24,
    });

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">System Settings</h1>
                    <p className="text-white/40">Configure platform settings and preferences.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </div>

            {/* General Settings */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/5">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">General Settings</h2>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Site Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Site URL</label>
                            <input
                                type="url"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                value={settings.siteUrl}
                                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-white/60">Admin Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                            value={settings.adminEmail}
                            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/5">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Security & API</h2>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">API Rate Limit (requests/hour)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                value={settings.apiRateLimit}
                                onChange={(e) => setSettings({ ...settings, apiRateLimit: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Session Timeout (hours)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                value={settings.sessionTimeout}
                                onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-sm text-yellow-500 font-bold mb-2">🔐 API Keys</p>
                        <p className="text-sm text-white/60 mb-3">Manage your API keys and access tokens</p>
                        <button className="px-4 py-2 bg-white/5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
                            Manage API Keys
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Feature Toggles */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/5">
                        <Settings className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Feature Toggles</h2>
                </div>
                <div className="space-y-4">
                    {[
                        {
                            key: "enableAnalytics",
                            label: "Enable Analytics",
                            desc: "Track visitor data and generate insights",
                            icon: Database
                        },
                        {
                            key: "enableNotifications",
                            label: "Enable Notifications",
                            desc: "Send email notifications for important events",
                            icon: Bell
                        },
                        {
                            key: "maintenanceMode",
                            label: "Maintenance Mode",
                            desc: "Put the site in maintenance mode (visitors will see a maintenance page)",
                            icon: Shield,
                            warning: true
                        },
                    ].map((feature) => (
                        <div key={feature.key} className={`p-6 rounded-xl border ${feature.warning ? "bg-red-500/10 border-red-500/20" : "bg-white/5 border-white/5"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-white/5">
                                        <feature.icon className="w-5 h-5 text-white/60" />
                                    </div>
                                    <div>
                                        <p className="font-bold mb-1">{feature.label}</p>
                                        <p className="text-sm text-white/40">{feature.desc}</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={settings[feature.key as keyof typeof settings] as boolean}
                                        onChange={(e) => setSettings({ ...settings, [feature.key]: e.target.checked })}
                                    />
                                    <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Email Settings */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/5">
                        <Mail className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Email Configuration</h2>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">SMTP Host</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="smtp.example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">SMTP Port</label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="587"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">SMTP Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="user@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">SMTP Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
                        Test Email Configuration
                    </button>
                </div>
            </motion.div>

            {/* User Management */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 rounded-2xl border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-white/5">
                        <Users className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">User Management</h2>
                </div>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-400 font-bold mb-2">👥 Admin Users</p>
                        <p className="text-sm text-white/60 mb-3">Manage admin access and permissions</p>
                        <button className="px-4 py-2 bg-white/5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
                            Manage Admins
                        </button>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <p className="text-sm text-green-400 font-bold mb-2">🔑 Invite Codes</p>
                        <p className="text-sm text-white/60 mb-3">Generate invite codes for new users</p>
                        <button className="px-4 py-2 bg-white/5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
                            Generate Codes
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
