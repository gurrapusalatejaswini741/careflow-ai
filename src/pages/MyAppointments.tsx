import React, { useState } from 'react';
import { Appointment } from '../types/appointment';
import { AppointmentCard } from '../components/AppointmentCard';

interface MyAppointmentsProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
  onReschedule: (appointment: Appointment) => void;
}

export const MyAppointments: React.FC<MyAppointmentsProps> = ({ appointments, onCancel, onReschedule }) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  const filtered = appointments.filter((a) => a.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">Manage upcoming consultations and medical visits.</p>
        </div>
        <div className="flex space-x-1 mt-4 sm:mt-0 bg-slate-100 p-1 rounded-2xl">
          {(['Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4 text-xl">
            <i className="fa-regular fa-calendar-xmark"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No {activeTab.toLowerCase()} appointments</h3>
          <p className="text-sm text-slate-500">Book a doctor visit using CareFlow AI to see your appointments here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <AppointmentCard 
              key={app.id} 
              appointment={app} 
              onCancel={onCancel} 
              onReschedule={onReschedule} 
            />
          ))}
        </div>
      )}
    </div>
  );
};