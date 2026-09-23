// Single Persistent Ultra-Optimized Three.js Canvas (60 FPS Locked)
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Starfield from './Starfield';
import EarthScene from './EarthScene';
import MoonScene from './MoonScene';

// Pre-allocated math objects to guarantee ZERO garbage collection during 60fps rendering
const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _earthPos = new THREE.Vector3();
const _moonPos = new THREE.Vector3();

function SceneDirector({
  scrollProgressRef,
  mousePosRef,
  showBulgeRef   // <-- stable ref, never changes identity, zero re-renders
}) {
  const { camera } = useThree();
  const earthGroupRef = useRef();
  const moonGroupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const progress = scrollProgressRef.current || 0;
    const mouse = mousePosRef.current || { x: 0.5, y: 0.5 };

    // 1. Subtle, Elegant Idle Floating & Rotation
    const idleY = Math.sin(t * 0.8) * 0.08;
    const idleRot = t * 0.035;

    // 2. Cinematic Scroll Transitions (0.0 to 1.0)
    // HERO (0.0 -> 0.22): 3D Earth floats in center, perfectly sized (35-45% of viewport)
    if (progress <= 0.22) {
      const p = progress / 0.22;
      _earthPos.set(0, idleY, 0);
      _moonPos.set(8, 6, -15);

      _targetCamPos.set(
        (mouse.x - 0.5) * 0.5,
        (mouse.y - 0.5) * -0.4 + idleY * 0.2,
        6.8 + p * 0.8
      );
      _camLook.set(0, 0, 0);

      if (earthGroupRef.current) {
        earthGroupRef.current.scale.setScalar(1.0);
        earthGroupRef.current.rotation.y = idleRot + progress * 1.5;
        earthGroupRef.current.visible = true;
      }
      if (moonGroupRef.current) {
        moonGroupRef.current.visible = false;
      }
    }
    // SECTION 2 - EARTH DISCOVERY (0.22 -> 0.48): Earth glides to right flank
    else if (progress <= 0.48) {
      const p = (progress - 0.22) / 0.26;
      _earthPos.set(
        THREE.MathUtils.lerp(0, 2.0, p),
        idleY,
        THREE.MathUtils.lerp(0, 0.2, p)
      );
      _moonPos.set(8, 6, -12);

      _targetCamPos.set(
        (mouse.x - 0.5) * 0.4,
        (mouse.y - 0.5) * -0.3,
        7.5
      );
      _camLook.set(
        THREE.MathUtils.lerp(0, 0.8, p),
        0,
        0
      );

      if (earthGroupRef.current) {
        earthGroupRef.current.scale.setScalar(1.0);
        earthGroupRef.current.rotation.y = idleRot + progress * 2.0;
        earthGroupRef.current.visible = true;
      }
      if (moonGroupRef.current) {
        moonGroupRef.current.visible = false;
      }
    }
    // SECTION 3 - MOON & LUNAR EXPLORER (0.48 -> 0.75): Earth recedes, Moon glides to left flank
    else if (progress <= 0.75) {
      const p = (progress - 0.48) / 0.27;
      _earthPos.set(
        THREE.MathUtils.lerp(2.0, 7.0, p),
        idleY,
        THREE.MathUtils.lerp(0.2, -15.0, p)
      );
      _moonPos.set(
        THREE.MathUtils.lerp(-6.0, -1.8, p),
        idleY * 0.8,
        THREE.MathUtils.lerp(-8.0, 0.1, p)
      );

      _targetCamPos.set(
        (mouse.x - 0.5) * 0.4,
        (mouse.y - 0.5) * -0.3,
        6.5
      );
      _camLook.set(
        THREE.MathUtils.lerp(0.8, -0.6, p),
        0,
        0
      );

      if (earthGroupRef.current) {
        earthGroupRef.current.scale.setScalar(Math.max(0.01, 1.0 - p * 0.75));
        earthGroupRef.current.visible = p < 0.95;
      }
      if (moonGroupRef.current) {
        moonGroupRef.current.scale.setScalar(Math.min(1.0, p * 1.2));
        moonGroupRef.current.rotation.y = idleRot * 0.7 + progress * 2.5;
        moonGroupRef.current.visible = true;
      }
    }
    // SECTION 4 - COSMIC FACTS (0.75 -> 0.90): Moon centers and pulls back slightly
    else if (progress <= 0.90) {
      const p = (progress - 0.75) / 0.15;
      _moonPos.set(
        THREE.MathUtils.lerp(-1.8, 0, p),
        idleY * 0.5,
        0
      );

      _targetCamPos.set(
        (mouse.x - 0.5) * 0.3,
        (mouse.y - 0.5) * -0.3,
        THREE.MathUtils.lerp(6.5, 9.5, p)
      );
      _camLook.set(0, 0, 0);

      if (earthGroupRef.current) earthGroupRef.current.visible = false;
      if (moonGroupRef.current) {
        moonGroupRef.current.scale.setScalar(1.0);
        moonGroupRef.current.rotation.y = idleRot * 0.5 + progress * 1.5;
        moonGroupRef.current.visible = true;
      }
    }
    // FINAL SECTION (0.90 -> 1.00): Celestial objects softly recede
    else {
      const p = (progress - 0.90) / 0.10;
      _targetCamPos.set(0, 0, THREE.MathUtils.lerp(9.5, 16.0, p));
      _camLook.set(0, 0, 0);

      if (earthGroupRef.current) earthGroupRef.current.visible = false;
      if (moonGroupRef.current) {
        moonGroupRef.current.scale.setScalar(Math.max(0.01, 1.0 - p * 0.9));
        moonGroupRef.current.visible = p < 0.95;
      }
    }

    // Smooth inertia camera damping
    const damping = Math.min(1.0, delta * 4.5);
    _camPos.lerp(_targetCamPos, damping);
    camera.position.copy(_camPos);
    camera.lookAt(_camLook);

    if (earthGroupRef.current) {
      earthGroupRef.current.position.lerp(_earthPos, damping);
    }
    if (moonGroupRef.current) {
      moonGroupRef.current.position.lerp(_moonPos, damping);
    }
  });

  return (
    <>
      {/* 1. Ultra-Lightweight 60-Star Field */}
      <Starfield />

      {/* 2. Main 3D Hero Object: Earth */}
      <group ref={earthGroupRef} position={[0, 0, 0]}>
        {/* showBulgeRef.current is read each frame inside EarthScene's useFrame — no re-render needed */}
        <EarthScene showBulgeRef={showBulgeRef} />
      </group>

      {/* 3. Secondary 3D Object: Moon */}
      <group ref={moonGroupRef} position={[8, 6, -15]} visible={false}>
        <MoonScene phaseAngle={Math.PI * 0.75} />
      </group>
    </>
  );
}

export default function CosmosCanvas({
  scrollProgressRef,
  mousePosRef,
  showBulgeRef   // <-- ref, not value; identity never changes; React.memo sees same props always
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const maxDPR = isMobile ? 1.0 : Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1.25, 1.25);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 44, near: 0.1, far: 500 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true
        }}
        dpr={[1, maxDPR]}
      >
        <SceneDirector
          scrollProgressRef={scrollProgressRef}
          mousePosRef={mousePosRef}
          showBulgeRef={showBulgeRef}
        />
      </Canvas>
    </div>
  );
}
