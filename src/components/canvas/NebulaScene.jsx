// Volumetric Deep Space Nebula & Stellar Nursery
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NebulaScene() {
  const nebulaGroupRef = useRef();
  const protostarsRef = useRef();

  // Generate 8,000 volumetric dust and gas cloud particles
  const { gasPositions, gasColors, gasSizes } = useMemo(() => {
    const count = 7500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    // Natural nebula ionization color spectrum (H-alpha, O-III, molecular dust)
    const palette = [
      new THREE.Color('#942b3b'), // H-alpha deep crimson
      new THREE.Color('#2d637a'), // O-III cyan-teal
      new THREE.Color('#7c4a2d'), // Warm molecular dust
      new THREE.Color('#4c2e5b'), // Restrained violet
      new THREE.Color('#1c2e42')  // Deep absorption dust
    ];

    // Create 3 organic gas pillar clusters (like Pillars of Creation)
    const centers = [
      { x: -6, y: -2, z: 0, r: 9 },
      { x: 1, y: 3, z: -4, r: 8 },
      { x: 7, y: -3, z: 2, r: 10 }
    ];

    for (let i = 0; i < count; i++) {
      const cluster = centers[i % centers.length];
      const r = Math.pow(Math.random(), 1.5) * cluster.r;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = cluster.x + r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = cluster.y + r * Math.cos(phi) * 1.8; // Vertical pillar elongation
      pos[i * 3 + 2] = cluster.z + r * Math.sin(phi) * Math.sin(theta);

      const colorObj = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = colorObj.r;
      col[i * 3 + 1] = colorObj.g;
      col[i * 3 + 2] = colorObj.b;

      sz[i] = Math.random() * 4.5 + 2.0;
    }

    return { gasPositions: pos, gasColors: col, gasSizes: sz };
  }, []);

  // 12 Embedded newborn protostars
  const protostars = useMemo(() => {
    return Array.from({ length: 14 }).map((_, idx) => ({
      id: idx,
      pos: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10
      ],
      color: Math.random() > 0.5 ? '#80d4ff' : '#ffe099',
      size: Math.random() * 0.35 + 0.15
    }));
  }, []);

  useFrame((state, delta) => {
    if (nebulaGroupRef.current) {
      nebulaGroupRef.current.rotation.y += delta * 0.008;
    }
  });

  return (
    <group ref={nebulaGroupRef} position={[0, 0, 0]}>
      {/* Volumetric Gas Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={gasPositions.length / 3}
            array={gasPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={gasColors.length / 3}
            array={gasColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3.2}
          vertexColors
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Embedded Newborn Protostars */}
      {protostars.map(p => (
        <group key={p.id} position={p.pos}>
          <mesh>
            <sphereGeometry args={[p.size, 16, 16]} />
            <meshBasicMaterial color={p.color} />
          </mesh>
          {/* Protostellar envelope aura */}
          <mesh>
            <sphereGeometry args={[p.size * 2.8, 16, 16]} />
            <meshBasicMaterial
              color={p.color}
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
