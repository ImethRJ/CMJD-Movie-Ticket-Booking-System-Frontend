import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../api/bookingService';
import type { Booking } from '../types';
import { TicketModal } from '../components/TicketModal';
import { getMoviePoster } from '../utils/moviePosters';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  Check, 
  AlertCircle, 
  X, 
  CreditCard,
  Building2,
  Trash2
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedBookingForModal, setSelectedBookingForModal] = useState<Booking | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (err: any) {
      console.error(err);
      setError('Unable to load your booking history');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: number) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be reversed.')) return;

    try {
      setCancellingId(id);
      await bookingService.cancelBooking(id);
      fetchMyBookings();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 uppercase">
            <Check className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'PENDING':
        return (
          <span className="px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1 uppercase">
            <AlertCircle className="w-3.5 h-3.5" /> Payment Pending
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] font-bold flex items-center gap-1 uppercase">
            <X className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {selectedBookingForModal && (
        <TicketModal
          booking={selectedBookingForModal}
          onClose={() => setSelectedBookingForModal(null)}
        />
      )}

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Ticket className="w-8 h-8 text-rose-500" /> My Movie Bookings
        </h1>
        <p className="text-xs text-slate-400">
          Your active reservations, digital tickets, and past cinema visits
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
      ) : bookings.length === 0 ? (
        <div className="py-16 text-center text-slate-400 space-y-4 bg-[#0e1422] rounded-3xl border border-slate-800">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <p className="text-lg font-bold text-white">No bookings found</p>
            <p className="text-xs text-slate-500">You have not booked any movie tickets yet</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
          >
            Browse Movies & Book Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#0e1422] p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex gap-4 items-start flex-1">
                <img
                  src={getMoviePoster(booking.show.movie.title, booking.show.movie.posterUrl)}
                  alt={booking.show.movie.title}
                  className="w-20 h-28 rounded-xl object-cover border border-slate-800 shrink-0 hidden sm:block"
                />

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-rose-400">
                      REF #{booking.id.toString().padStart(6, '0')}
                    </span>
                    {getStatusBadge(booking.status)}
                    <span className="text-[11px] text-slate-500 font-mono">
                      Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white leading-tight">{booking.show.movie.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-rose-400" /> {booking.show.theatre.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {booking.show.showDate}
                      </span>
                      <span className="flex items-center gap-1 text-rose-400 font-bold">
                        <Clock className="w-3.5 h-3.5" /> {booking.show.showTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-slate-400 font-semibold">Seats:</span>
                    <div className="flex flex-wrap gap-1">
                      {booking.seatNumbers.map((seat) => (
                        <span
                          key={seat}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-rose-300 font-mono text-xs font-bold"
                        >
                          Seat {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto shrink-0">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total Paid</span>
                  <span className="text-xl font-black text-white font-mono">
                    LKR {booking.totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {booking.status === 'PENDING' && (
                    <button
                      onClick={() => navigate(`/bookings/${booking.id}/payment`)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Pay Now
                    </button>
                  )}

                  {booking.status !== 'CANCELLED' && (
                    <button
                      onClick={() => setSelectedBookingForModal(booking)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition flex items-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5 text-rose-400" /> Digital Ticket
                    </button>
                  )}

                  {booking.status !== 'CANCELLED' && (
                    <button
                      disabled={cancellingId === booking.id}
                      onClick={() => handleCancelBooking(booking.id)}
                      className="p-2 rounded-xl text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition text-xs font-semibold disabled:opacity-50"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
