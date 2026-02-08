"use client";

import { motion } from "framer-motion";
import {
    Plus, Edit3, Trash2, ExternalLink,
    Github, Globe, Star, GitFork, Code, Eye
} from "lucide-react";
import { useState } from "react";


interface Project {
    id: number;
    name: string;
    description: string;
    category: "Web App" | "Extension" | "Tool" | "Library";
    status: "Live" | "In Development" | "Archived";
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    stars: number;
    forks: number;
    image: string;
    featured: boolean;
}

export default function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            name: "LootOps",
            description: "Gaming companion app for tracking loot and operations",
            category: "Web App",
            status: "Live",
            techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
            githubUrl: "https://github.com/Subhan-Haider/lootops",
            liveUrl: "https://lootops.subhan.tech",
            stars: 45,
            forks: 12,
            image: "/projects/lootops.png",
            featured: true,
        },
        {
            id: 2,
            name: "CodeLens",
            description: "AI-powered code analysis browser extension",
            category: "Extension",
            status: "Live",
            techStack: ["JavaScript", "Chrome API", "OpenAI"],
            githubUrl: "https://github.com/Subhan-Haider/CodeLens-Extension",
            liveUrl: "https://chrome.google.com/webstore/detail/codelens",
            stars: 128,
            forks: 34,
            image: "/projects/codelens.png",
            featured: true,
        },
        {
            id: 3,
            name: "Neural Hub",
            description: "Comprehensive platform for managing extensions and tools",
            category: "Web App",
            status: "In Development",
            techStack: ["Next.js", "TypeScript", "Recharts", "Framer Motion"],
            githubUrl: "https://github.com/Subhan-Haider/neural-hub",
            liveUrl: "https://subhan.tech",
            stars: 23,
            forks: 5,
            image: "/projects/neural-hub.png",
            featured: true,
        },
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        category: "Web App" as Project["category"],
        githubUrl: "",
        liveUrl: "",
    });

    const handleCreate = () => {
        const project: Project = {
            id: projects.length + 1,
            name: newProject.name,
            description: newProject.description,
            category: newProject.category,
            status: "In Development",
            techStack: [],
            githubUrl: newProject.githubUrl,
            liveUrl: newProject.liveUrl,
            stars: 0,
            forks: 0,
            image: "",
            featured: false,
        };
        setProjects([...projects, project]);
        setNewProject({ name: "", description: "", category: "Web App", githubUrl: "", liveUrl: "" });
        setIsCreating(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this project?")) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const toggleFeatured = (id: number) => {
        setProjects(projects.map(p =>
            p.id === id ? { ...p, featured: !p.featured } : p
        ));
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Projects Manager</h1>
                    <p className="text-white/40">Manage your portfolio projects and showcase your work.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Projects", value: projects.length, icon: Code },
                    { label: "Live Projects", value: projects.filter(p => p.status === "Live").length, icon: Globe },
                    { label: "Featured", value: projects.filter(p => p.featured).length, icon: Star },
                    { label: "Total Stars", value: projects.reduce((acc, p) => acc + p.stars, 0), icon: Github },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-white/5">
                                <stat.icon className="w-5 h-5 text-white/60" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Create Form */}
            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="glass-card p-8 rounded-2xl border border-white/5 overflow-hidden"
                >
                    <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                    placeholder="e.g., My Awesome App"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Category</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                    value={newProject.category}
                                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value as Project["category"] })}
                                >
                                    <option value="Web App">Web App</option>
                                    <option value="Extension">Extension</option>
                                    <option value="Tool">Tool</option>
                                    <option value="Library">Library</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/60">Description</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white resize-none"
                                placeholder="Describe your project..."
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">GitHub URL</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                    placeholder="https://github.com/..."
                                    value={newProject.githubUrl}
                                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Live URL</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white"
                                    placeholder="https://..."
                                    value={newProject.liveUrl}
                                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setIsCreating(false)}
                                className="flex-1 px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                            >
                                Add Project
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-2xl border border-white/5 hover:border-white/20 transition-all overflow-hidden"
                    >
                        {/* Project Header */}
                        <div className="p-6 border-b border-white/5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold">{project.name}</h3>
                                        {project.featured && (
                                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                        )}
                                    </div>
                                    <p className="text-sm text-white/60 mb-3">{project.description}</p>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.status === "Live" ? "bg-green-500/20 text-green-500" :
                                            project.status === "In Development" ? "bg-blue-500/20 text-blue-500" :
                                                "bg-white/10 text-white/40"
                                            }`}>
                                            {project.status}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            {project.techStack.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Tech Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, idx) => (
                                            <span key={idx} className="px-2 py-1 rounded bg-blue-500/10 text-xs text-blue-400">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* GitHub Stats */}
                            <div className="flex items-center gap-4 text-sm text-white/40">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4" />
                                    <span>{project.stars}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <GitFork className="w-4 h-4" />
                                    <span>{project.forks}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-4 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                    title="View Live"
                                >
                                    <Eye className="w-4 h-4" />
                                </a>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                    title="GitHub Repository"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                    title="External Link"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white" title="Edit">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-red-500"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() => toggleFeatured(project.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${project.featured
                                    ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {project.featured ? "Featured" : "Feature"}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
