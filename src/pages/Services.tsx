import React from 'react';
import { HEALTHCARE_SERVICES } from '../services/hospitalService';

interface ServicesProps {
  setCurrentTab: (tab: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Healthcare Services</h1>
        <p className="text-sm text-slate-500 mt-1">Explore specialized medical care and diagnostic services.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HEALTHCARE_SERVICES.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-lg mb-4">
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{s.category}</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">{s.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{s.description}</p>
            </div>
            <button onClick={() => setCurrentTab('doctors')} className="text-xs font-semibold text-teal-700 hover:underline text-left">
              Find Doctors <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};