import React, { useState } from 'react';
import { BaseShapeCanvas } from '../components/BaseShapeCanvas';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { SHAPES_DATA } from '../data/shapesData';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types';
import { CheckCircle2, Info, ArrowRight } from 'lucide-react';

interface Module1Props {
  lang: Language;
  onNavigateToLab: (shapeId: string) => void;
  onRecordVisitedShape?: (shapeId: string) => void;
}

export const Module1Kenali: React.FC<Module1Props> = ({
  lang,
  onNavigateToLab,
  onRecordVisitedShape
}) => {
  const t = TRANSLATIONS[lang];
  const basicShapes = SHAPES_DATA.filter((s) => s.category === 'basic');
  const [selectedShapeId, setSelectedShapeId] = useState<string>('cube');

  const selectedShape = basicShapes.find((s) => s.id === selectedShapeId) || basicShapes[0];

  const handleSelectShape = (shapeId: string) => {
    setSelectedShapeId(shapeId);
    if (onRecordVisitedShape) {
      onRecordVisitedShape(shapeId);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-white/20 text-yellow-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {t.mod1Title}
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-2 text-white">
            {lang === 'bm' ? 'Kenali Bentuk-Bentuk 3D' : 'Learn 3D Shapes'}
          </h1>
          <p className="text-indigo-100 text-sm md:text-base mt-1">
            {lang === 'bm'
              ? 'Teroka 6 bentuk utama tiga dimensi, ciri-ciri khas dan contoh objek sekeliling kamu.'
              : 'Explore the 6 main three-dimensional shapes, their special properties, and real-world examples.'}
          </p>
        </div>
      </div>

      <GeoBotMascot
        message={
          lang === 'bm'
            ? `Pilih sebarang bentuk di bawah untuk melihat model 3D dan ciri-cirinya! Kamu boleh putar dan zum model tersebut.`
            : `Select any shape below to see its interactive 3D model and properties! You can rotate and zoom the model.`
        }
      />

      {/* Shape Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {basicShapes.map((shape) => {
          const isSelected = shape.id === selectedShapeId;
          return (
            <button
              key={shape.id}
              onClick={() => handleSelectShape(shape.id)}
              className={`p-3 rounded-2xl font-black text-xs md:text-sm border-2 transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <span>{shape.name[lang]}</span>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
            </button>
          );
        })}
      </div>

      {/* Selected Shape Interactive Detail View */}
      <div className="bg-white rounded-3xl border-2 border-indigo-100 p-6 md:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 3D Canvas */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800">
              {selectedShape.name[lang]} ({selectedShape.name[lang === 'bm' ? 'en' : 'bm']})
            </h3>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              Model 3D
            </span>
          </div>

          <BaseShapeCanvas
            shapeId={selectedShape.id}
            color={selectedShape.color}
            height="h-72 md:h-96"
          />

          <div className="text-center text-xs font-semibold text-slate-500">
            💡 {lang === 'bm' ? 'Gunakan tetikus/sentuhan untuk memutar & membesar objek 3D' : 'Use mouse/touch to rotate & zoom 3D model'}
          </div>
        </div>

        {/* Right Info Details */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100">
            <h4 className="text-sm font-extrabold text-indigo-900 flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-indigo-600" />
              {lang === 'bm' ? 'Penerangan Bentuk' : 'Shape Description'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {selectedShape.description[lang]}
            </p>
          </div>

          {/* Properties Grid */}
          <div>
            <h4 className="text-sm font-black text-slate-800 mb-3">
              {lang === 'bm' ? 'Ciri-Ciri Geometri 3D:' : '3D Geometry Properties:'}
            </h4>
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
          </div>

          {/* Face Shapes */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-600 block">{t.faceShapes}:</span>
            <span className="font-extrabold text-slate-800 text-sm">{selectedShape.properties.faceShapes[lang]}</span>
          </div>

          {/* Real World Examples */}
          <div>
            <h4 className="text-sm font-black text-slate-800 mb-2">{t.everydayExamples}:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedShape.realWorldExamples.map((ex) => (
                <div key={ex.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 shadow-2xs">
                  <span className="text-base">{ex.icon}</span>
                  <span>{ex.name[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Button to Launch Lab with this shape */}
          <button
            onClick={() => onNavigateToLab(selectedShape.id)}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{lang === 'bm' ? `Buka ${selectedShape.name.bm} Dalam Makmal 3D` : `Open ${selectedShape.name.en} In 3D Lab`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
