export type Language = 'bm' | 'en';

export type ShapeCategory = 'basic' | 'advanced';

export interface BilingualText {
  bm: string;
  en: string;
}

export interface ShapeProperty {
  flatFaces: number;
  curvedSurfaces: number;
  edges: number;
  vertices: number;
  faceShapes: BilingualText;
}

export interface ShapeData {
  id: string;
  name: BilingualText;
  category: ShapeCategory;
  description: BilingualText;
  properties: ShapeProperty;
  realWorldExamples: {
    id: string;
    name: BilingualText;
    icon: string; // Emoji or SVG key
    imageHint?: string;
  }[];
  color: string;
  netType?: 'cube' | 'cuboid' | 'squarePyramid';
}

export interface MatchingItem {
  id: string;
  objectName: BilingualText;
  shapeId: string;
  icon: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  level: 1 | 2 | 3; // 1: Beginner, 2: Intermediate, 3: Advanced
  question: BilingualText;
  shapeId?: string; // If question relates to an interactive 3D object
  options: BilingualText[];
  correctAnswerIndex: number;
  explanation: BilingualText;
  hint: BilingualText;
}

export interface Badge {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  unlockedIf: (progress: UserProgress) => boolean;
}

export interface UserProgress {
  pupilName: string;
  completedModules: string[];
  quizScores: {
    level1?: number;
    level2?: number;
    level3?: number;
  };
  matchingScore: number;
  starsEarned: number;
  visitedShapes: string[];
  certificateIssuedDate?: string;
}
