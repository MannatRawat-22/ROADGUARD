// Relativistic Gargantua Black Hole & Gravitational Lensing Simulation
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BlackHoleShader } from '../../shaders/blackHoleShader';
import { createAccretionDiskTexture } from '../../utils/textureGenerator';

export default function BlackHoleScene({
  proximity = 0.5, // 0.0 = Far, 1.0 = Event Horizon Boundary
  showAnatomyLabels = true
}) {
  const blackHoleGroupRef = useRef();
  const accretionDiskRef = useRef();
  const photonRingRef = useRef();
  const diskTex = useMemo(() => createAccretionDiskTexture(), []);

  // Custom Relativistic Shader
  const shaderMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: BlackHoleShader.vertexShader,
      fragmentShader: BlackHoleShader.fragmentShader,
      uniforms: THREE.UniformsUtils.clone(BlackHoleShader.uniforms),
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  // Frame update
  useFrame((state, delta) => {
    if (shaderMat.uniforms.time) {
      shaderMat.uniforms.time.value = state.clock.elapsedTime;
    }

    // Dynamic rotation of accretion disk
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z += delta * 0.4;
    }

    if (photonRingRef.current) {
      photonRingRef.current.rotation.y += delta * 0.15;
    }
  });

  // Scale based on proximity
  const baseScale = 1.0 + proximity * 0.8;

  return (
    <group ref={blackHoleGroupRef} position={[0, 0, 0]} scale={[baseScale, baseScale, baseScale]}>
      {/* 1. The Event Horizon (Absolute Singularity Void) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 2. Photon Sphere Halo (r ~ 1.5 Rs) */}
      <mesh ref={photonRingRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.65, 32, 32]} />
        <meshBasicMaterial
          color="#93c5fd"
          transparent
          opacity={0.45}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Horizontal Equatorial Accretion Disk */}
      <mesh ref={accretionDiskRef} rotation={[-Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[2.8, 8.5, 128]} />
        <primitive object={shaderMat} attach="material" />
      </mesh>

      {/* 4. Gravitational Lensed Vertical Light Arch (Relativistic Bent Light from Back Disk) */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[2.7, 7.8, 128]} />
        <primitive object={shaderMat} attach="material" />
      </mesh>
    </group>
  );
}
