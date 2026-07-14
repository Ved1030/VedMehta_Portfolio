import { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Avatar from './Avatar';
import ParticleField from './ParticleField';
import HolographicRings from './HolographicRings';
import Lighting from './Lighting';
import FloatingShapes from './FloatingShapes';
import MouseControls from './MouseControls';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <group ref={groupRef}>
            <MouseControls parentRef={groupRef} />
            <Lighting />
            <Avatar />
            <HolographicRings />
            <FloatingShapes reduced={reduced} />
            <ParticleField count={reduced ? 200 : 600} reduced={reduced} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
