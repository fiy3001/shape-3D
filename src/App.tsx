import { useState, useEffect } from 'react';
import type { Language, UserProgress } from './types';
import { HeaderNav } from './components/HeaderNav';
import { HomePage } from './modules/HomePage';
import { Module1Kenali } from './modules/Module1Kenali';
import { Module2Makmal } from './modules/Module2Makmal';
import { Module3Padanan } from './modules/Module3Padanan';
import { Module4Bina } from './modules/Module4Bina';
import { Module5Quiz } from './modules/Module5Quiz';
import { Module6Pencapaian } from './modules/Module6Pencapaian';
import { Module7Lanjutan } from './modules/Module7Lanjutan';

const LOCAL_STORAGE_KEY = '3d_shape_explorer_progress_v1';

const defaultProgress: UserProgress = {
  pupilName: '',
  completedModules: [],
  quizScores: {},
  matchingScore: 0,
  starsEarned: 0,
  visitedShapes: []
};

export function App() {
  const [lang, setLang] = useState<Language>('bm');
  const [currentModule, setCurrentModule] = useState<string>('home');
  const [targetLabShapeId, setTargetLabShapeId] = useState<string>('cube');

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback if local storage fails
    }
    return defaultProgress;
  });

  // Save progress to local storage whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore write errors
    }
  }, [progress]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'bm' ? 'en' : 'bm'));
  };

  const handleRecordVisitedShape = (shapeId: string) => {
    if (!progress.visitedShapes.includes(shapeId)) {
      setProgress((prev) => ({
        ...prev,
        visitedShapes: [...prev.visitedShapes, shapeId],
        starsEarned: prev.starsEarned + 1
      }));
    }
  };

  const handleUpdateMatchingScore = (score: number) => {
    setProgress((prev) => {
      const updatedModules = prev.completedModules.includes('mod3')
        ? prev.completedModules
        : [...prev.completedModules, 'mod3'];
      return {
        ...prev,
        matchingScore: Math.max(prev.matchingScore, score),
        completedModules: updatedModules,
        starsEarned: prev.starsEarned + 2
      };
    });
  };

  const handleUpdateQuizScore = (level: 1 | 2 | 3, score: number) => {
    setProgress((prev) => {
      const updatedModules = prev.completedModules.includes('mod5')
        ? prev.completedModules
        : [...prev.completedModules, 'mod5'];
      return {
        ...prev,
        quizScores: { ...prev.quizScores, [`level${level}`]: score },
        completedModules: updatedModules,
        starsEarned: prev.starsEarned + 3
      };
    });
  };

  const handleUpdatePupilName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      pupilName: name
    }));
  };

  const handleNavigateToModule = (modId: string) => {
    setCurrentModule(modId);

    // Track module completion
    if (['mod1', 'mod2', 'mod4', 'mod7'].includes(modId)) {
      setProgress((prev) => {
        if (!prev.completedModules.includes(modId)) {
          return {
            ...prev,
            completedModules: [...prev.completedModules, modId],
            starsEarned: prev.starsEarned + 1
          };
        }
        return prev;
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLabWithShape = (shapeId: string) => {
    setTargetLabShapeId(shapeId);
    handleNavigateToModule('mod2');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <HeaderNav
        currentModule={currentModule}
        onSelectModule={handleNavigateToModule}
        lang={lang}
        onToggleLang={toggleLanguage}
        completedCount={progress.completedModules.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentModule === 'home' && (
          <HomePage lang={lang} onNavigate={handleNavigateToModule} />
        )}

        {currentModule === 'mod1' && (
          <Module1Kenali
            lang={lang}
            onNavigateToLab={handleOpenLabWithShape}
            onRecordVisitedShape={handleRecordVisitedShape}
          />
        )}

        {currentModule === 'mod2' && (
          <Module2Makmal
            lang={lang}
            initialShapeId={targetLabShapeId}
            onRecordVisitedShape={handleRecordVisitedShape}
          />
        )}

        {currentModule === 'mod3' && (
          <Module3Padanan
            lang={lang}
            onUpdateMatchingScore={handleUpdateMatchingScore}
          />
        )}

        {currentModule === 'mod4' && <Module4Bina lang={lang} />}

        {currentModule === 'mod5' && (
          <Module5Quiz
            lang={lang}
            onUpdateQuizScore={handleUpdateQuizScore}
          />
        )}

        {currentModule === 'mod6' && (
          <Module6Pencapaian
            lang={lang}
            progress={progress}
            onUpdatePupilName={handleUpdatePupilName}
          />
        )}

        {currentModule === 'mod7' && (
          <Module7Lanjutan
            lang={lang}
            onNavigateToLab={handleOpenLabWithShape}
            onRecordVisitedShape={handleRecordVisitedShape}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-indigo-100 py-6 text-center text-xs font-semibold text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            3D Shape Explorer: Jelajah Dunia Bentuk 3D &copy; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold">
            <span>Matematik Sekolah Rendah</span>
            <span>•</span>
            <span>Tahun 1–6</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
