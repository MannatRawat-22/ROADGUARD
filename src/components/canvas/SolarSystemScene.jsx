// Complete Interactive Solar System Scene
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PLANETS_DATA } from '../../constants/celestialData';
import { createPlanetTexture, createSaturnRingsTexture } from '../../utils/textureGenerator';

export default function SolarSystemScene({
  onSelectPlanet = null,
  selectedPlanetId = null,
  timeSpeed = 1.0
}) {
  const planetMeshesRef = useRef([]);
  const saturnRingsTex = useMemo(() => createSaturnRingsTexture(), []);

  // Pre-generate textures for all planets
  const planetTextures = useMemo(() => {
    const map = {};
    PLANETS_DATA.forEach(p => {
      map[p.id] = createPlanetTexture(p.id);
    });
    return map;
  }, []);

  // Orbital simulation loop
  useFrame((state, delta) => {
    PLANETS_DATA.forEach((planet, idx) => {
      const mesh = planetMeshesRef.current[idx];
      if (mesh) {
        // Orbital revolution around Sun
        const currentAngle = (mesh.userData.angle || 0) + delta * planet.orbitSpeed * timeSpeed * 0.8;
        mesh.userData.angle = currentAngle;
        mesh.position.x = Math.cos(currentAngle) * planet.orbitRadius;
        mesh.position.z = Math.sin(currentAngle) * planet.orbitRadius;

        // Axial self-rotation
        mesh.rotation.y += delta * 0.5;
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Sun Light */}
      <pointLight position={[0, 0, 0]} intensity={4.5} distance={300} decay={1.2} color="#fffbe6" />
      <ambientLight intensity={0.08} />

      {/* Sun Model */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4.8, 32, 32]} />
        <meshBasicMaterial color="#ffaa33" />
      </mesh>
      {/* Sun Glow Aura */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[5.6, 32, 32]} />
        <meshBasicMaterial
          color="#ff7700"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Tracks & Planetary Bodies */}
      {PLANETS_DATA.map((planet, idx) => {
        const isSelected = selectedPlanetId === planet.id;
        const initialAngle = (idx * Math.PI) / 4;
        const initX = Math.cos(initialAngle) * planet.orbitRadius;
        const initZ = Math.sin(initialAngle) * planet.orbitRadius;

        return (
          <group key={planet.id}>
            {/* Orbital Path Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[planet.orbitRadius - 0.08, planet.orbitRadius + 0.08, 64]} />
              <meshBasicMaterial
                color={isSelected ? '#38bdf8' : '#ffffff'}
                transparent
                opacity={isSelected ? 0.6 : 0.15}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Planet Body */}
            <group
              ref={el => (planetMeshesRef.current[idx] = el)}
              position={[initX, 0, initZ]}
              userData={{ angle: initialAngle }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPlanet && onSelectPlanet(planet.id);
              }}
            >
              <mesh castShadow receiveShadow>
                <sphereGeometry args={[planet.relativeSize * 0.9, 32, 32]} />
                <meshStandardMaterial
                  map={planetTextures[planet.id]}
                  roughness={0.7}
                  metalness={0.1}
                />
              </mesh>

              {/* Saturn Rings */}
              {planet.id === 'saturn' && (
                <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
                  <ringGeometry args={[2.2, 4.2, 64]} />
                  <meshStandardMaterial
                    map={saturnRingsTex}
                    transparent
                    opacity={0.92}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              )}

              {/* Selection Halo */}
              {isSelected && (
                <mesh>
                  <sphereGeometry args={[planet.relativeSize * 1.3, 16, 16]} />
                  <meshBasicMaterial
                    color="#38bdf8"
                    wireframe
                    transparent
                    opacity={0.7}
                  />
                </mesh>
              )}
            </group>
          </group>
        );
      })}
    </group>
  );
}
