"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2, // Scroll duration (higher = smoother)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for smooth feel
            orientation: "vertical", // Vertical scroll
            gestureOrientation: "vertical", // Gesture direction
            smoothWheel: true, // Enable smooth wheel scrolling
            touchMultiplier: 2, // Touch scroll speed multiplier
            infinite: false, // Disable infinite scroll
        });

        lenisRef.current = lenis;

        // Animation frame loop
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
