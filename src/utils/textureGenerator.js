// COSMOS - High-Performance Procedural Asset Engine (Ultra-Optimized)
import * as THREE from 'three';

const textureCache = new Map();

// 1. Soft Circular Gaussian Star Particle Sprite (Airy Disk)
export function getCircularStarTexture() {
  if (textureCache.has('circular_star')) return textureCache.get('circular_star');

  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.2, 'rgba(240, 245, 255, 0.8)');
  grad.addColorStop(0.5, 'rgba(200, 225, 255, 0.2)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set('circular_star', texture);
  return texture;
}

// 2. Photorealistic Earth Diffuse Map (Optimized 512x256)
export function createEarthDiffuseTexture() {
  if (textureCache.has('earth_diffuse')) return textureCache.get('earth_diffuse');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const w = 512;
  const h = 256;

  // Deep dark oceanic gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
  oceanGrad.addColorStop(0.0, '#061324');
  oceanGrad.addColorStop(0.3, '#09213d');
  oceanGrad.addColorStop(0.5, '#0b2a4c');
  oceanGrad.addColorStop(0.7, '#09213d');
  oceanGrad.addColorStop(1.0, '#061324');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, h);

  // Continental shelf shallow seas
  ctx.fillStyle = 'rgba(20, 80, 125, 0.4)';
  drawContinentShapes(ctx, w, h, 6);

  // Landmasses
  ctx.fillStyle = '#234423';
  drawContinentShapes(ctx, w, h, 0);

  // Desert regions
  ctx.fillStyle = '#7a653c';
  drawDeserts(ctx, w, h);

  // Polar ice caps
  ctx.fillStyle = 'rgba(235, 245, 255, 0.95)';
  ctx.fillRect(0, 0, w, h * 0.12);
  ctx.fillRect(0, h * 0.88, w, h * 0.12);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set('earth_diffuse', texture);
  return texture;
}

// 3. Earth Clouds Texture
export function createEarthCloudsTexture() {
  if (textureCache.has('earth_clouds')) return textureCache.get('earth_clouds');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const w = 512;
  const h = 256;

  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < 18; i++) {
    const cx = Math.random() * w;
    const cy = h * 0.18 + Math.random() * (h * 0.64);
    const rx = 40 + Math.random() * 80;
    const ry = 8 + Math.random() * 20;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.65)');
    grad.addColorStop(0.6, 'rgba(240, 245, 255, 0.2)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set('earth_clouds', texture);
  return texture;
}

// 4. Earth Night City Lights Emission Map
export function createEarthNightLightsTexture() {
  if (textureCache.has('earth_lights')) return textureCache.get('earth_lights');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const w = 512;
  const h = 256;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);

  const clusters = [
    { x: w * 0.22, y: h * 0.38, r: 20, count: 35 },
    { x: w * 0.15, y: h * 0.39, r: 15, count: 20 },
    { x: w * 0.52, y: h * 0.32, r: 18, count: 45 },
    { x: w * 0.78, y: h * 0.42, r: 22, count: 60 },
    { x: w * 0.68, y: h * 0.48, r: 15, count: 35 }
  ];

  clusters.forEach(cluster => {
    for (let i = 0; i < cluster.count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 1.6) * cluster.r;
      const px = cluster.x + Math.cos(angle) * dist;
      const py = cluster.y + Math.sin(angle) * dist;
      
      ctx.fillStyle = 'rgba(255, 210, 130, 0.85)';
      ctx.fillRect(px, py, 1.2, 1.2);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set('earth_lights', texture);
  return texture;
}

// 5. Moon Texture
export function createMoonTexture() {
  if (textureCache.has('moon_diffuse')) return textureCache.get('moon_diffuse');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const w = 512;
  const h = 256;

  ctx.fillStyle = '#8a8d94';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#40434a';
  ctx.beginPath();
  ctx.ellipse(w * 0.35, h * 0.4, 35, 30, 0, 0, Math.PI * 2);
  ctx.ellipse(w * 0.52, h * 0.45, 28, 22, 0.2, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set('moon_diffuse', texture);
  return texture;
}

// 6. Saturn Rings Texture
export function createSaturnRingsTexture() {
  if (textureCache.has('saturn_rings')) return textureCache.get('saturn_rings');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0.00, 'rgba(160, 140, 110, 0)');
  grad.addColorStop(0.20, 'rgba(185, 165, 130, 0.4)');
  grad.addColorStop(0.35, 'rgba(230, 205, 160, 0.9)');
  grad.addColorStop(0.58, 'rgba(225, 200, 155, 0.9)');
  grad.addColorStop(0.62, 'rgba(20, 15, 10, 0.05)'); // Cassini
  grad.addColorStop(0.68, 'rgba(215, 190, 150, 0.8)');
  grad.addColorStop(0.95, 'rgba(180, 155, 125, 0.3)');
  grad.addColorStop(1.00, 'rgba(150, 130, 100, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set('saturn_rings', texture);
  return texture;
}

// Internal Shape Helpers
function drawContinentShapes(ctx, w, h, offset) {
  ctx.beginPath();
  ctx.ellipse(w * 0.22 + offset, h * 0.35 + offset, 28, 22, -0.3, 0, Math.PI * 2);
  ctx.ellipse(w * 0.30 + offset, h * 0.65 + offset, 18, 30, 0.2, 0, Math.PI * 2);
  ctx.ellipse(w * 0.68 + offset, h * 0.35 + offset, 60, 28, 0.1, 0, Math.PI * 2);
  ctx.ellipse(w * 0.54 + offset, h * 0.55 + offset, 24, 28, 0, 0, Math.PI * 2);
  ctx.ellipse(w * 0.84 + offset, h * 0.72 + offset, 15, 11, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawDeserts(ctx, w, h) {
  ctx.beginPath();
  ctx.ellipse(w * 0.52, h * 0.44, 20, 9, 0, 0, Math.PI * 2);
  ctx.ellipse(w * 0.84, h * 0.72, 10, 6, 0, 0, Math.PI * 2);
  ctx.fill();
}
