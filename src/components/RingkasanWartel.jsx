import React from 'react';
import { Phone, CheckCircle2, PhoneCall } from 'lucide-react';

export default function RingkasanWartel({ summary }) {
  const { total = 10, tersedia = 0, digunakan = 0 } = summary || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Total Wartel (Biru PasCall Gradient) */}
      <div className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] text-white p-5 rounded-2xl shadow-md relative overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-200 block mb-1">
              Total Wartel
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {total}
              </span>
              <span className="text-xs font-semibold text-blue-200">Unit</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <Phone className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Tersedia (Biru Gradient dengan Aksen Hijau Emerald) */}
      <div className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] text-white p-5 rounded-2xl shadow-md relative overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-200 block mb-1">
              Tersedia
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">
                {tersedia}
              </span>
              <span className="text-xs font-semibold text-emerald-200">Unit</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/25 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 shadow-2xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Sedang Digunakan (Biru Gradient dengan Aksen Merah Rose) */}
      <div className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] text-white p-5 rounded-2xl shadow-md relative overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-400/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-rose-200 block mb-1">
              Sedang Digunakan
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-rose-300 tracking-tight">
                {digunakan}
              </span>
              <span className="text-xs font-semibold text-rose-200">Unit</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-500/25 border border-rose-400/30 flex items-center justify-center text-rose-300 shrink-0 shadow-2xs">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
