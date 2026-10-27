import React, { useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getInteractiveGeometry } from '../utils/shapeGeometryHelper';

interface InteractiveShapeMeshProps {
  shapeId: string;
  highlightFacesMode: boolean;
  highlightEdgesMode: boolean;
  highlightVerticesMode: boolean;
  transparentMode: boolean;
  wireframeMode: boolean;
  selectedFaceId: number | null;
  onSelectFace: (faceId: number, faceName: { bm: string; en: string }) => void;
  selectedVertexId: number | null;
  onSelectVertex: (vertexId: number, label?: string) => void;
  lang?: 'bm' | 'en';
}

export const InteractiveShapeMesh: React.FC<InteractiveShapeMeshProps> = ({
  shapeId,
  highlightFacesMode,
  highlightEdgesMode,
  highlightVerticesMode,
  transparentMode,
  wireframeMode,
  selectedFaceId,
  onSelectFace,
  selectedVertexId,
  onSelectVertex
}) => {
  const interactiveData = useMemo(() => getInteractiveGeometry(shapeId), [shapeId]);

  return (
    <group>
      {/* 1. Curved Surfaces (spheres, cylinders, cones) */}
      {interactiveData.curvedSurfaces?.map((surf, idx) => (
        <mesh key={`curved-${idx}`} geometry={surf.geometry}>
          <meshStandardMaterial
            color="#6366f1"
            wireframe={wireframeMode}
            transparent={transparentMode}
            opacity={transparentMode ? 0.4 : 0.85}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* 2. Flat Polyhedron Faces */}
      {interactiveData.faces.map((face) => {
        const isSelected = selectedFaceId === face.id;
        let faceColor = face.color;

        if (highlightFacesMode) {
          faceColor = isSelected ? '#ef4444' : face.color;
        } else if (isSelected) {
          faceColor = '#f59e0b';
        }

        return (
          <mesh
            key={`face-${face.id}`}
            geometry={face.geometry}
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation();
              onSelectFace(face.id, face.name);
            }}
          >
            <meshStandardMaterial
              color={faceColor}
              wireframe={wireframeMode}
              transparent={transparentMode || (highlightFacesMode && !isSelected)}
              opacity={
                wireframeMode ? 1 :
                transparentMode ? 0.35 :
                (highlightFacesMode && !isSelected) ? 0.4 : 0.9
              }
              side={THREE.DoubleSide}
              roughness={0.3}
            />
          </mesh>
        );
      })}

      {/* 3. Edges Highlighting */}
      {highlightEdgesMode &&
        interactiveData.edges.map((edge) => {
          if (edge.isCircular && edge.circleRadius !== undefined && edge.circleCenterY !== undefined) {
            return (
              <mesh key={`circular-edge-${edge.id}`} position={[0, edge.circleCenterY, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[edge.circleRadius - 0.04, edge.circleRadius + 0.04, 64]} />
                <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} />
              </mesh>
            );
          }

          const points = edge.points;
          const geom = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <primitive object={new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 }))} key={`edge-${edge.id}`} />
          );
        })}

      {/* 4. Vertices Highlighting */}
      {highlightVerticesMode &&
        interactiveData.vertices.map((v) => {
          const isSelected = selectedVertexId === v.id;
          return (
            <group key={`vertex-${v.id}`} position={v.position}>
              <mesh
                onClick={(e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  onSelectVertex(v.id, v.label);
                }}
              >
                <sphereGeometry args={[isSelected ? 0.14 : 0.1, 16, 16]} />
                <meshStandardMaterial
                  color={isSelected ? '#10b981' : '#f59e0b'}
                  emissive={isSelected ? '#10b981' : '#f59e0b'}
                  emissiveIntensity={0.6}
                />
              </mesh>
              {isSelected && v.label && (
                <Html position={[0, 0.25, 0]} center>
                  <div className="bg-emerald-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap font-bold pointer-events-none">
                    {v.label}
                  </div>
                </Html>
              )}
            </group>
          );
        })}
    </group>
  );
};
