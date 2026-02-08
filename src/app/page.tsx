"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ExtensionCard } from "@/components/ExtensionCard";
import { WebsiteCard } from "@/components/WebsiteCard";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { LiveTerminal } from "@/components/LiveTerminal";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { EXTENSIONS, SOFTWARE, WEBSITES, SITE_CONFIG, TOOLS } from "@/data/config";
import { Sparkles, Terminal, Code2, Cpu, Package, LayoutGrid, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto relative">
      <CommandPalette />
      <CursorSpotlight />
      <LiveTerminal />
      <Navbar />

      {/* Hero Section */}
      <section className="mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-muted-foreground tracking-wide uppercase">Neural Engineering v1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-glow uppercase leading-tight"
        >
          {SITE_CONFIG.name}
          <span className="opacity-20">.TECH</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {SITE_CONFIG.tagline}. Managing personal projects, software, and browser extensions through a centralized neural interface.
        </motion.p>
      </section>

      {/* Software & Projects Section */}
      <section id="software" className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
            <Package className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-glow">Software & Apps</h2>
            <p className="text-muted-foreground text-sm">Standalone applications and experimental software.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOFTWARE.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 border border-border relative overflow-hidden group hover:border-primary/20 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border group-hover:bg-primary/5 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 dark:text-muted-foreground/30 px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-border">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{item.description}</p>
              <a href={item.url} className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all inline-flex items-center gap-2 group/link">
                Launch Application <Terminal className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Browser Extensions Grid */}
      <section id="extensions" className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
            <Code2 className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-glow">Browser Extensions</h2>
            <p className="text-muted-foreground">Custom tools for Edge, Chrome, and Firefox.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXTENSIONS.map((ext, i) => (
            <motion.div
              key={ext.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <ExtensionCard {...ext} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tactical Tools Section */}
      <section id="tools" className="mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
            <Zap className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-glow">Tactical Tools</h2>
            <p className="text-muted-foreground">Micro-utilities for focused neural workflows.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 glass-card rounded-xl border border-white/5 flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">{tool.name}</h4>
                <p className="text-[10px] text-muted-foreground">{tool.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Directory & Status */}
      <section id="links" className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-border">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-glow">Websites & Links</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WEBSITES.map((site) => (
              <WebsiteCard key={site.name} {...site} />
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-10 border border-border flex flex-col justify-center items-center text-center relative overflow-hidden h-fit self-start shadow-2xl">
          <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10 mb-8">
            <Cpu className="w-12 h-12 text-primary animate-pulse-slow" />
          </div>
          <h3 className="text-2xl font-black tracking-tight mb-4 uppercase">Neural Status</h3>
          <div className="space-y-6 w-full text-left relative z-10">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">
                <span>System Uptime</span>
                <span className="text-primary">99.9%</span>
              </div>
              <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "99.9%" }}
                  viewport={{ once: true }}
                  className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                />
              </div>
            </div>
            {/* ... other status bars refined similarly ... */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">
                <span>Network Integrity</span>
                <span className="text-primary">Stable</span>
              </div>
              <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  className="h-full bg-primary/60"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 neural-gradient pointer-events-none opacity-50" />
        </div>
      </section>

      <Footer />

      {/* Background decoration */}
      <div className="fixed top-1/4 -left-20 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] -z-10 pointer-events-none animate-float" />
      <div className="fixed bottom-1/4 -right-20 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[100px] -z-10 pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
    </main>
  );
}
