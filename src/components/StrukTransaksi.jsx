import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Printer, ArrowLeft, Building2, User, CreditCard, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { formatRupiah, formatTanggal } from '../utils/format';

export default function StrukTransaksi({ transaksi }) {
  if (!transaksi) return null;

  const handleCetak = () => {
    window.print();
  };

  const getMetodeBadge = (metode) => {
    if (metode === 'Tunai') {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Tombol Aksi di Luar Print */}
      <div className="no-print flex items-center justify-between mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#1565C0] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Paket</span>
        </Link>
        <Link
          to="/riwayat"
          className="text-xs font-semibold text-[#1565C0] hover:underline"
        >
          Lihat Riwayat Transaksi &rarr;
        </Link>
      </div>

      {/* Kartu Struk (ID: struk-cetak untuk print CSS) */}
      <div
        id="struk-cetak"
        className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8"
      >
        {/* Header Struk */}
        <div className="text-center pb-6 border-b border-dashed border-slate-200">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Pembayaran Berhasil</h2>
          <p className="text-xs text-slate-500 mt-1">
            Paket komunikasi WBP telah berhasil diaktifkan.
          </p>

          <div className="mt-4 inline-block px-3 py-1 bg-slate-100 rounded-full">
            <span className="text-xs font-mono font-bold text-slate-700">
              {transaksi.id}
            </span>
          </div>
        </div>

        {/* Brand Kantin PasCall Info */}
        <div className="py-4 border-b border-dashed border-slate-200 text-xs flex justify-between items-center text-slate-500">
          <div>
            <span className="font-bold text-slate-700">PasCall Kantin Lapas</span>
            <p className="text-[11px]">Layanan Komunikasi WBP Terpadu</p>
          </div>
          <div className="text-right">
            <span className="font-medium text-slate-600">
              {formatTanggal(transaksi.waktu, true)}
            </span>
          </div>
        </div>

        {/* Rincian Transaksi */}
        <div className="py-5 space-y-3.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Nama WBP
            </span>
            <span className="font-bold text-slate-800">{transaksi.napi?.nama}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              ID & Kamar WBP
            </span>
            <span className="font-medium text-slate-700 font-mono text-xs">
              {transaksi.napi?.id} {transaksi.napi?.blok ? `(${transaksi.napi.blok})` : ''}
            </span>
          </div>

          {transaksi.napi?.noTelp && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                No. Telepon
              </span>
              <span className="font-mono font-bold text-slate-800 text-xs">
                {transaksi.napi.noTelp}
              </span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500 text-xs flex items-center gap-1.5 shrink-0 mt-0.5">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
              Paket Dibeli
            </span>
            <div className="text-right">
              <p className="font-bold text-slate-800">{transaksi.paket?.nama}</p>
              <p className="text-[11px] text-slate-500">
                {transaksi.paket?.keterangan || `Masa aktif ${transaksi.paket?.masaAktif}`}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              Metode Bayar
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${getMetodeBadge(
                transaksi.metode
              )}`}
            >
              {transaksi.metode}
            </span>
          </div>
        </div>

        {/* Total Pembayaran */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500">Total Nominal</span>
              <p className="text-[11px] text-slate-400">Sudah Termasuk PPN 11%</p>
            </div>
            <span className="text-2xl font-black text-[#1565C0]">
              {formatRupiah(transaksi.paket?.harga)}
            </span>
          </div>
        </div>

        {/* Footer Catatan Struk */}
        <div className="mt-6 text-center text-[11px] text-slate-400 space-y-1">
          <p>Simpan struk ini sebagai bukti pembayaran yang sah.</p>
          <p>Terima kasih telah menggunakan layanan PasCall.</p>
        </div>
      </div>

      {/* Tombol Aksi di Layar (no-print) */}
      <div className="no-print mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCetak}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-bold text-sm rounded-xl shadow-sm transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Struk</span>
        </button>

        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl shadow-xs transition text-center"
        >
          <span>Kembali ke Paket</span>
        </Link>
      </div>
    </div>
  );
}
