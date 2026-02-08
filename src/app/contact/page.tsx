"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Clock, Send, Github, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add your form submission logic here
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <Navbar />

            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold mb-6 text-glow">Get In Touch</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Have a project in mind? Let's build something extraordinary together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {[
                        { icon: Mail, title: "Email", value: "hello@subhan.tech", link: "mailto:hello@subhan.tech" },
                        { icon: MapPin, title: "Location", value: "Remote / Global", link: null },
                        { icon: Clock, title: "Response Time", value: "Within 24 hours", link: null },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="glass-card p-8 rounded-2xl border border-white/5 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold mb-2">{item.title}</h3>
                            {item.link ? (
                                <a href={item.link} className="text-white/60 hover:text-white transition-colors">
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-white/60">{item.value}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-glow">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Subject</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20"
                                    placeholder="Project Inquiry"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/60">Message</label>
                                <textarea
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-all text-white placeholder:text-white/20 resize-none"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all"
                            >
                                Send Message <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="glass-card p-8 rounded-2xl border border-white/5">
                            <h3 className="text-2xl font-bold mb-4 text-glow">Connect on Social</h3>
                            <p className="text-white/60 mb-6">
                                Follow the latest updates, projects, and insights across platforms.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { icon: Github, name: "GitHub", handle: "@Subhan-Haider", link: "#" },
                                    { icon: Twitter, name: "Twitter / X", handle: "@subhan_tech", link: "#" },
                                    { icon: Linkedin, name: "LinkedIn", handle: "Subhan Haider", link: "#" },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <social.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{social.name}</p>
                                            <p className="text-xs text-white/40">{social.handle}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-2xl border border-white/5">
                            <h3 className="text-2xl font-bold mb-4 text-glow">Office Hours</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-white/60">Monday - Friday</span>
                                    <span className="font-bold">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Saturday</span>
                                    <span className="font-bold">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">Sunday</span>
                                    <span className="font-bold text-white/40">Closed</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
