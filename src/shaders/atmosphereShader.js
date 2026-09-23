// Realistic Atmospheric Scattering Shader (Rayleigh / Mie rim glow)
import * as THREE from 'three';

export const AtmosphereShader = {
  uniforms: {
    sunDirection: { value: new THREE.Vector3(1, 0.2, 0.5).normalize() },
    atmosphereColor: { value: new THREE.Color(0x3da5ff) },
    sunsetGlowColor: { value: new THREE.Color(0xff7733) },
    atmosphereRadius: { value: 1.25 },
    glowPower: { value: 3.5 }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 sunDirection;
    uniform vec3 atmosphereColor;
    uniform vec3 sunsetGlowColor;
    uniform float glowPower;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      vec3 norm = normalize(vNormal);

      // Fresnel rim intensity
      float fresnel = dot(viewDir, norm);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      float intensity = pow(fresnel, glowPower);

      // Sunlight alignment
      float sunDot = dot(norm, normalize(sunDirection));
      float sunFactor = clamp(sunDot * 0.5 + 0.5, 0.0, 1.0);

      // Sunset terminator transition (where sunlight hits the tangent limb)
      float terminator = clamp(1.0 - abs(sunDot) * 2.0, 0.0, 1.0);
      vec3 finalColor = mix(atmosphereColor, sunsetGlowColor, terminator * 0.7);

      float alpha = intensity * (sunFactor * 0.85 + 0.15);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};
