import React, { useState } from 'react';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { MATCHING_ITEMS } from '../data/matchingData';
import { SHAPES_DATA } from '../data/shapesData';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types';
import { CheckCircle2, RotateCcw, Award } from 'lucide-react';

interface Module3Props {
  lang: Language;
  onUpdateMatchingScore: (score: number) => void;
}

export const Module3Padanan: React.FC<Module3Props> = ({
  lang,
  onUpdateMatchingScore
}) => {
  const t = TRANSLATIONS[lang];
  const basicShapes = SHAPES_DATA.filter((s) => s.category === 'basic');

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // itemId -> shapeId
  const [feedback, setFeedback] = useState<{ isCorrect?: boolean; message: string } | null>(null);

  const handleSelectItem = (itemId: string) => {
    setSelectedItem(itemId);
    setFeedback(null);
  };

  const handleSelectTargetShape = (targetShapeId: string) => {
    if (!selectedItem) {
      setFeedback({
        isCorrect: false,
        message:
          lang === 'bm'
            ? 'Sila pilih objek harian di sebelah kiri terlebih dahulu!'
            : 'Please select an everyday object on the left first!'
      });
      return;
    }

    const item = MATCHING_ITEMS.find((m) => m.id === selectedItem);
    if (!item) return;

    if (item.shapeId === targetShapeId) {
      const newPairs = { ...matchedPairs, [selectedItem]: targetShapeId };
      setMatchedPairs(newPairs);
      const score = Object.keys(newPairs).length;
      onUpdateMatchingScore(score);

      setSelectedItem(null);
      setFeedback({
        isCorrect: true,
        message:
          lang === 'bm'
            ? `Tahniah! ${item.objectName.bm} memang berbentuk ${SHAPES_DATA.find((s) => s.id === targetShapeId)?.name.bm}!`
            : `Correct! ${item.objectName.en} is indeed shaped like a ${SHAPES_DATA.find((s) => s.id === targetShapeId)?.name.en}!`
      });
    } else {
      setFeedback({
        isCorrect: false,
        message:
          lang === 'bm'
            ? `Kurang tepat. Cuba perhatikan ciri-ciri muka rata atau permukaan melengkung objek ${item.objectName.bm} sekali lagi.`
            : `Not quite right. Observe the flat faces or curved surface of ${item.objectName.en} again.`
      });
    }
  };

  const handleResetGame = () => {
    setSelectedItem(null);
    setMatchedPairs({});
    setFeedback(null);
  };

  const isComplete = Object.keys(matchedPairs).length === MATCHING_ITEMS.length;

  return (
    <div className="space-y-8 pb-12">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-yellow-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {t.mod3Title}
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-2">
            {lang === 'bm' ? 'Padanan Bentuk 3D Dalam Kehidupan' : 'Match 3D Shapes in Daily Life'}
          </h1>
          <p className="text-pink-100 text-sm md:text-base mt-1">
            {lang === 'bm'
              ? 'Padankan objek di sekeliling kita dengan bentuk 3D yang betul!'
              : 'Match everyday objects around us with their correct 3D geometric shapes!'}
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-white text-center font-black">
          <div className="text-xs uppercase tracking-wider text-pink-200">Padanan Berjaya</div>
          <div className="text-2xl">{Object.keys(matchedPairs).length} / {MATCHING_ITEMS.length}</div>
        </div>
      </div>

      <GeoBotMascot
        message={
          feedback
            ? feedback.message
            : isComplete
            ? lang === 'bm'
              ? 'Tahniah! Kamu telah berjaya memadankan semua objek harian dengan bentuk 3D yang tepat!'
              : 'Congratulations! You successfully matched all everyday objects with their 3D shapes!'
            : lang === 'bm'
            ? 'Pilih satu objek harian di sebelah kiri, kemudian tekan pada kad Bentuk 3D yang sepadan dengannya!'
            : 'Tap an everyday object on the left, then tap the matching 3D shape card on the right!'
        }
        mood={isComplete ? 'excited' : feedback?.isCorrect ? 'happy' : 'thinking'}
      />

      {/* Main Matching Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Everyday Objects List */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-md space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center justify-between">
            <span>{lang === 'bm' ? '1. Objek Harian (Sentuh untuk Pilih)' : '1. Everyday Objects (Tap to Select)'}</span>
            <span className="text-xs font-semibold text-slate-400">Pilih Objek</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MATCHING_ITEMS.map((item) => {
              const isMatched = !!matchedPairs[item.id];
              const isSelected = selectedItem === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleSelectItem(item.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 relative ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 opacity-65 cursor-not-allowed'
                      : isSelected
                      ? 'bg-pink-100 border-pink-500 shadow-md scale-105'
                      : 'bg-white border-slate-200 hover:border-pink-300 hover:bg-pink-50'
                  }`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs font-black text-slate-800">{item.objectName[lang]}</span>

                  {isMatched && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 3D Target Shapes */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-md space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center justify-between">
            <span>{lang === 'bm' ? '2. Bentuk 3D Sasaran' : '2. Target 3D Shapes'}</span>
            <span className="text-xs font-semibold text-slate-400">Padankan Di Sini</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {basicShapes.map((shape) => {
              return (
                <button
                  key={shape.id}
                  onClick={() => handleSelectTargetShape(shape.id)}
                  className="p-4 rounded-2xl border-2 border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-purple-50/50 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-xs"
                    style={{ backgroundColor: shape.color }}
                  >
                    3D
                  </div>
                  <span className="text-xs font-black text-slate-800 group-hover:text-indigo-600">
                    {shape.name[lang]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={handleResetGame}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'bm' ? 'Mula Semula Game' : 'Reset Game'}</span>
            </button>

            {isComplete && (
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <Award className="w-4 h-4" />
                <span>Padanan Selesai!</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
