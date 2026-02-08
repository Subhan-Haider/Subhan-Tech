"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse" />
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors overflow-hidden"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}
