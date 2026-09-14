import React from 'react';

interface CalendarPickerProps {
  availableDates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  availableDates,
  selectedDate,
  onSelectDate
}) => {
  return (
    <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
      {availableDates.map((dateStr) => {
        const isSelected = selectedDate === dateStr;
        const d = new Date(dateStr);
        const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
        const monthDay = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

        return (
          <button 
            key={dateStr}
            type="button"
            onClick={() => onSelectDate(dateStr)}
            className={`px-5 py-3 rounded-2xl border text-center shrink-0 transition-all ${
              isSelected 
                ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block text-xs uppercase font-medium opacity-80">{dayName}</span>
            <span className="block text-sm font-bold">{monthDay}</span>
          </button>
        );
      })}
    </div>
  );
};