import React from 'react';
import { Doctor } from '../types/doctor';
import { formatCurrencyINR } from '../utils/dateUtils';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 font-bold text-xl flex items-center justify-center shrink-0">
          {doctor.name.split(' ')[1]?.[0] || 'Dr'}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">{doctor.gender}</span>
          </div>
          <p className="text-sm text-teal-700 font-semibold">{doctor.specialty}</p>
          <p className="text-xs text-slate-500 mt-1"><i className="fa-regular fa-hospital mr-1.5 text-slate-400"></i>{doctor.hospital}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
            <span><i className="fa-solid fa-star text-amber-400 mr-1"></i>{doctor.rating} ({doctor.reviewsCount} reviews)</span>
            <span><i className="fa-solid fa-briefcase text-slate-400 mr-1"></i>{doctor.experience}</span>
            <span><i className="fa-solid fa-location-dot text-slate-400 mr-1"></i>{doctor.location}</span>
          </div>
        </div>
      </div>

      <div className="flex md:flex-col items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3">
        <div className="text-left md:text-right">
          <span className="text-xs text-slate-400 block">Next Available</span>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">{doctor.nextSlot}</span>
          <span className="text-sm font-bold text-slate-900 block mt-1">{formatCurrencyINR(doctor.fee)} <span className="text-xs text-slate-400 font-normal">/ visit</span></span>
        </div>
        <button 
          onClick={() => onBook(doctor)}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-teal-600/20 whitespace-nowrap"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};