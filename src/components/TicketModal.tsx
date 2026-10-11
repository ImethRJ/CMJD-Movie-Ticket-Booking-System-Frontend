import React from 'react';
import type { Booking } from '../types';
import { getMoviePoster } from '../utils/moviePosters';
import { Calendar, Clock, MapPin, Check, AlertCircle, X, QrCode, Printer } from 'lucide-react';

interface TicketModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const getStatusBadge = () => {
    switch (booking.status) {
      case 'CONFIRMED':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold uppercase">
            <Check className="w-3.5 h-3.5" /> Confirmed & Issued
          </div>
        );
      case 'PENDING':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase">
            <AlertCircle className="w-3.5 h-3.5" /> Payment Required
          </div>
        );
      case 'CANCELLED':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] font-bold uppercase">
            <X className="w-3.5 h-3.5" /> Void / Cancelled
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0e1422] rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition z-20 border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-slate-900 p-6 border-b border-slate-800 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-xs">
              CT
            </div>
            <span className="text-sm font-black tracking-widest text-white">
              CINE<span className="text-rose-500">TICKETS</span> LK
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold block">
            ELECTRONIC ENTRY ADMISSION PASS
          </span>
          <div className="mt-3 flex justify-center">
            {getStatusBadge()}
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex gap-4 items-start">
            <img
              src={getMoviePoster(booking.show.movie.title, booking.show.movie.posterUrl)}
              alt={booking.show.movie.title}
              className="w-20 h-28 rounded-xl object-cover border border-slate-800 shrink-0"
            />
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                {booking.show.movie.genre}
              </span>
              <h4 className="text-lg font-black text-white leading-tight">
                {booking.show.movie.title}
              </h4>
              <p className="text-[11px] text-slate-400">
                {booking.show.movie.language} • {booking.show.movie.duration} mins
              </p>
              <div className="pt-1 text-[11px] font-mono text-slate-300">
                REF #{booking.id.toString().padStart(6, '0')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" /> Theatre
              </span>
              <div className="font-bold text-white text-xs">{booking.show.theatre.name}</div>
              <div className="text-slate-400 text-[10px]">{booking.show.theatre.location}</div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" /> Date & Time
              </span>
              <div className="font-bold text-white text-xs">{booking.show.showDate}</div>
              <div className="text-rose-400 font-bold text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> {booking.show.showTime}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Allocated Seats ({booking.numberOfTickets} Admissions)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {booking.seatNumbers.map((seat) => (
                <span
                  key={seat}
                  className="px-2.5 py-1 rounded-md bg-rose-600/20 border border-rose-500/40 text-rose-300 font-mono font-black text-xs"
                >
                  Seat {seat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t-2 border-dashed border-slate-800 px-6 py-5 bg-[#0b0f19] flex items-center justify-between">
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-slate-950 border-r border-slate-700"></div>
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-slate-950 border-l border-slate-700"></div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Paid</span>
            <span className="text-xl font-black text-white font-mono">
              LKR {booking.totalAmount.toLocaleString()}
            </span>
            <span className="text-[9px] text-emerald-400 block font-mono">Tax & Fee Inclusive</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <QrCode className="w-12 h-12 text-black" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[10px] font-mono">Scan QR at cinema turnstile</span>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print E-Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
