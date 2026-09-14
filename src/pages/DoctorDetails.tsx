import React, { useState } from 'react';
import { Doctor } from '../types/doctor';
import { CalendarPicker } from '../components/CalendarPicker';
import { TimeSlotPicker } from '../components/TimeSlotPicker';
import { WaitlistCard } from '../components/WaitlistCard';
import { formatCurrencyINR } from '../utils/dateUtils';

interface DoctorDetailsProps {
  doctor: Doctor;
  onBack: () => void;
  onProceedBooking: (doctor: Doctor, date: string, slot: string) => void;
}

export const DoctorDetails: React.FC<DoctorDetailsProps> = ({ doctor, onBack, onProceedBooking }) => {
  const [selectedDate, setSelectedDate] = useState<string>(doctor.availableDates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showWaitlist, setShowWaitlist] = useState<boolean>(false);

  const currentSlots = doctor.slots[selectedDate] || ['9:00 AM', '10:30 AM', '2:00 PM', '4:00 PM', '5:30 PM (Booked)'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-700 mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i> Back to Doctors
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-teal-100 text-teal-800 font-bold text-2xl flex items-center justify-center shrink-0">
                {doctor.name.split(' ')[1]?.[0] || 'Dr'}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{doctor.name}</h1>
                <p className="text-sm font-semibold text-teal-700">{doctor.specialty}</p>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">{doctor.gender}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Hospital</span>
                <span className="font-medium text-slate-800 text-right">{doctor.hospital}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Experience</span>
                <span className="font-medium text-slate-800">{doctor.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rating</span>
                <span className="font-medium text-slate-800"><i className="fa-solid fa-star text-amber-400 mr-1"></i>{doctor.rating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Consultation Fee</span>
                <span className="font-bold text-teal-700">{formatCurrencyINR(doctor.fee)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About Doctor</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{doctor.about}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Select Date & Appointment Slot</h3>

            <CalendarPicker 
              availableDates={doctor.availableDates} 
              selectedDate={selectedDate} 
              onSelectDate={(d) => { setSelectedDate(d); setSelectedSlot(null); }} 
            />

            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Available Time Slots for {selectedDate}</h4>
            
            <TimeSlotPicker 
              slots={currentSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
              onOpenWaitlist={() => setShowWaitlist(true)}
            />

            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-8">
              <div>
                <span className="text-xs text-slate-400 block">Selected Slot</span>
                <span className="text-base font-bold text-slate-900">
                  {selectedSlot ? `${selectedDate} at ${selectedSlot}` : 'Please select a slot above'}
                </span>
              </div>
              <button 
                disabled={!selectedSlot}
                onClick={() => selectedSlot && onProceedBooking(doctor, selectedDate, selectedSlot)}
                className={`px-8 py-3 rounded-xl font-semibold text-sm text-white shadow-md transition-all ${!selectedSlot ? 'bg-slate-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/25'}`}
              >
                Proceed to Book <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showWaitlist && (
        <WaitlistCard 
          doctor={doctor} 
          initialDate={selectedDate} 
          onClose={() => setShowWaitlist(false)} 
        />
      )}
    </div>
  );
};