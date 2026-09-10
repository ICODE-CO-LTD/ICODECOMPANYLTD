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
    const count = Math.floor(t * points.length);
    if (ref.current && ref.current.geometry) {
      ref.current.geometry.setDrawRange(0, count);
    }
  });

  return (
    <line ref={ref} geometry={fullGeom}>
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

// The main globe mesh — uses photo-realistic texture
function GlobeMesh() {
  const meshRef = useRef();
  
  // Load realistic earth textures
  const [colorMap, bumpMap, specularMap] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    // Using reliable CDNs for three.js planet textures
    return [
      loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
      loader.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
      loader.load('https://unpkg.com/three-globe/example/img/earth-water.png')
    ];
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.015}
        specularMap={specularMap}
        specular={new THREE.Color('grey')}
        shininess={15}
      />
    </mesh>
  );
}

// Atmosphere glow shell
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.04, 64, 64]} />
      <meshPhongMaterial
        color="#4da6ff"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.05} />
      {/* Main sun light from top right */}
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      {/* Subtle blue fill light from the back */}
      <directionalLight position={[-10, 0, -10]} intensity={0.5} color="#2196F3" />
      
      <GlobeMesh />
      <Atmosphere />
      
      {CITY_MARKERS.map((city) => (
        <CityDot key={city.label} lat={city.lat} lng={city.lng} />
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
