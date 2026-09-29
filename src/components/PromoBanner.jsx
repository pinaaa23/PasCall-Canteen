import React from 'react';
import { Clock, Sparkles, PhoneCall } from 'lucide-react';

export default function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1565C0] to-[#0D47A1] text-white p-6 sm:p-8 shadow-md">
      {/* Background ambient elements */}
      <div className="absolute -right-8 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-12 top-2 w-32 h-32 bg-blue-300/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-400 text-slate-900 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            PROMO PAKET
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Beli Paket Komunikasi
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Nikmati paket hemat telepon & video call bersama keluarga tercinta.
          </p>
        </div>

        <div className="flex items-center self-start sm:self-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white shadow-sm">
            <Clock className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Tersedia 24 Jam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
