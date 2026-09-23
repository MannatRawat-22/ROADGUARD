// Minimal Deep Space Starfield (Exactly 60 Tiny Soft Stars, Zero GPU Overhead)
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getCircularStarTexture } from '../../utils/textureGenerator';

export default function Starfield() {
  const pointsRef = useRef();
  const circularStarTex = useMemo(() => getCircularStarTexture(), []);

  // Exactly 60 sparse, tiny stars (Almost zero GPU consumption)
  const { positions, colors, sizes } = useMemo(() => {
    const count = 65;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 80 + Math.random() * 160;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const brightness = 0.2 + Math.random() * 0.45;
      col[i * 3] = 0.85 * brightness;
      col[i * 3 + 1] = 0.92 * brightness;
      col[i * 3 + 2] = 1.0 * brightness;

      sz[i] = 0.8 + Math.random() * 0.5;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, []);

  // Extremely subtle slow drift
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.00015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={circularStarTex}
        size={0.9}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
