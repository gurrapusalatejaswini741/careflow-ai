import React, { useState } from 'react';
import { Doctor } from '../types/doctor';
import { saveWaitlistRequest } from '../services/appointmentService';

interface WaitlistCardProps {
  doctor: Doctor;
  initialDate: string;
  onClose: () => void;
}

export const WaitlistCard: React.FC<WaitlistCardProps> = ({ doctor, initialDate, onClose }) => {
  const [patientName, setPatientName] = useState('Aarav Patel');
  const [preferredDate, setPreferredDate] = useState(initialDate);
  const [timeRange, setTimeRange] = useState('Evening (5 PM - 8 PM)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveWaitlistRequest({
      doctorId: doctor.id,
      doctorName: doctor.name,
      preferredDate,
      timeRange,
      genderPreference: doctor.gender,
      patientName
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100">
        {!submitted ? (
          <>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <i className="fa-solid fa-clock text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Join Smart Waitlist</h3>
            <p className="text-sm text-slate-500 mb-6">This slot is currently booked. We will automatically notify you if a matching slot opens up.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Doctor</label>
                <input type="text" disabled value={doctor.name} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Preferred Date</label>
                <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Full Name</label>
                <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800" />
              </div>
              <div className="flex space-x-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20">
                  Confirm Waitlist
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Added to Smart Waitlist!</h3>
            <p className="text-sm text-slate-500 mb-6">We'll alert you instantly via SMS and WhatsApp if a slot opens up with {doctor.name}.</p>
            <button onClick={onClose} className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold text-sm shadow-md">
              Got It
            </button>
          </div>
        )}
      </div>
    </div>
  );
};