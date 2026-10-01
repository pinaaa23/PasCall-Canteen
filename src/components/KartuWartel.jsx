import React from 'react';
import { Phone, PhoneCall, Clock, CheckCircle2 } from 'lucide-react';

export default function KartuWartel({ wartel }) {
  const { nomor, status, sisaWaktu } = wartel;
  const isDigunakan = status === 'digunakan';

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
        isDigunakan
          ? 'border-slate-200/90 shadow-xs hover:shadow-md hover:border-rose-200'
          : 'border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-200'
      }`}
    >
      <div>
        {/* Header Bar: Icon, Nama Bilik & Badge Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${
                isDigunakan
                  ? 'bg-rose-50 text-[#DC2626]'
                  : 'bg-emerald-50 text-[#16A34A]'
              }`}
            >
              {isDigunakan ? (
                <PhoneCall className="w-5 h-5 animate-pulse" />
              ) : (
                <Phone className="w-5 h-5" />
              )}
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 tracking-tight">
                {nomor}
              </h4>
              <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                Bilik Telepon
              </span>
            </div>
          </div>

          {/* Badge Status */}
          {isDigunakan ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#DC2626] border border-rose-200/80 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              Digunakan
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#16A34A] border border-emerald-200/80 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Tersedia
            </span>
          )}
        </div>
      </div>

      {/* Footer / Info Sisa Waktu */}
      {isDigunakan && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            <span>Estimasi Sisa</span>
          </div>
          <span className="font-extrabold text-slate-700">
            ±{sisaWaktu} Menit
          </span>
        </div>
      )}
    </div>
  );
}
