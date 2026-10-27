import * as THREE from 'three';

export interface FaceData {
  id: number;
  name: { bm: string; en: string };
  geometry: THREE.BufferGeometry;
  color: string;
}

export interface EdgeData {
  id: number;
  points: [THREE.Vector3, THREE.Vector3];
  isCircular?: boolean;
  circleRadius?: number;
  circleCenterY?: number;
}

export interface VertexData {
  id: number;
  position: THREE.Vector3;
  label?: string;
}

export interface InteractiveGeometry {
  faces: FaceData[];
  edges: EdgeData[];
  vertices: VertexData[];
  curvedSurfaces?: {
    geometry: THREE.BufferGeometry;
    name: { bm: string; en: string };
  }[];
}

const SOFT_PALETTE = [
  '#f87171', '#fb923c', '#fbbf24', '#a3e635', '#34d399',
  '#22d3ee', '#60a5fa', '#818cf8', '#c084fc', '#f472b6'
];

export function getInteractiveGeometry(shapeId: string): InteractiveGeometry {
  switch (shapeId) {
    case 'cube': {
      const s = 1; // half extent
      const verts: THREE.Vector3[] = [
        new THREE.Vector3(-s, -s, -s), // 0
        new THREE.Vector3(s, -s, -s),  // 1
        new THREE.Vector3(s, s, -s),   // 2
        new THREE.Vector3(-s, s, -s),  // 3
        new THREE.Vector3(-s, -s, s),  // 4
        new THREE.Vector3(s, -s, s),   // 5
        new THREE.Vector3(s, s, s),    // 6
        new THREE.Vector3(-s, s, s)    // 7
      ];

      // 12 edges
      const edgeIndices: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back
        [4, 5], [5, 6], [6, 7], [7, 4], // front
        [0, 4], [1, 5], [2, 6], [3, 7]  // connecting
      ];

      const edges: EdgeData[] = edgeIndices.map(([i, j], idx) => ({
        id: idx,
        points: [verts[i], verts[j]]
      }));

      const vertices: VertexData[] = verts.map((v, idx) => ({
        id: idx,
        position: v,
        label: `Bucu ${idx + 1}`
      }));

      // 6 faces (quads converted to 2 triangles each)
      const faceDefs = [
        { name: { bm: 'Muka Depan', en: 'Front Face' }, quad: [4, 5, 6, 7] },
        { name: { bm: 'Muka Belakang', en: 'Back Face' }, quad: [1, 0, 3, 2] },
        { name: { bm: 'Muka Atas', en: 'Top Face' }, quad: [7, 6, 2, 3] },
        { name: { bm: 'Muka Bawah', en: 'Bottom Face' }, quad: [0, 1, 5, 4] },
        { name: { bm: 'Muka Kiri', en: 'Left Face' }, quad: [0, 4, 7, 3] },
        { name: { bm: 'Muka Kanan', en: 'Right Face' }, quad: [5, 1, 2, 6] },
      ];

      const faces: FaceData[] = faceDefs.map((def, idx) => {
        const [a, b, c, d] = def.quad.map(i => verts[i]);
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array([
          a.x, a.y, a.z,  b.x, b.y, b.z,  c.x, c.y, c.z,
          a.x, a.y, a.z,  c.x, c.y, c.z,  d.x, d.y, d.z
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geom.computeVertexNormals();
        return {
          id: idx,
          name: def.name,
          geometry: geom,
          color: SOFT_PALETTE[idx % SOFT_PALETTE.length]
        };
      });

      return { faces, edges, vertices };
    }

    case 'cuboid': {
      const w = 1.4, h = 0.9, d = 0.7;
      const verts: THREE.Vector3[] = [
        new THREE.Vector3(-w, -h, -d), // 0
        new THREE.Vector3(w, -h, -d),  // 1
        new THREE.Vector3(w, h, -d),   // 2
        new THREE.Vector3(-w, h, -d),  // 3
        new THREE.Vector3(-w, -h, d),  // 4
        new THREE.Vector3(w, -h, d),   // 5
        new THREE.Vector3(w, h, d),    // 6
        new THREE.Vector3(-w, h, d)    // 7
      ];

      const edgeIndices: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      const edges: EdgeData[] = edgeIndices.map(([i, j], idx) => ({
        id: idx,
        points: [verts[i], verts[j]]
      }));

      const vertices: VertexData[] = verts.map((v, idx) => ({
        id: idx,
        position: v,
        label: `Bucu ${idx + 1}`
      }));

      const faceDefs = [
        { name: { bm: 'Muka Depan', en: 'Front Face' }, quad: [4, 5, 6, 7] },
        { name: { bm: 'Muka Belakang', en: 'Back Face' }, quad: [1, 0, 3, 2] },
        { name: { bm: 'Muka Atas', en: 'Top Face' }, quad: [7, 6, 2, 3] },
        { name: { bm: 'Muka Bawah', en: 'Bottom Face' }, quad: [0, 1, 5, 4] },
        { name: { bm: 'Muka Kiri', en: 'Left Face' }, quad: [0, 4, 7, 3] },
        { name: { bm: 'Muka Kanan', en: 'Right Face' }, quad: [5, 1, 2, 6] },
      ];

      const faces: FaceData[] = faceDefs.map((def, idx) => {
        const [a, b, c, d] = def.quad.map(i => verts[i]);
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array([
          a.x, a.y, a.z,  b.x, b.y, b.z,  c.x, c.y, c.z,
          a.x, a.y, a.z,  c.x, c.y, c.z,  d.x, d.y, d.z
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geom.computeVertexNormals();
        return {
          id: idx,
          name: def.name,
          geometry: geom,
          color: SOFT_PALETTE[idx % SOFT_PALETTE.length]
        };
      });

      return { faces, edges, vertices };
    }

    case 'square_pyramid': {
      const b = 1.1; // base half extent
      const yBase = -1.1;
      const yApex = 1.1;

      const verts: THREE.Vector3[] = [
        new THREE.Vector3(-b, yBase, -b), // 0 base back-left
        new THREE.Vector3(b, yBase, -b),  // 1 base back-right
        new THREE.Vector3(b, yBase, b),   // 2 base front-right
        new THREE.Vector3(-b, yBase, b),  // 3 base front-left
        new THREE.Vector3(0, yApex, 0)    // 4 apex
      ];

      const edgeIndices: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0], // 4 base edges
        [0, 4], [1, 4], [2, 4], [3, 4]  // 4 slant edges
      ];

      const edges: EdgeData[] = edgeIndices.map(([i, j], idx) => ({
        id: idx,
        points: [verts[i], verts[j]]
      }));

      const vertices: VertexData[] = verts.map((v, idx) => ({
        id: idx,
        position: v,
        label: idx === 4 ? 'Puncak (Apex)' : `Bucu Tapak ${idx + 1}`
      }));

      // Base face (quad)
      const baseGeom = new THREE.BufferGeometry();
      const [v0, v1, v2, v3] = [verts[0], verts[1], verts[2], verts[3]];
      baseGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        v0.x, v0.y, v0.z,  v3.x, v3.y, v3.z,  v2.x, v2.y, v2.z,
        v0.x, v0.y, v0.z,  v2.x, v2.y, v2.z,  v1.x, v1.y, v1.z
      ]), 3));
      baseGeom.computeVertexNormals();

      const faces: FaceData[] = [
        { id: 0, name: { bm: 'Muka Tapak Segi Empat', en: 'Square Base Face' }, geometry: baseGeom, color: SOFT_PALETTE[0] }
      ];

      // 4 side triangles
      const triDefs = [
        { name: { bm: 'Muka Segi Tiga Depan', en: 'Front Triangle Face' }, tri: [3, 2, 4] },
        { name: { bm: 'Muka Segi Tiga Kanan', en: 'Right Triangle Face' }, tri: [2, 1, 4] },
        { name: { bm: 'Muka Segi Tiga Belakang', en: 'Back Triangle Face' }, tri: [1, 0, 4] },
        { name: { bm: 'Muka Segi Tiga Kiri', en: 'Left Triangle Face' }, tri: [0, 3, 4] },
      ];

      triDefs.forEach((def, idx) => {
        const [a, b, c] = def.tri.map(i => verts[i]);
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
          a.x, a.y, a.z,  b.x, b.y, b.z,  c.x, c.y, c.z
        ]), 3));
        geom.computeVertexNormals();
        faces.push({
          id: idx + 1,
          name: def.name,
          geometry: geom,
          color: SOFT_PALETTE[(idx + 1) % SOFT_PALETTE.length]
        });
      });

      return { faces, edges, vertices };
    }

    case 'sphere': {
      const geom = new THREE.SphereGeometry(1.4, 32, 32);
      return {
        faces: [],
        edges: [],
        vertices: [],
        curvedSurfaces: [{
          geometry: geom,
          name: { bm: 'Permukaan Melengkung Sfera', en: 'Curved Sphere Surface' }
        }]
      };
    }

    case 'cylinder': {
      const radius = 1.2;
      const height = 2.4;

      // Top circular face
      const topCircle = new THREE.CircleGeometry(radius, 32);
      topCircle.rotateX(-Math.PI / 2);
      topCircle.translate(0, height / 2, 0);

      // Bottom circular face
      const bottomCircle = new THREE.CircleGeometry(radius, 32);
      bottomCircle.rotateX(Math.PI / 2);
      bottomCircle.translate(0, -height / 2, 0);

      const faces: FaceData[] = [
        { id: 0, name: { bm: 'Muka Bulatan Atas', en: 'Top Flat Circular Face' }, geometry: topCircle, color: SOFT_PALETTE[0] },
        { id: 1, name: { bm: 'Muka Bulatan Bawah', en: 'Bottom Flat Circular Face' }, geometry: bottomCircle, color: SOFT_PALETTE[1] }
      ];

      const edges: EdgeData[] = [
        { id: 0, points: [new THREE.Vector3(0, height/2, 0), new THREE.Vector3(0, height/2, 0)], isCircular: true, circleRadius: radius, circleCenterY: height / 2 },
        { id: 1, points: [new THREE.Vector3(0, -height/2, 0), new THREE.Vector3(0, -height/2, 0)], isCircular: true, circleRadius: radius, circleCenterY: -height / 2 }
      ];

      // Side curved cylinder surface
      const sideCylinder = new THREE.CylinderGeometry(radius, radius, height, 32, 1, true);

      return {
        faces,
        edges,
        vertices: [],
        curvedSurfaces: [{
          geometry: sideCylinder,
          name: { bm: 'Permukaan Melengkung Silinder', en: 'Curved Cylinder Surface' }
        }]
      };
    }

    case 'cone': {
      const radius = 1.4;
      const height = 2.4;

      // Bottom circle face
      const bottomCircle = new THREE.CircleGeometry(radius, 32);
      bottomCircle.rotateX(Math.PI / 2);
      bottomCircle.translate(0, -height / 2, 0);

      const faces: FaceData[] = [
        { id: 0, name: { bm: 'Muka Bulatan Tapak', en: 'Flat Circular Base Face' }, geometry: bottomCircle, color: SOFT_PALETTE[0] }
      ];

      const edges: EdgeData[] = [
        { id: 0, points: [new THREE.Vector3(0, -height/2, 0), new THREE.Vector3(0, -height/2, 0)], isCircular: true, circleRadius: radius, circleCenterY: -height / 2 }
      ];

      const vertices: VertexData[] = [
        { id: 0, position: new THREE.Vector3(0, height / 2, 0), label: 'Puncak (Apex)' }
      ];

      const sideCone = new THREE.ConeGeometry(radius, height, 32, 1, true);

      return {
        faces,
        edges,
        vertices,
        curvedSurfaces: [{
          geometry: sideCone,
          name: { bm: 'Permukaan Melengkung Kon', en: 'Curved Cone Surface' }
        }]
      };
    }

    case 'triangular_prism': {
      const r = 1.4;
      const h = 2.2;
      const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

      const topVerts = angles.map(a => new THREE.Vector3(r * Math.cos(a), h / 2, r * Math.sin(a)));
      const botVerts = angles.map(a => new THREE.Vector3(r * Math.cos(a), -h / 2, r * Math.sin(a)));
      const verts = [...botVerts, ...topVerts];

      const edgeIndices: [number, number][] = [
        [0, 1], [1, 2], [2, 0], // bottom triangle
        [3, 4], [4, 5], [5, 3], // top triangle
        [0, 3], [1, 4], [2, 5]  // 3 vertical edges
      ];

      const edges: EdgeData[] = edgeIndices.map(([i, j], idx) => ({
        id: idx,
        points: [verts[i], verts[j]]
      }));

      const vertices: VertexData[] = verts.map((v, idx) => ({
        id: idx,
        position: v,
        label: `Bucu ${idx + 1}`
      }));

      // 2 triangular faces + 3 rectangular faces
      const faces: FaceData[] = [];

      // Top triangle
      const topGeom = new THREE.BufferGeometry();
      topGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        topVerts[0].x, topVerts[0].y, topVerts[0].z,
        topVerts[1].x, topVerts[1].y, topVerts[1].z,
        topVerts[2].x, topVerts[2].y, topVerts[2].z,
      ]), 3));
      topGeom.computeVertexNormals();
      faces.push({ id: 0, name: { bm: 'Muka Tapak Segi Tiga Atas', en: 'Top Triangular Base' }, geometry: topGeom, color: SOFT_PALETTE[0] });

      // Bottom triangle
      const botGeom = new THREE.BufferGeometry();
      botGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        botVerts[0].x, botVerts[0].y, botVerts[0].z,
        botVerts[2].x, botVerts[2].y, botVerts[2].z,
        botVerts[1].x, botVerts[1].y, botVerts[1].z,
      ]), 3));
      botGeom.computeVertexNormals();
      faces.push({ id: 1, name: { bm: 'Muka Tapak Segi Tiga Bawah', en: 'Bottom Triangular Base' }, geometry: botGeom, color: SOFT_PALETTE[1] });

      // 3 sides
      for (let i = 0; i < 3; i++) {
        const next = (i + 1) % 3;
        const b1 = botVerts[i], b2 = botVerts[next];
        const t1 = topVerts[i], t2 = topVerts[next];

        const sideGeom = new THREE.BufferGeometry();
        sideGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
          b1.x, b1.y, b1.z,  b2.x, b2.y, b2.z,  t2.x, t2.y, t2.z,
          b1.x, b1.y, b1.z,  t2.x, t2.y, t2.z,  t1.x, t1.y, t1.z
        ]), 3));
        sideGeom.computeVertexNormals();
        faces.push({
          id: i + 2,
          name: { bm: `Muka Sisi Segi Empat ${i + 1}`, en: `Rectangular Side ${i + 1}` },
          geometry: sideGeom,
          color: SOFT_PALETTE[(i + 2) % SOFT_PALETTE.length]
        });
      }

      return { faces, edges, vertices };
    }

    // Generic polygon prism/pyramid fallback
    default: {
      return getInteractiveGeometry('cube');
    }
  }
}
