import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { BasicShapeMesh } from './BasicShapeMesh';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface BaseShapeCanvasProps {
  shapeId: string;
  color?: string;
  autoRotate?: boolean;
  onToggleAutoRotate?: () => void;
  height?: string;
}

export const BaseShapeCanvas: React.FC<BaseShapeCanvasProps> = ({
  shapeId,
  color,
  autoRotate = true,
  onToggleAutoRotate,
  height = 'h-64 md:h-80'
}) => {
  const controlsRef = React.useRef<OrbitControlsImpl>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative w-full ${height} bg-gradient-to-b from-indigo-50/50 to-purple-50/50 rounded-2xl overflow-hidden border border-indigo-100 shadow-inner group`}>
      <Canvas
        camera={{ position: [3, 2.5, 4], fov: 45 }}
        aria-label="3D Shape View"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, -2, -5]} intensity={0.4} />

        <Suspense fallback={null}>
          <BasicShapeMesh shapeId={shapeId} color={color} autoRotate={autoRotate} />
          <ContactShadows position={[0, -1.3, 0]} opacity={0.4} scale={6} blur={1.5} far={4} />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          makeDefault
        />
      </Canvas>

      {/* Floating control buttons */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        {onToggleAutoRotate && (
          <button
            onClick={onToggleAutoRotate}
            className="p-2 rounded-xl bg-white/90 backdrop-blur-sm text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-md border border-indigo-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        )}
        <button
          onClick={handleResetCamera}
          className="p-2 rounded-xl bg-white/90 backdrop-blur-sm text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-md border border-indigo-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          title="Reset Camera View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
