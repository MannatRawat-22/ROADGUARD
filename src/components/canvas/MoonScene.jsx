// Highly Optimized 3D Moon Scene
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createMoonTexture } from '../../utils/textureGenerator';

export default function MoonScene({
  phaseAngle = 0
}) {
  const moonMeshRef = useRef();
  const moonTex = useMemo(() => createMoonTexture(), []);

  // Directional sun calculation
  const sunX = Math.cos(phaseAngle) * 8;
  const sunZ = Math.sin(phaseAngle) * 8;

  useFrame((_, delta) => {
    if (moonMeshRef.current) {
      moonMeshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <directionalLight position={[sunX, 1.5, sunZ]} intensity={2.4} color="#ffffff" />
      <ambientLight intensity={0.04} color="#111827" />

      <mesh ref={moonMeshRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          map={moonTex}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>
    </group>
  );
}
