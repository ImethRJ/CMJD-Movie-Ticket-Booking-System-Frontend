import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { movieService } from '../api/movieService';
import type { Movie } from '../types';
import { getMoviePoster, getMovieBackdrop } from '../utils/moviePosters';
import { Search, Film, Calendar, Ticket, ChevronRight, Play, Clock, MapPin } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await movieService.getAllMovies();
      setMovies(data);
    } catch (err: any) {
      console.error(err);
      setError('Unable to retrieve movie schedules. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const genres = ['ALL', ...Array.from(new Set(movies.map((m) => m.genre).filter(Boolean)))];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'ALL' || movie.genre === selectedGenre;
    const matchesStatus = selectedStatus === 'ALL' || movie.status === selectedStatus;

    return matchesSearch && matchesGenre && matchesStatus;
  });

  const featuredMovie = movies.find((m) => m.status === 'NOW_SHOWING') || movies[0];

  return (
    <div className="space-y-12 pb-16">
      {featuredMovie && (
        <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0e1422] shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px] scale-105"
            style={{ backgroundImage: `url(${getMovieBackdrop(featuredMovie.title, featuredMovie.posterUrl)})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-transparent"></div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-5 max-w-2xl text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <span className="px-3 py-1 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-semibold tracking-wide">
                  NOW SHOWING IN THEATRES
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 text-xs font-mono">
                  {featuredMovie.language} • {featuredMovie.duration} MINS
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 text-xs font-mono font-semibold">
                  DOLBY ATMOS • 4K
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                {featuredMovie.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-xl">
                {featuredMovie.description}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => navigate(`/movies/${featuredMovie.id}`)}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950/60 transition flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" /> Book Tickets
                </button>
                <button
                  onClick={() => navigate(`/movies/${featuredMovie.id}`)}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-300 text-slate-300" /> View Showtimes
                </button>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 pt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> Available at All Multiplexes
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Daily Schedules Available
                </span>
              </div>
            </div>

            <div className="w-52 sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 relative shrink-0 hidden sm:block group">
              <img
                src={getMoviePoster(featuredMovie.title, featuredMovie.posterUrl)}
                alt={featuredMovie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                  {featuredMovie.genre}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
              <Film className="w-6 h-6 text-rose-500" /> In Theatres & Upcoming
            </h2>
            <p className="text-xs text-slate-400">Select a film to browse showtimes and choose your seats</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by movie title or genre..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Genre:
            </span>
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedGenre === genre
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
            >
              <option value="ALL">All Releases</option>
              <option value="NOW_SHOWING">Now Showing</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="ENDED">Ended</option>
            </select>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center space-y-3">
          <p className="font-semibold text-sm">{error}</p>
          <button
            onClick={fetchMovies}
            className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-500 transition"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="py-16 text-center text-slate-400 space-y-2 border border-slate-800 rounded-3xl bg-slate-900/40">
          <Film className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-base font-semibold text-white">No movies match your filter</p>
          <p className="text-xs text-slate-500">Try adjusting your search query or genre selection</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-[#0e1422] rounded-2xl overflow-hidden border border-slate-800 flex flex-col group hover:border-slate-700 hover:shadow-xl hover:shadow-black/50 transition duration-300"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
                <img
                  src={getMoviePoster(movie.title, movie.posterUrl)}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-md backdrop-blur-md ${
                      movie.status === 'NOW_SHOWING'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                        : movie.status === 'UPCOMING'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                        : 'bg-slate-900/80 text-slate-400 border-slate-700'
                    }`}
                  >
                    {movie.status === 'NOW_SHOWING' ? 'Now Showing' : movie.status}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 font-mono border border-slate-800">
                    {movie.duration} mins
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-semibold uppercase tracking-wider">
                    <span>{movie.genre}</span>
                    <span className="text-slate-400 font-normal">{movie.language}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-rose-400 transition line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {movie.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-500" /> {movie.releaseDate || '2026'}
                  </span>

                  <Link
                    to={`/movies/${movie.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition flex items-center gap-1"
                  >
                    Book Tickets <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
