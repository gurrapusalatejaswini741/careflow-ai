import React from 'react';
import { Hospital } from '../types/hospital';

interface HospitalCardProps {
  hospital: Hospital;
  onViewDoctors: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  onViewDoctors,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {hospital.name}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {hospital.location}
          </p>
        </div>

        <span className="text-sm font-medium text-teal-600 whitespace-nowrap">
          {hospital.distance}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700 mb-2">
          Specialties
        </p>

        <div className="flex flex-wrap gap-2">
          {hospital.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
        <span>{hospital.doctorsCount} doctors</span>
        <span>
          Next: <strong className="text-slate-900">{hospital.nextAvailable}</strong>
        </span>
      </div>

      <button
        onClick={onViewDoctors}
        className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
      >
        View Doctors
      </button>
    </div>
  );
};
