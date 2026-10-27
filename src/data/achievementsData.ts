import type { Badge, UserProgress } from '../types';

export const ACHIEVEMENTS: Badge[] = [
  {
    id: 'shape_explorer',
    title: { bm: 'Penjelajah Bentuk', en: 'Shape Explorer' },
    description: {
      bm: 'Melawat dan meneroka sekurang-kurangnya 3 bentuk 3D di Makmal.',
      en: 'Visit and explore at least 3 shapes in the 3D Lab.'
    },
    icon: '🧭',
    unlockedIf: (p: UserProgress) => p.visitedShapes.length >= 3
  },
  {
    id: 'cube_expert',
    title: { bm: 'Pakar Kubus', en: 'Cube Expert' },
    description: {
      bm: 'Meneroka Kubus dan Kuboid dalam Makmal Bentuk.',
      en: 'Explore the Cube and Cuboid in the 3D Lab.'
    },
    icon: '🧊',
    unlockedIf: (p: UserProgress) => p.visitedShapes.includes('cube') && p.visitedShapes.includes('cuboid')
  },
  {
    id: 'vertex_detective',
    title: { bm: 'Detektif Bucu', en: 'Vertex Detective' },
    description: {
      bm: 'Mencapai skor sekurang-kurangnya 2 soalan betul dalam Kuiz Matematik.',
      en: 'Score at least 2 correct answers in the Math Quiz.'
    },
    icon: '🔍',
    unlockedIf: (p: UserProgress) => {
      const s1 = p.quizScores.level1 || 0;
      const s2 = p.quizScores.level2 || 0;
      const s3 = p.quizScores.level3 || 0;
      return (s1 + s2 + s3) >= 2;
    }
  },
  {
    id: 'shape_champ',
    title: { bm: 'Juara Bentuk 3D', en: '3D Shape Champion' },
    description: {
      bm: 'Menyelesaikan permainan padanan Bentuk 3D Dalam Kehidupan.',
      en: 'Complete the 3D Shapes in Daily Life matching game.'
    },
    icon: '🏆',
    unlockedIf: (p: UserProgress) => p.matchingScore >= 5
  },
  {
    id: 'geometry_master',
    title: { bm: 'Master Geometri', en: 'Geometry Master' },
    description: {
      bm: 'Menyiapkan sekurang-kurangnya 4 modul pembelajaran.',
      en: 'Complete at least 4 learning modules.'
    },
    icon: '🎓',
    unlockedIf: (p: UserProgress) => p.completedModules.length >= 4
  }
];
