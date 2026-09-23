// Cinematic 3D Solar Eclipse Simulation (Sun - Moon - Earth alignment)
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createMoonTexture } from '../../utils/textureGenerator';

export default function SolarEclipseScene({
  alignment = 0.0, // 0.0 = Totality, -1.0 to 1.0 = Partial
  showShadowCones = true
}) {
  const moonRef = useRef();
  const coronaRef = useRef();
  const moonTex = useMemo(() => createMoonTexture(), []);

  // Distance calculations
  // Alignment: 0 is dead center in front of the Sun
  const moonX = alignment * 4.5;
  const isTotality = Math.abs(alignment) < 0.08;
  const isAnnular = Math.abs(alignment) >= 0.08 && Math.abs(alignment) < 0.25;

  // Corona pulse animation
  useFrame((state, delta) => {
    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.08;
      const scale = 1.0 + Math.sin(state.clock.elapsedTime * 2.0) * 0.04;
      coronaRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Lighting dependent on eclipse state */}
      <ambientLight intensity={isTotality ? 0.03 : 0.4} color="#0d1b2a" />
      
      {/* 1. The Distant Sun */}
      <group position={[0, 0, -25]}>
        <mesh>
          <sphereGeometry args={[5.2, 32, 32]} />
          <meshBasicMaterial color="#fffbe6" />
        </mesh>
        
        {/* Solar Corona (revealed dramatically during totality) */}
        <mesh
          ref={coronaRef}
          position={[0, 0, -0.2]}
          visible={Math.abs(alignment) < 0.45}
        >
          <planeGeometry args={[18, 18]} />
          <meshBasicMaterial
            color="#e0f2fe"
            transparent
            opacity={Math.max(0, 1.0 - Math.abs(alignment) * 2.2)}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 2. The Moon passing in front of the Sun */}
      <group ref={moonRef} position={[moonX, 0, -10]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[2.1, 48, 48]} />
          <meshStandardMaterial
            map={moonTex}
            color="#111115"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Diamond Ring / Baily's Beads Effect on edge */}
        {Math.abs(alignment) > 0.04 && Math.abs(alignment) < 0.12 && (
          <mesh position={[alignment > 0 ? -1.95 : 1.95, 0.4, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial color="#ffffff" blending={THREE.AdditiveBlending} />
          </mesh>
        )}
      </group>

      {/* 3. Umbra & Penumbra 3D Shadow Cone Visualization */}
      {showShadowCones && (
        <group position={[moonX, 0, -10]}>
          {/* Umbra Cone (Inner full shadow) */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 8]}>
            <coneGeometry args={[0.8, 16, 32, 1, true]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.15}
              wireframe
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Penumbra Cone (Outer partial shadow) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 8]}>
            <coneGeometry args={[2.8, 16, 32, 1, true]} />
            <meshBasicMaterial
              color="#f59e0b"
              transparent
              opacity={0.08}
              wireframe
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
