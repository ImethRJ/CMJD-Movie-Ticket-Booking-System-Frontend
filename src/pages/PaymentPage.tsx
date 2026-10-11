import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { bookingService } from '../api/bookingService';
import { paymentService } from '../api/paymentService';
import type { Booking, PaymentMethod } from '../types';
import { TicketModal } from '../components/TicketModal';
import { getMoviePoster } from '../utils/moviePosters';
import { 
  CreditCard, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  ArrowLeft, 
  Ticket, 
  Calendar, 
  Clock, 
  Building2, 
  Wallet,
  Lock,
  MapPin
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CREDIT_CARD');

  const [cardName, setCardName] = useState('Imeth Jayasinghe');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('321');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  const bannerMsg = location.state?.message;

  useEffect(() => {
    if (id) {
      loadBookingDetails(parseInt(id, 10));
    }
  }, [id]);

  const loadBookingDetails = async (bookingId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getBookingById(bookingId);
      setBooking(data);
    } catch (err: any) {
      console.error(err);
      setError('Unable to load booking details for payment checkout.');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    setSubmitting(true);
    setError(null);

    try {
      await paymentService.processPayment({
        bookingId: booking.id,
        paymentMethod,
      });

      const updatedBooking = await bookingService.getBookingById(booking.id);
      setBooking(updatedBooking);
      setSuccessBooking(updatedBooking);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Payment processing failed. Please verify your card details and try again.';
      setError(msg);
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

  if (error && !booking) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="p-6 max-w-md mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
          <p className="font-semibold text-sm">{error}</p>
        </div>
        <button
          onClick={() => navigate('/my-bookings')}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
        >
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {successBooking && (
        <TicketModal
          booking={successBooking}
          onClose={() => {
            setSuccessBooking(null);
            navigate('/my-bookings');
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 w-fit transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 font-semibold border border-slate-800">1. Select Seats</span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-bold">2. Checkout</span>
          <span className="text-slate-600">→</span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-500 font-semibold border border-slate-800">3. Ticket</span>
        </div>
      </div>

      {bannerMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{bannerMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {booking && (
          <div className="bg-[#0e1422] p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-mono font-bold text-rose-400">Order Ref #{booking.id}</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Booking Details</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <img
                  src={getMoviePoster(booking.show.movie.title, booking.show.movie.posterUrl)}
                  alt={booking.show.movie.title}
                  className="w-16 h-24 rounded-lg object-cover border border-slate-800 shrink-0"
                />
                <div className="space-y-1">
                  <div className="font-bold text-white text-base leading-snug">{booking.show.movie.title}</div>
                  <div className="text-slate-400 text-[11px]">{booking.show.movie.language} • {booking.show.movie.genre}</div>
                  <div className="text-rose-400 text-[11px] font-mono">{booking.show.movie.duration} mins</div>
                </div>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-800/80">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Cinema Complex</span>
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-rose-400" /> {booking.show.theatre.name}
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {booking.show.theatre.location}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold block">Date</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {booking.show.showDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold block">Time</span>
                  <span className="font-semibold text-rose-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {booking.show.showTime}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800/80">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">
                  Reserved Seats ({booking.numberOfTickets})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {booking.seatNumbers.map((seat) => (
                    <span
                      key={seat}
                      className="px-2.5 py-1 rounded-md bg-rose-600/20 border border-rose-500/40 text-rose-300 font-mono font-bold text-xs"
                    >
                      Seat {seat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 text-xs font-semibold">Total Amount</span>
                <span className="text-2xl font-black text-rose-400 font-mono">
                  LKR {booking.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#0e1422] p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-rose-500" /> Secure Payment Gateway
            </h3>
            <p className="text-xs text-slate-400">256-Bit SSL Encrypted Checkout</p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {booking?.status === 'CONFIRMED' ? (
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Payment Already Completed</h4>
                <p className="text-xs text-slate-400">Your seats are confirmed and ticket is issued.</p>
              </div>
              <button
                onClick={() => setSuccessBooking(booking)}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" /> View Digital Entry Pass
              </button>
            </div>
          ) : (
            <form onSubmit={handleProcessPayment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'CREDIT_CARD', label: 'Credit Card', icon: CreditCard },
                    { id: 'DEBIT_CARD', label: 'Debit Card', icon: CreditCard },
                    { id: 'ONLINE', label: 'Online Banking', icon: ShieldCheck },
                    { id: 'PAYPAL', label: 'Digital Wallet', icon: Wallet },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
                          isSelected
                            ? 'bg-rose-600/20 text-rose-300 border-rose-500/60 shadow-sm'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiry Date</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={4}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 mt-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Authorize Payment LKR {booking?.totalAmount.toLocaleString()}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-2">
                <Lock className="w-3 h-3 text-slate-600" />
                <span>Protected by Sri Lankan Banking 3D-Secure 2.0</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
