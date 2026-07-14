import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { profile } from '@/data/portfolio-data';

export default function Avatar() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  const texture = useLoader(THREE.TextureLoader, profile.photo);

  const circleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: false,
      side: THREE.FrontSide,
      roughness: 0.4,
      metalness: 0.1,
    });
  }, [texture]);

  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#22D3EE'),
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
  }, []);

  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22D3EE'),
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.9,
      emissive: new THREE.Color('#22D3EE'),
      emissiveIntensity: 0.2,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.03;
    }
    if (glowRef.current) {
      const t = state.clock.elapsedTime;
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main avatar image */}
      <mesh material={circleMaterial}>
        <circleGeometry args={[1.0, 64]} />
      </mesh>

      {/* Holographic frame ring */}
      <mesh material={frameMaterial}>
        <ringGeometry args={[1.02, 1.06, 64]} />
      </mesh>

      {/* Outer glow ring */}
      <mesh ref={glowRef} material={glowMaterial}>
        <ringGeometry args={[0.95, 1.15, 64]} />
      </mesh>
    </group>
  );
}
