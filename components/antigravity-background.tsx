"use client";

// Antigravity Background with dual-shape morphing (React Logo <-> Code <-> Flow)
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

interface AntigravityProps {
    count?: number;
    color?: string;
    mouseRepulsion?: number;
    flowFieldScale?: number;
}

const AntigravityInner: React.FC<AntigravityProps> = ({
    count = 1500, // Reduced from 3500 for better performance
    color = '#03a3f3', // Sky 500 (Electric Blue)
    mouseRepulsion = 1.0,
    flowFieldScale = 0.05
}) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate Particle Data & Targets
    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width * 2;
        const height = viewport.height * 2;

        const mainColor = new THREE.Color(color);
        const whiteColor = new THREE.Color('#ffffff');

        for (let i = 0; i < count; i++) {
            // --- 0. Initial Position (Flow State) ---
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 5;

            // Determine if this particle is part of the "Nucleus/Highlight" (White)
            // 15% White, 85% Blue
            const isWhite = i < count * 0.15;
            const pColor = isWhite ? whiteColor : mainColor;

            // --- 1. React Logo Target Calculation ---
            let rx = 0, ry = 0, rz = 0;
            if (isWhite) {
                // Nucleus (Solid Sphere)
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 0.7 * Math.cbrt(Math.random());
                rx = r * Math.sin(phi) * Math.cos(theta);
                ry = r * Math.sin(phi) * Math.sin(theta);
                rz = r * Math.cos(phi);
            } else {
                // Orbits (Electron paths)
                const orbitIndex = i % 3; // 0, 1, 2
                const angle = Math.random() * Math.PI * 2;
                const radiusX = 6.0;
                const radiusY = 2.0;

                // Base ellipse
                const eX = radiusX * Math.cos(angle);
                const eY = radiusY * Math.sin(angle);

                // Tilt (0, 60, 120 degrees)
                const tilt = (orbitIndex * 60 * Math.PI) / 180;

                // Rotate 2D point (eX, eY) by tilt amount
                rx = eX * Math.cos(tilt) - eY * Math.sin(tilt);
                ry = eX * Math.sin(tilt) + eY * Math.cos(tilt);

                // Add thickness/scatter
                rx += (Math.random() - 0.5) * 0.2;
                ry += (Math.random() - 0.5) * 0.2;
                rz = (Math.random() - 0.5) * 0.2;
            }

            // --- 2. Code < > Logo Target Calculation ---
            let cx = 0, cy = 0, cz = 0;
            const codeThickness = 0.15;

            const shapeGroup = Math.random();

            if (shapeGroup < 0.5) {
                // Left Bracket <
                const centerX = -2.5;
                const tipX = centerX + 1.0;
                const baseX = -2.0;
                const tip = -3.0; // further left

                const isTop = Math.random() > 0.5;
                const t = Math.random();

                if (isTop) {
                    // Top leg
                    cx = THREE.MathUtils.lerp(baseX, tip, t);
                    cy = THREE.MathUtils.lerp(1.8, 0, t);
                } else {
                    // Bottom leg
                    cx = THREE.MathUtils.lerp(baseX, tip, t);
                    cy = THREE.MathUtils.lerp(-1.8, 0, t);
                }

            } else {
                // Right Bracket >
                const baseX = 2.0;
                const tip = 3.0;

                const isTop = Math.random() > 0.5;
                const t = Math.random();

                if (isTop) {
                    cx = THREE.MathUtils.lerp(baseX, tip, t);
                    cy = THREE.MathUtils.lerp(1.8, 0, t);
                } else {
                    cx = THREE.MathUtils.lerp(baseX, tip, t);
                    cy = THREE.MathUtils.lerp(-1.8, 0, t);
                }
            }

            // Thickness noise for Code
            cx += (Math.random() - 0.5) * codeThickness;
            cy += (Math.random() - 0.5) * codeThickness;
            cz = (Math.random() - 0.5) * codeThickness;


            temp.push({
                x, y, z,
                vx: 0, vy: 0, vz: 0,
                baseSpeed: Math.random() * 0.05 + 0.02,
                reactX: rx, reactY: ry, reactZ: rz,
                codeX: cx, codeY: cy, codeZ: cz,
                color: pColor,
                isWhite // Store for potentially different dynamic behavior
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height, color]);

    // Initialize colors
    React.useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const colors = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            colors[i * 3] = p.color.r;
            colors[i * 3 + 1] = p.color.g;
            colors[i * 3 + 2] = p.color.b;
        });

        mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
        mesh.instanceColor.needsUpdate = true;
    }, [particles, count]);

    useFrame((state) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const time = state.clock.getElapsedTime();

        // Cycle Logic
        const fullCycle = 26;
        const ct = time % fullCycle;

        let targetType: 'react' | 'code' | 'none' = 'none';
        let progress = 0;

        if (ct < 4) {
            // Pure Flow
            targetType = 'none';
        } else if (ct < 8) {
            // Morph to React
            targetType = 'react';
            progress = (ct - 4) / 4;
        } else if (ct < 11) {
            // Hold React
            targetType = 'react';
            progress = 1;
        } else if (ct < 15) {
            // Dissolve to Flow
            targetType = 'react';
            progress = 1 - (ct - 11) / 4;
        } else if (ct < 19) {
            // Morph to Code
            targetType = 'code';
            progress = (ct - 15) / 4;
        } else if (ct < 22) {
            // Hold Code
            targetType = 'code';
            progress = 1;
        } else {
            // Dissolve to Flow
            targetType = 'code';
            progress = 1 - (ct - 22) / 4;
        }

        // Ease the progress
        const smoothProgress = progress * progress * (3 - 2 * progress);

        // Dimensions
        const width = viewport.width * 2;
        const widthHalf = width / 2;
        const height = viewport.height * 2;
        const heightHalf = height / 2;
        const mouseX = (state.mouse.x * viewport.width) / 2;
        const mouseY = (state.mouse.y * viewport.height) / 2;

        particles.forEach((p, i) => {
            // 1. Flow Forces (Always calculate for background movement)
            const xOff = p.x * flowFieldScale;
            const yOff = p.y * flowFieldScale;
            const flowAngle = (Math.sin(xOff + time * 0.1) + Math.cos(yOff + time * 0.1)) * Math.PI * 2;

            const flowVx = Math.cos(flowAngle) * p.baseSpeed * 2;
            const flowVy = Math.sin(flowAngle) * p.baseSpeed * 2;

            // 2. Target Force
            let tx = p.x, ty = p.y, tz = p.z;

            if (targetType === 'react') {
                tx = p.reactX;
                ty = p.reactY;
                tz = p.reactZ;
            } else if (targetType === 'code') {
                tx = p.codeX;
                ty = p.codeY;
                tz = p.codeZ;
            }

            const dxTarget = tx - p.x;
            const dyTarget = ty - p.y;
            const dzTarget = tz - p.z;

            const shapeVx = dxTarget * 0.08;
            const shapeVy = dyTarget * 0.08;
            const shapeVz = dzTarget * 0.08;

            // 3. Blend Velocities
            let targetVx, targetVy, targetVz;

            if (smoothProgress > 0.01) {
                targetVx = flowVx * (1 - smoothProgress) + shapeVx * smoothProgress;
                targetVy = flowVy * (1 - smoothProgress) + shapeVy * smoothProgress;
                targetVz = 0 * (1 - smoothProgress) + shapeVz * smoothProgress;
            } else {
                targetVx = flowVx;
                targetVy = flowVy;
                targetVz = 0;
            }

            // 4. Mouse Repulsion (optimized - only calculate every 3rd frame)
            let forceX = 0;
            let forceY = 0;

            if (i % 3 === 0) { // Only process every 3rd particle for mouse interaction
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 4;

                if (dist < radius) {
                    const force = (1 - dist / radius) * mouseRepulsion;
                    forceX = (dx / dist) * force * 0.5 + (dy / dist) * force * 0.2;
                    forceY = (dy / dist) * force * 0.5 - (dx / dist) * force * 0.2;
                }
            }

            // Update Velocity
            const friction = smoothProgress > 0.5 ? 0.15 : 0.05;
            p.vx += (targetVx - p.vx) * friction;
            p.vy += (targetVy - p.vy) * friction;
            p.vz += (targetVz - p.vz) * friction;

            p.vx += forceX;
            p.vy += forceY;

            // Update Position
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Wrap logic (Only when in mostly Flow mode)
            if (smoothProgress < 0.5) {
                if (p.x > widthHalf) p.x -= width;
                if (p.x < -widthHalf) p.x += width;
                if (p.y > heightHalf) p.y -= height;
                if (p.y < -heightHalf) p.y += height;
            }

            // Apply to Matrix
            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.030, 0.030, 0.030]} />
            <meshBasicMaterial
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
                color={new THREE.Color(color).multiplyScalar(2)}
            />
        </instancedMesh>
    );
};

export const AntigravityBackground: React.FC<AntigravityProps> = (props) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLowPower, setIsLowPower] = useState(false);

    useEffect(() => {
        // Detect mobile devices
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsLowPower(mediaQuery.matches);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Disable on mobile or if user prefers reduced motion
    if (isMobile || isLowPower) {
        return (
            <div className="fixed inset-0 -z-10 pointer-events-none">
                {/* Simple gradient fallback for mobile */}
                <div className="absolute inset-0 bg-gradient-to-br from-deep-bg via-slate-900 to-deep-bg" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[120px]" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{
                    toneMapping: THREE.ReinhardToneMapping,
                    antialias: false, // Disable antialiasing for better performance
                    powerPreference: "high-performance"
                }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance
            >
                <AntigravityInner {...props} />
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.6} // Increased threshold
                        luminanceSmoothing={0.8}
                        height={200} // Reduced from 300
                        intensity={1.2} // Reduced from 1.5
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default AntigravityBackground;
