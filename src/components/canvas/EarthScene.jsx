// Highly Optimized 3D Earth Centerpiece with Subtle Orbital Ring
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  createEarthDiffuseTexture,
  createEarthCloudsTexture,
  createEarthNightLightsTexture
} from '../../utils/textureGenerator';

// Pre-allocated scale vectors to avoid per-frame allocation
const _normalScale = new THREE.Vector3(1, 1, 1);
const _bulgeScaleXZ = new THREE.Vector3(1.18, 0.82, 1.18);
const _cloudNormalScale = new THREE.Vector3(1.018, 1.018, 1.018);
const _cloudBulgeScale = new THREE.Vector3(1.196, 0.833, 1.196);

export default function EarthScene({
  showBulgeRef   // <-- ref, read imperatively in useFrame; never triggers re-render
}) {
  const earthMeshRef = useRef();
  const cloudsRef = useRef();
  const ringRef = useRef();

  const diffuseTex = useMemo(() => createEarthDiffuseTexture(), []);
  const cloudsTex = useMemo(() => createEarthCloudsTexture(), []);
  const nightLightsTex = useMemo(() => createEarthNightLightsTexture(), []);

  useFrame((_, delta) => {
    if (earthMeshRef.current) {
      earthMeshRef.current.rotation.y += delta * 0.04;

      // Read showBulge imperatively from the ref — no re-render needed
      const bulge = showBulgeRef ? showBulgeRef.current : false;
      if (bulge) {
        earthMeshRef.current.scale.copy(_bulgeScaleXZ);
      } else {
        earthMeshRef.current.scale.copy(_normalScale);
      }
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.052;

      const bulge = showBulgeRef ? showBulgeRef.current : false;
      if (bulge) {
        cloudsRef.current.scale.copy(_cloudBulgeScale);
      } else {
        cloudsRef.current.scale.copy(_cloudNormalScale);
      }
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1 directional + 1 ambient — minimum viable lighting */}
      <directionalLight position={[8, 3, 6]} intensity={2.2} color="#fffcf5" />
      <ambientLight intensity={0.08} color="#0d1b2a" />

      {/* Earth System (Axial Tilt 23.4°) */}
      <group rotation={[0.41, 0, 0]}>
        {/* Main Earth Surface — scale managed imperatively in useFrame */}
        <mesh ref={earthMeshRef}>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshStandardMaterial
            map={diffuseTex}
            roughness={0.65}
            metalness={0.05}
            emissiveMap={nightLightsTex}
            emissive="#ffeedd"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Cloud Shell */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.6, 28, 28]} />
          <meshStandardMaterial
            map={cloudsTex}
            transparent
            opacity={0.65}
            depthWrite={false}
          />
        </mesh>

        {/* Subtle Orbital Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0.2, 0]}>
          <torusGeometry args={[2.35, 0.012, 16, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </mesh>

        {/* Atmospheric Rim Halo */}
        <mesh scale={[1.08, 1.08, 1.08]}>
          <sphereGeometry args={[1.6, 24, 24]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
}
