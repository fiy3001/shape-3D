import React, { useRef } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Award, CheckCircle2, Box, Sparkles, Printer } from 'lucide-react';

interface PrintableCertificateProps {
  pupilName: string;
  lang: Language;
  completionDate?: string;
}

export const PrintableCertificate: React.FC<PrintableCertificateProps> = ({
  pupilName,
  lang,
  completionDate = new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })
}) => {
  const t = TRANSLATIONS[lang];
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Printable Area */}
      <div
        ref={printRef}
        id="certificate-print-area"
        className="bg-gradient-to-b from-amber-50 via-white to-amber-50/50 p-8 md:p-12 rounded-3xl border-8 border-double border-amber-300 shadow-xl relative overflow-hidden text-center space-y-6"
      >
        {/* Ornate Corner Decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-400"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-400"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-400"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-400"></div>

        {/* Top Header */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Box className="w-7 h-7" />
          </div>
          <span className="font-black text-xl text-indigo-950 uppercase tracking-widest">
            3D SHAPE EXPLORER
          </span>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-black text-amber-800 tracking-tight uppercase">
            {t.certificateTitle}
          </h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            {lang === 'bm' ? 'Perakuan Kecemerlangan Geometri 3D' : '3D Geometry Excellence Certification'}
          </p>
        </div>

        <div className="py-2">
          <p className="text-xs text-slate-600 font-semibold">{t.certificateBody}</p>
          <div className="mt-4 inline-block px-8 py-2 border-b-2 border-amber-400">
            <h2 className="text-2xl md:text-3xl font-black text-indigo-900 capitalize">
              {pupilName || (lang === 'bm' ? '[ Nama Murid ]' : '[ Pupil Name ]')}
            </h2>
          </div>
        </div>

        {/* Badge Seal */}
        <div className="flex items-center justify-center gap-2 text-amber-600">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <Award className="w-12 h-12 text-amber-500 animate-pulse" />
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>

        {/* Footer Details */}
        <div className="pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-slate-600 gap-4">
          <div>
            <span className="block text-slate-400 text-[10px] uppercase">Tarikh Kelulusan</span>
            <span>{completionDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-600 font-black">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t.certifiedBy}</span>
          </div>
        </div>
      </div>

      {/* Print Trigger Button */}
      <button
        onClick={handlePrint}
        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
      >
        <Printer className="w-5 h-5" />
        <span>{t.generateCertificate}</span>
      </button>
    </div>
  );
};
