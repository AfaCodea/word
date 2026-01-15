"use client";

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
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 5; // Flatter depth

            temp.push({
                x, y, z,
                vx: 0, vy: 0, vz: 0,
                baseSpeed: Math.random() * 0.05 + 0.02, // Consistent flow speed
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height]);

    useFrame((state) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const time = state.clock.getElapsedTime();
        const width = viewport.width * 2;
        const height = viewport.height * 2;
        const widthHalf = width / 2;
        const heightHalf = height / 2;

        const mouseX = (state.mouse.x * viewport.width) / 2;
        const mouseY = (state.mouse.y * viewport.height) / 2;

        particles.forEach((p, i) => {
            // Flow Field (Perlin-ish using Sin/Cos)
            // Creates smooth wavy patterns
            const xOff = p.x * flowFieldScale;
            const yOff = p.y * flowFieldScale;
            const flowAngle = (Math.sin(xOff + time * 0.1) + Math.cos(yOff + time * 0.1)) * Math.PI;

            // Target Velocity from Flow
            const targetVx = Math.cos(flowAngle) * p.baseSpeed;
            const targetVy = Math.sin(flowAngle) * p.baseSpeed;

            // Mouse Interaction (Repulsion)
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

            // Apply Forces
            p.vx += (targetVx - p.vx) * 0.05; // Smoothly steer towards flow
            p.vy += (targetVy - p.vy) * 0.05;
            p.vx += forceX;
            p.vy += forceY;

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap
            if (p.x > widthHalf) p.x -= width;
            if (p.x < -widthHalf) p.x += width;
            if (p.y > heightHalf) p.y -= height;
            if (p.y < -heightHalf) p.y += height;

            // Update Instance
            dummy.position.set(p.x, p.y, p.z);

            // Align with velocity (Streak effect)
            // We use lookAt to point the Z-axis of the mesh along the velocity vector
            // To make a "line", we scale the plane along Z
            if (Math.abs(p.vx) + Math.abs(p.vy) > 0.0001) {
                dummy.lookAt(p.x + p.vx, p.y + p.vy, p.z);
            }

            // Stretch based on speed
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const stretch = Math.max(1, speed * 25);

            dummy.scale.set(1, 1, stretch); // Stretch 'length'
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {/* 
                Very thin, long box.
                Width (X) and Height (Y) are tiny (thickness).
                Depth (Z) is length, which we stretch.
            */}
            <boxGeometry args={[0.02, 0.02, 0.2]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
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
