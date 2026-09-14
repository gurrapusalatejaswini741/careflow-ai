import React from 'react';

interface TimeSlotPickerProps {
  slots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  onOpenWaitlist: (slot: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
  onOpenWaitlist
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {slots.map((slot) => {
          const isBooked = slot.includes('Booked');
          const isSelected = selectedSlot === slot;

          return (
            <button 
              key={slot}
              type="button"
              onClick={() => isBooked ? onOpenWaitlist(slot) : onSelectSlot(slot)}
              className={`py-3 px-4 rounded-2xl text-sm font-medium border text-center transition-all ${
                isBooked 
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-pointer hover:bg-amber-50 hover:text-amber-800'
                  : isSelected 
                    ? 'bg-teal-700 text-white border-teal-700 shadow-md' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-teal-500 hover:bg-teal-50/50'
              }`}
            >
              <span className="block font-semibold">{slot.replace(' (Booked)', '')}</span>
              <span className="block text-[10px] mt-0.5">
                {isBooked ? 'Full (Join Waitlist)' : 'Available'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-6 text-xs text-slate-500 pt-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-white border border-slate-300"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-teal-700"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <span>Unavailable (Waitlist)</span>
        </div>
      </div>
    </div>
  );
};
