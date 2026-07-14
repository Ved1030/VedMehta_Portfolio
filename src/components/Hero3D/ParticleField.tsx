import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  reduced?: boolean;
}

export default function ParticleField({ count = 800, reduced = false }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null!);
  const actualCount = reduced ? Math.floor(count * 0.3) : count;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const colors = new Float32Array(actualCount * 3);
    const sizes = new Float32Array(actualCount);

    const cyanColor = new THREE.Color('#22D3EE');
    const blueColor = new THREE.Color('#60A5FA');
    const whiteColor = new THREE.Color('#E2E8F0');
    const palette = [cyanColor, blueColor, whiteColor];

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      const radius = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    return { positions, colors, sizes };
  }, [actualCount]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        uniform float uTime;
        uniform float uPixelRatio;
        varying vec3 vColor;

        void main() {
          vColor = color;
          vec3 pos = position;

          // Gentle floating motion
          float offset = pos.x * 0.5 + pos.y * 0.3;
          pos.y += sin(uTime * 0.15 + offset) * 0.12;
          pos.x += cos(uTime * 0.1 + offset * 0.7) * 0.08;
          pos.z += sin(uTime * 0.12 + offset * 1.3) * 0.06;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * uPixelRatio * (80.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.6;

          // Soft glow
          float glow = exp(-dist * 4.0) * 0.4;

          gl_FragColor = vec4(vColor, alpha + glow);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
  }, []);

  useEffect(() => {
    const geo = meshRef.current?.geometry;
    if (geo) {
      geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    }
  }, [sizes]);

  useFrame((state) => {
    if (meshRef.current) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={meshRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={actualCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={actualCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}
