// Relativistic Black Hole & Gravitational Lensing Shader
import * as THREE from 'three';

export const BlackHoleShader = {
  uniforms: {
    time: { value: 0 },
    blackHoleRadius: { value: 2.2 },
    accretionInnerRadius: { value: 3.2 },
    accretionOuterRadius: { value: 8.5 },
    lensingStrength: { value: 2.8 },
    diskColorHot: { value: new THREE.Color(0xdffff) },
    diskColorMid: { value: new THREE.Color(0xffaa33) },
    diskColorCool: { value: new THREE.Color(0xcc2200) }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform float blackHoleRadius;
    uniform float accretionInnerRadius;
    uniform float accretionOuterRadius;
    uniform float lensingStrength;
    uniform vec3 diskColorHot;
    uniform vec3 diskColorMid;
    uniform vec3 diskColorCool;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;

    void main() {
      // Distance from black hole singularity center (local coordinates)
      float dist = length(vPosition.xy);
      vec2 normCoord = vPosition.xy / accretionOuterRadius;

      // Event horizon: absolute void
      if (dist < blackHoleRadius) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
      }

      // Photon Sphere glow ring (r ~ 1.5 Rs)
      float photonDist = abs(dist - (blackHoleRadius * 1.25));
      float photonGlow = exp(-photonDist * 8.0) * 1.5;

      // Accretion Disk mapping
      float diskAlpha = 0.0;
      vec3 diskColor = vec3(0.0);

      if (dist >= accretionInnerRadius && dist <= accretionOuterRadius) {
        float normDist = (dist - accretionInnerRadius) / (accretionOuterRadius - accretionInnerRadius);
        
        // Swirling relativistic pattern
        float angle = atan(vPosition.y, vPosition.x);
        float swirl = sin(angle * 12.0 - time * 2.5 + normDist * 20.0) * 0.5 + 0.5;
        
        // Doppler Beaming: Left side moves toward observer (Doppler boosted & blue shifted), right side moves away (dimmed & redshifted)
        float dopplerFactor = 1.0 - (vPosition.x / accretionOuterRadius) * 0.65;
        dopplerFactor = clamp(dopplerFactor, 0.25, 2.2);

        // Thermal gradient (hotter near ISCO, cooler at outer rim)
        vec3 baseColor = mix(diskColorHot, diskColorMid, smoothstep(0.0, 0.45, normDist));
        baseColor = mix(baseColor, diskColorCool, smoothstep(0.45, 1.0, normDist));

        diskColor = baseColor * (0.8 + swirl * 0.4) * dopplerFactor;
        diskAlpha = (1.0 - normDist) * (1.0 - exp(-(dist - accretionInnerRadius) * 4.0));
      }

      // Gravitational lensing halo edge
      vec3 finalCol = diskColor + vec3(0.8, 0.9, 1.0) * photonGlow;
      float finalAlpha = clamp(diskAlpha + photonGlow * 0.9, 0.0, 1.0);

      gl_FragColor = vec4(finalCol, finalAlpha);
    }
  `
};
