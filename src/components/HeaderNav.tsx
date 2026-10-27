import React, { useState } from 'react';
import { Box, Globe, Trophy, Compass, FlaskConical, Dices, Shapes, Award, Sparkles, Menu, X } from 'lucide-react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderNavProps {
  currentModule: string;
  onSelectModule: (modId: string) => void;
  lang: Language;
  onToggleLang: () => void;
  completedCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentModule,
  onSelectModule,
  lang,
  onToggleLang,
  completedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: lang === 'bm' ? 'Utama' : 'Home', icon: Box },
    { id: 'mod1', label: t.mod1Title.split(':')[1]?.trim() || t.startExploring, icon: Compass },
    { id: 'mod2', label: t.shapeLab, icon: FlaskConical },
    { id: 'mod3', label: t.realWorld, icon: Dices },
    { id: 'mod4', label: t.buildShapes, icon: Shapes },
    { id: 'mod5', label: t.mathChallenge, icon: Trophy },
    { id: 'mod6', label: t.myAchievements, icon: Award },
    { id: 'mod7', label: t.advancedShapes, icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo & Title */}
          <div
            onClick={() => onSelectModule('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Box className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent p-0 m-0 leading-tight">
                3D Shape Explorer
              </h1>
              <p className="text-[11px] md:text-xs font-semibold text-slate-500 m-0">
                {t.siteSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher & Progress & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Progress Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-700 text-xs font-bold shadow-xs">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{completedCount}/6 Modul</span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-extrabold transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span className={lang === 'bm' ? 'text-indigo-600' : 'text-slate-400'}>BM</span>
              <span className="text-slate-300">/</span>
              <span className={lang === 'en' ? 'text-indigo-600' : 'text-slate-400'}>EN</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-indigo-50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-indigo-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectModule(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-indigo-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
