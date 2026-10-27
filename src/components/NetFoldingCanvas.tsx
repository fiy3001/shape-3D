import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface FoldingNetMeshProps {
  netType: 'cube' | 'cuboid' | 'squarePyramid';
  foldProgress: number; // 0 (flat 2D net) to 1 (fully folded 3D object)
}

const FoldingNetMesh: React.FC<FoldingNetMeshProps> = ({ netType, foldProgress }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  if (netType === 'cube') {
    const s = 1.2;
    const foldAngle = foldProgress * (Math.PI / 2);

    return (
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Central Base Face */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[s, s]} />
          <meshStandardMaterial color="#6366f1" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>

        {/* Front Face (folds up around +Z hinge) */}
        <group position={[0, 0, s / 2]} rotation={[foldAngle, 0, 0]}>
          <mesh position={[0, 0, s / 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[s, s]} />
            <meshStandardMaterial color="#ec4899" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>

        {/* Back Face (folds up around -Z hinge) */}
        <group position={[0, 0, -s / 2]} rotation={[-foldAngle, 0, 0]}>
          <mesh position={[0, 0, -s / 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[s, s]} />
            <meshStandardMaterial color="#3b82f6" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>

          {/* Top Face attached to Back Face */}
          <group position={[0, 0, -s]} rotation={[-foldAngle, 0, 0]}>
            <mesh position={[0, 0, -s / 2]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[s, s]} />
              <meshStandardMaterial color="#8b5cf6" side={THREE.DoubleSide} roughness={0.3} />
            </mesh>
          </group>
        </group>

        {/* Left Face (folds up around -X hinge) */}
        <group position={[-s / 2, 0, 0]} rotation={[0, 0, foldAngle]}>
          <mesh position={[-s / 2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[s, s]} />
            <meshStandardMaterial color="#10b981" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>

        {/* Right Face (folds up around +X hinge) */}
        <group position={[s / 2, 0, 0]} rotation={[0, 0, -foldAngle]}>
          <mesh position={[s / 2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[s, s]} />
            <meshStandardMaterial color="#f59e0b" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>
      </group>
    );
  }

  if (netType === 'squarePyramid') {
    const s = 1.4;
    const h = 1.4;
    const targetAngle = Math.atan2(h, s / 2);
    const currentAngle = foldProgress * targetAngle;

    return (
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {/* Base Square Face */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[s, s]} />
          <meshStandardMaterial color="#8b5cf6" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>

        {/* Front Triangle */}
        <group position={[0, 0, s / 2]} rotation={[currentAngle, 0, 0]}>
          <mesh position={[0, h / 2, h / 2]} rotation={[Math.PI / 4, 0, 0]}>
            <coneGeometry args={[s / Math.sqrt(2), h, 4]} />
            <meshStandardMaterial color="#ec4899" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>

        {/* Back Triangle */}
        <group position={[0, 0, -s / 2]} rotation={[-currentAngle, 0, 0]}>
          <mesh position={[0, h / 2, -h / 2]} rotation={[-Math.PI / 4, 0, 0]}>
            <coneGeometry args={[s / Math.sqrt(2), h, 4]} />
            <meshStandardMaterial color="#3b82f6" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>

        {/* Left Triangle */}
        <group position={[-s / 2, 0, 0]} rotation={[0, 0, -currentAngle]}>
          <mesh position={[-h / 2, h / 2, 0]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[s / Math.sqrt(2), h, 4]} />
            <meshStandardMaterial color="#10b981" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>

        {/* Right Triangle */}
        <group position={[s / 2, 0, 0]} rotation={[0, 0, currentAngle]}>
          <mesh position={[h / 2, h / 2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <coneGeometry args={[s / Math.sqrt(2), h, 4]} />
            <meshStandardMaterial color="#f59e0b" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>
      </group>
    );
  }

  // Cuboid default fallback
  const w = 1.8, h = 1.0;
  const foldAngle = foldProgress * (Math.PI / 2);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base Face */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#3b82f6" side={THREE.DoubleSide} roughness={0.3} />
      </mesh>

      {/* Front */}
      <group position={[0, 0, h / 2]} rotation={[foldAngle, 0, 0]}>
        <mesh position={[0, 0, h / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial color="#6366f1" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>
      </group>

      {/* Back */}
      <group position={[0, 0, -h / 2]} rotation={[-foldAngle, 0, 0]}>
        <mesh position={[0, 0, -h / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial color="#10b981" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>
        {/* Top */}
        <group position={[0, 0, -h]} rotation={[-foldAngle, 0, 0]}>
          <mesh position={[0, 0, -h / 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w, h]} />
            <meshStandardMaterial color="#f59e0b" side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Left */}
      <group position={[-w / 2, 0, 0]} rotation={[0, 0, foldAngle]}>
        <mesh position={[-h / 2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[h, h]} />
          <meshStandardMaterial color="#ec4899" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>
      </group>

      {/* Right */}
      <group position={[w / 2, 0, 0]} rotation={[0, 0, -foldAngle]}>
        <mesh position={[h / 2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[h, h]} />
          <meshStandardMaterial color="#8b5cf6" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

interface NetFoldingCanvasProps {
  netType: 'cube' | 'cuboid' | 'squarePyramid';
  foldProgress: number;
}

export const NetFoldingCanvas: React.FC<NetFoldingCanvasProps> = ({ netType, foldProgress }) => {
  return (
    <div className="w-full h-80 bg-gradient-to-b from-purple-50/60 to-indigo-50/60 rounded-2xl border border-purple-100 shadow-inner overflow-hidden relative">
      <Canvas camera={{ position: [0, 4.5, 4.5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <directionalLight position={[-5, -2, -5]} intensity={0.3} />

        <FoldingNetMesh netType={netType} foldProgress={foldProgress} />
        <ContactShadows position={[0, -1.3, 0]} opacity={0.35} scale={8} blur={2} far={4} />

        <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
      </Canvas>
    </div>
  );
};
