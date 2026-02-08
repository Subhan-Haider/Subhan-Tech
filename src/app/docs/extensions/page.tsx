"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Puzzle, FileCode, Settings, Rocket, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ExtensionsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/docs" className="text-sm text-white/40 hover:text-white transition-colors mb-4 inline-block">
                        ← Back to Documentation
                    </Link>
                    <h1 className="text-5xl font-bold mb-4 text-glow">Building Browser Extensions</h1>
                    <p className="text-xl text-white/60">
                        Learn how to create powerful browser extensions with the Neural Hub framework.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-12"
                >
                    {/* Overview */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Puzzle className="w-8 h-8" />
                            Extension Architecture
                        </h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                            Neural Hub extensions follow a modular architecture with three core components:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: "Background Script", desc: "Persistent service worker for background tasks" },
                                { name: "Content Script", desc: "Inject code into web pages" },
                                { name: "Popup UI", desc: "User interface for extension controls" },
                            ].map((component) => (
                                <div key={component.name} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <p className="font-bold mb-2">{component.name}</p>
                                    <p className="text-sm text-white/40">{component.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Manifest */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <FileCode className="w-8 h-8" />
                            Manifest Configuration
                        </h2>
                        <p className="text-white/60 mb-4">
                            Every extension requires a <code className="px-2 py-1 bg-white/10 rounded text-sm">manifest.json</code> file:
                        </p>
                        <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                            <pre className="text-white/80">{`{
  "manifest_version": 3,
  "name": "Neural Extension",
  "version": "1.0.0",
  "description": "Your extension description",
  
  "permissions": [
    "storage",
    "activeTab",
    "scripting"
  ],
  
  "background": {
    "service_worker": "background.js"
  },
  
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }],
  
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  }
}`}</pre>
                        </div>
                    </section>

                    {/* Background Script */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4">Background Script Example</h2>
                        <p className="text-white/60 mb-4">
                            Background scripts handle events and manage extension state:
                        </p>
                        <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                            <pre className="text-white/80">{`// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  
  // Initialize storage
  chrome.storage.local.set({
    enabled: true,
    settings: {}
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.action === 'getData') {
      // Fetch data from API
      fetch('https://api.subhan.tech/v1/data')
        .then(res => res.json())
        .then(data => sendResponse({ data }));
      return true; // Keep channel open
    }
  }
);`}</pre>
                        </div>
                    </section>

                    {/* Content Script */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4">Content Script Example</h2>
                        <p className="text-white/60 mb-4">
                            Content scripts interact with web pages:
                        </p>
                        <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                            <pre className="text-white/80">{`// content.js
(function() {
  'use strict';
  
  // Inject custom styles
  const style = document.createElement('style');
  style.textContent = \`
    .neural-highlight {
      background: rgba(255, 255, 0, 0.3);
      border: 2px solid yellow;
    }
  \`;
  document.head.appendChild(style);
  
  // Listen for user interactions
  document.addEventListener('click', (e) => {
    if (e.target.matches('.highlight-target')) {
      e.target.classList.add('neural-highlight');
      
      // Send message to background
      chrome.runtime.sendMessage({
        action: 'elementClicked',
        data: e.target.textContent
      });
    }
  });
  
  console.log('Neural Extension loaded');
})();`}</pre>
                        </div>
                    </section>

                    {/* Popup UI */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4">Popup Interface</h2>
                        <p className="text-white/60 mb-4">
                            Create a user-friendly popup with HTML and JavaScript:
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">popup.html</h4>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <h1>Neural Extension</h1>
    <button id="toggleBtn">Toggle Feature</button>
    <div id="status"></div>
  </div>
  <script src="popup.js"></script>
</body>
</html>`}</pre>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">popup.js</h4>
                                <div className="bg-black/40 rounded-xl p-6 border border-white/10 font-mono text-sm overflow-x-auto">
                                    <pre className="text-white/80">{`document.getElementById('toggleBtn').addEventListener('click', () => {
  chrome.storage.local.get(['enabled'], (result) => {
    const newState = !result.enabled;
    chrome.storage.local.set({ enabled: newState });
    updateStatus(newState);
  });
});

function updateStatus(enabled) {
  document.getElementById('status').textContent = 
    enabled ? 'Active' : 'Inactive';
}`}</pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Best Practices */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Settings className="w-8 h-8" />
                            Best Practices
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "Use Manifest V3 for better security and performance",
                                "Minimize permissions - only request what you need",
                                "Implement proper error handling and logging",
                                "Use chrome.storage for persistent data",
                                "Test across different browsers (Chrome, Edge, Firefox)",
                                "Follow Chrome Web Store policies",
                                "Implement content security policy (CSP)",
                            ].map((practice, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/60">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-green-500 text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <span>{practice}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Publishing */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <Rocket className="w-8 h-8" />
                            Publishing Your Extension
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <p className="text-sm text-blue-400 font-bold mb-2">📦 Chrome Web Store</p>
                                <ol className="text-sm text-white/60 space-y-2 ml-4 list-decimal">
                                    <li>Create a developer account ($5 one-time fee)</li>
                                    <li>Prepare store listing (description, screenshots, icons)</li>
                                    <li>Upload your extension ZIP file</li>
                                    <li>Submit for review (typically 1-3 days)</li>
                                </ol>
                            </div>

                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <p className="text-sm text-purple-400 font-bold mb-2">🦊 Firefox Add-ons</p>
                                <ol className="text-sm text-white/60 space-y-2 ml-4 list-decimal">
                                    <li>Create a Mozilla account (free)</li>
                                    <li>Submit extension for automated review</li>
                                    <li>Address any validation issues</li>
                                    <li>Publish (usually within hours)</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Common Issues */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                            <AlertCircle className="w-8 h-8" />
                            Common Issues & Solutions
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    issue: "Extension not loading",
                                    solution: "Check manifest.json syntax and ensure all file paths are correct"
                                },
                                {
                                    issue: "Content script not injecting",
                                    solution: "Verify matches pattern in manifest and check host permissions"
                                },
                                {
                                    issue: "Storage not persisting",
                                    solution: "Use chrome.storage.local instead of localStorage for reliability"
                                },
                                {
                                    issue: "CORS errors",
                                    solution: "Make API calls from background script, not content script"
                                },
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <p className="font-bold text-red-400 mb-2">❌ {item.issue}</p>
                                    <p className="text-sm text-white/60">✅ {item.solution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
