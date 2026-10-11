import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showService } from '../api/showService';
import { bookingService } from '../api/bookingService';
import type { Show, ShowSeatAvailabilityResponse } from '../types';
import { SeatGrid } from '../components/SeatGrid';
import { useAuth } from '../context/AuthContext';
import { getMoviePoster } from '../utils/moviePosters';
import { 
  Building2, 
  Calendar, 
  Clock, 
  Ticket, 
  ArrowLeft, 
  AlertCircle, 
  Check,
  Armchair,
  MapPin
} from 'lucide-react';

export const SeatSelectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [show, setShow] = useState<Show | null>(null);
  const [availability, setAvailability] = useState<ShowSeatAvailabilityResponse | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadShowAndSeats(parseInt(id, 10));
    }
  }, [id]);

  const loadShowAndSeats = async (showId: number) => {
    try {
      setLoading(true);
      setError(null);
      const [showData, seatData] = await Promise.all([
        showService.getShowById(showId),
        showService.getShowSeatAvailability(showId),
      ]);
      setShow(showData);
      setAvailability(seatData);
    } catch (err: any) {
      console.error(err);
      setError('Unable to load seat availability. Please verify the backend service is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatToggle = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber].sort());
    }
    setError(null);
  };

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/shows/${id}/book` } });
      return;
    }

    if (selectedSeats.length === 0) {
      setError('Please select at least one seat before continuing');
      return;
    }

    if (!show) return;

    setSubmitting(true);
    setError(null);

    try {
      const newBooking = await bookingService.createBooking({
        showId: show.id,
        seatNumbers: selectedSeats,
        numberOfTickets: selectedSeats.length,
      });

      navigate(`/bookings/${newBooking.id}/payment`, {
        state: { message: 'Seats held successfully. Complete payment to finalize your booking.' },
      });
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Selected seat is no longer available. Please choose another seat.';
      setError(msg);
      if (show) loadShowAndSeats(show.id);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !show) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="p-6 max-w-md mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
          <p className="font-semibold text-sm">{error}</p>
        </div>
        <button
          onClick={() => navigate('/shows')}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
        >
          Return to Showtimes
        </button>
      </div>
    );
  }

  const totalAmount = show ? show.ticketPrice * selectedSeats.length : 0;

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 w-fit transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Movie
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-bold">1. Select Seats</span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-500 font-semibold border border-slate-800">2. Checkout</span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-500 font-semibold border border-slate-800">3. Ticket</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-[#0e1422] p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Armchair className="w-6 h-6 text-rose-500" /> Select Your Seats
            </h2>
            <p className="text-xs text-slate-400">
              Pick your preferred seats on the auditorium map below
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {availability && show && (
            <SeatGrid
              bookedSeats={availability.bookedSeats}
              selectedSeats={selectedSeats}
              onSeatToggle={handleSeatToggle}
              totalCapacity={show.theatre.capacity}
            />
          )}
        </div>

        <div className="bg-[#0e1422] p-6 rounded-3xl border border-slate-800 space-y-5 sticky top-24">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Ticket className="w-4 h-4 text-rose-500" /> Booking Summary
            </h3>
          </div>

          {show && (
            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <img
                  src={getMoviePoster(show.movie.title, show.movie.posterUrl)}
                  alt={show.movie.title}
                  className="w-16 h-24 rounded-lg object-cover border border-slate-800 shrink-0"
                />
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm leading-snug">{show.movie.title}</div>
                  <div className="text-slate-400 text-[11px]">{show.movie.language} • {show.movie.genre}</div>
                  <div className="text-rose-400 text-[11px] font-mono">{show.movie.duration} mins</div>
                </div>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Cinema Hall</span>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-rose-400" /> {show.theatre.name}
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {show.theatre.location}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Date</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {show.showDate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Time</span>
                  <span className="font-semibold text-rose-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {show.showTime}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Seats Selected</span>
                  <span className="font-mono text-white font-bold">{selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}</span>
                </div>

                {selectedSeats.length === 0 ? (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-center italic text-[11px]">
                    Click seats on the chart to select
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="px-2.5 py-1 rounded-md bg-rose-600/20 border border-rose-500/40 text-rose-300 font-mono font-bold text-xs"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Price per seat:</span>
                  <span className="font-mono text-slate-200">LKR {show.ticketPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Quantity:</span>
                  <span className="font-mono text-slate-200">× {selectedSeats.length}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Online Booking Fee:</span>
                  <span className="font-mono text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Payable:</span>
                  <span className="text-xl font-black text-rose-400 font-mono">
                    LKR {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={submitting || selectedSeats.length === 0}
                className="w-full py-3.5 mt-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Continue to Checkout
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
