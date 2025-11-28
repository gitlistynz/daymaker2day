import React, { useState } from 'react';
import { TIME_SLOTS } from '../constants';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';

interface BookingCalendarProps {
  onConfirm: (date: Date, time: string) => void;
  onBack: () => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onConfirm, onBack }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));

  return (
    <div className="w-full animate-fadeIn">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          {/* Mobile: Stacked layout, Desktop: Grid */}
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-12">
            
            {/* Date Selection */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CalendarIcon className="text-neon-blue text-2xl" />
                <h3 className="text-xl md:text-2xl font-orbitron text-white">📅 DATE</h3>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-2 gap-2 md:gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {dates.map((date) => (
                  <button
                    key={date.toString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 md:p-4 rounded-xl text-center border transition-all duration-300 text-sm md:text-base ${
                      isSameDay(date, selectedDate)
                        ? 'bg-neon-blue/20 border-neon-blue text-white shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs uppercase font-bold mb-1 opacity-70">{format(date, 'EEE')}</div>
                    <div className="text-lg md:text-xl font-orbitron">{format(date, 'd')}</div>
                    <div className="text-xs opacity-50">{format(date, 'MMM')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="md:border-l md:border-white/10 md:pl-12 pt-0">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-neon-purple text-2xl" />
                <h3 className="text-xl md:text-2xl font-orbitron text-white">⏰ TIME</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2 md:gap-3">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 md:py-4 px-3 md:px-4 rounded-lg text-xs md:text-sm font-mono border transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-neon-purple/20 border-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.3)]'
                        : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-400 mb-4">
                    <span>Duration</span>
                    <span className="text-white font-bold">25 Minutes</span>
                </div>
                <button
                    disabled={!selectedTime}
                    onClick={() => selectedTime && onConfirm(selectedDate, selectedTime)}
                    className="w-full py-4 md:py-5 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-base md:text-lg tracking-widest rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,243,255,0.3)] active:scale-95"
                >
                    ✅ CONFIRM SLOT
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};