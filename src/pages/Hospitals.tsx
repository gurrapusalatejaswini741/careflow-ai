import React from 'react';
import { HOSPITALS } from '../services/hospitalService';
import { HospitalCard } from '../components/HospitalCard';

interface HospitalsProps {
  setCurrentTab: (tab: string) => void;
}

export const Hospitals: React.FC<HospitalsProps> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Nearby Hospitals & Medical Centers</h1>
        <p className="text-sm text-slate-500 mt-1">Discover verified medical facilities, distances, and available specialties.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HOSPITALS.map((h) => (
          <HospitalCard key={h.id} hospital={h} onViewDoctors={() => setCurrentTab('doctors')} />
        ))}
      </div>
    </div>
  );
};