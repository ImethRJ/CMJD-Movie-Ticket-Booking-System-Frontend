import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showService } from '../api/showService';
import { movieService } from '../api/movieService';
import { theatreService } from '../api/theatreService';
import type { Show, Movie, Theatre } from '../types';
import { getMoviePoster } from '../utils/moviePosters';
import { Calendar, Clock, MapPin, Ticket, Building2, Film } from 'lucide-react';

export const ShowsPage: React.FC = () => {
  const navigate = useNavigate();

  const [shows, setShows] = useState<Show[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMovieId, setSelectedMovieId] = useState<string>('ALL');
  const [selectedTheatreId, setSelectedTheatreId] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [showsData, moviesData, theatresData] = await Promise.all([
        showService.getAllShows(),
        movieService.getAllMovies(),
        theatreService.getAllTheatres(),
      ]);
      setShows(showsData);
      setMovies(moviesData);
      setTheatres(theatresData);
    } catch (err: any) {
      console.error(err);
      setError('Unable to retrieve showtime schedules');
    } finally {
      setLoading(false);
    }
  };

  const filteredShows = shows.filter((show) => {
    const matchesMovie = selectedMovieId === 'ALL' || show.movie.id.toString() === selectedMovieId;
    const matchesTheatre = selectedTheatreId === 'ALL' || show.theatre.id.toString() === selectedTheatreId;
    const matchesDate = !selectedDate || show.showDate === selectedDate;
    return matchesMovie && matchesTheatre && matchesDate;
  });

  return (
    <div className="space-y-8 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Calendar className="w-8 h-8 text-rose-500" /> Showtime Schedule
        </h1>
        <p className="text-xs text-slate-400">
          Daily cinema showtimes across all partnered theatres
        </p>
      </div>

      <div className="bg-[#0e1422] p-5 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-rose-400" /> Select Movie
          </label>
          <select
            value={selectedMovieId}
            onChange={(e) => setSelectedMovieId(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
          >
            <option value="ALL">All Movies</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id.toString()}>
                {m.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" /> Select Theatre
          </label>
          <select
            value={selectedTheatreId}
            onChange={(e) => setSelectedTheatreId(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
          >
            <option value="ALL">All Theatres</option>
            {theatres.map((t) => (
              <option key={t.id} value={t.id.toString()}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center">
          {error}
        </div>
      ) : filteredShows.length === 0 ? (
        <div className="py-16 text-center text-slate-400 space-y-3 bg-[#0e1422] rounded-3xl border border-slate-800">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-base font-semibold text-white">No schedules match the selected filters</p>
          <button
            onClick={() => {
              setSelectedMovieId('ALL');
              setSelectedTheatreId('ALL');
              setSelectedDate('');
            }}
            className="px-4 py-2 text-xs text-rose-400 bg-rose-500/10 rounded-xl hover:bg-rose-500/20 border border-rose-500/30 font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShows.map((show) => (
            <div
              key={show.id}
              className="bg-[#0e1422] p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-3">
                  <img
                    src={getMoviePoster(show.movie.title, show.movie.posterUrl)}
                    alt={show.movie.title}
                    className="w-16 h-24 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-md bg-rose-600/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">
                      {show.movie.genre}
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight line-clamp-1">{show.movie.title}</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {show.theatre.name}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-600 shrink-0" /> {show.theatre.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Date</span>
                    <span className="font-semibold text-white flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> {show.showDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Time</span>
                    <span className="font-bold text-rose-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {show.showTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Price per ticket</span>
                  <span className="text-base font-black text-white font-mono">
                    LKR {show.ticketPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  disabled={show.status !== 'SCHEDULED'}
                  onClick={() => navigate(`/shows/${show.id}/book`)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-950 transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Ticket className="w-4 h-4" /> Book Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
