// Dynamic Solar Photosphere & Plasma Flow Shader
import * as THREE from 'three';

export const SunPlasmaShader = {
  uniforms: {
    time: { value: 0 },
    sunColorCore: { value: new THREE.Color(0xfff0d0) },
    sunColorMid: { value: new THREE.Color(0xff8c1a) },
    sunColorDeep: { value: new THREE.Color(0xcc2a00) },
    sunspotColor: { value: new THREE.Color(0x3a0800) },
    flareIntensity: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 sunColorCore;
    uniform vec3 sunColorMid;
    uniform vec3 sunColorDeep;
    uniform vec3 sunspotColor;
    uniform float flareIntensity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    // 2D Simplex Noise generator
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv * 8.0;
      float t = time * 0.15;

      // Layered turbulent plasma noise
      float n1 = snoise(uv + vec2(t * 0.4, t * 0.2));
      float n2 = snoise(uv * 2.0 - vec2(t * 0.3, t * 0.5));
      float n3 = snoise(uv * 4.0 + vec2(t * 0.6, -t * 0.4));
      
      float plasma = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
      plasma = plasma * 0.5 + 0.5;

      // Color mapping
      vec3 col = mix(sunColorDeep, sunColorMid, smoothstep(0.2, 0.6, plasma));
      col = mix(col, sunColorCore, smoothstep(0.65, 0.95, plasma));

      // Sunspots (cool magnetic vortices)
      float spotNoise = snoise(vUv * 3.5 + vec2(t * 0.05, 0.0));
      if (spotNoise > 0.68) {
        float spotFactor = smoothstep(0.68, 0.85, spotNoise);
        col = mix(col, sunspotColor, spotFactor * 0.9);
      }

      // Fresnel limb darkening / brightening
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = 1.0 - max(dot(viewDir, normalize(vNormal)), 0.0);
      col += sunColorCore * pow(fresnel, 2.5) * 0.8 * flareIntensity;

      gl_FragColor = vec4(col, 1.0);
    }
  `
};
