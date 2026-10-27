import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: BEGINNER (Identify 3D shapes)
  {
    id: 'q1_1',
    level: 1,
    question: {
      bm: 'Apakah nama bentuk 3D yang mempunyai 6 muka rata berbentuk segi empat sama?',
      en: 'What is the name of the 3D shape that has 6 square flat faces?'
    },
    shapeId: 'cube',
    options: [
      { bm: 'Kubus', en: 'Cube' },
      { bm: 'Kuboid', en: 'Cuboid' },
      { bm: 'Sfera', en: 'Sphere' },
      { bm: 'Kon', en: 'Cone' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Kubus ialah bentuk 3D dengan 6 muka rata berbentuk segi empat sama yang sama saiz.',
      en: 'A cube is a 3D shape with 6 equal square flat faces.'
    },
    hint: {
      bm: 'Fikirkan tentang dadu permainan yang mempunyai 6 muka segi empat sama.',
      en: 'Think of a game dice which has 6 square faces.'
    }
  },
  {
    id: 'q1_2',
    level: 1,
    question: {
      bm: 'Objek manakah yang berbentuk Sfera?',
      en: 'Which of the following objects is shaped like a Sphere?'
    },
    shapeId: 'sphere',
    options: [
      { bm: 'Tin Minuman', en: 'Drink Can' },
      { bm: 'Bola Sepak', en: 'Football' },
      { bm: 'Kotak Kasut', en: 'Shoebox' },
      { bm: 'Kon Aiskrim', en: 'Ice Cream Cone' }
    ],
    correctAnswerIndex: 1,
    explanation: {
      bm: 'Bola sepak berbentuk bulat dan merupakan contoh Sfera.',
      en: 'A football is completely round and is an example of a Sphere.'
    },
    hint: {
      bm: 'Sfera ialah bentuk bulat yang tidak mempunyai muka rata atau bucu.',
      en: 'A sphere is a round shape with no flat faces or vertices.'
    }
  },
  {
    id: 'q1_3',
    level: 1,
    question: {
      bm: 'Apakah nama bentuk 3D ini yang mempunyai 1 muka bulatan dan 1 puncak?',
      en: 'What is the name of this 3D shape with 1 circular face and 1 apex?'
    },
    shapeId: 'cone',
    options: [
      { bm: 'Silinder', en: 'Cylinder' },
      { bm: 'Kon', en: 'Cone' },
      { bm: 'Piramid Tapak Segi Empat', en: 'Square Pyramid' },
      { bm: 'Kuboid', en: 'Cuboid' }
    ],
    correctAnswerIndex: 1,
    explanation: {
      bm: 'Kon mempunyai tapak berbentuk bulatan dan satu puncak di bahagian atas.',
      en: 'A cone has a circular base and one apex at the top.'
    },
    hint: {
      bm: 'Bentuk ini kelihatan seperti kon aiskrim atau topi parti.',
      en: 'This shape looks like an ice cream cone or a party hat.'
    }
  },
  {
    id: 'q1_4',
    level: 1,
    question: {
      bm: 'Apakah bentuk 3D yang menyerupai tin minuman ruji?',
      en: 'Which 3D shape resembles a standard drink can?'
    },
    shapeId: 'cylinder',
    options: [
      { bm: 'Silinder', en: 'Cylinder' },
      { bm: 'Sfera', en: 'Sphere' },
      { bm: 'Kubus', en: 'Cube' },
      { bm: 'Prisma Segi Tiga', en: 'Triangular Prism' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Tin minuman mempunyai 2 muka bulatan rata di atas & bawah dan 1 permukaan melengkung.',
      en: 'A drink can has 2 flat circular faces at top & bottom and 1 curved surface.'
    },
    hint: {
      bm: 'Ia mempunyai 2 muka bulat rata di atas dan bawah.',
      en: 'It has 2 flat round faces at the top and bottom.'
    }
  },
  {
    id: 'q1_5',
    level: 1,
    question: {
      bm: 'Kenal pasti bentuk 3D yang mempunyai tapak segi empat sama dan 4 muka segi tiga.',
      en: 'Identify the 3D shape that has a square base and 4 triangular faces.'
    },
    shapeId: 'square_pyramid',
    options: [
      { bm: 'Piramid Tapak Segi Empat', en: 'Square Pyramid' },
      { bm: 'Kubus', en: 'Cube' },
      { bm: 'Silinder', en: 'Cylinder' },
      { bm: 'Prisma Pentagon', en: 'Pentagonal Prism' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Piramid tapak segi empat mempunyai 1 tapak segi empat dan 4 muka segi tiga.',
      en: 'A square pyramid has 1 square base and 4 triangular faces.'
    },
    hint: {
      bm: 'Struktur ini terkenal di negara Mesir antik.',
      en: 'This structure is famous in ancient Egypt.'
    }
  },
  {
    id: 'q1_6',
    level: 1,
    question: {
      bm: 'Apakah nama bentuk 3D yang menyerupai kotak kasut?',
      en: 'What is the name of the 3D shape that resembles a shoebox?'
    },
    shapeId: 'cuboid',
    options: [
      { bm: 'Kuboid', en: 'Cuboid' },
      { bm: 'Kubus', en: 'Cube' },
      { bm: 'Sfera', en: 'Sphere' },
      { bm: 'Kon', en: 'Cone' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Kotak kasut ialah contoh biasa bagi bentuk Kuboid.',
      en: 'A shoebox is a common example of a Cuboid.'
    },
    hint: {
      bm: 'Mukanya berbentuk segi empat tepat.',
      en: 'Its faces are rectangular.'
    }
  },

  // LEVEL 2: INTERMEDIATE (Identify properties of 3D shapes)
  {
    id: 'q2_1',
    level: 2,
    question: {
      bm: 'Berapakah bilangan bucu bagi sebuah Kubus?',
      en: 'How many vertices does a Cube have?'
    },
    shapeId: 'cube',
    options: [
      { bm: '6', en: '6' },
      { bm: '8', en: '8' },
      { bm: '12', en: '12' },
      { bm: '4', en: '4' }
    ],
    correctAnswerIndex: 1,
    explanation: {
      bm: 'Sebuah kubus mempunyai 8 bucu (titik bucu).',
      en: 'A cube has 8 vertices (corner points).'
    },
    hint: {
      bm: 'Kira 4 bucu di bahagian atas dan 4 bucu di bahagian bawah.',
      en: 'Count 4 vertices on top and 4 vertices on bottom.'
    }
  },
  {
    id: 'q2_2',
    level: 2,
    question: {
      bm: 'Berapakah bilangan rusuk bagi sebuah Kuboid?',
      en: 'How many edges does a Cuboid have?'
    },
    shapeId: 'cuboid',
    options: [
      { bm: '8', en: '8' },
      { bm: '10', en: '10' },
      { bm: '12', en: '12' },
      { bm: '6', en: '6' }
    ],
    correctAnswerIndex: 2,
    explanation: {
      bm: 'Sebuah kuboid mempunyai 12 rusuk lurus.',
      en: 'A cuboid has 12 straight edges.'
    },
    hint: {
      bm: 'Terdapat 4 rusuk di atas, 4 rusuk di bawah, dan 4 rusuk tegak di tepi.',
      en: 'There are 4 edges on top, 4 edges on bottom, and 4 vertical side edges.'
    }
  },
  {
    id: 'q2_3',
    level: 2,
    question: {
      bm: 'Adakah Sfera mempunyai bucu atau rusuk?',
      en: 'Does a Sphere have any vertices or edges?'
    },
    shapeId: 'sphere',
    options: [
      { bm: 'Ya, 1 bucu & 1 rusuk', en: 'Yes, 1 vertex & 1 edge' },
      { bm: 'Tiada bucu dan tiada rusuk', en: 'No vertices and no edges' },
      { bm: 'Ya, 2 bucu', en: 'Yes, 2 vertices' },
      { bm: 'Ya, 4 rusuk', en: 'Yes, 4 edges' }
    ],
    correctAnswerIndex: 1,
    explanation: {
      bm: 'Sfera sepenuhnya bulat, mempunyai 1 permukaan melengkung, 0 muka rata, 0 rusuk, dan 0 bucu.',
      en: 'A sphere is round, having 1 curved surface, 0 flat faces, 0 edges, and 0 vertices.'
    },
    hint: {
      bm: 'Sfera tidak mempunyai permukaan rata atau bujur tajam.',
      en: 'A sphere has no flat surface or sharp corner.'
    }
  },
  {
    id: 'q2_4',
    level: 2,
    question: {
      bm: 'Berapakah muka rata dan permukaan melengkung bagi sebuah Silinder?',
      en: 'How many flat faces and curved surfaces does a Cylinder have?'
    },
    shapeId: 'cylinder',
    options: [
      { bm: '2 muka rata & 1 permukaan melengkung', en: '2 flat faces & 1 curved surface' },
      { bm: '3 muka rata & 0 permukaan melengkung', en: '3 flat faces & 0 curved surfaces' },
      { bm: '1 muka rata & 2 permukaan melengkung', en: '1 flat face & 2 curved surfaces' },
      { bm: '0 muka rata & 1 permukaan melengkung', en: '0 flat faces & 1 curved surface' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Silinder mempunyai 2 muka rata bulatan di hujung dan 1 permukaan melengkung di sekelilingnya.',
      en: 'A cylinder has 2 flat circular faces at ends and 1 curved surface around.'
    },
    hint: {
      bm: 'Fikirkan tentang tapak atas dan tapak bawah tin minuman.',
      en: 'Think of the top base and bottom base of a drink can.'
    }
  },
  {
    id: 'q2_5',
    level: 2,
    question: {
      bm: 'Berapakah jumlah bucu bagi Piramid Tapak Segi Empat?',
      en: 'What is the total number of vertices on a Square Pyramid?'
    },
    shapeId: 'square_pyramid',
    options: [
      { bm: '4 bucu', en: '4 vertices' },
      { bm: '5 bucu', en: '5 vertices' },
      { bm: '8 bucu', en: '8 vertices' },
      { bm: '6 bucu', en: '6 vertices' }
    ],
    correctAnswerIndex: 1,
    explanation: {
      bm: 'Piramid tapak segi empat mempunyai 4 bucu di tapak dan 1 puncak di atas (jumlah 5 bucu).',
      en: 'A square pyramid has 4 vertices at the base and 1 apex on top (total 5 vertices).'
    },
    hint: {
      bm: 'Kira 4 sudut di tapak dan 1 titik di puncaknya!',
      en: 'Count 4 corners at the base and 1 point at the top!'
    }
  },

  // LEVEL 3: ADVANCED (Mathematical reasoning & nets)
  {
    id: 'q3_1',
    level: 3,
    question: {
      bm: 'Ali ingin membina sebuah kotak berbentuk kuboid. Apakah bentuk muka yang biasanya digunakan untuk membina kotak tersebut?',
      en: 'Ali wants to build a cuboid box. What face shapes are typically used to construct it?'
    },
    shapeId: 'cuboid',
    options: [
      { bm: 'Segi empat tepat atau segi empat sama', en: 'Rectangles or squares' },
      { bm: 'Hanya segi tiga', en: 'Only triangles' },
      { bm: 'Bulatan dan segi tiga', en: 'Circles and triangles' },
      { bm: 'Hanya bulatan', en: 'Only circles' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Kuboid dibina daripada 6 muka rata berbentuk segi empat tepat atau segi empat sama.',
      en: 'A cuboid is made up of 6 flat rectangular or square faces.'
    },
    hint: {
      bm: 'Lihat kotak kasut di rumah kamu, apakah bentuk setiap kadboardnya?',
      en: 'Look at a shoebox at home, what shape is each cardboard face?'
    }
  },
  {
    id: 'q3_2',
    level: 3,
    question: {
      bm: 'Apakah perbezaan utama antara Kubus dan Kuboid?',
      en: 'What is the main difference between a Cube and a Cuboid?'
    },
    shapeId: 'cube',
    options: [
      { bm: 'Semua muka kubus berbentuk segi empat sama bersaiz sama, manakala kuboid boleh mempunyai muka segi empat tepat', en: 'All faces of a cube are equal squares, while a cuboid can have rectangular faces' },
      { bm: 'Kubus tiada bucu manakala kuboid ada bucu', en: 'Cube has no vertices while cuboid has vertices' },
      { bm: 'Kubus ada permukaan melengkung manakala kuboid tiada', en: 'Cube has curved surfaces while cuboid does not' },
      { bm: 'Tiada perbezaan langsung', en: 'There is no difference at all' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Semua 6 muka kubus adalah segi empat sama bersaiz sama. Kuboid mempunyai muka segi empat tepat.',
      en: 'All 6 faces of a cube are identical squares. A cuboid has rectangular faces.'
    },
    hint: {
      bm: 'Adakah semua panjang sisi dadu sama panjang?',
      en: 'Are all side lengths of a die equal?'
    }
  },
  {
    id: 'q3_3',
    level: 3,
    question: {
      bm: 'Jika sebuah bentangan (net) mengandungi 1 segi empat sama dan 4 segi tiga, objek 3D manakah akan terhasil apabila dilipat?',
      en: 'If a 2D net contains 1 square and 4 triangles, which 3D object will be formed when folded?'
    },
    shapeId: 'square_pyramid',
    options: [
      { bm: 'Piramid Tapak Segi Empat', en: 'Square Pyramid' },
      { bm: 'Kubus', en: 'Cube' },
      { bm: 'Prisma Segi Tiga', en: 'Triangular Prism' },
      { bm: 'Kon', en: 'Cone' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: '1 tapak segi empat sama + 4 muka segi tiga melipat menjadi Piramid Tapak Segi Empat.',
      en: '1 square base + 4 triangular side faces fold into a Square Pyramid.'
    },
    hint: {
      bm: 'Segi empat sama berada di tengah, dan 4 segi tiga dilipat ke atas bertemu di puncak.',
      en: 'The square sits in the center, and 4 triangles fold up to meet at top.'
    }
  },
  {
    id: 'q3_4',
    level: 3,
    question: {
      bm: 'Mengapakah guli dan bola sepak sesuai dijadikan objek yang bergolek?',
      en: 'Why are marbles and footballs ideal objects for rolling?'
    },
    shapeId: 'sphere',
    options: [
      { bm: 'Kerana ia berbentuk Sfera dengan permukaan melengkung licin tanpa bucu', en: 'Because they are Spheres with smooth curved surfaces and no vertices' },
      { bm: 'Kerana ia mempunyai 8 bucu tajam', en: 'Because they have 8 sharp corners' },
      { bm: 'Kerana ia berbentuk kubus', en: 'Because they are cube-shaped' },
      { bm: 'Kerana ia mempunyai tapak segi empat', en: 'Because they have a square base' }
    ],
    correctAnswerIndex: 0,
    explanation: {
      bm: 'Sfera tiada bucu dan tiada muka rata, membolehkannya bergolek dengan lancar ke semua arah.',
      en: 'Spheres have no corners and no flat faces, allowing smooth rolling in all directions.'
    },
    hint: {
      bm: 'Bentuk mana yang tidak tersangkut pada sebarang bucu?',
      en: 'Which shape does not get stuck on any corner?'
    }
  }
];
