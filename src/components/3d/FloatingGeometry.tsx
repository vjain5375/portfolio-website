import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

interface FloatingGeometryProps {
  mousePosition: { x: number; y: number };
}

export const FloatingGeometry = ({ mousePosition }: FloatingGeometryProps) => {
  const meshRef = useRef<Mesh>(null);
  const innerMeshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  // Stranger Things red theme colors
  const crimsonColor = useMemo(() => new Color('#b91c1c'), []); // Crimson red
  const bloodRedColor = useMemo(() => new Color('#7f1d1d'), []); // Blood red/darker
  const dimCyanColor = useMemo(() => new Color('#1e4d5c'), []); // Very dim cyan accent

  useFrame((state) => {
    if (meshRef.current) {
      // Slower, more ominous rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;

      // React to mouse - more subtle
      meshRef.current.rotation.x += mousePosition.y * 0.015;
      meshRef.current.rotation.y += mousePosition.x * 0.015;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= 0.003;
      innerMeshRef.current.rotation.z += 0.002;

      // Subtle pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1;
      innerMeshRef.current.scale.setScalar(pulse);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.006;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Outer wireframe icosahedron - crimson red */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial
            color={crimsonColor}
            wireframe
            emissive={crimsonColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Inner solid geometry with distortion - dark core */}
        <mesh ref={innerMeshRef}>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color="#1a0a0a"
            emissive={bloodRedColor}
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.7}
            distort={0.25}
            speed={1.5}
          />
        </mesh>

        {/* Main rotating ring - blood red */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={bloodRedColor}
            emissive={bloodRedColor}
            emissiveIntensity={0.9}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Secondary ring - crimson */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[3.8, 0.03, 16, 100]} />
          <meshStandardMaterial
            color={crimsonColor}
            emissive={crimsonColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Tertiary ring - dim cyan accent */}
        <mesh rotation={[Math.PI / 5, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[4.1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={dimCyanColor}
            emissive={dimCyanColor}
            emissiveIntensity={0.4}
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Glowing core - pulsing crimson */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={crimsonColor}
            emissive={crimsonColor}
            emissiveIntensity={2.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Point lights for glow effect - red themed */}
        <pointLight color={crimsonColor} intensity={2.5} distance={12} />
        <pointLight color={bloodRedColor} intensity={1.5} distance={10} position={[2, 2, 2]} />
        <pointLight color={bloodRedColor} intensity={1} distance={8} position={[-2, -1, -2]} />
      </group>
    </Float>
  );
};
