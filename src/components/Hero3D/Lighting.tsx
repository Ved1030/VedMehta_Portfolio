export default function Lighting() {
  return (
    <>
      {/* Ambient base */}
      <ambientLight intensity={0.15} color="#94A3B8" />

      {/* Main directional - front */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={0.6}
        color="#F8FAFC"
      />

      {/* Rim light - back */}
      <directionalLight
        position={[-3, 2, -5]}
        intensity={0.3}
        color="#60A5FA"
      />

      {/* Cyan accent point light */}
      <pointLight
        position={[2, 1, 3]}
        intensity={0.5}
        color="#22D3EE"
        distance={8}
        decay={2}
      />

      {/* Teal accent point light */}
      <pointLight
        position={[-2, -1, 2]}
        intensity={0.3}
        color="#4FD1C5"
        distance={6}
        decay={2}
      />

      {/* Subtle gold accent */}
      <pointLight
        position={[0, 3, -2]}
        intensity={0.15}
        color="#F4C542"
        distance={10}
        decay={2}
      />

      {/* Bottom fill - soft blue */}
      <pointLight
        position={[0, -3, 1]}
        intensity={0.1}
        color="#3B82F6"
        distance={6}
        decay={2}
      />
    </>
  );
}
