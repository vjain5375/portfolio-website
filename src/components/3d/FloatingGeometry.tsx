import { useRef, useMemo } from 'react';
import { useFrame, invalidate } from '@react-three/fiber';
import { Mesh, Color } from 'three';
import { Float } from '@react-three/drei';

interface FloatingGeometryProps {
  mousePosition: { x: number; y: number };
}

export const FloatingGeometry = ({ mousePosition }: FloatingGeometryProps) => {
  const meshRef = useRef<Mesh>(null);
  const innerMeshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  // Stranger Things red theme colors
  const crimsonColor = useMemo(() => new Color('#b91c1c'), []);
  const bloodRedColor = useMemo(() => new Color('#7f1d1d'), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += mousePosition.y * 0.01;
      meshRef.current.rotation.y += mousePosition.x * 0.01;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= 0.002;
      innerMeshRef.current.rotation.z += 0.001;
      const pulse = Math.sin(state.clock.elapsedTime * 0.3) * 0.03 + 1;
      innerMeshRef.current.scale.setScalar(pulse);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.004;
    }

    // Request next frame for demand mode
    invalidate();
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Outer wireframe - simplified */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 0]} />
          <meshStandardMaterial
            color={crimsonColor}
            wireframe
            emissive={crimsonColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner solid - simplified, no distort */}
        <mesh ref={innerMeshRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#1a0a0a"
            emissive={bloodRedColor}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Single ring - reduced segments */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5, 0.04, 8, 48]} />
          <meshStandardMaterial
            color={bloodRedColor}
            emissive={bloodRedColor}
            emissiveIntensity={0.7}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Glowing core - reduced segments */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color={crimsonColor}
            emissive={crimsonColor}
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Single point light */}
        <pointLight color={crimsonColor} intensity={2} distance={10} />
      </group>
    </Float>
  );
};
