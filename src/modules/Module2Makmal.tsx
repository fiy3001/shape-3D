import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { InteractiveShapeMesh } from '../components/InteractiveShapeMesh';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { SHAPES_DATA } from '../data/shapesData';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types';
import {
  RotateCcw,
  Eye,
  Box,
  Circle,
  Dot,
  Layers,
  Sparkles,
  Play,
  Pause,
  Check
} from 'lucide-react';

interface Module2Props {
  lang: Language;
  initialShapeId?: string;
  onRecordVisitedShape?: (shapeId: string) => void;
}

export const Module2Makmal: React.FC<Module2Props> = ({
  lang,
  initialShapeId = 'cube',
  onRecordVisitedShape
}) => {
  const t = TRANSLATIONS[lang];
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const [selectedShapeId, setSelectedShapeId] = useState<string>(initialShapeId);

  // Tools state
  const [highlightFaces, setHighlightFaces] = useState(false);
  const [highlightEdges, setHighlightEdges] = useState(false);
  const [highlightVertices, setHighlightVertices] = useState(false);
  const [transparentMode, setTransparentMode] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  // Selection inspection state
  const [selectedFaceInfo, setSelectedFaceInfo] = useState<{ id: number; name: { bm: string; en: string } } | null>(null);
  const [selectedVertexInfo, setSelectedVertexInfo] = useState<{ id: number; label?: string } | null>(null);

  const shape = SHAPES_DATA.find((s) => s.id === selectedShapeId) || SHAPES_DATA[0];

  const handleSelectShape = (id: string) => {
    setSelectedShapeId(id);
    setSelectedFaceInfo(null);
    setSelectedVertexInfo(null);
    if (onRecordVisitedShape) {
      onRecordVisitedShape(id);
    }
  };

  const handleResetView = () => {
    setHighlightFaces(false);
    setHighlightEdges(false);
    setHighlightVertices(false);
    setTransparentMode(false);
    setWireframeMode(false);
    setAutoRotate(false);
    setSelectedFaceInfo(null);
    setSelectedVertexInfo(null);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Rule-based GeoBot message based on active lab state
  const getLabMascotMessage = () => {
    if (selectedFaceInfo) {
      return lang === 'bm'
        ? `Kamu telah memilih ${selectedFaceInfo.name.bm}! Muka rata ialah permukaan rata objek 3D.`
        : `You selected ${selectedFaceInfo.name.en}! A flat face is a flat surface of a 3D solid.`;
    }
    if (selectedVertexInfo) {
      return lang === 'bm'
        ? `Kamu menekan bucu! Bucu ialah titik tajam di mana beberapa rusuk bertemu.`
        : `You tapped a vertex! A vertex is a corner point where edges meet.`;
    }
    if (highlightFaces) {
      return lang === 'bm'
        ? `Mod Muka Rata diaktifkan. Klik pada mana-mana muka warna untuk melihat namanya!`
        : `Flat Faces mode enabled. Click on any colored face to inspect its name!`;
    }
    if (highlightEdges) {
      return lang === 'bm'
        ? `Mod Rusuk diaktifkan! Garisan merah menunjukkan rusuk lurus atau sempadan bulatan.`
        : `Edges mode enabled! Red lines highlight straight edges or circular boundaries.`;
    }
    if (highlightVertices) {
      return lang === 'bm'
        ? `Mod Bucu diaktifkan! Bebola berwarna menandakan kedudukan bucu.`
        : `Vertices mode enabled! Colored spheres mark vertex corner locations.`;
    }
    if (wireframeMode) {
      return lang === 'bm'
        ? `Mod Wireframe menunjukkan kerangka rangka geometrik 3D.`
        : `Wireframe mode reveals the internal geometric skeletal frame.`;
    }
    return lang === 'bm'
      ? `Selamat datang ke Makmal Bentuk 3D! Gunakan panel alatan di kiri untuk meneliti muka, rusuk & bucu.`
      : `Welcome to the 3D Shape Laboratory! Use the left tools panel to inspect faces, edges & vertices.`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-yellow-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {t.mod2Title}
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-2">
            {lang === 'bm' ? 'Makmal Penerokaan Bentuk 3D' : '3D Shape Exploration Laboratory'}
          </h1>
          <p className="text-purple-100 text-sm md:text-base mt-1">
            {lang === 'bm'
              ? 'Penyelidikan interaktif paling berkuasa untuk meneliti struktur 3D.'
              : 'Interactive laboratory tools to investigate 3D solid structures.'}
          </p>
        </div>
      </div>

      <GeoBotMascot message={getLabMascotMessage()} />

      {/* Shape Selector Scrollable Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SHAPES_DATA.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelectShape(s.id)}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm whitespace-nowrap transition-all cursor-pointer border-2 ${
              s.id === selectedShapeId
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200'
                : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            {s.name[lang]}
          </button>
        ))}
      </div>

      {/* Main Laboratory Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Interactive Tool Palette */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border-2 border-purple-100 shadow-md space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
            {lang === 'bm' ? 'Panel Alatan Makmal' : 'Lab Control Tools'}
          </h3>

          {/* Tool A: Rotate / Auto Rotate */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-between border-2 transition-all cursor-pointer ${
              autoRotate
                ? 'bg-purple-50 text-purple-700 border-purple-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              {autoRotate ? <Pause className="w-4 h-4 text-purple-600" /> : <Play className="w-4 h-4 text-slate-600" />}
              <span>{t.toolAutoRotate}</span>
            </div>
            {autoRotate && <Check className="w-4 h-4 text-purple-600" />}
          </button>

          {/* Tool C: Highlight Faces */}
          <button
            onClick={() => setHighlightFaces(!highlightFaces)}
            className={`w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-between border-2 transition-all cursor-pointer ${
              highlightFaces
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-indigo-600" />
              <span>{t.toolHighlightFaces}</span>
            </div>
            {highlightFaces && <Check className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Tool D: Highlight Edges */}
          <button
            onClick={() => setHighlightEdges(!highlightEdges)}
            className={`w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-between border-2 transition-all cursor-pointer ${
              highlightEdges
                ? 'bg-red-50 text-red-700 border-red-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-red-500" />
              <span>{t.toolHighlightEdges}</span>
            </div>
            {highlightEdges && <Check className="w-4 h-4 text-red-600" />}
          </button>

          {/* Tool E: Highlight Vertices */}
          <button
            onClick={() => setHighlightVertices(!highlightVertices)}
            className={`w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-between border-2 transition-all cursor-pointer ${
              highlightVertices
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Dot className="w-5 h-5 text-emerald-600" />
              <span>{t.toolHighlightVertices}</span>
            </div>
            {highlightVertices && <Check className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Tool F: Transparent Mode */}
          <button
            onClick={() => setTransparentMode(!transparentMode)}
            className={`w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-between border-2 transition-all cursor-pointer ${
              transparentMode
                ? 'bg-sky-50 text-sky-700 border-sky-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-sky-600" />
              <span>{t.toolTransparent}</span>
            </div>
            {transparentMode && <Check className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Tool G: Wireframe Mode */}
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs flex items-center justify-between border-2 transition-all cursor-pointer ${
              wireframeMode
                ? 'bg-pink-50 text-pink-700 border-pink-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-pink-600" />
              <span>{t.toolWireframe}</span>
            </div>
            {wireframeMode && <Check className="w-4 h-4 text-pink-600" />}
          </button>

          <hr className="border-slate-100" />

          {/* Tool H: Reset View */}
          <button
            onClick={handleResetView}
            className="w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs bg-slate-800 text-white hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.toolReset}</span>
          </button>
        </div>

        {/* Center 3D Interactive Canvas */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-gradient-to-b from-purple-50/70 via-indigo-50/50 to-pink-50/50 rounded-3xl border-2 border-purple-100 shadow-inner overflow-hidden">
            <Canvas camera={{ position: [3, 2.5, 4], fov: 45 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 8, 5]} intensity={1.2} />
              <directionalLight position={[-5, -2, -5]} intensity={0.4} />

              <Suspense fallback={null}>
                <InteractiveShapeMesh
                  shapeId={shape.id}
                  highlightFacesMode={highlightFaces}
                  highlightEdgesMode={highlightEdges}
                  highlightVerticesMode={highlightVertices}
                  transparentMode={transparentMode}
                  wireframeMode={wireframeMode}
                  selectedFaceId={selectedFaceInfo?.id ?? null}
                  onSelectFace={(id, name) => {
                    setSelectedFaceInfo({ id, name });
                    setSelectedVertexInfo(null);
                  }}
                  selectedVertexId={selectedVertexInfo?.id ?? null}
                  onSelectVertex={(id, label) => {
                    setSelectedVertexInfo({ id, label });
                    setSelectedFaceInfo(null);
                  }}
                  lang={lang}
                />
                <ContactShadows position={[0, -1.3, 0]} opacity={0.4} scale={6} blur={1.5} far={4} />
              </Suspense>

              <OrbitControls
                ref={controlsRef}
                autoRotate={autoRotate}
                autoRotateSpeed={2}
                enablePan={false}
                minDistance={2}
                maxDistance={8}
              />
            </Canvas>

            {/* Canvas overlay hints */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-purple-100 shadow-xs text-xs font-black text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>{shape.name[lang]}</span>
            </div>
          </div>
        </div>

        {/* Right Mathematical Info Panel */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border-2 border-purple-100 shadow-md space-y-5 text-left">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            {lang === 'bm' ? 'Maklumat Geometri' : 'Geometry Info Panel'}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <span className="text-xs font-extrabold text-purple-900">{t.faces}</span>
              <span className="text-lg font-black text-purple-600">{shape.properties.flatFaces}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-2xl border border-pink-100">
              <span className="text-xs font-extrabold text-pink-900">{t.curvedSurfaces}</span>
              <span className="text-lg font-black text-pink-600">{shape.properties.curvedSurfaces}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
              <span className="text-xs font-extrabold text-indigo-900">{t.edges}</span>
              <span className="text-lg font-black text-indigo-600">{shape.properties.edges}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-xs font-extrabold text-emerald-900">{t.vertices}</span>
              <span className="text-lg font-black text-emerald-600">{shape.properties.vertices}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 block mb-1">{t.faceShapes}:</span>
            <span className="text-xs font-extrabold text-slate-800">{shape.properties.faceShapes[lang]}</span>
          </div>

          {/* Special mathematical distinction note for curved solids */}
          {(shape.id === 'sphere' || shape.id === 'cylinder' || shape.id === 'cone') && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-medium text-amber-900 leading-relaxed">
              <strong>💡 Ketepatan Matematik:</strong> {shape.description[lang]}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
