import type { ShapeData } from '../types';

export const SHAPES_DATA: ShapeData[] = [
  // BASIC SHAPES (MODULE 1 & LAB)
  {
    id: 'cube',
    name: { bm: 'Kubus', en: 'Cube' },
    category: 'basic',
    description: {
      bm: 'Kubus mempunyai 6 muka rata berbentuk segi empat sama yang sama saiz, 12 rusuk lurus, dan 8 bucu.',
      en: 'A cube has 6 flat square faces of equal size, 12 straight edges, and 8 vertices.'
    },
    properties: {
      flatFaces: 6,
      curvedSurfaces: 0,
      edges: 12,
      vertices: 8,
      faceShapes: { bm: '6 Segi Empat Sama', en: '6 Equal Squares' }
    },
    realWorldExamples: [
      { id: 'dice', name: { bm: 'Dadu Game', en: 'Dice' }, icon: '🎲' },
      { id: 'rubiks', name: { bm: 'Kiub Rubik', en: "Rubik's Cube" }, icon: '🧊' },
      { id: 'box', name: { bm: 'Kotak Hadiah', en: 'Gift Box' }, icon: '🎁' }
    ],
    color: '#6366f1',
    netType: 'cube'
  },
  {
    id: 'cuboid',
    name: { bm: 'Kuboid', en: 'Cuboid' },
    category: 'basic',
    description: {
      bm: 'Kuboid mempunyai 6 muka rata berbentuk segi empat tepat atau segi empat sama, 12 rusuk lurus, dan 8 bucu.',
      en: 'A cuboid has 6 flat rectangular or square faces, 12 straight edges, and 8 vertices.'
    },
    properties: {
      flatFaces: 6,
      curvedSurfaces: 0,
      edges: 12,
      vertices: 8,
      faceShapes: { bm: 'Segi Empat Tepat & Segi Empat Sama', en: 'Rectangles & Squares' }
    },
    realWorldExamples: [
      { id: 'shoebox', name: { bm: 'Kotak Kasut', en: 'Shoebox' }, icon: '📦' },
      { id: 'book', name: { bm: 'Buku Tebal', en: 'Thick Book' }, icon: '📕' },
      { id: 'brick', name: { bm: 'Bata Pembinaan', en: 'Building Brick' }, icon: '🧱' }
    ],
    color: '#3b82f6',
    netType: 'cuboid'
  },
  {
    id: 'sphere',
    name: { bm: 'Sfera', en: 'Sphere' },
    category: 'basic',
    description: {
      bm: 'Sfera ialah bentuk 3D yang sepenuhnya bulat. Ia mempunyai 1 permukaan melengkung, tiada muka rata, tiada rusuk, dan tiada bucu.',
      en: 'A sphere is a perfectly round 3D shape. It has 1 curved surface, zero flat faces, zero edges, and zero vertices.'
    },
    properties: {
      flatFaces: 0,
      curvedSurfaces: 1,
      edges: 0,
      vertices: 0,
      faceShapes: { bm: 'Tiada muka rata (1 Permukaan Melengkung)', en: 'No flat faces (1 Curved Surface)' }
    },
    realWorldExamples: [
      { id: 'football', name: { bm: 'Bola Sepak', en: 'Football' }, icon: '⚽' },
      { id: 'orange', name: { bm: 'Buah Epal/Oren', en: 'Orange/Globe' }, icon: '🍊' },
      { id: 'marble', name: { bm: 'Guli Kaca', en: 'Glass Marble' }, icon: '🔮' }
    ],
    color: '#ec4899',
  },
  {
    id: 'cylinder',
    name: { bm: 'Silinder', en: 'Cylinder' },
    category: 'basic',
    description: {
      bm: 'Silinder mempunyai 2 muka rata berbentuk bulatan di atas dan bawah, 1 permukaan melengkung, 2 sempadan bulatan (rusuk), dan tiada bucu.',
      en: 'A cylinder has 2 flat circular faces top and bottom, 1 curved surface around, 2 circular edges, and zero vertices.'
    },
    properties: {
      flatFaces: 2,
      curvedSurfaces: 1,
      edges: 2,
      vertices: 0,
      faceShapes: { bm: '2 Bulatan Rata & 1 Melengkung', en: '2 Flat Circles & 1 Curved' }
    },
    realWorldExamples: [
      { id: 'can', name: { bm: 'Tin Minuman', en: 'Drink Can' }, icon: '🥫' },
      { id: 'drum', name: { bm: 'Drum Muzik', en: 'Music Drum' }, icon: '🥁' },
      { id: 'battery', name: { bm: 'Bateri AA', en: 'AA Battery' }, icon: '🔋' }
    ],
    color: '#10b981',
  },
  {
    id: 'cone',
    name: { bm: 'Kon', en: 'Cone' },
    category: 'basic',
    description: {
      bm: 'Kon mempunyai 1 muka rata berbentuk bulatan di tapak, 1 permukaan melengkung, 1 sempadan bulatan (rusuk), dan 1 puncak (bucu).',
      en: 'A cone has 1 flat circular base face, 1 curved surface, 1 circular edge, and 1 apex (vertex).'
    },
    properties: {
      flatFaces: 1,
      curvedSurfaces: 1,
      edges: 1,
      vertices: 1,
      faceShapes: { bm: '1 Bulatan Rata & 1 Melengkung', en: '1 Flat Circle & 1 Curved' }
    },
    realWorldExamples: [
      { id: 'icecream', name: { bm: 'Kon Aiskrim', en: 'Ice Cream Cone' }, icon: '🍦' },
      { id: 'traffic_cone', name: { bm: 'Kon Trafik', en: 'Traffic Cone' }, icon: '🗼' },
      { id: 'party_hat', name: { bm: 'Topi Hari Jadi', en: 'Party Hat' }, icon: '🥳' }
    ],
    color: '#f59e0b',
  },
  {
    id: 'square_pyramid',
    name: { bm: 'Piramid Tapak Segi Empat', en: 'Square Pyramid' },
    category: 'basic',
    description: {
      bm: 'Piramid tapak segi empat mempunyai 1 tapak segi empat sama dan 4 muka segi tiga yang bertemu di puncak. Jumlah 5 muka rata, 8 rusuk, dan 5 bucu.',
      en: 'A square pyramid has 1 square base and 4 triangular faces meeting at the apex. Total of 5 flat faces, 8 edges, and 5 vertices.'
    },
    properties: {
      flatFaces: 5,
      curvedSurfaces: 0,
      edges: 8,
      vertices: 5,
      faceShapes: { bm: '1 Segi Empat Sama & 4 Segi Tiga', en: '1 Square & 4 Triangles' }
    },
    realWorldExamples: [
      { id: 'pyramid', name: { bm: 'Piramid Mesir', en: 'Egyptian Pyramid' }, icon: '🔺' },
      { id: 'tent', name: { bm: 'Khemah Perkhemahan', en: 'Camping Tent' }, icon: '⛺' },
      { id: 'roof', name: { bm: 'Bumbung Rumah', en: 'Roof Top' }, icon: '🏠' }
    ],
    color: '#8b5cf6',
    netType: 'squarePyramid'
  },

  // ADVANCED SHAPES (MODULE 7 - UPPER PRIMARY)
  {
    id: 'triangular_prism',
    name: { bm: 'Prisma Segi Tiga', en: 'Triangular Prism' },
    category: 'advanced',
    description: {
      bm: 'Prisma segi tiga mempunyai 2 muka segi tiga yang kongruen dan 3 muka segi empat tepat. Jumlah 5 muka rata, 9 rusuk, dan 6 bucu.',
      en: 'A triangular prism has 2 identical triangular bases and 3 rectangular sides. Total of 5 flat faces, 9 edges, and 6 vertices.'
    },
    properties: {
      flatFaces: 5,
      curvedSurfaces: 0,
      edges: 9,
      vertices: 6,
      faceShapes: { bm: '2 Segi Tiga & 3 Segi Empat Tepat', en: '2 Triangles & 3 Rectangles' }
    },
    realWorldExamples: [
      { id: 'prism_glass', name: { bm: 'Prisma Kaca Cahaya', en: 'Light Glass Prism' }, icon: '🌈' },
      { id: 'toblerone', name: { bm: 'Coklat Toblerone', en: 'Triangular Chocolate' }, icon: '🍫' }
    ],
    color: '#06b6d4'
  },
  {
    id: 'pentagonal_prism',
    name: { bm: 'Prisma Pentagon', en: 'Pentagonal Prism' },
    category: 'advanced',
    description: {
      bm: 'Prisma pentagon mempunyai 2 tapak pentagon (5 sisi) dan 5 muka segi empat tepat. Jumlah 7 muka rata, 15 rusuk, dan 10 bucu.',
      en: 'A pentagonal prism has 2 pentagonal bases (5 sides) and 5 rectangular sides. Total of 7 flat faces, 15 edges, and 10 vertices.'
    },
    properties: {
      flatFaces: 7,
      curvedSurfaces: 0,
      edges: 15,
      vertices: 10,
      faceShapes: { bm: '2 Pentagon & 5 Segi Empat Tepat', en: '2 Pentagons & 5 Rectangles' }
    },
    realWorldExamples: [
      { id: 'building_p', name: { bm: 'Bangunan Pentagon', en: 'Pentagon Structure' }, icon: '🏛️' }
    ],
    color: '#14b8a6'
  },
  {
    id: 'hexagonal_prism',
    name: { bm: 'Prisma Heksagon', en: 'Hexagonal Prism' },
    category: 'advanced',
    description: {
      bm: 'Prisma heksagon mempunyai 2 tapak heksagon (6 sisi) dan 6 muka segi empat tepat. Jumlah 8 muka rata, 18 rusuk, dan 12 bucu.',
      en: 'A hexagonal prism has 2 hexagonal bases (6 sides) and 6 rectangular sides. Total of 8 flat faces, 18 edges, and 12 vertices.'
    },
    properties: {
      flatFaces: 8,
      curvedSurfaces: 0,
      edges: 18,
      vertices: 12,
      faceShapes: { bm: '2 Heksagon & 6 Segi Empat Tepat', en: '2 Hexagons & 6 Rectangles' }
    },
    realWorldExamples: [
      { id: 'pencil', name: { bm: 'Pensel Heksagon', en: 'Hexagonal Pencil' }, icon: '✏️' },
      { id: 'nut', name: { bm: 'Nati Skru Metal', en: 'Metal Bolt Nut' }, icon: '🔩' }
    ],
    color: '#10b981'
  },
  {
    id: 'triangular_pyramid',
    name: { bm: 'Piramid Tapak Segi Tiga', en: 'Triangular Pyramid' },
    category: 'advanced',
    description: {
      bm: 'Piramid tapak segi tiga (Tetrahedron) mempunyai 4 muka rata berbentuk segi tiga, 6 rusuk, dan 4 bucu.',
      en: 'A triangular pyramid (Tetrahedron) has 4 triangular flat faces, 6 edges, and 4 vertices.'
    },
    properties: {
      flatFaces: 4,
      curvedSurfaces: 0,
      edges: 6,
      vertices: 4,
      faceShapes: { bm: '4 Segi Tiga', en: '4 Triangles' }
    },
    realWorldExamples: [
      { id: 'tetra_dice', name: { bm: 'Dadu 4 Sisi (D4)', en: '4-sided Dice (D4)' }, icon: '🔺' }
    ],
    color: '#f97316'
  },
  {
    id: 'pentagonal_pyramid',
    name: { bm: 'Piramid Tapak Pentagon', en: 'Pentagonal Pyramid' },
    category: 'advanced',
    description: {
      bm: 'Piramid tapak pentagon mempunyai 1 tapak pentagon dan 5 muka segi tiga. Jumlah 6 muka rata, 10 rusuk, dan 6 bucu.',
      en: 'A pentagonal pyramid has 1 pentagonal base and 5 triangular faces. Total of 6 flat faces, 10 edges, and 6 vertices.'
    },
    properties: {
      flatFaces: 6,
      curvedSurfaces: 0,
      edges: 10,
      vertices: 6,
      faceShapes: { bm: '1 Pentagon & 5 Segi Tiga', en: '1 Pentagon & 5 Triangles' }
    },
    realWorldExamples: [
      { id: 'star_top', name: { bm: 'Menara Hiasan Pentagon', en: 'Decorative Pentagon Tower' }, icon: '🏰' }
    ],
    color: '#eab308'
  }
];
