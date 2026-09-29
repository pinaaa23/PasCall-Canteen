import React from 'react';
import { Banknote, Check, AlertCircle } from 'lucide-react';

const METODE_LIST = [
  {
    id: 'Tunai',
    nama: 'Tunai (Cash)',
    keterangan: 'Pembayaran langsung uang fisik di kasir kantin',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-50 text-emerald-600',
    type: 'cash',
  },
];

export default function PilihMetodeBayar({ metodeTerpilih, onPilihMetode }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5">
        {METODE_LIST.map((m) => {
          const isSelected = metodeTerpilih === m.id;
          return (
            <button
              type="button"
              key={m.id}
              onClick={() => onPilihMetode(m.id)}
              className={`relative flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'border-[#1565C0] bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${m.iconBg}`}
              >
                <Banknote className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800">{m.nama}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#1565C0] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{m.keterangan}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Metode hanya dicatat oleh petugas. Pastikan pembayaran sudah diterima.
        </p>
      </div>
    </div>
  );
}
