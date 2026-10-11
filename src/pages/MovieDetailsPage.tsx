import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../api/movieService';
import { showService } from '../api/showService';
import type { Movie, Show } from '../types';
import { getMoviePoster, getMovieBackdrop } from '../utils/moviePosters';
import { Calendar, Clock, MapPin, Ticket, ArrowLeft, Building2, Film } from 'lucide-react';

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadMovieDetails(parseInt(id, 10));
    }
  }, [id]);

  const loadMovieDetails = async (movieId: number) => {
    try {
      setLoading(true);
      const [movieData, showsData] = await Promise.all([
        movieService.getMovieById(movieId),
        showService.getShowsByMovieId(movieId),
      ]);
      setMovie(movieData);
      setShows(showsData);
    } catch (err: any) {
      console.error(err);
      setError('Unable to load movie information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="p-6 max-w-md mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
          <p className="font-semibold text-sm">{error || 'Movie not found'}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
        >
          Return to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 w-fit transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Movies
      </button>

      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0e1422] shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px] scale-105"
          style={{ backgroundImage: `url(${getMovieBackdrop(movie.title, movie.posterUrl)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-transparent"></div>

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 shrink-0 mx-auto md:mx-0">
            <img
              src={getMoviePoster(movie.title, movie.posterUrl)}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 flex-1">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-600/20 text-rose-400 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
                  {movie.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
                  {movie.language}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase">
                  {movie.status === 'NOW_SHOWING' ? 'Now Showing' : movie.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-xs font-mono font-bold">
                  DOLBY ATMOS
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white">{movie.title}</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs max-w-xl">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Runtime</span>
                <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-rose-400" /> {movie.duration} Mins
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Release Date</span>
                <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {movie.releaseDate || '2026'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-semibold block">Audio Format</span>
                <span className="font-bold text-white mt-0.5 block">{movie.language} (Original)</span>
              </div>
            </div>

            <div className="space-y-1.5 max-w-2xl">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Synopsis</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Film className="w-6 h-6 text-rose-500" /> Available Showtimes
            </h2>
            <p className="text-xs text-slate-400">Select a theatre and time slot to reserve your seats</p>
          </div>
        </div>

        {shows.length === 0 ? (
          <div className="bg-[#0e1422] p-12 text-center rounded-3xl border border-slate-800 space-y-2">
            <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-base font-semibold text-white">No schedules currently listed for this movie</p>
            <p className="text-xs text-slate-500">Please check back soon or browse other releases</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shows.map((show) => (
              <div
                key={show.id}
                className="bg-[#0e1422] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-rose-400" /> {show.theatre.name}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" /> {show.theatre.location}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">
                      Cap: {show.theatre.capacity}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase font-semibold">Date</span>
                      <span className="font-semibold text-white">{show.showDate}</span>
                    </div>
                    <div className="border-r border-slate-800 h-6"></div>
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase font-semibold">Time</span>
                      <span className="font-bold text-rose-400">{show.showTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Ticket Price</span>
                    <span className="text-lg font-black text-white font-mono">
                      LKR {show.ticketPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    disabled={show.status !== 'SCHEDULED'}
                    onClick={() => navigate(`/shows/${show.id}/book`)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-950 transition flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Ticket className="w-4 h-4" /> Select Seats
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
