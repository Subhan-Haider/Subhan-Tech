import {
    Chrome, Sidebar, Globe, Code2, Terminal, Cpu,
    Layout, Boxes, Smartphone, Zap, Shield, Search,
    Database, Cloud, Key, FileCode, Layers, Monitor,
    MessageSquare, Share2, Coffee, Ghost, Activity,
    Lock, Settings, Eye
} from "lucide-react";

export const SITE_CONFIG = {
    name: "Subhan",
    domain: "subhan.tech",
    tagline: "Neural Engineering & Tactical Operations",
};

export const EXTENSIONS = [
    {
        name: "CodeLens",
        description: "Intelligent code analysis and insights directly in your browser. Perfect for debugging and learning.",
        url: "https://subhan.tech/codelens",
        platform: "chrome" as const,
        icon: Code2,
    },
    {
        name: "LootOps Helper",
        description: "Automate your daily operations and track statistics with tactical precision.",
        url: "https://subhan.tech/lootops",
        platform: "edge" as const,
        icon: Boxes,
    },
    {
        name: "Privacy Guard",
        description: "Enhanced privacy protection and ad-blocking for a cleaner browsing experience.",
        url: "https://subhan.tech/privacy",
        platform: "firefox" as const,
        icon: Shield,
    },
    {
        name: "Neural Tab Manager",
        description: "Hierarchical tab organization with memory optimization kernels.",
        url: "#",
        platform: "chrome" as const,
        icon: Layers,
    },
    {
        name: "Dark Mode Engine",
        description: "Forced neural dark themes for every website on the fly.",
        url: "#",
        platform: "all" as const,
        icon: Ghost,
    },
];

export const SOFTWARE = [
    {
        name: "SubhanOS v1",
        description: "A custom desktop environment focused on neural productivity and minimalist design.",
        url: "#",
        category: "System",
        icon: Cpu,
    },
    {
        name: "Tactical CLI",
        description: "Advanced command-line interface for managing cloud-based micro-operations.",
        url: "#",
        category: "DevTool",
        icon: Terminal,
    },
    {
        name: "Neural App",
        description: "Cross-platform mobile application for biometric data tracking and optimization.",
        url: "#",
        category: "Mobile",
        icon: Smartphone,
    },
    {
        name: "Subhan Shield",
        description: "AI-powered firewall and network integrity monitor for home servers.",
        url: "#",
        category: "Security",
        icon: Lock,
    },
    {
        name: "Cloud Weaver",
        description: "Distributed task orchestrator for high-performance computing clusters.",
        url: "#",
        category: "DevOps",
        icon: Cloud,
    },
];

export const TOOLS = [
    { name: "Hex Converter", description: "Binary to Hex professional encoding.", icon: Activity },
    { name: "Secret Vault", description: "Client-side encrypted credential storage.", icon: Key },
    { name: "Code Forge", description: "Real-time collaborative markdown editor.", icon: FileCode },
    { name: "Insight API", description: "Public endpoint for data analytics.", icon: Database },
];

export const WEBSITES = [
    { name: "Personal Portfolio", url: "https://subhan.tech", category: "Personal" },
    { name: "Engineering Blog", url: "https://blog.subhan.tech", category: "Writing" },
    { name: "Open Source Lab", url: "https://github.com/Subhan", category: "GitHub" },
    { name: "Tactical Gear Shop", url: "https://shop.subhan.tech", category: "E-commerce" },
    { name: "Neural Documentation", url: "https://docs.subhan.tech", category: "Resources" },
    { name: "Central API", url: "https://api.subhan.tech", category: "System" },
    { name: "Subhan Discord", url: "https://discord.gg/subhan", category: "Community" },
    { name: "X / Twitter", url: "https://x.com/subhan", category: "Social" },
    { name: "Buy Me Coffee", url: "https://buymeacoffee.com/subhan", category: "Support" },
];
