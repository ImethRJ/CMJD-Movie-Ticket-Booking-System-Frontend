import React from 'react';
import { Film, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080b13] border-t border-slate-900 mt-20 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-950">
                <Film className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                CINE<span className="text-rose-500">TICKETS</span> LK
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sri Lanka's premier online movie ticket booking platform. Reserve your preferred seats in advance with instant digital admissions and secure online checkout.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>+94 11 234 5678 (24/7 Care)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>support@cinetickets.lk</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Cinema Multiplexes</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Colombo City Centre (Screen 1 & 2)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Liberty Cineplex, Kollupitiya</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Majestic Cineplex, Bambalapitiya</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Kandy City Centre Multiplex</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Galle Fort Cinema Hall</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/movies" className="hover:text-rose-400 transition">Now Showing Movies</Link></li>
              <li><Link to="/shows" className="hover:text-rose-400 transition">Daily Showtime Schedule</Link></li>
              <li><Link to="/theatres" className="hover:text-rose-400 transition">Cinema Theatres & Halls</Link></li>
              <li><Link to="/my-bookings" className="hover:text-rose-400 transition">My Ticket Bookings</Link></li>
              <li><Link to="/login" className="hover:text-rose-400 transition">Account Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Security & Quality</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified SSL Payment Gateway</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Accepted: Visa, MasterCard, Sampath Vishwa, Commercial Bank Direct Pay, Genie, and FriMi QR.
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">DOLBY ATMOS</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">IMAX LASER</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">4K REALD 3D</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CINETICKETS LK • Assignment 01 Movie Ticket Booking System</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>IJSE CMJD Coursework</span>
            <span>•</span>
            <span>Spring Boot 3.3.4 REST & React 18</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
