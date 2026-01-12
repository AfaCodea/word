"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltMaxAngle?: number;
}

export function TiltCard({ children, className = "", tiltMaxAngle = 10 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mousePosition = useMousePosition(ref);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = () => {
        if (!ref.current || !isHovered) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((mousePosition.y - centerY) / centerY) * -tiltMaxAngle;
        const rotateYValue = ((mousePosition.x - centerX) / centerX) * tiltMaxAngle;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
    };

    handleMouseMove();

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
}
