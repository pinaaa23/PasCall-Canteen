import React from 'react';
import { CheckCircle2, User, Building2, Phone } from 'lucide-react';

export default function KartuKonfirmasiNapi({ napi }) {
  if (!napi) return null;

  return (
    <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 transition-all">
      <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs mb-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        <span>Data Terverifikasi</span>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs space-y-2">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#1565C0] flex items-center justify-center font-bold text-sm shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-slate-800 truncate">
                {napi.nama}
              </h4>
              <span className="shrink-0 px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {napi.id}
              </span>
            </div>
            {napi.blok && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{napi.blok}</span>
              </div>
            )}
          </div>
        </div>

        {napi.noTelp && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              No. Telepon:
            </span>
            <span className="font-mono font-semibold text-slate-800">
              {napi.noTelp}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
