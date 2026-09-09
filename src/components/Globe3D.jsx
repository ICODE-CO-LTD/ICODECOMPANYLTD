import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// City markers placed around the globe
const CITY_MARKERS = [
  { lat: 40.7128, lng: -74.006,  label: 'New York' },
  { lat: 51.5074, lng: -0.1278,  label: 'London' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
  { lat: -1.9441, lng: 30.0619,  label: 'Kigali' },   // Rwanda
  { lat: 48.8566, lng: 2.3522,   label: 'Paris' },
  { lat: 28.6139, lng: 77.209,   label: 'New Delhi' },
  { lat: -33.8688, lng: 151.2093, label: 'Sydney' },
  { lat: 1.3521,  lng: 103.8198, label: 'Singapore' },
  { lat: 25.2048, lng: 55.2708,  label: 'Dubai' },
  { lat: -22.9068, lng: -43.1729, label: 'Rio' },
];

// Convert lat/lng to 3D cartesian
function latLngToVec3(lat, lng, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta),
  );
}

// Animated arc between two cities using a quadratic bezier
function Arc({ from, to, color, delay = 0 }) {
  const ref = useRef();
  const progress = useRef(delay);
  const points = useMemo(() => {
    const p0 = latLngToVec3(from.lat, from.lng, 1.01);
    const p1 = latLngToVec3(to.lat, to.lng, 1.01);
    const mid = p0.clone().add(p1).multiplyScalar(0.5).normalize().multiplyScalar(1.35);
    const curve = new THREE.QuadraticBezierCurve3(p0, mid, p1);
    return curve.getPoints(60);
  }, [from, to]);

  const fullGeom = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.4) % 2;
    const t = Math.min(progress.current, 1);
    const visible = points.slice(0, Math.floor(t * points.length));
    if (visible.length < 2) return;
    ref.current.geometry.setFromPoints(visible);
  });

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.7} linewidth={1.5} />
    </line>
  );
}

// Dot marker at a city location
function CityDot({ lat, lng }) {
  const ref = useRef();
  const pos = useMemo(() => latLngToVec3(lat, lng, 1.025), [lat, lng]);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + 0.3 * Math.sin(clock.elapsedTime * 2 + lat));
    }
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.012, 8, 8]} />
      <meshBasicMaterial color="#6DBE45" />
    </mesh>
  );
}

// The main globe mesh — uses canvas-drawn texture
function GlobeMesh() {
  const meshRef = useRef();

  // Build a procedural dot-grid earth texture
  const texture = useMemo(() => {
    const size = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext('2d');

    // Deep space background
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, size, size / 2);

    // Draw dot-grid land pattern (simplified geographic outline using lat/lng dots)
    const dotSize = 2.5;
    const rows = 180;
    const cols = 360;

    // Rough continental mask via simple geographic heuristic
    function isLand(lat, lng) {
      // North America
      if (lat > 15 && lat < 72 && lng > -170 && lng < -50) {
        if (lat > 50 || (lat > 20 && lng > -120 && lng < -60)) return true;
      }
      // South America
      if (lat > -55 && lat < 15 && lng > -82 && lng < -34) return true;
      // Europe
      if (lat > 35 && lat < 72 && lng > -10 && lng < 40) return true;
      // Africa
      if (lat > -35 && lat < 37 && lng > -18 && lng < 52) return true;
      // Asia
      if (lat > 0 && lat < 75 && lng > 25 && lng < 145) return true;
      // South/SE Asia
      if (lat > -10 && lat < 30 && lng > 60 && lng < 145) return true;
      // Australia
      if (lat > -43 && lat < -10 && lng > 113 && lng < 155) return true;
      // Greenland
      if (lat > 60 && lat < 84 && lng > -55 && lng < -15) return true;
      return false;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const lat = 90 - (row / rows) * 180;
        const lng = (col / cols) * 360 - 180;
        if (isLand(lat, lng)) {
          const x = (col / cols) * size;
          const y = (row / rows) * (size / 2);
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = '#1a3d5c';
          ctx.fill();
        }
      }
    }

    // Highlight dots near key cities
    const cityColors = ['#2196F3', '#6DBE45', '#4da6ff'];
    CITY_MARKERS.forEach((city, i) => {
      const x = ((city.lng + 180) / 360) * size;
      const y = ((90 - city.lat) / 180) * (size / 2);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = cityColors[i % cityColors.length];
      ctx.fill();
    });

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        map={texture}
        specular={new THREE.Color(0x2196f3)}
        shininess={8}
        emissive={new THREE.Color(0x0d1a2e)}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Atmosphere glow shell
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.08, 64, 64]} />
      <meshPhongMaterial
        color="#2196F3"
        transparent
        opacity={0.06}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// Outer glow ring
function OuterGlow() {
  return (
    <mesh>
      <sphereGeometry args={[1.15, 64, 64]} />
      <meshBasicMaterial
        color="#4da6ff"
        transparent
        opacity={0.03}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Arc pairs connecting cities
const ARC_PAIRS = [
  { from: CITY_MARKERS[3], to: CITY_MARKERS[0], color: '#6DBE45', delay: 0 },   // Kigali → NY
  { from: CITY_MARKERS[3], to: CITY_MARKERS[1], color: '#2196F3', delay: 0.4 }, // Kigali → London
  { from: CITY_MARKERS[3], to: CITY_MARKERS[8], color: '#6DBE45', delay: 0.8 }, // Kigali → Dubai
  { from: CITY_MARKERS[0], to: CITY_MARKERS[2], color: '#4da6ff', delay: 1.2 }, // NY → Tokyo
  { from: CITY_MARKERS[1], to: CITY_MARKERS[4], color: '#6DBE45', delay: 0.2 }, // London → Paris
  { from: CITY_MARKERS[7], to: CITY_MARKERS[2], color: '#2196F3', delay: 0.6 }, // Singapore → Tokyo
  { from: CITY_MARKERS[5], to: CITY_MARKERS[8], color: '#4da6ff', delay: 1.0 }, // Delhi → Dubai
  { from: CITY_MARKERS[6], to: CITY_MARKERS[7], color: '#6DBE45', delay: 1.4 }, // Sydney → Singapore
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#2196F3" />
      <GlobeMesh />
      <Atmosphere />
      <OuterGlow />
      {CITY_MARKERS.map((city) => (
        <CityDot key={city.label} lat={city.lat} lng={city.lng} />
      ))}
      {ARC_PAIRS.map((arc, i) => (
        <Arc key={i} from={arc.from} to={arc.to} color={arc.color} delay={arc.delay} />
      ))}
    </>
  );
}

export default function Globe3D({ className = '' }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
