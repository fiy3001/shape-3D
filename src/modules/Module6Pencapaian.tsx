import React, { useState } from 'react';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { PrintableCertificate } from '../components/PrintableCertificate';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { TRANSLATIONS } from '../data/translations';
import type { Language, UserProgress } from '../types';
import { Trophy, Star, Lock, CheckCircle2, User } from 'lucide-react';

interface Module6Props {
  lang: Language;
  progress: UserProgress;
  onUpdatePupilName: (name: string) => void;
}

export const Module6Pencapaian: React.FC<Module6Props> = ({
  lang,
  progress,
  onUpdatePupilName
}) => {
  const t = TRANSLATIONS[lang];
  const [nameInput, setNameInput] = useState(progress.pupilName || '');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePupilName(nameInput);
  };

  const unlockedCount = ACHIEVEMENTS.filter((b) => b.unlockedIf(progress)).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-yellow-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {t.mod6Title}
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-2">
            {lang === 'bm' ? 'Pencapaian & Sijil Murid' : 'Pupil Achievements & Certificate'}
          </h1>
          <p className="text-blue-100 text-sm md:text-base mt-1">
            {lang === 'bm'
              ? 'Jejak kemajuan pembelajaran, kumpul lencana khas dan cetak sijil pencapaian!'
              : 'Track learning progress, collect special badges, and print your official certificate!'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-white font-black">
          <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          <div className="text-left">
            <div className="text-[10px] uppercase text-blue-200">{t.stars}</div>
            <div className="text-xl">{progress.starsEarned} Bintang</div>
          </div>
        </div>
      </div>

      <GeoBotMascot
        message={
          lang === 'bm'
            ? `Tahniah atas usaha gigih kamu! Masukkan nama kamu di bawah untuk menjana Sijil Pencapaian rasmi!`
            : `Congratulations on your hard work! Enter your name below to generate your official Achievement Certificate!`
        }
        mood="excited"
      />

      {/* Pupil Name Setup Input */}
      <div className="bg-white p-6 rounded-3xl border-2 border-indigo-100 shadow-md">
        <form onSubmit={handleNameSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <User className="w-5 h-5 text-indigo-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={t.pupilNamePlaceholder}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            {lang === 'bm' ? 'Simpan Nama' : 'Save Name'}
          </button>
        </form>
      </div>

      {/* Stats Summary & Badges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Progress Overview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border-2 border-indigo-100 shadow-md space-y-4 text-left">
            <h3 className="text-sm font-black text-slate-800 flex items-center justify-between">
              <span>{t.progress}</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </h3>

            <div className="space-y-3 text-xs font-bold text-slate-600">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>{lang === 'bm' ? 'Modul Diselesaikan:' : 'Completed Modules:'}</span>
                <span className="text-indigo-600 font-black">{progress.completedModules.length} / 6</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>{lang === 'bm' ? 'Bentuk Diteroka:' : 'Explored Shapes:'}</span>
                <span className="text-indigo-600 font-black">{progress.visitedShapes.length} Bentuk</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span>{lang === 'bm' ? 'Skor Padanan:' : 'Matching Score:'}</span>
                <span className="text-indigo-600 font-black">{progress.matchingScore} / 12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Badges Grid */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border-2 border-indigo-100 shadow-md space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800">
              {lang === 'bm' ? 'Lencana Pencapaian Kamu' : 'Your Achievement Badges'}
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {unlockedCount} / {ACHIEVEMENTS.length} {t.badges}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((badge) => {
              const isUnlocked = badge.unlockedIf(progress);
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {badge.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-black text-slate-800">{badge.title[lang]}</h4>
                      {isUnlocked ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
                    </div>
                    <p className="text-[11px] font-medium text-slate-500 mt-1 leading-snug">
                      {badge.description[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Certificate Display */}
      <div className="max-w-3xl mx-auto pt-6">
        <PrintableCertificate pupilName={progress.pupilName} lang={lang} />
      </div>
    </div>
  );
};
