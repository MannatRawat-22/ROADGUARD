// Spiral Galaxy & Multi-Wavelength Deep Space Galaxy Explorer
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MilkyWayScene({
  galaxyId = 'milky-way',
  wavelength = 'Optical' // Optical, Infrared, Radio
}) {
  const galaxyPointsRef = useRef();
  const coreRef = useRef();

  // Color mapping based on wavelength
  const wavelengthColors = useMemo(() => {
    switch (wavelength) {
      case 'Infrared':
        return {
          core: new THREE.Color('#ff5522'),
          arms: new THREE.Color('#ffaa44'),
          dust: new THREE.Color('#992200')
        };
      case 'Radio':
        return {
          core: new THREE.Color('#4ade80'),
          arms: new THREE.Color('#06b6d4'),
          dust: new THREE.Color('#1e40af')
        };
      case 'Optical':
      default:
        return {
          core: new THREE.Color('#fff2cc'),
          arms: new THREE.Color('#b3d9ff'),
          dust: new THREE.Color('#ffeedd')
        };
    }
  }, [wavelength]);

  // Generate 45,000 logarithmic spiral particles
  const { positions, colors, sizes } = useMemo(() => {
    const count = 35000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const arms = galaxyId === 'sombrero' ? 1 : (galaxyId === 'whirlpool' ? 2 : 4);
    const armSpread = galaxyId === 'sombrero' ? 0.08 : 0.45;
    const maxRadius = galaxyId === 'sombrero' ? 18 : 26;

    for (let i = 0; i < count; i++) {
      // Bulge vs Spiral Arms distribution
      const isBulge = i < count * 0.28;

      if (isBulge) {
        // Spherical dense core
        const r = Math.pow(Math.random(), 2.0) * 5.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.cos(phi) * 0.45; // Flattened bulge
        pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

        col[i * 3] = wavelengthColors.core.r;
        col[i * 3 + 1] = wavelengthColors.core.g;
        col[i * 3 + 2] = wavelengthColors.core.b;
        sz[i] = Math.random() * 2.2 + 0.8;
      } else {
        // Logarithmic Spiral Arms
        const armIndex = i % arms;
        const armAngle = (armIndex * 2 * Math.PI) / arms;
        const r = 3.5 + Math.pow(Math.random(), 1.2) * maxRadius;
        const spiralAngle = armAngle + Math.log(r) * 2.5;

        // Random offset for natural arm thickness
        const spread = (Math.random() - 0.5) * armSpread * r;
        const heightSpread = (Math.random() - 0.5) * (1.2 / Math.sqrt(r + 1));

        pos[i * 3] = Math.cos(spiralAngle) * r + spread;
        pos[i * 3 + 1] = heightSpread;
        pos[i * 3 + 2] = Math.sin(spiralAngle) * r + spread;

        // Dust lane color vs Star arm color
        const isDust = Math.random() < 0.25;
        const c = isDust ? wavelengthColors.dust : wavelengthColors.arms;
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
        sz[i] = isDust ? 1.0 : Math.random() * 1.8 + 0.6;
      }
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [galaxyId, wavelengthColors]);

  // Differential galactic rotation
  useFrame((state, delta) => {
    if (galaxyPointsRef.current) {
      galaxyPointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group position={[0, 0, 0]} rotation={[0.65, 0, 0.2]}>
      {/* Central Supermassive Galactic Core Glow */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color={wavelengthColors.core}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 35,000 Particle Spiral Arms */}
      <points ref={galaxyPointsRef}>
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
          size={1.2}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
