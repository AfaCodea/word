"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useMagneticEffect } from "@/hooks/use-magnetic-effect";

interface MagneticButtonProps {
    children: ReactNode;
    strength?: number;
    className?: string;
    onClick?: () => void;
}

export function MagneticButton({
    children,
    strength = 0.3,
    className = "",
    onClick
}: MagneticButtonProps) {
    const { ref, position } = useMagneticEffect(strength);

    return (
        <motion.button
            // @ts-ignore - ref type compatibility
            ref={ref}
            onClick={onClick}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            className={className}
        >
            {children}
        </motion.button>
    );
}
