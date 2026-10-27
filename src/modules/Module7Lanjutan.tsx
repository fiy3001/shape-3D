import React, { useState } from 'react';
import { BaseShapeCanvas } from '../components/BaseShapeCanvas';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { SHAPES_DATA } from '../data/shapesData';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types';
import { Sparkles, Info, ArrowRight } from 'lucide-react';

interface Module7Props {
  lang: Language;
  onNavigateToLab: (shapeId: string) => void;
  onRecordVisitedShape?: (shapeId: string) => void;
}

export const Module7Lanjutan: React.FC<Module7Props> = ({
  lang,
  onNavigateToLab,
  onRecordVisitedShape
}) => {
  const t = TRANSLATIONS[lang];
  const advancedShapes = SHAPES_DATA.filter((s) => s.category === 'advanced');
  const [selectedShapeId, setSelectedShapeId] = useState<string>('triangular_prism');

  const selectedShape = advancedShapes.find((s) => s.id === selectedShapeId) || advancedShapes[0];

  const handleSelectShape = (shapeId: string) => {
    setSelectedShapeId(shapeId);
    if (onRecordVisitedShape) {
      onRecordVisitedShape(shapeId);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-yellow-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {t.mod7Title}
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-2">
            {lang === 'bm' ? 'Penerokaan Bentuk 3D Lanjutan' : 'Advanced 3D Shape Exploration'}
          </h1>
          <p className="text-teal-100 text-sm md:text-base mt-1">
            {lang === 'bm'
              ? 'Teroka Prisma Polygonal & Piramid Tambahan untuk murid tahap dua (Tahun 4-6).'
              : 'Explore Polygonal Prisms & Pyramids designed for upper primary pupils (Years 4-6).'}
          </p>
        </div>
      </div>

      <GeoBotMascot
        message={
          lang === 'bm'
            ? `Tahniah murid hebat! Mari pelajari sifat geometri prisma dan piramid lanjutan di sini!`
            : `Great job math superstar! Let us explore properties of advanced prisms and pyramids here!`
        }
        mood="excited"
      />

      {/* Advanced Shape Selector Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {advancedShapes.map((shape) => {
          const isSelected = shape.id === selectedShapeId;
          return (
            <button
              key={shape.id}
              onClick={() => handleSelectShape(shape.id)}
              className={`px-4 py-3 rounded-2xl font-black text-xs md:text-sm whitespace-nowrap transition-all cursor-pointer border-2 ${
                isSelected
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50'
              }`}
            >
              {shape.name[lang]}
            </button>
          );
        })}
      </div>

      {/* Selected Shape View */}
      <div className="bg-white rounded-3xl border-2 border-teal-100 p-6 md:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 3D Canvas */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800">
              {selectedShape.name[lang]} ({selectedShape.name[lang === 'bm' ? 'en' : 'bm']})
            </h3>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-600 border border-teal-100 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lanjutan</span>
            </span>
          </div>

          <BaseShapeCanvas
            shapeId={selectedShape.id}
            color={selectedShape.color}
            height="h-72 md:h-96"
          />
        </div>

        {/* Right Info */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-100">
            <h4 className="text-sm font-extrabold text-teal-900 flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-teal-600" />
              {lang === 'bm' ? 'Ciri-Ciri Utama' : 'Key Characteristics'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {selectedShape.description[lang]}
            </p>
          </div>

          {/* Properties */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
              <span className="text-[11px] font-bold text-purple-600 block">{t.faces}</span>
              <span className="text-xl font-black text-purple-950">{selectedShape.properties.flatFaces}</span>
            </div>
            <div className="p-3 bg-pink-50 rounded-xl border border-pink-100">
              <span className="text-[11px] font-bold text-pink-600 block">{t.curvedSurfaces}</span>
              <span className="text-xl font-black text-pink-950">{selectedShape.properties.curvedSurfaces}</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-[11px] font-bold text-blue-600 block">{t.edges}</span>
              <span className="text-xl font-black text-blue-950">{selectedShape.properties.edges}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-600 block">{t.vertices}</span>
              <span className="text-xl font-black text-emerald-950">{selectedShape.properties.vertices}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateToLab(selectedShape.id)}
            className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{lang === 'bm' ? `Sorot ${selectedShape.name.bm} Di Makmal` : `Highlight ${selectedShape.name.en} In Lab`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
