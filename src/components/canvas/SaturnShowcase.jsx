// Detailed Saturn & Moon System Showcase (Titan, Enceladus, Rhea, Iapetus)
import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlanetTexture, createSaturnRingsTexture } from '../../utils/textureGenerator';

export default function SaturnShowcase({
  selectedMoon = null,
  onSelectMoon = null
}) {
  const saturnGroupRef = useRef();
  const saturnMeshRef = useRef();
  const ringMeshRef = useRef();

  const saturnTex = useMemo(() => createPlanetTexture('saturn'), []);
  const ringsTex = useMemo(() => createSaturnRingsTexture(), []);

  // Moons data
  const moons = useMemo(() => [
    { id: 'titan', name: 'Titan', radius: 0.45, dist: 12.0, speed: 0.6, color: '#e89736', desc: 'Dense nitrogen smog atmosphere and liquid methane lakes.' },
    { id: 'enceladus', name: 'Enceladus', radius: 0.18, dist: 6.5, speed: 1.2, color: '#eef8ff', desc: 'Subsurface ocean shooting cryovolcanic geysers into space.' },
    { id: 'rhea', name: 'Rhea', radius: 0.25, dist: 8.5, speed: 0.8, color: '#cccccc', desc: 'Heavily cratered, dirty ice world with tenuous oxygen exosphere.' },
    { id: 'iapetus', name: 'Iapetus', radius: 0.24, dist: 16.0, speed: 0.3, color: '#4a3b32', desc: 'Two-toned yin-yang moon with a 20 km high equatorial ridge.' }
  ], []);

  const moonRefs = useRef([]);

  useFrame((state, delta) => {
    // Saturn axial rotation
    if (saturnMeshRef.current) {
      saturnMeshRef.current.rotation.y += delta * 0.08;
    }

    // Orbiting moons
    moons.forEach((m, idx) => {
      const ref = moonRefs.current[idx];
      if (ref) {
        const cur = (ref.userData.angle || idx * 1.5) + delta * m.speed * 0.4;
        ref.userData.angle = cur;
        ref.position.x = Math.cos(cur) * m.dist;
        ref.position.z = Math.sin(cur) * m.dist;
      }
    });
  });

  return (
    <group ref={saturnGroupRef} position={[0, 0, 0]}>
      {/* Sunlight from an angle to cast dramatic ring shadows */}
      <directionalLight
        position={[25, 8, 15]}
        intensity={3.2}
        color="#fffaf0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={0.06} color="#1a1c24" />

      {/* Saturn Body tilted 26.7° */}
      <group rotation={[0.46, 0, 0]}>
        {/* Saturn Planet Sphere */}
        <mesh ref={saturnMeshRef} castShadow receiveShadow>
          <sphereGeometry args={[3.2, 64, 64]} />
          <meshStandardMaterial
            map={saturnTex}
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>

        {/* Majestic Ring Plane */}
        <mesh ref={ringMeshRef} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <ringGeometry args={[4.2, 8.8, 128]} />
          <meshStandardMaterial
            map={ringsTex}
            transparent
            opacity={0.94}
            side={THREE.DoubleSide}
            roughness={0.6}
          />
        </mesh>

        {/* Orbit tracks for major moons */}
        {moons.map((m, idx) => (
          <mesh key={`orbit-${m.id}`} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[m.dist - 0.04, m.dist + 0.04, 64]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={selectedMoon === m.id ? 0.5 : 0.12}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Major Moons */}
        {moons.map((m, idx) => (
          <group
            key={m.id}
            ref={el => (moonRefs.current[idx] = el)}
            userData={{ angle: idx * 1.5 }}
            position={[Math.cos(idx * 1.5) * m.dist, 0, Math.sin(idx * 1.5) * m.dist]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectMoon && onSelectMoon(m.id);
            }}
          >
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[m.radius, 24, 24]} />
              <meshStandardMaterial color={m.color} roughness={0.7} />
            </mesh>

            {/* Selection Ring Indicator */}
            {selectedMoon === m.id && (
              <mesh>
                <sphereGeometry args={[m.radius * 1.6, 16, 16]} />
                <meshBasicMaterial color="#38bdf8" wireframe />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}
