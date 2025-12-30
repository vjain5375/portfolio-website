import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, IcosahedronGeometry, MeshStandardMaterial } from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

interface FloatingGeometryProps {
  mousePosition: { x: number; y: number };
}

export const FloatingGeometry = ({ mousePosition }: FloatingGeometryProps) => {
  const meshRef = useRef<Mesh>(null);
  const innerMeshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  const cyanColor = useMemo(() => new Color('#00FFFF'), []);
  const purpleColor = useMemo(() => new Color('#8B5CF6'), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      
      // React to mouse
      meshRef.current.rotation.x += mousePosition.y * 0.02;
      meshRef.current.rotation.y += mousePosition.x * 0.02;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= 0.005;
      innerMeshRef.current.rotation.z += 0.003;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Outer wireframe icosahedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial
            color={cyanColor}
            wireframe
            emissive={cyanColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner solid geometry with distortion */}
        <mesh ref={innerMeshRef}>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color="#1a1a2e"
            emissive={purpleColor}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
          />
        </mesh>

        {/* Rotating ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={purpleColor}
            emissive={purpleColor}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Secondary ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[3.8, 0.03, 16, 100]} />
          <meshStandardMaterial
            color={cyanColor}
            emissive={cyanColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Glowing core */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={cyanColor}
            emissive={cyanColor}
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Point lights for glow effect */}
        <pointLight color={cyanColor} intensity={2} distance={10} />
        <pointLight color={purpleColor} intensity={1} distance={8} position={[2, 2, 2]} />
      </group>
    </Float>
  );
};
