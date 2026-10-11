import React, { useEffect, useState } from 'react';
import { movieService } from '../api/movieService';
import { theatreService } from '../api/theatreService';
import { showService } from '../api/showService';
import { bookingService } from '../api/bookingService';
import { userService } from '../api/userService';
import type { 
  Movie, 
  Theatre, 
  Show, 
  Booking, 
  User, 
  MovieStatus, 
  TheatreStatus, 
  ShowStatus 
} from '../types';

import { 
  ShieldAlert, 
  Film, 
  Building2, 
  Calendar, 
  Ticket, 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  DollarSign, 
  X,
  Upload,
  Eye,
  Ban
} from 'lucide-react';
import { getMoviePoster } from '../utils/moviePosters';
import { TicketModal } from '../components/TicketModal';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'movies' | 'theatres' | 'shows' | 'bookings' | 'users'>('overview');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showMovieModal, setShowMovieModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const [showTheatreModal, setShowTheatreModal] = useState(false);
  const [editingTheatre, setEditingTheatre] = useState<Theatre | null>(null);

  const [showShowModal, setShowShowModal] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);

  const [selectedBookingForModal, setSelectedBookingForModal] = useState<Booking | null>(null);

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'CUSTOMER' as 'ADMIN' | 'CUSTOMER',
  });

  const [movieForm, setMovieForm] = useState({
    title: '',
    description: '',
    duration: 120,
    language: 'English',
    genre: 'Action',
    releaseDate: '2026-10-01',
    status: 'NOW_SHOWING' as MovieStatus,
    posterUrl: '',
  });

  const [theatreForm, setTheatreForm] = useState({
    name: '',
    location: '',
    capacity: 150,
    status: 'ACTIVE' as TheatreStatus,
  });

  const [showForm, setShowForm] = useState({
    movieId: 0,
    theatreId: 0,
    showDate: '2026-10-05',
    showTime: '18:00:00',
    ticketPrice: 1500,
    status: 'SCHEDULED' as ShowStatus,
  });

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [moviesData, theatresData, showsData, bookingsData, usersData] = await Promise.all([
        movieService.getAllMovies(),
        theatreService.getAllTheatres(),
        showService.getAllShows(),
        bookingService.getAllBookings(),
        userService.getAllUsers(),
      ]);

      setMovies(moviesData);
      setTheatres(theatresData);
      setShows(showsData);
      setBookings(bookingsData);
      setUsers(usersData);

      if (moviesData.length > 0 && theatresData.length > 0) {
        setShowForm((prev) => ({
          ...prev,
          movieId: moviesData[0].id,
          theatreId: theatresData[0].id,
        }));
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch administrative data from backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await movieService.updateMovie(editingMovie.id, movieForm);
      } else {
        await movieService.createMovie(movieForm);
      }
      setShowMovieModal(false);
      setEditingMovie(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save movie');
    }
  };

  const handleDeleteMovie = async (id: number) => {
    if (!window.confirm('Delete this movie? Associated shows will be removed.')) return;
    try {
      await movieService.deleteMovie(id);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete movie');
    }
  };

  const handleSaveTheatre = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTheatre) {
        await theatreService.updateTheatre(editingTheatre.id, theatreForm);
      } else {
        await theatreService.createTheatre(theatreForm);
      }
      setShowTheatreModal(false);
      setEditingTheatre(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save theatre');
    }
  };

  const handleDeleteTheatre = async (id: number) => {
    if (!window.confirm('Delete this theatre?')) return;
    try {
      await theatreService.deleteTheatre(id);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete theatre');
    }
  };

  const handleSaveShow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedTime = showForm.showTime.length === 5 ? `${showForm.showTime}:00` : showForm.showTime;
      const payload = {
        ...showForm,
        showTime: formattedTime,
      };
      if (editingShow) {
        await showService.updateShow(editingShow.id, payload);
      } else {
        await showService.createShow(payload);
      }
      setShowShowModal(false);
      setEditingShow(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to schedule show');
    }
  };

  const handleDeleteShow = async (id: number) => {
    if (!window.confirm('Delete this show schedule?')) return;
    try {
      await showService.deleteShow(id);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete show');
    }
  };

  const handleCancelBooking = async (id: number) => {
    if (!window.confirm('Cancel this booking and mark status as cancelled?')) return;
    try {
      await bookingService.cancelBooking(id);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (!window.confirm('Delete this booking record permanently?')) return;
    try {
      await bookingService.deleteBooking(id);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete booking');
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, {
          name: userForm.name,
          email: userForm.email,
          password: userForm.password ? userForm.password : undefined,
        });
      } else {
        await userService.createUser({
          name: userForm.name,
          username: userForm.username,
          email: userForm.email,
          password: userForm.password,
          role: userForm.role,
        });
      }
      setShowUserModal(false);
      setEditingUser(null);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save user account');
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Delete user account?')) return;
    try {
      await userService.deleteUser(id);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const totalRevenue = bookings
    .filter((b) => b.status === 'CONFIRMED')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 pb-16">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-violet-400" /> Admin Console
          </h1>
          <p className="text-xs text-slate-400">
            System administration dashboard for movies, theatres, shows, and customer bookings
          </p>
        </div>

        <button
          onClick={loadAllAdminData}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
        >
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: DollarSign },
          { id: 'movies', label: `Movies (${movies.length})`, icon: Film },
          { id: 'theatres', label: `Theatres (${theatres.length})`, icon: Building2 },
          { id: 'shows', label: `Shows (${shows.length})`, icon: Calendar },
          { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Ticket },
          { id: 'users', label: `Users (${users.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
                isActive
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Total Revenue</span>
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    LKR {totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500 block">From confirmed ticket payments</span>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Total Movies</span>
                    <Film className="w-5 h-5 text-rose-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{movies.length}</div>
                  <span className="text-[10px] text-slate-500 block">Active & upcoming releases</span>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Theatres</span>
                    <Building2 className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{theatres.length}</div>
                  <span className="text-[10px] text-slate-500 block">Partner multiplex complexes</span>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Total Bookings</span>
                    <Ticket className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{bookings.length}</div>
                  <span className="text-[10px] text-slate-500 block">Placed by customers</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'movies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Movies Registry</h3>
                <button
                  onClick={() => {
                    setEditingMovie(null);
                    setMovieForm({
                      title: '',
                      description: '',
                      duration: 120,
                      language: 'English',
                      genre: 'Action',
                      releaseDate: '2026-10-01',
                      status: 'NOW_SHOWING',
                      posterUrl: '',
                    });
                    setShowMovieModal(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New Movie
                </button>
              </div>

              <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Cover</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Genre / Language</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {movies.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-mono font-bold text-slate-400">#{m.id}</td>
                        <td className="p-4">
                          <img
                            src={getMoviePoster(m.title, m.posterUrl)}
                            alt={m.title}
                            className="w-10 h-14 rounded-lg object-cover border border-slate-800"
                          />
                        </td>
                        <td className="p-4 font-bold text-white">{m.title}</td>
                        <td className="p-4">{m.genre} ({m.language})</td>
                        <td className="p-4 font-mono">{m.duration} mins</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                            {m.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingMovie(m);
                              setMovieForm({
                                title: m.title,
                                description: m.description,
                                duration: m.duration,
                                language: m.language,
                                genre: m.genre,
                                releaseDate: m.releaseDate || '2026-10-01',
                                status: m.status,
                                posterUrl: m.posterUrl || '',
                              });
                              setShowMovieModal(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMovie(m.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'theatres' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Theatres Directory</h3>
                <button
                  onClick={() => {
                    setEditingTheatre(null);
                    setTheatreForm({ name: '', location: '', capacity: 150, status: 'ACTIVE' });
                    setShowTheatreModal(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New Theatre
                </button>
              </div>

              <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Capacity</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {theatres.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-mono font-bold text-slate-400">#{t.id}</td>
                        <td className="p-4 font-bold text-white">{t.name}</td>
                        <td className="p-4">{t.location}</td>
                        <td className="p-4 font-mono">{t.capacity} Seats</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                            {t.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingTheatre(t);
                              setTheatreForm({
                                name: t.name,
                                location: t.location,
                                capacity: t.capacity,
                                status: t.status,
                              });
                              setShowTheatreModal(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTheatre(t.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'shows' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Scheduled Shows</h3>
                <button
                  onClick={() => {
                    setEditingShow(null);
                    setShowForm({
                      movieId: movies[0]?.id || 0,
                      theatreId: theatres[0]?.id || 0,
                      showDate: new Date().toISOString().split('T')[0],
                      showTime: '18:30:00',
                      ticketPrice: 1500,
                      status: 'SCHEDULED',
                    });
                    setShowShowModal(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Schedule New Show
                </button>
              </div>

              <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Movie</th>
                      <th className="p-4">Theatre</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {shows.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-mono font-bold text-slate-400">#{s.id}</td>
                        <td className="p-4 font-bold text-white">{s.movie.title}</td>
                        <td className="p-4">{s.theatre.name}</td>
                        <td className="p-4 font-mono">{s.showDate} @ {s.showTime}</td>
                        <td className="p-4 font-mono text-rose-400 font-bold">LKR {s.ticketPrice}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                            {s.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingShow(s);
                              setShowForm({
                                movieId: s.movie.id,
                                theatreId: s.theatre.id,
                                showDate: s.showDate,
                                showTime: s.showTime,
                                ticketPrice: s.ticketPrice,
                                status: s.status,
                              });
                              setShowShowModal(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                            title="Edit Show"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteShow(s.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30"
                            title="Delete Show"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">All Customer Bookings</h3>
              <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Movie & Theatre</th>
                      <th className="p-4">Seats</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-mono font-bold text-slate-400">#{b.id}</td>
                        <td className="p-4 font-bold text-white">{b.user.name} ({b.user.username})</td>
                        <td className="p-4">
                          <div className="font-semibold">{b.show.movie.title}</div>
                          <div className="text-[11px] text-slate-500">{b.show.theatre.name}</div>
                        </td>
                        <td className="p-4 font-mono text-rose-300">{b.seatNumbers.join(', ')}</td>
                        <td className="p-4 font-mono font-bold text-white">LKR {b.totalAmount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : b.status === 'CANCELLED'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedBookingForModal(b)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                            title="View Ticket"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {b.status !== 'CANCELLED' && (
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30"
                              title="Cancel Booking"
                            >
                              <Ban className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">User Accounts</h3>
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setUserForm({
                      name: '',
                      username: '',
                      email: '',
                      password: '',
                      role: 'CUSTOMER',
                    });
                    setShowUserModal(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add New User
                </button>
              </div>

              <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Username</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/40">
                        <td className="p-4 font-mono font-bold text-slate-400">#{u.id}</td>
                        <td className="p-4 font-bold text-white">{u.name}</td>
                        <td className="p-4 font-mono">{u.username}</td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === 'ADMIN' ? 'bg-violet-500/20 text-violet-300' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingUser(u);
                              setUserForm({
                                name: u.name,
                                username: u.username,
                                email: u.email,
                                password: '',
                                role: u.role,
                              });
                              setShowUserModal(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                            title="Edit User"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {showMovieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white">{editingMovie ? 'Edit Movie' : 'Add Movie'}</h4>
              <button onClick={() => setShowMovieModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveMovie} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Title</label>
                <input
                  type="text"
                  required
                  value={movieForm.title}
                  onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="text-slate-400">Description</label>
                <textarea
                  value={movieForm.description}
                  onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white h-20"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400">Duration (mins)</label>
                  <input
                    type="number"
                    value={movieForm.duration}
                    onChange={(e) => setMovieForm({ ...movieForm, duration: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Language</label>
                  <input
                    type="text"
                    value={movieForm.language}
                    onChange={(e) => setMovieForm({ ...movieForm, language: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Release Date</label>
                  <input
                    type="date"
                    value={movieForm.releaseDate}
                    onChange={(e) => setMovieForm({ ...movieForm, releaseDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400">Genre</label>
                  <input
                    type="text"
                    value={movieForm.genre}
                    onChange={(e) => setMovieForm({ ...movieForm, genre: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Status</label>
                  <select
                    value={movieForm.status}
                    onChange={(e) => setMovieForm({ ...movieForm, status: e.target.value as MovieStatus })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="NOW_SHOWING">NOW_SHOWING</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ENDED">ENDED</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Movie Cover (JPG or PNG)</label>
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  {movieForm.posterUrl ? (
                    <div className="relative w-20 h-28 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-900">
                      <img
                        src={movieForm.posterUrl}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setMovieForm({ ...movieForm, posterUrl: '' })}
                        className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-rose-600 rounded-md text-white transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-28 rounded-xl border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 shrink-0 bg-slate-900/50">
                      <Upload className="w-5 h-5 mb-1 text-slate-600" />
                      <span className="text-[9px] uppercase font-mono">No File</span>
                    </div>
                  )}

                  <div className="space-y-2 flex-1 w-full">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setMovieForm({ ...movieForm, posterUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-600/20 file:text-rose-400 hover:file:bg-rose-600/30 file:cursor-pointer cursor-pointer border border-slate-800 rounded-xl bg-slate-900 p-1.5"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 uppercase whitespace-nowrap">Or URL:</span>
                      <input
                        type="url"
                        placeholder="https://image-url.jpg"
                        value={movieForm.posterUrl.startsWith('data:') ? '' : movieForm.posterUrl}
                        onChange={(e) => setMovieForm({ ...movieForm, posterUrl: e.target.value })}
                        className="flex-1 p-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl">
                Save Movie
              </button>
            </form>
          </div>
        </div>
      )}

      {showTheatreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white">{editingTheatre ? 'Edit Theatre' : 'Add Theatre'}</h4>
              <button onClick={() => setShowTheatreModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveTheatre} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Name</label>
                <input
                  type="text"
                  required
                  value={theatreForm.name}
                  onChange={(e) => setTheatreForm({ ...theatreForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="text-slate-400">Location</label>
                <input
                  type="text"
                  required
                  value={theatreForm.location}
                  onChange={(e) => setTheatreForm({ ...theatreForm, location: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400">Capacity</label>
                  <input
                    type="number"
                    value={theatreForm.capacity}
                    onChange={(e) => setTheatreForm({ ...theatreForm, capacity: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Status</label>
                  <select
                    value={theatreForm.status}
                    onChange={(e) => setTheatreForm({ ...theatreForm, status: e.target.value as TheatreStatus })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl">
                Save Theatre
              </button>
            </form>
          </div>
        </div>
      )}

      {showShowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white">{editingShow ? 'Edit Show Schedule' : 'Schedule Show'}</h4>
              <button onClick={() => setShowShowModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveShow} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Select Movie</label>
                <select
                  value={showForm.movieId}
                  onChange={(e) => setShowForm({ ...showForm, movieId: parseInt(e.target.value) })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                >
                  {movies.map((m) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-400">Select Theatre</label>
                <select
                  value={showForm.theatreId}
                  onChange={(e) => setShowForm({ ...showForm, theatreId: parseInt(e.target.value) })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                >
                  {theatres.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400">Show Date</label>
                  <input
                    type="date"
                    value={showForm.showDate}
                    onChange={(e) => setShowForm({ ...showForm, showDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Show Time</label>
                  <input
                    type="text"
                    value={showForm.showTime}
                    placeholder="18:30:00"
                    onChange={(e) => setShowForm({ ...showForm, showTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400">Ticket Price (LKR)</label>
                  <input
                    type="number"
                    value={showForm.ticketPrice}
                    onChange={(e) => setShowForm({ ...showForm, ticketPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Show Status</label>
                  <select
                    value={showForm.status}
                    onChange={(e) => setShowForm({ ...showForm, status: e.target.value as ShowStatus })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl">
                {editingShow ? 'Update Show' : 'Schedule Show'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white">{editingUser ? 'Edit User Account' : 'Add New User'}</h4>
              <button onClick={() => setShowUserModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveUser} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="text-slate-400">Username</label>
                  <input
                    type="text"
                    required
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              )}
              <div>
                <label className="text-slate-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="text-slate-400">{editingUser ? 'Password (Leave blank to keep current)' : 'Password'}</label>
                <input
                  type="password"
                  required={!editingUser}
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="text-slate-400">Account Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as 'ADMIN' | 'CUSTOMER' })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              )}
              <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl">
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedBookingForModal && (
        <TicketModal
          booking={selectedBookingForModal}
          onClose={() => setSelectedBookingForModal(null)}
        />
      )}
    </div>
  );
};
