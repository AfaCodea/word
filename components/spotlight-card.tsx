"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    index?: number; // Optional index for stagger animation
}

export function SpotlightCard({ children, className = "", index = 0 }: SpotlightCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1, // Stagger effect based on index
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
            }}
            className={`group relative border border-white/10 bg-slate-900/50 overflow-hidden rounded-3xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </motion.div>
    );
}
