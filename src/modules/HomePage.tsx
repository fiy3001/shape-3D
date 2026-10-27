import React from 'react';
import { BaseShapeCanvas } from '../components/BaseShapeCanvas';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { Compass, FlaskConical, Trophy, Award, ArrowRight, Dices, Shapes, Sparkles } from 'lucide-react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HomePageProps {
  lang: Language;
  onNavigate: (modId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-6 md:p-12 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-yellow-300 text-xs md:text-sm font-extrabold border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span>Matematik Sekolah Rendah (Tahun 1-6)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {t.welcomeHeading}
            </h1>

            <p className="text-indigo-100 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              {t.welcomeSubheading}
            </p>

            <div className="pt-2">
              <GeoBotMascot message={t.geoBotGreeting} mood="excited" />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate('mod1')}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black text-base shadow-lg shadow-amber-400/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                {t.startExploring}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('mod2')}
                className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-extrabold text-base border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FlaskConical className="w-5 h-5" />
                {t.shapeLab}
              </button>
            </div>
          </div>

          {/* Animated 3D Hero Preview Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl">
              <div className="text-center text-xs font-bold text-white/90 mb-2 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Model 3D Interaktif (Putar Me)</span>
              </div>
              <BaseShapeCanvas shapeId="cube" height="h-64 sm:h-72" autoRotate={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Buttons Grid */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-slate-800 text-center mb-6">
          Pilih Modul Pembelajaran
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Module 1 Card */}
          <div
            onClick={() => onNavigate('mod1')}
            className="group bg-white p-6 rounded-3xl border-2 border-indigo-100 hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Modul 1</span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {t.mod1Title.split(':')[1]?.trim() || t.startExploring}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Kenali 6 bentuk asas 3D: Kubus, Kuboid, Sfera, Silinder, Kon & Piramid.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform">
              Mula Belajar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Module 2 Card */}
          <div
            onClick={() => onNavigate('mod2')}
            className="group bg-white p-6 rounded-3xl border-2 border-purple-100 hover:border-purple-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FlaskConical className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Modul 2</span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-purple-600 transition-colors">
                  {t.shapeLab}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Makmal alatan 3D! Sorot muka rata, rusuk, bucu, mod lut sinar & wireframe.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-extrabold text-purple-600 group-hover:translate-x-1 transition-transform">
              Teroka Makmal <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Module 3 Card */}
          <div
            onClick={() => onNavigate('mod3')}
            className="group bg-white p-6 rounded-3xl border-2 border-pink-100 hover:border-pink-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Dices className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">Modul 3</span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-pink-600 transition-colors">
                  {t.realWorld}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Aktiviti padanan interaktif objek harian seperti dadu, bola & tin minuman!
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-extrabold text-pink-600 group-hover:translate-x-1 transition-transform">
              Main Padanan <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Module 4 Card */}
          <div
            onClick={() => onNavigate('mod4')}
            className="group bg-white p-6 rounded-3xl border-2 border-emerald-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shapes className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Modul 4</span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {t.buildShapes}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Simulasi bentangan (nets)! Lihat bagaimana bentuk 2D melipat menjadi pepejal 3D.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-extrabold text-emerald-600 group-hover:translate-x-1 transition-transform">
              Bina Sekarang <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* Module 5 Quiz */}
          <div
            onClick={() => onNavigate('mod5')}
            className="group bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-3xl border-2 border-amber-200 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Modul 5</span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-amber-700">
                  {t.mathChallenge}
                </h3>
                <p className="text-xs text-slate-600">3 tahap kesukaran dengan petunjuk interaktif & skor!</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-amber-600 group-hover:translate-x-2 transition-transform" />
          </div>

          {/* Module 6 Achievements */}
          <div
            onClick={() => onNavigate('mod6')}
            className="group bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Modul 6</span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-700">
                  {t.myAchievements}
                </h3>
                <p className="text-xs text-slate-600">Lencana pencapaian, bintang & Sijil Pembelajaran Boleh Dicetak!</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-indigo-600 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </section>

      {/* Learning Journey Path Preview */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-indigo-100 shadow-sm">
        <h2 className="text-xl font-black text-slate-800 mb-6 text-center">
          Laluan Kembara Pembelajaran Bentuk 3D
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
          {[
            { num: '1', title: 'Kenali Bentuk', desc: 'Asas 3D', mod: 'mod1', color: 'bg-indigo-100 text-indigo-700' },
            { num: '2', title: 'Makmal 3D', desc: 'Ciri & Alatan', mod: 'mod2', color: 'bg-purple-100 text-purple-700' },
            { num: '3', title: 'Kehidupan Harian', desc: 'Padanan Objek', mod: 'mod3', color: 'bg-pink-100 text-pink-700' },
            { num: '4', title: 'Bina Bentuk', desc: 'Bentangan 2D/3D', mod: 'mod4', color: 'bg-emerald-100 text-emerald-700' },
            { num: '5', title: 'Cabaran Kuiz', desc: 'Uji Minda', mod: 'mod5', color: 'bg-amber-100 text-amber-700' },
            { num: '6', title: 'Sijil & Lencana', desc: 'Pencapaian', mod: 'mod6', color: 'bg-blue-100 text-blue-700' },
          ].map((item) => (
            <div
              key={item.num}
              onClick={() => onNavigate(item.mod)}
              className="p-3 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:bg-slate-50 transition-all cursor-pointer space-y-2"
            >
              <div className={`w-8 h-8 rounded-full ${item.color} font-black text-sm flex items-center justify-center mx-auto shadow-xs`}>
                {item.num}
              </div>
              <div className="font-extrabold text-xs text-slate-800">{item.title}</div>
              <div className="text-[10px] font-semibold text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
