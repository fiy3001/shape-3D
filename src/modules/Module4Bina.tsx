import React, { useState } from 'react';
import { NetFoldingCanvas } from '../components/NetFoldingCanvas';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types';
import { Play, RotateCcw, Shapes, Info } from 'lucide-react';

interface Module4Props {
  lang: Language;
}

export const Module4Bina: React.FC<Module4Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [selectedNetType, setSelectedNetType] = useState<'cube' | 'cuboid' | 'squarePyramid'>('cube');
  const [foldProgress, setFoldProgress] = useState<number>(0); // 0 (flat 2D net) to 1 (folded 3D solid)

  const handleFoldToggle = () => {
    if (foldProgress > 0.5) {
      setFoldProgress(0);
    } else {
      setFoldProgress(1);
    }
  };

  const getNetExplanation = () => {
    if (selectedNetType === 'cube') {
      return lang === 'bm'
        ? 'Bentangan Kubus terdiri daripada 6 muka segi empat sama yang kongruen. Apabila dilipat pada setiap sempadan rusuk 90 darjah, ia membentuk satu kubus 3D.'
        : 'A Cube Net consists of 6 identical square faces. When folded along edge boundaries by 90 degrees, it forms a 3D solid cube.';
    }
    if (selectedNetType === 'squarePyramid') {
      return lang === 'bm'
        ? 'Bentangan Piramid Tapak Segi Empat terdiri daripada 1 segi empat sama di tengah dan 4 segi tiga di sisi. Muka segi tiga melipat ke atas untuk bertemu di satu puncak.'
        : 'A Square Pyramid Net consists of 1 center square base and 4 surrounding triangles. The triangular faces fold upwards to meet at a single apex.';
    }
    return lang === 'bm'
      ? 'Bentangan Kuboid terdiri daripada 6 muka segi empat tepat. Muka-muka yang bertentangan adalah bersaiz sama.'
      : 'A Cuboid Net consists of 6 rectangular faces. Opposite faces are identical in size.';
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-yellow-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {t.mod4Title}
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-2">
            {lang === 'bm' ? 'Bina & Lipat Bentuk 3D (Bentangan)' : 'Build & Fold 3D Shapes (Nets)'}
          </h1>
          <p className="text-emerald-100 text-sm md:text-base mt-1">
            {lang === 'bm'
              ? 'Teroka bagaimana rajah 2D (bentangan) dilipat untuk membentuk objek tiga dimensi!'
              : 'Explore how 2D flat nets fold along boundaries to construct three-dimensional solids!'}
          </p>
        </div>
      </div>

      <GeoBotMascot
        message={
          foldProgress === 1
            ? lang === 'bm'
              ? 'Hebat! Bentangan 2D telah siap dilipat menjadi objek 3D yang lengkap.'
              : 'Awesome! The 2D net has folded into a complete 3D solid.'
            : foldProgress > 0
            ? lang === 'bm'
              ? 'Perhatikan bagaimana muka-muka bersambung semasa proses lipatan!'
              : 'Observe how faces connect together during the folding process!'
            : lang === 'bm'
            ? 'Ini ialah bentangan 2D rata. Tekan butang "Lipat Menjadi Bentuk 3D" atau guna slider untuk melipatnya!'
            : 'This is a flat 2D net layout. Click "Fold into 3D Solid" or drag the slider to fold it!'
        }
        mood={foldProgress === 1 ? 'excited' : 'happy'}
      />

      {/* Net Selector Tabs */}
      <div className="flex items-center justify-center gap-3">
        {[
          { id: 'cube', label: lang === 'bm' ? 'Kubus' : 'Cube' },
          { id: 'cuboid', label: lang === 'bm' ? 'Kuboid' : 'Cuboid' },
          { id: 'squarePyramid', label: lang === 'bm' ? 'Piramid Segi Empat' : 'Square Pyramid' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedNetType(tab.id as any);
              setFoldProgress(0);
            }}
            className={`px-5 py-3 rounded-2xl font-black text-xs md:text-sm transition-all cursor-pointer border-2 ${
              selectedNetType === tab.id
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Visualizer & Folding Controls */}
      <div className="bg-white rounded-3xl border-2 border-emerald-100 p-6 md:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Net Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>{foldProgress === 0 ? 'Rajah 2D Rata (Bentangan)' : foldProgress === 1 ? 'Pepejal 3D Lengkap' : 'Proses Lipatan'}</span>
            <span className="text-emerald-600 font-black">{Math.round(foldProgress * 100)}% Lipatan</span>
          </div>

          <NetFoldingCanvas netType={selectedNetType} foldProgress={foldProgress} />

          {/* Interactive Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-extrabold text-slate-600">
              <span>2D Net (Rata)</span>
              <span>3D Object (Terlipat)</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={foldProgress}
              onChange={(e) => setFoldProgress(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Info & Folding Actions */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 space-y-3">
            <h4 className="text-sm font-black text-emerald-900 flex items-center gap-2">
              <Shapes className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bm' ? 'Hubungan 2D dan 3D' : '2D to 3D Relationship'}</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              {getNetExplanation()}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleFoldToggle}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                foldProgress > 0.5
                  ? 'bg-slate-800 text-white hover:bg-slate-900'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/30'
              }`}
            >
              {foldProgress > 0.5 ? (
                <>
                  <RotateCcw className="w-5 h-5" />
                  <span>{t.unfoldToNet}</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>{t.foldTo3D}</span>
                </>
              )}
            </button>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 font-medium leading-normal flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                {lang === 'bm'
                  ? 'Tekan butang di atas atau gunakan pemutar Orbit untuk melihat lipatan dari pelbagai sudut!'
                  : 'Click the button above or use orbit controls to view the folding from any angle!'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
