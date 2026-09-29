import React from 'react';
import { formatRupiah } from '../utils/format';
import { ShoppingCart, Clock, CheckCircle2 } from 'lucide-react';

export default function KartuPaket({ paket, onBeli }) {
  const { nama, subNama, durasi, masaAktif, keterangan, harga } = paket;

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
      {/* Header Kartu: Nama & Badge Masa Aktif */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#1565C0] transition-colors">
              {nama}
            </h3>
            {subNama && (
              <p className="text-xs font-medium text-slate-500 mt-0.5">{subNama}</p>
            )}
          </div>
          <span className="inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E3F2FD] text-[#1565C0] border border-blue-100">
            <Clock className="w-3 h-3" />
            {masaAktif}
          </span>
        </div>

        {/* Durasi & Keterangan */}
        <div className="space-y-1.5 mt-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{durasi}</span>
          </div>
          <p className="text-xs text-slate-500 font-normal">
            {keterangan}
          </p>
        </div>
      </div>

      {/* Footer Kartu: Harga & Tombol Beli */}
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Harga
            </span>
            <span className="text-2xl font-extrabold text-[#1565C0]">
              {formatRupiah(harga)}
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Termasuk PPN 11%
          </span>
        </div>

        <button
          onClick={() => onBeli(paket)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1565C0] hover:bg-[#0D47A1] active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Beli Paket</span>
        </button>
      </div>
    </div>
  );
}
