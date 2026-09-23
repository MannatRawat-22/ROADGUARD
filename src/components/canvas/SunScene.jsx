// Dynamic Solar Photosphere, Prominences & Coronal Mass Ejection Simulator
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SunPlasmaShader } from '../../shaders/sunPlasmaShader';

export default function SunScene({
  isFlareTriggered = false,
  onFlareComplete = null
}) {
  const sunMeshRef = useRef();
  const coronaRef = useRef();
  const flareParticlesRef = useRef();
  const prominenceRef = useRef();

  // Custom Shader Material for solar plasma
  const sunMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: SunPlasmaShader.vertexShader,
      fragmentShader: SunPlasmaShader.fragmentShader,
      uniforms: THREE.UniformsUtils.clone(SunPlasmaShader.uniforms),
    });
  }, []);

  // Solar flare particles
  const { flarePositions, flareVelocities } = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;

      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      vel[i * 3] = Math.cos(angle) * speed;
      vel[i * 3 + 1] = (Math.random() - 0.5) * speed;
      vel[i * 3 + 2] = Math.sin(angle) * speed;
    }

    return { flarePositions: pos, flareVelocities: vel };
  }, []);

  // Frame update: update time uniform and flare particles
  useFrame((state, delta) => {
    if (sunMaterial.uniforms.time) {
      sunMaterial.uniforms.time.value = state.clock.elapsedTime;
    }

    if (coronaRef.current) {
      coronaRef.current.rotation.z += delta * 0.05;
    }

    if (prominenceRef.current) {
      prominenceRef.current.rotation.y += delta * 0.03;
    }

    // Dynamic solar flare explosion
    if (isFlareTriggered && flareParticlesRef.current) {
      const positions = flareParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += flareVelocities[i * 3] * delta * 2.5;
        positions[i * 3 + 1] += flareVelocities[i * 3 + 1] * delta * 2.5;
        positions[i * 3 + 2] += flareVelocities[i * 3 + 2] * delta * 2.5;
      }
      flareParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Sunlight */}
      <pointLight position={[0, 0, 0]} intensity={5.0} distance={200} color="#fff6e0" />

      {/* Main Solar Body (Photosphere with Plasma Shader) */}
      <mesh ref={sunMeshRef}>
        <sphereGeometry args={[3.6, 64, 64]} />
        <primitive object={sunMaterial} attach="material" />
      </mesh>

      {/* Magnetic Coronal Prominence Loop */}
      <group ref={prominenceRef}>
        <mesh position={[3.4, 1.2, 0]} rotation={[0, 0, -0.4]}>
          <torusGeometry args={[0.9, 0.12, 16, 32, Math.PI]} />
          <meshBasicMaterial
            color="#ff5500"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[-3.2, -1.0, 0]} rotation={[0, 0, 1.8]}>
          <torusGeometry args={[1.2, 0.14, 16, 32, Math.PI]} />
          <meshBasicMaterial
            color="#ff3300"
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Volumetric Solar Corona Aura */}
      <mesh ref={coronaRef} position={[0, 0, 0]}>
        <sphereGeometry args={[4.8, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa22"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solar Flare Particle Eruption */}
      {isFlareTriggered && (
        <points ref={flareParticlesRef} position={[2.8, 2.0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={flarePositions.length / 3}
              array={flarePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.6}
            color="#ffe066"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}
