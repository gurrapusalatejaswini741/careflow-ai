import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-800">CareFlow AI</span>
          <span>— Right care. Right doctor. Right time — without the queue.</span>
        </div>
        <p className="text-slate-400">AI assists with care navigation only. Qualified healthcare professionals make medical decisions.</p>
      </div>
    </footer>
  );
};