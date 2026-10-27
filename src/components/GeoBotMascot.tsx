import React from 'react';
import { Bot, Sparkles, MessageCircle } from 'lucide-react';

interface GeoBotMascotProps {
  message: string;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'excited' | 'thinking';
  className?: string;
}

export const GeoBotMascot: React.FC<GeoBotMascotProps> = ({
  message,
  size = 'md',
  mood = 'happy',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 md:w-20 md:h-20',
    lg: 'w-24 h-24 md:w-28 md:h-28'
  };

  return (
    <div className={`flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-indigo-200/80 shadow-md ${className}`}>
      {/* GeoBot Mascot Avatar */}
      <div className="relative shrink-0">
        <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg animate-float`}>
          <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center p-2 relative overflow-hidden">
            {/* Robot Head Decor */}
            <div className="w-4 h-1 bg-indigo-500 rounded-full mb-1"></div>
            {/* Eyes */}
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-3 h-3 rounded-full bg-indigo-600 ${mood === 'excited' ? 'animate-ping' : ''}`}></div>
              <div className={`w-3 h-3 rounded-full bg-indigo-600 ${mood === 'excited' ? 'animate-ping' : ''}`}></div>
            </div>
            {/* Mouth */}
            <div className="w-5 h-1.5 bg-purple-500 rounded-full"></div>
            {/* Sparkle badge */}
            <Sparkles className="w-3 h-3 text-amber-400 absolute top-1 right-1" />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-1 text-[10px] font-extrabold shadow">
          PRO
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-extrabold text-indigo-900 text-sm md:text-base flex items-center gap-1">
            <Bot className="w-4 h-4 text-indigo-600 inline" /> GeoBot
          </span>
          <span className="text-[11px] font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
            Pembantu Pembelajaran 3D
          </span>
        </div>
        <div className="relative bg-white p-3 md:p-4 rounded-2xl rounded-tl-none border border-indigo-100 shadow-sm text-slate-700 text-sm md:text-base leading-relaxed">
          <MessageCircle className="w-4 h-4 text-indigo-300 absolute -left-2 top-3 -scale-x-100 hidden md:block" />
          {message}
        </div>
      </div>
    </div>
  );
};
