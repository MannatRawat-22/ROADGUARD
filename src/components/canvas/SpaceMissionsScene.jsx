// Interactive Space Missions & 3D Keplerian Orbit Mechanics Sandbox
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaceMissionsScene({
  activeMissionId = 'voyager-1',
  timelineTime = 0.5, // 0.0 to 1.0 scrubber
  isOrbitSandbox = false,
  semiMajorAxis = 14,
  eccentricity = 0.35
}) {
  const craftRef = useRef();
  const centralBodyRef = useRef();

  // Generate Keplerian Elliptical Orbit Curve
  const { orbitPoints, craftPosition } = useMemo(() => {
    const a = isOrbitSandbox ? semiMajorAxis : 16; // semi-major axis
    const e = isOrbitSandbox ? eccentricity : 0.6;  // eccentricity
    const b = a * Math.sqrt(Math.max(0.01, 1 - e * e)); // semi-minor axis
    const c = a * e; // focal distance

    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      // Ellipse centered at focus
      const x = a * Math.cos(theta) - c;
      const z = b * Math.sin(theta);
      points.push(new THREE.Vector3(x, 0, z));
    }

    // Compute craft position at current timeline parameter
    const meanAnomaly = timelineTime * Math.PI * 2;
    const curX = a * Math.cos(meanAnomaly) - c;
    const curZ = b * Math.sin(meanAnomaly);

    return {
      orbitPoints: points,
      craftPosition: [curX, 0, curZ]
    };
  }, [timelineTime, isOrbitSandbox, semiMajorAxis, eccentricity]);

  const orbitLineGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(orbitPoints);
  }, [orbitPoints]);

  useFrame((state, delta) => {
    if (centralBodyRef.current) {
      centralBodyRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Gravity Anchor (e.g. Earth, Sun, or Mars) */}
      <mesh ref={centralBodyRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color={activeMissionId === 'parker-solar-probe' ? '#ff9900' : '#2563eb'}
          roughness={0.7}
        />
      </mesh>

      {/* Trajectory Path Line */}
      <line geometry={orbitLineGeo}>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.75}
          linewidth={2}
        />
      </line>

      {/* Spacecraft / Satellite Body */}
      <group ref={craftRef} position={craftPosition}>
        {/* Spacecraft Core */}
        <mesh>
          <boxGeometry args={[0.6, 0.4, 0.4]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Solar Panels / Golden Mirrors */}
        <mesh position={[0.7, 0, 0]}>
          <boxGeometry args={[0.8, 0.02, 0.5]} />
          <meshStandardMaterial
            color={activeMissionId === 'jwst' ? '#fbbf24' : '#1e3a8a'}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[-0.7, 0, 0]}>
          <boxGeometry args={[0.8, 0.02, 0.5]} />
          <meshStandardMaterial
            color={activeMissionId === 'jwst' ? '#fbbf24' : '#1e3a8a'}
            metalness={0.8}
          />
        </mesh>
        {/* High-Gain Telemetry Antenna */}
        <mesh position={[0, 0.4, 0]}>
          <coneGeometry args={[0.3, 0.2, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>

        {/* Thruster Glow Particle */}
        <mesh position={[0, 0, -0.3]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
      </group>
    </group>
  );
}
