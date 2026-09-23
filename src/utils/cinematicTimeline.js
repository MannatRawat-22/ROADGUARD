// COSMOS - High-Performance Cinematic Timeline & Camera Rail Interpolator
import * as THREE from 'three';

export function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

// Pre-allocated vectors for 60fps garbage-collection free evaluations
const _cameraPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export function getCinematicState(t) {
  const progress = Math.max(0, Math.min(1, t));

  _cameraPos.set(0, 0, 80);
  _targetLookAt.set(0, 0, 0);
  let fov = 45;
  let activeStageName = 'Deep Space';
  let stageIndex = 0;

  // Scene Opacity / Visibility weights
  const weights = {
    starVisibility: 0.15,
    milkyWayOpacity: 0.0,
    cosmicDust: 0.0,
    earth: 0.0,
    moon: 0.0,
    eclipse: 0.0,
    solarSystem: 0.0,
    saturn: 0.0,
    sun: 0.0,
    stars: 0.0,
    milkyWayScene: 0.0,
    nebula: 0.0,
    blackHole: 0.0,
    phenomena: 0.0,
    missions: 0.0,
    future: 0.0,
    ending: 0.0
  };

  let moonPhaseAngle = 0;
  let earthScale = 1.0;
  let earthPos = [0, 0, 0];

  // -------------------------------------------------------------
  // PHASE 1: DEEP SPACE (0% - 20%)
  // Almost complete darkness -> handful of distant stars -> faint dust
  // -------------------------------------------------------------
  if (progress <= 0.20) {
    stageIndex = 1;
    activeStageName = 'Deep Space Darkness';
    const subT = progress / 0.20;
    const s = smoothstep(0, 1, subT);

    // Camera slowly drifts through deep space
    _cameraPos.set(0, 0, lerp(75, 55, s));
    _targetLookAt.set(0, 0, 0);
    fov = 42;

    // 0%: Almost complete darkness. Stars grow subtly from 0.15 to 0.45.
    weights.starVisibility = lerp(0.15, 0.45, s);
    // 20%: Faint cosmic dust becomes visible
    weights.cosmicDust = smoothstep(0.4, 1.0, subT) * 0.2;
    weights.milkyWayOpacity = smoothstep(0.6, 1.0, subT) * 0.08;
  }

  // -------------------------------------------------------------
  // PHASE 2: MILKY WAY APPEARS (20% - 35%)
  // Subtle Milky Way glow begins appearing
  // -------------------------------------------------------------
  else if (progress <= 0.35) {
    stageIndex = 2;
    activeStageName = 'Distant Milky Way Horizon';
    const subT = (progress - 0.20) / 0.15;
    const s = smoothstep(0, 1, subT);

    _cameraPos.set(lerp(0, 4, s), lerp(0, 2, s), lerp(55, 42, s));
    _targetLookAt.set(0, 0, 0);
    fov = lerp(42, 45, s);

    weights.starVisibility = lerp(0.45, 0.75, s);
    // 40% equivalent: Subtle Milky Way glow emerges
    weights.milkyWayOpacity = lerp(0.08, 0.32, s);
    weights.cosmicDust = lerp(0.2, 0.4, s);
  }

  // -------------------------------------------------------------
  // PHASE 3: TRAVELLING THROUGH GALAXY (35% - 50%)
  // Camera travels through galaxy plane, star density increases
  // -------------------------------------------------------------
  else if (progress <= 0.50) {
    stageIndex = 3;
    activeStageName = 'Galactic Plane Flight';
    const subT = (progress - 0.35) / 0.15;
    const s = smoothstep(0, 1, subT);

    _cameraPos.set(lerp(4, 8, s), lerp(2, 4, s), lerp(42, 28, s));
    _targetLookAt.set(0, 0, 0);
    fov = 46;

    weights.starVisibility = 0.85;
    weights.milkyWayOpacity = lerp(0.32, 0.45, s);
  }

  // -------------------------------------------------------------
  // PHASE 4: DISTANT EARTH APPROACHES (50% - 65%)
  // Distant pale Earth appears in distance, camera accelerates toward it
  // -------------------------------------------------------------
  else if (progress <= 0.65) {
    stageIndex = 4;
    activeStageName = 'Earth Approach';
    const subT = (progress - 0.50) / 0.15;
    const s = smoothstep(0, 1, subT);

    // Camera approaches Earth (from Z=28 to Z=10)
    _cameraPos.set(lerp(8, 2.0, s), lerp(4, 0.8, s), lerp(28, 9.5, s));
    _targetLookAt.set(0, 0, 0);
    fov = lerp(46, 44, s);

    weights.starVisibility = 0.8;
    weights.milkyWayOpacity = lerp(0.45, 0.25, s);
    weights.earth = smoothstep(0.05, 0.8, subT);
    earthScale = lerp(0.2, 1.0, s);
  }

  // -------------------------------------------------------------
  // PHASE 5: EARTH FLYBY & TERMINATOR (65% - 80%)
  // Close orbital flyby, night city lights, clouds rotating
  // -------------------------------------------------------------
  else if (progress <= 0.80) {
    stageIndex = 5;
    activeStageName = 'Earth Orbit & Terminator';
    const subT = (progress - 0.65) / 0.15;
    const s = smoothstep(0, 1, subT);

    // Orbital swing around Earth
    const orbitAngle = subT * Math.PI * 0.8;
    _cameraPos.set(
      Math.sin(orbitAngle) * 8.5 + 2.0,
      lerp(0.8, 0.2, s),
      Math.cos(orbitAngle) * 8.5
    );
    _targetLookAt.set(0, 0, 0);
    fov = 44;

    weights.earth = 1.0;
    weights.starVisibility = 0.75;
    weights.milkyWayOpacity = 0.2;
  }

  // -------------------------------------------------------------
  // PHASE 6: MOON BEGINS APPEARING & PHASE SCRUB (80% - 100%)
  // Earth recedes to side, Moon enters scene, camera approaches lunar surface
  // -------------------------------------------------------------
  else {
    stageIndex = 6;
    activeStageName = 'Moon Ingress & Phase Transition';
    const subT = (progress - 0.80) / 0.20;
    const s = smoothstep(0, 1, subT);

    // Camera transitions trajectory toward the Moon
    _cameraPos.set(
      lerp(2.0, 0.0, s),
      lerp(0.2, 0.4, s),
      lerp(8.5, 7.0, s)
    );
    _targetLookAt.set(0, 0, 0);
    fov = lerp(44, 40, s);

    // Earth moves aside and shrinks, Moon emerges
    weights.earth = 1.0 - smoothstep(0.2, 0.8, subT);
    weights.moon = smoothstep(0.1, 0.7, subT);

    // Moon phase scrubbing
    moonPhaseAngle = subT * Math.PI * 2.0;

    weights.starVisibility = 0.85;
    weights.milkyWayOpacity = 0.2;

    if (subT > 0.85) {
      weights.ending = smoothstep(0.85, 1.0, subT);
    }
  }

  return {
    cameraPos: _cameraPos,
    targetLookAt: _targetLookAt,
    fov,
    weights,
    stageIndex,
    activeStageName,
    moonPhaseAngle,
    earthScale,
    earthPos
  };
}
