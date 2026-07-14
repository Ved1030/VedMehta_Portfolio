import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  color: string;
  type: 'octahedron' | 'icosahedron' | 'tetrahedron' | 'dodecahedron';
}

function FloatingShape({ position, rotation, scale, speed, color, type }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.12,
      wireframe: true,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.15,
      roughness: 0.5,
      metalness: 0.5,
    });
  }, [color]);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.x = rotation[0] + t * speed * 0.3;
      ref.current.rotation.y = rotation[1] + t * speed;
      ref.current.position.y = initialY + Math.sin(t * speed * 0.5) * 0.15;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
      material={material}
    >
      {getGeometry()}
    </mesh>
  );
}

export default function FloatingShapes({ reduced = false }: { reduced?: boolean }) {
  const shapes: ShapeProps[] = useMemo(() => [
    {
      position: [2.2, 1.5, -1],
      rotation: [0.5, 0.3, 0],
      scale: 0.15,
      speed: 0.2,
      color: '#22D3EE',
      type: 'octahedron',
    },
    {
      position: [-2.0, -1.2, -0.5],
      rotation: [0.2, 0.8, 0.4],
      scale: 0.12,
      speed: 0.25,
      color: '#60A5FA',
      type: 'icosahedron',
    },
    {
      position: [1.5, -1.8, 0.5],
      rotation: [0.7, 0.1, 0.6],
      scale: 0.1,
      speed: 0.3,
      color: '#4FD1C5',
      type: 'tetrahedron',
    },
    {
      position: [-1.8, 1.8, 0.8],
      rotation: [0.3, 0.6, 0.2],
      scale: 0.13,
      speed: 0.18,
      color: '#F4C542',
      type: 'dodecahedron',
    },
    {
      position: [2.8, 0, -1.5],
      rotation: [0.4, 0.2, 0.8],
      scale: 0.08,
      speed: 0.22,
      color: '#22D3EE',
      type: 'octahedron',
    },
    {
      position: [-2.5, 0.5, 1],
      rotation: [0.1, 0.9, 0.3],
      scale: 0.1,
      speed: 0.28,
      color: '#60A5FA',
      type: 'icosahedron',
    },
  ], []);

  const visibleShapes = reduced ? shapes.slice(0, 3) : shapes;

  return (
    <group>
      {visibleShapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </group>
  );
}
