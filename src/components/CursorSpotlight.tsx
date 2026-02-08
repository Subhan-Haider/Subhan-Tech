"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorSpotlight() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-30"
            style={{
                background: `radial-gradient(circle 400px at ${springX}px ${springY}px, var(--spotlight-color), transparent 80%)`,
            }}
        />
    );
}
