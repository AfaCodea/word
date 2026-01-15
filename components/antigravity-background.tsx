"use client";

// Antigravity Background with particle morphing animation
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface AntigravityProps {
    count?: number;
    color?: string;
    mouseRepulsion?: number;
    flowFieldScale?: number;
}

const AntigravityInner: React.FC<AntigravityProps> = ({
    count = 3000,
    color = '#38bdf8', // Electric Blue
    mouseRepulsion = 0.8,
    flowFieldScale = 0.05
}) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width * 2;
        const height = viewport.height * 2;

        for (let i = 0; i < count; i++) {
            // Random Initial Position (Flow State)
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 5;

            // React Logo Colors
            const white = new THREE.Color('#ffffff');
            const reactBlue = new THREE.Color('#61dafb');

            // Calculate Target Position for React Logo
            let tx, ty, tz = 0;
            let pColor = reactBlue;
            const section = Math.random();

            if (section < 0.1) {
                // NUCLEUS (Central Sphere) - 10% of particles
                pColor = white;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 0.8 * Math.cbrt(Math.random()); // Solid sphere
                tx = r * Math.sin(phi) * Math.cos(theta);
                ty = r * Math.sin(phi) * Math.sin(theta);
                tz = r * Math.cos(phi);
            } else {
                // ORBITS (Electron paths) - 90% of particles
                pColor = reactBlue;

                // Which orbit? (0, 1, or 2)
                const orbitIndex = Math.floor(Math.random() * 3);

                // Angle along the ellipse
                const angle = Math.random() * Math.PI * 2;

                // Ellipse dimensions
                const radiusX = 6.0;
                const radiusY = 2.0;

                // Base ellipse position
                const xBase = radiusX * Math.cos(angle);
                const yBase = radiusY * Math.sin(angle);

                // Tilt rotation (0, 60, 120 degrees converted to radians)
                const tiltAngle = (orbitIndex * 60 * Math.PI) / 180;

                // Apply 2D rotation
                tx = xBase * Math.cos(tiltAngle) - yBase * Math.sin(tiltAngle);
                ty = xBase * Math.sin(tiltAngle) + yBase * Math.cos(tiltAngle);

                // Add some thickness to the orbit lines
                const thickness = 0.2;
                tx += (Math.random() - 0.5) * thickness;
                ty += (Math.random() - 0.5) * thickness;
                tz = (Math.random() - 0.5) * thickness;
            }

            temp.push({
                x, y, z,
                vx: 0, vy: 0, vz: 0,
                baseSpeed: Math.random() * 0.05 + 0.02,
                targetX: tx, targetY: ty, targetZ: tz,
                color: pColor
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height]);

    // Initialize colors on mount
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

        // Cycle: Flow (0-5s) -> Morph (5-8s) -> Hold (8-12s) -> Release (12-15s)
        const cycleDuration = 15;
        const cycleTime = time % cycleDuration;

        // Determine morph factor (0 = flow, 1 = shape)
        let morphFactor = 0;
        if (cycleTime > 5 && cycleTime < 12) {
            // Transition in
            morphFactor = Math.min(1, (cycleTime - 5) / 2);
            if (cycleTime > 11) {
                // Transition out start
                morphFactor = 1 - (cycleTime - 11);
            }
        }
        // Smooth step
        morphFactor = morphFactor * morphFactor * (3 - 2 * morphFactor);

        const width = viewport.width * 2;
        const height = viewport.height * 2;
        const widthHalf = width / 2;
        const heightHalf = height / 2;

        const mouseX = (state.mouse.x * viewport.width) / 2;
        const mouseY = (state.mouse.y * viewport.height) / 2;

        particles.forEach((p, i) => {
            // 1. Calculate Flow Forces
            const xOff = p.x * flowFieldScale;
            const yOff = p.y * flowFieldScale;
            const flowAngle = (Math.sin(xOff + time * 0.1) + Math.cos(yOff + time * 0.1)) * Math.PI;

            const flowVx = Math.cos(flowAngle) * p.baseSpeed;
            const flowVy = Math.sin(flowAngle) * p.baseSpeed;

            // 2. Calculate Shape Attraction Forces
            const dxTarget = p.targetX - p.x;
            const dyTarget = p.targetY - p.y;
            const dzTarget = p.targetZ - p.z;

            const shapeVx = dxTarget * 0.05;
            const shapeVy = dyTarget * 0.05;
            const shapeVz = dzTarget * 0.05;

            // 3. Blend Velocities
            let targetVx, targetVy, targetVz;
            if (morphFactor > 0.01) {
                targetVx = flowVx * (1 - morphFactor) + shapeVx * morphFactor;
                targetVy = flowVy * (1 - morphFactor) + shapeVy * morphFactor;
                targetVz = 0 * (1 - morphFactor) + shapeVz * morphFactor;
            } else {
                targetVx = flowVx;
                targetVy = flowVy;
                targetVz = 0;
            }

            // 4. Mouse Repulsion
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let forceX = 0;
            let forceY = 0;
            const radius = 5;

            if (dist < radius) {
                const force = (1 - dist / radius) * mouseRepulsion;
                forceX = (dx / dist) * force * 0.2;
                forceY = (dy / dist) * force * 0.2;
            }

            const friction = morphFactor > 0.5 ? 0.1 : 0.05;
            p.vx += (targetVx - p.vx) * friction;
            p.vy += (targetVy - p.vy) * friction;
            p.vz += (targetVz - p.vz) * friction;

            p.vx += forceX;
            p.vy += forceY;

            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Wrap logic (Only when in Flow mode)
            if (morphFactor < 0.5) {
                if (p.x > widthHalf) p.x -= width;
                if (p.x < -widthHalf) p.x += width;
                if (p.y > heightHalf) p.y -= height;
                if (p.y < -heightHalf) p.y += height;
            }

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshBasicMaterial
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
            />
        </instancedMesh>
    );
};

export const AntigravityBackground: React.FC<AntigravityProps> = (props) => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <AntigravityInner {...props} />
            </Canvas>
        </div>
    );
};

export default AntigravityBackground;
