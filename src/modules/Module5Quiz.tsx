import React, { useState, useMemo } from 'react';
import { BaseShapeCanvas } from '../components/BaseShapeCanvas';
import { GeoBotMascot } from '../components/GeoBotMascot';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types';
import { Trophy, HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Module5Props {
  lang: Language;
  onUpdateQuizScore: (level: 1 | 2 | 3, score: number) => void;
}

export const Module5Quiz: React.FC<Module5Props> = ({ lang, onUpdateQuizScore }) => {
  const t = TRANSLATIONS[lang];

  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const filteredQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => q.level === level);
  }, [level]);

  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionIndex === currentQ.correctAnswerIndex;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      onUpdateQuizScore(level, newScore);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = (newLevel?: 1 | 2 | 3) => {
    if (newLevel) setLevel(newLevel);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getMascotMessage = () => {
    if (quizFinished) {
      return lang === 'bm'
        ? `Hebat sekali! Kamu mendapat skor ${score}/${filteredQuestions.length} dalam ${
            level === 1 ? 'Tahap 1 Asas' : level === 2 ? 'Tahap 2 Sederhana' : 'Tahap 3 Lanjutan'
          }!`
        : `Awesome job! You scored ${score}/${filteredQuestions.length} in ${
            level === 1 ? 'Level 1 Beginner' : level === 2 ? 'Level 2 Intermediate' : 'Level 3 Advanced'
          }!`;
    }

    if (isAnswerSubmitted) {
      const isCorrect = selectedOptionIndex === currentQ.correctAnswerIndex;
      if (isCorrect) {
        return lang === 'bm'
          ? `Jawapan kamu tepat! ${currentQ.explanation.bm}`
          : `Correct! ${currentQ.explanation.en}`;
      } else {
        return lang === 'bm'
          ? `Kurang tepat. ${currentQ.explanation.bm}`
          : `Incorrect. ${currentQ.explanation.en}`;
      }
    }

    if (showHint) {
      return `${lang === 'bm' ? 'Petunjuk:' : 'Hint:'} ${currentQ.hint[lang]}`;
    }

    return lang === 'bm'
      ? `Baca soalan dengan teliti. Kamu boleh menggunakan model 3D di skrin jika ada!`
      : `Read the question carefully. You can use the interactive 3D model on screen!`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-yellow-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {t.mod5Title}
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-2">
            {lang === 'bm' ? 'Cabaran Matematik Bentuk 3D' : '3D Shape Math Challenge'}
          </h1>
          <p className="text-amber-100 text-sm md:text-base mt-1">
            {lang === 'bm'
              ? 'Uji kefahaman dan ingatan kamu dengan kuiz interaktif 3 tahap kesukaran!'
              : 'Test your understanding with a 3-level difficulty interactive quiz!'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-white font-black">
          <Trophy className="w-6 h-6 text-yellow-300" />
          <div className="text-left">
            <div className="text-[10px] uppercase text-amber-200">Skor Sesi</div>
            <div className="text-xl">{score} Matlamat</div>
          </div>
        </div>
      </div>

      <GeoBotMascot message={getMascotMessage()} mood={quizFinished ? 'excited' : 'happy'} />

      {/* Level Selector Tabs */}
      <div className="flex items-center justify-center gap-3">
        {[
          { lvl: 1, label: t.beginnerLevel },
          { lvl: 2, label: t.intermediateLevel },
          { lvl: 3, label: t.advancedLevel },
        ].map((item) => (
          <button
            key={item.lvl}
            onClick={() => handleRestartQuiz(item.lvl as 1 | 2 | 3)}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all cursor-pointer border-2 ${
              level === item.lvl
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Quiz Body */}
      {!quizFinished ? (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-6 md:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Question & Interactive 3D Model */}
          <div className="lg:col-span-6 space-y-5 text-left">
            {/* Question Header & Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>
                  {t.question} {currentQuestionIndex + 1} / {filteredQuestions.length}
                </span>
                <span className="text-amber-600 font-black">
                  {Math.round(((currentQuestionIndex + 1) / filteredQuestions.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-black text-slate-800 leading-snug">
              {currentQ.question[lang]}
            </h3>

            {/* Interactive 3D Question Model (if provided) */}
            {currentQ.shapeId && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">
                  💡 {lang === 'bm' ? 'Putarkan model ini untuk mengira bucu/rusuk!' : 'Rotate model to count vertices/edges!'}
                </span>
                <BaseShapeCanvas shapeId={currentQ.shapeId} height="h-60" />
              </div>
            )}
          </div>

          {/* Right Multiple Choice Options */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              {lang === 'bm' ? 'Pilih Jawapan Yang Betul:' : 'Select The Correct Answer:'}
            </h4>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrectIndex = idx === currentQ.correctAnswerIndex;

                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50';

                if (isAnswerSubmitted) {
                  if (isCorrectIndex) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-extrabold';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-100 border-amber-500 text-amber-950 font-extrabold shadow-sm';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-black text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{option[lang]}</span>
                    {isAnswerSubmitted && isCorrectIndex && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isAnswerSubmitted && isSelected && !isCorrectIndex && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setShowHint(true)}
                disabled={showHint || isAnswerSubmitted}
                className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>{t.getHint}</span>
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptionIndex === null}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs md:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {lang === 'bm' ? 'Hantar Jawapan' : 'Submit Answer'}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs md:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.nextQuestion}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Quiz Finished View */
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-8 text-center space-y-6 shadow-xl max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-800">{t.quizComplete}</h2>
            <p className="text-slate-500 text-sm mt-1">
              {lang === 'bm' ? 'Kamu telah menyelesaikan semua soalan dalam tahap ini.' : 'You have completed all questions in this level.'}
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-xs font-bold text-amber-700 block uppercase tracking-wider">Skor Akhir</span>
            <span className="text-4xl font-black text-amber-950">
              {score} / {filteredQuestions.length}
            </span>
          </div>

          <button
            onClick={() => handleRestartQuiz()}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t.retryQuiz}</span>
          </button>
        </div>
      )}
    </div>
  );
};
