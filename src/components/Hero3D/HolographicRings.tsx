import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RingProps {
  radius: number;
  tube: number;
  color: string;
  speed: number;
  opacity: number;
  tilt?: [number, number, number];
}

function Ring({ radius, tube, color, speed, opacity, tilt = [0, 0, 0] }: RingProps) {
  const ref = useRef<THREE.Mesh>(null!);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.8,
    });
  }, [color, opacity]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = tilt[0] + state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.y = tilt[1] + state.clock.elapsedTime * speed;
      ref.current.rotation.z = tilt[2] + state.clock.elapsedTime * speed * 0.15;
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <torusGeometry args={[radius, tube, 32, 128]} />
    </mesh>
  );
}

export default function HolographicRings() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring - slowest */}
      <Ring
        radius={1.85}
        tube={0.012}
        color="#22D3EE"
        speed={0.08}
        opacity={0.25}
        tilt={[1.2, 0, 0.3]}
      />
      {/* Middle ring - medium */}
      <Ring
        radius={1.65}
        tube={0.015}
        color="#60A5FA"
        speed={0.15}
        opacity={0.2}
        tilt={[0.8, 0.5, -0.2]}
      />
      {/* Inner ring - fastest */}
      <Ring
        radius={1.45}
        tube={0.01}
        color="#4FD1C5"
        speed={0.22}
        opacity={0.18}
        tilt={[0.3, 1.0, 0.5]}
      />
    </group>
  );
}
