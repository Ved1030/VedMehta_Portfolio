import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseControlsProps {
  parentRef: React.RefObject<THREE.Group | null>;
}

export default function MouseControls({ parentRef }: MouseControlsProps) {
  const { gl } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current.x = x * 0.15;
      target.current.y = y * 0.08;
    };
    gl.domElement.addEventListener('pointermove', handler);
    return () => gl.domElement.removeEventListener('pointermove', handler);
  }, [gl.domElement]);

  useFrame(() => {
    if (!parentRef.current) return;

    // Smooth lerp towards target
    parentRef.current.rotation.y += (target.current.x - parentRef.current.rotation.y) * 0.03;
    parentRef.current.rotation.x += (target.current.y - parentRef.current.rotation.x) * 0.03;
  });

  return null;
}
