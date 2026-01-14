import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { FloatingGeometry } from './FloatingGeometry';
import { Stars } from '@react-three/drei';

export const Scene3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastUpdate = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle to 30fps for performance
    const now = Date.now();
    if (now - lastUpdate.current < 33) return;
    lastUpdate.current = now;

    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        frameloop="demand" // Only render when needed
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
            radius={80}
            depth={40}
            count={300}
            factor={2}
            saturation={0}
            fade
            speed={0.3}
          />

          <FloatingGeometry mousePosition={mousePosition} />

          {/* Environment removed for performance */}
        </Suspense>
      </Canvas>
    </div>
  );
};
