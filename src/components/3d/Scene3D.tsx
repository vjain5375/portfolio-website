import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { FloatingGeometry } from './FloatingGeometry';
import { Environment, Stars } from '@react-three/drei';

export const Scene3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Darker ambient for Stranger Things vibe */}
          <ambientLight intensity={0.1} color="#1a0505" />

          {/* Red-tinted directional light */}
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.3}
            color="#b91c1c"
          />

          {/* Secondary dim light for depth */}
          <directionalLight
            position={[-5, -5, -5]}
            intensity={0.15}
            color="#7f1d1d"
          />

          <Stars
            radius={100}
            depth={50}
            count={1500}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />

          <FloatingGeometry mousePosition={mousePosition} />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};
