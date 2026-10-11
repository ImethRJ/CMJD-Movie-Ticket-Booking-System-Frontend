import React from 'react';
import { Armchair, Check, X } from 'lucide-react';

interface SeatGridProps {
  bookedSeats: string[];
  selectedSeats: string[];
  onSeatToggle: (seatNumber: string) => void;
  totalCapacity?: number;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  bookedSeats = [],
  selectedSeats = [],
  onSeatToggle,
  totalCapacity = 100,
}) => {
  const seatsPerRow = 10;
  const numRows = Math.max(5, Math.ceil(totalCapacity / seatsPerRow));
  const rowLetters = Array.from({ length: numRows }, (_, i) => String.fromCharCode(65 + i));
  const halfSeats = seatsPerRow / 2;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 select-none">
      <div className="space-y-3 text-center">
        <div className="w-full max-w-xl mx-auto py-2 cinema-screen-curve bg-gradient-to-b from-rose-950/20 to-transparent">
          <span className="text-[11px] uppercase tracking-widest font-black text-rose-400">
            AUDITORIUM SCREEN
          </span>
        </div>
        <p className="text-[11px] text-slate-500 uppercase tracking-wider">All eyes this way</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium py-2.5 px-5 bg-slate-900/80 rounded-xl border border-slate-800 w-fit mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center">
            <Armchair className="w-3 h-3 text-slate-400" />
          </div>
          <span className="text-slate-300">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-rose-600 border border-rose-500 flex items-center justify-center shadow-sm">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-rose-400 font-semibold">Selected</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#131722] border border-slate-800 flex items-center justify-center opacity-60">
            <X className="w-3 h-3 text-slate-600" />
          </div>
          <span className="text-slate-500">Reserved</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[560px] flex flex-col items-center space-y-2.5">
          {rowLetters.map((rowLetter) => (
            <div key={rowLetter} className="flex items-center gap-3">
              <span className="w-5 text-xs font-mono font-bold text-slate-500 text-center uppercase">
                {rowLetter}
              </span>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: halfSeats }, (_, idx) => {
                  const seatNum = `${rowLetter}${idx + 1}`;
                  const isBooked = bookedSeats.includes(seatNum);
                  const isSelected = selectedSeats.includes(seatNum);

                  return (
                    <button
                      key={seatNum}
                      disabled={isBooked}
                      onClick={() => onSeatToggle(seatNum)}
                      title={isBooked ? `Seat ${seatNum} is booked` : `Seat ${seatNum}`}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs font-mono font-semibold flex flex-col items-center justify-center transition-all ${
                        isBooked
                          ? 'bg-[#121622] text-slate-600 border border-slate-800/80 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-rose-600 text-white border border-rose-400 shadow-md shadow-rose-950 scale-105 z-10'
                          : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:bg-slate-700 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      <Armchair className={`w-3 h-3 ${isSelected ? 'text-white' : isBooked ? 'text-slate-600' : 'text-slate-400'}`} />
                      <span className="text-[9px] leading-none mt-0.5">{seatNum}</span>
                    </button>
                  );
                })}
              </div>

              <div className="w-6 sm:w-8 text-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                •
              </div>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: halfSeats }, (_, idx) => {
                  const seatIdx = halfSeats + idx;
                  const seatNum = `${rowLetter}${seatIdx + 1}`;
                  const isBooked = bookedSeats.includes(seatNum);
                  const isSelected = selectedSeats.includes(seatNum);

                  return (
                    <button
                      key={seatNum}
                      disabled={isBooked}
                      onClick={() => onSeatToggle(seatNum)}
                      title={isBooked ? `Seat ${seatNum} is booked` : `Seat ${seatNum}`}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs font-mono font-semibold flex flex-col items-center justify-center transition-all ${
                        isBooked
                          ? 'bg-[#121622] text-slate-600 border border-slate-800/80 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-rose-600 text-white border border-rose-400 shadow-md shadow-rose-950 scale-105 z-10'
                          : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:bg-slate-700 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      <Armchair className={`w-3 h-3 ${isSelected ? 'text-white' : isBooked ? 'text-slate-600' : 'text-slate-400'}`} />
                      <span className="text-[9px] leading-none mt-0.5">{seatNum}</span>
                    </button>
                  );
                })}
              </div>

              <span className="w-5 text-xs font-mono font-bold text-slate-500 text-center uppercase">
                {rowLetter}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
