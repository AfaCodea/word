"use client";

import { useState, useEffect, RefObject } from "react";

export function useMousePosition(ref: RefObject<HTMLElement | null>) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePosition({ x, y });
            }
        };

        const element = ref.current;
        if (element) {
            element.addEventListener("mousemove", updateMousePosition);
            return () => {
                element.removeEventListener("mousemove", updateMousePosition);
            };
        }
    }, [ref]);

    return mousePosition;
}
