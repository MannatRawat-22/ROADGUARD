// Cinematic Cosmic Phenomena Simulator (Supernova, Pulsar, GRB, Aurora, Spacetime Waves, Meteors)
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CosmicPhenomenaScene({
  activePhenomenon = 'supernova' // supernova, pulsar, grb, aurora, gravitational-waves, meteor-shower
}) {
  const groupRef = useRef();
  const pulsarBeamRef = useRef();
  const shockwaveRef = useRef();
  const waveGridRef = useRef();
  const auroraCurtainRef = useRef();

  // Supernova shockwave debris particles
  const { snPositions, snColors } = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      col[i * 3] = 0.9 + Math.random() * 0.1;
      col[i * 3 + 1] = 0.4 + Math.random() * 0.4;
      col[i * 3 + 2] = 0.1 + Math.random() * 0.3;
    }
    return { snPositions: pos, snColors: col };
  }, []);

  // Frame update for dynamic phenomena animations
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Pulsar ultra-fast spin
    if (activePhenomenon === 'pulsar' && pulsarBeamRef.current) {
      pulsarBeamRef.current.rotation.y += delta * 15.0; // 40,000 RPM feel
    }

    // Supernova pulsating shockwave expansion
    if (activePhenomenon === 'supernova' && shockwaveRef.current) {
      const s = 1.0 + Math.sin(t * 1.5) * 0.35;
      shockwaveRef.current.scale.set(s, s, s);
      shockwaveRef.current.rotation.z += delta * 0.1;
    }

    // Spacetime ripple oscillation
    if (activePhenomenon === 'gravitational-waves' && waveGridRef.current) {
      waveGridRef.current.rotation.z += delta * 0.4;
      const waveMesh = waveGridRef.current.children[0];
      if (waveMesh && waveMesh.geometry) {
        const posAttr = waveMesh.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const x = posAttr.getX(i);
          const y = posAttr.getY(i);
          const dist = Math.sqrt(x * x + y * y);
          const z = Math.sin(dist * 1.2 - t * 4.0) * Math.exp(-dist * 0.15) * 0.8;
          posAttr.setZ(i, z);
        }
        posAttr.needsUpdate = true;
      }
    }

    // Aurora curtain wave
    if (activePhenomenon === 'aurora' && auroraCurtainRef.current) {
      auroraCurtainRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Supernova Cataclysm */}
      {activePhenomenon === 'supernova' && (
        <group>
          {/* Collapsing / Exploding Core */}
          <mesh>
            <sphereGeometry args={[1.6, 32, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Thermonuclear Shockwave Shell */}
          <mesh ref={shockwaveRef}>
            <sphereGeometry args={[4.5, 32, 32]} />
            <meshBasicMaterial
              color="#ff4422"
              transparent
              opacity={0.4}
              wireframe
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Ejected Heavy Element Nucleosynthesis Debris */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={snPositions.length / 3}
                array={snPositions}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-color"
                count={snColors.length / 3}
                array={snColors}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={1.4}
              vertexColors
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      )}

      {/* 2. Millisecond Pulsar */}
      {activePhenomenon === 'pulsar' && (
        <group>
          {/* Dense Neutron Star Core (20 km packed matter) */}
          <mesh>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshBasicMaterial color="#dbeafe" />
          </mesh>
          {/* Sweeping Magnetic Synchrotron Beams */}
          <group ref={pulsarBeamRef} rotation={[0.4, 0, 0]}>
            {/* North Beam Cone */}
            <mesh position={[0, 7.5, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[2.8, 0.2, 14, 32, 1, true]} />
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.65}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* South Beam Cone */}
            <mesh position={[0, -7.5, 0]} rotation={[Math.PI, 0, 0]}>
              <cylinderGeometry args={[2.8, 0.2, 14, 32, 1, true]} />
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={0.65}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. Gamma-Ray Burst (GRB) */}
      {activePhenomenon === 'grb' && (
        <group>
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Collimated Twin Relativistic Laser Jets */}
          <mesh position={[0, 10, 0]}>
            <cylinderGeometry args={[0.4, 0.1, 20, 16]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh position={[0, -10, 0]}>
            <cylinderGeometry args={[0.4, 0.1, 20, 16]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      )}

      {/* 4. Geomagnetic Aurora Borealis */}
      {activePhenomenon === 'aurora' && (
        <group ref={auroraCurtainRef}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[5, 1.8, 16, 64]} />
            <meshBasicMaterial
              color="#4ade80"
              transparent
              opacity={0.5}
              wireframe
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      )}

      {/* 5. Gravitational Waves Spacetime Ripple */}
      {activePhenomenon === 'gravitational-waves' && (
        <group ref={waveGridRef}>
          {/* Binary Black Hole Cores */}
          <mesh position={[1.5, 0, 0]}>
            <sphereGeometry args={[0.6, 24, 24]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh position={[-1.5, 0, 0]}>
            <sphereGeometry args={[0.6, 24, 24]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          {/* Spacetime Grid Plane with animated metric displacement */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[26, 26, 48, 48]} />
            <meshBasicMaterial
              color="#38bdf8"
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      )}

      {/* 6. Perseid Meteor Shower */}
      {activePhenomenon === 'meteor-shower' && (
        <group>
          {Array.from({ length: 18 }).map((_, idx) => {
            const angle = (idx * Math.PI) / 9;
            const x = Math.cos(angle) * 8 + (Math.random() - 0.5) * 4;
            const y = Math.sin(angle) * 6 + (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 10;
            return (
              <mesh key={idx} position={[x, y, z]} rotation={[0.8, -0.6, 0.4]}>
                <cylinderGeometry args={[0.04, 0.01, 6, 8]} />
                <meshBasicMaterial
                  color="#fef08a"
                  transparent
                  opacity={0.85}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
}
