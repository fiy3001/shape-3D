import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShapeMeshProps {
  shapeId: string;
  wireframe?: boolean;
  transparent?: boolean;
  color?: string;
  autoRotate?: boolean;
}

export const BasicShapeMesh: React.FC<ShapeMeshProps> = ({
  shapeId,
  wireframe = false,
  transparent = false,
  color = '#6366f1',
  autoRotate = false
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const geometry = useMemo(() => {
    switch (shapeId) {
      case 'cube':
        return new THREE.BoxGeometry(2, 2, 2);
      case 'cuboid':
        return new THREE.BoxGeometry(2.8, 1.8, 1.4);
      case 'sphere':
        return new THREE.SphereGeometry(1.4, 32, 32);
      case 'cylinder':
        return new THREE.CylinderGeometry(1.2, 1.2, 2.4, 32);
      case 'cone':
        return new THREE.ConeGeometry(1.4, 2.4, 32);
      case 'square_pyramid':
        return new THREE.ConeGeometry(1.6, 2.2, 4);
      case 'triangular_prism':
        return new THREE.CylinderGeometry(1.4, 1.4, 2.2, 3);
      case 'pentagonal_prism':
        return new THREE.CylinderGeometry(1.3, 1.3, 2.2, 5);
      case 'hexagonal_prism':
        return new THREE.CylinderGeometry(1.3, 1.3, 2.2, 6);
      case 'triangular_pyramid':
        return new THREE.ConeGeometry(1.6, 2.2, 3);
      case 'pentagonal_pyramid':
        return new THREE.ConeGeometry(1.6, 2.2, 5);
      default:
        return new THREE.BoxGeometry(2, 2, 2);
    }
  }, [shapeId]);

  return (
    <group ref={meshRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          transparent={transparent}
          opacity={transparent ? 0.45 : 1.0}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};
