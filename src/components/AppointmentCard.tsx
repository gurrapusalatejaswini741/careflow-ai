import React from 'react';
import { Appointment } from '../types/appointment';
import { formatCurrencyINR } from '../utils/dateUtils';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: string) => void;
  onReschedule: (appointment: Appointment) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel, onReschedule }) => {
  const statusColors = {
    Upcoming: 'bg-teal-50 text-teal-700 border-teal-200',
    Completed: 'bg-slate-100 text-slate-700 border-slate-200',
    Cancelled: 'bg-red-50 text-red-600 border-red-200'
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">{appointment.id}</span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColors[appointment.status]}`}>
            {appointment.status}
          </span>
          <span className="text-xs text-slate-400">Fee: {formatCurrencyINR(appointment.fee)}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">{appointment.doctorName}</h3>
        <p className="text-xs text-slate-500"><i className="fa-regular fa-hospital mr-1 text-slate-400"></i>{appointment.hospital}</p>
        <p className="text-sm font-semibold text-teal-800 pt-1"><i className="fa-regular fa-clock mr-1"></i>{appointment.date} at {appointment.time}</p>
      </div>

      {appointment.status === 'Upcoming' && (
        <div className="flex items-center space-x-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
          <button 
            onClick={() => onReschedule(appointment)}
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Reschedule
          </button>
          <button 
            onClick={() => onCancel(appointment.id)}
            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
