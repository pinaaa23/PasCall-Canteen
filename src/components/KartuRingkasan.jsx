import React from 'react';
import { formatRupiah } from '../utils/format';
import { TrendingUp, Receipt } from 'lucide-react';

export default function KartuRingkasan({ rekap }) {
  if (!rekap) return null;

  const { totalPemasukan = 0, jumlahTransaksi = 0 } = rekap;

  return (
    <div className="space-y-3">
      {/* 2 Kartu Utama (Total Pemasukan & Total Transaksi) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Total Pemasukan */}
        <div className="bg-gradient-to-br from-[#1565C0] to-[#0D47A1] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
              Total Pemasukan (Tunai)
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight">
            {formatRupiah(totalPemasukan)}
          </div>
          <p className="text-xs text-blue-100/80 mt-1">
            Total omzet kantin pada periode terpilih
          </p>
        </div>

        {/* Total Transaksi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Jumlah Transaksi
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">
            {jumlahTransaksi} <span className="text-sm font-semibold text-slate-500">Trx</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pengisian paket berhasil dicatat
          </p>
        </div>
      </div>
    </div>
  );
}
