import React, { useEffect, useState } from 'react';
import { theatreService } from '../api/theatreService';
import type { Theatre } from '../types';
import { Building2, MapPin, Users, Check, X } from 'lucide-react';

export const TheatresPage: React.FC = () => {
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      setLoading(true);
      const data = await theatreService.getAllTheatres();
      setTheatres(data);
    } catch (err: any) {
      console.error(err);
      setError('Unable to retrieve theatre locations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Building2 className="w-8 h-8 text-rose-500" /> Cinema Multiplexes & Halls
        </h1>
        <p className="text-xs text-slate-400">
          Partnered cinema auditoriums across Colombo, Kandy, and Galle
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center">
          {error}
        </div>
      ) : theatres.length === 0 ? (
        <div className="py-16 text-center text-slate-400 space-y-2 bg-[#0e1422] rounded-3xl border border-slate-800">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-base font-semibold text-white">No theatres currently registered</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theatres.map((theatre) => (
            <div
              key={theatre.id}
              className="bg-[#0e1422] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-rose-500">
                    <Building2 className="w-6 h-6" />
                  </div>

                  <span
                    className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 border uppercase tracking-wider ${
                      theatre.status === 'ACTIVE'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {theatre.status === 'ACTIVE' ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Operational
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5" /> Closed for Maintenance
                      </>
                    )}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">{theatre.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    {theatre.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">DOLBY ATMOS</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">LASER 4K</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">RECLINER SEATS</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <Users className="w-4 h-4 text-slate-500" /> Seating Capacity
                </span>
                <span className="font-black text-white text-base font-mono">
                  {theatre.capacity} Seats
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
