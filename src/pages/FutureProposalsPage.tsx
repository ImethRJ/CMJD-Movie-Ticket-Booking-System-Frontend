import React from 'react';
import { 
  Tv, 
  Tag, 
  BellRing, 
  CreditCard, 
  Check,
  Compass
} from 'lucide-react';

export const FutureProposalsPage: React.FC = () => {
  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5" /> Technical Roadmap & Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Platform Architecture Roadmap
        </h1>
        <p className="text-xs text-slate-400">
          Planned enterprise capabilities and engineering enhancements designed for large-scale cinema operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0e1422] p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500">
            <Tv className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Phase 1 Enhancement</span>
            <h3 className="text-lg font-bold text-white">Multi-Screen & Dynamic Tiered Seat Matrices</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Transitioning single-hall models to multi-screen complexes (Screen 1 IMAX Laser, Screen 2 Dolby Atmos) with interactive tiered seating (VIP Recliners @ LKR 2,500 vs Standard Seats @ LKR 1,500).
          </p>

          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Operational Benefit:
            </div>
            <p className="text-[11px] text-slate-400 pl-5">
              Empowers patrons to visually select seating tiers, preview viewing angles, and enables multiplex operators to maximize auditorium yield.
            </p>
          </div>
        </div>

        <div className="bg-[#0e1422] p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500">
            <Tag className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Phase 2 Enhancement</span>
            <h3 className="text-lg font-bold text-white">Promotional Coupon Engine & Loyalty Points</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            An enterprise discount coupon validation engine supporting percentage discounts and bank partner promotions, combined with a loyalty ledger system where moviegoers earn redeemable reward points.
          </p>

          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Operational Benefit:
            </div>
            <p className="text-[11px] text-slate-400 pl-5">
              Strengthens customer retention, enables mid-week promotional pricing campaigns, and increases direct bookings.
            </p>
          </div>
        </div>

        <div className="bg-[#0e1422] p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500">
            <BellRing className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Phase 3 Enhancement</span>
            <h3 className="text-lg font-bold text-white">Automated E-Ticket PDF & SMS Dispatch Service</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Spring Boot JavaMail asynchronous workers and Twilio SMS gateway to deliver cryptographically verifiable PDF passes with QR codes directly to mobile devices upon transaction confirmation.
          </p>

          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Operational Benefit:
            </div>
            <p className="text-[11px] text-slate-400 pl-5">
              Eliminates box office queue congestion through paperless entry at automated turnstiles.
            </p>
          </div>
        </div>

        <div className="bg-[#0e1422] p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500">
            <CreditCard className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Phase 4 Enhancement</span>
            <h3 className="text-lg font-bold text-white">Direct Sri Lankan Payment Gateway (PayHere / IPG)</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Direct integration with central bank approved Payment Gateways (PayHere Sri Lanka, Commercial Bank IPG) featuring 3D Secure 2.0 OTP authentication, tokenized card vault, and idempotent webhooks.
          </p>

          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Operational Benefit:
            </div>
            <p className="text-[11px] text-slate-400 pl-5">
              Ensures PCI-DSS compliance, provides instant settlement, and supports local mobile payment wallets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
