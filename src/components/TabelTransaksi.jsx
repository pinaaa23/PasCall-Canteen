import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpRight, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { formatRupiah, formatTanggal } from '../utils/format';
import EmptyState from './EmptyState';

export default function TabelTransaksi({
  transaksiList = [],
  metodeFilter,
  onMetodeFilterChange,
  pencarian,
  onPencarianChange,
  isLoading = false,
}) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/struk/${id}`);
  };

  const totalNominal = transaksiList.reduce(
    (acc, curr) => acc + (curr.paket?.harga || 0),
    0
  );

  const getMetodeBadge = (metode) => {
    if (metode === 'Tunai') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header Tabel & Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Riwayat Transaksi
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Jika ada kesalahan input setelah transaksi tercatat, hubungi Admin Cabang.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Total: <span className="text-[#1565C0] font-bold">{transaksiList.length}</span> transaksi
          </div>
        </div>

        {/* Input Pencarian & Filter Metode */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Kolom Pencarian */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={pencarian}
              onChange={(e) => onPencarianChange(e.target.value)}
              placeholder="Cari ID transaksi, voucher, nama, ID / No. HP..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Metode Pill */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['Semua', 'Tunai'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onMetodeFilterChange(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  metodeFilter === m
                    ? 'bg-[#1565C0] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Area Isi Tabel */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="animate-spin w-6 h-6 border-2 border-[#1565C0] border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-xs font-medium">Memuat riwayat transaksi...</p>
        </div>
      ) : transaksiList.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="Belum Ada Transaksi"
            description="Tidak ditemukan riwayat transaksi pada periode dan kriteria pencarian ini."
            icon={FileSpreadsheet}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">ID Transaksi</th>
                <th className="py-3.5 px-4">Waktu</th>
                <th className="py-3.5 px-4">Nama Pelanggan</th>
                <th className="py-3.5 px-4">ID / No. Telp</th>
                <th className="py-3.5 px-4">Keterangan Paket</th>
                <th className="py-3.5 px-4">Metode</th>
                <th className="py-3.5 px-4 text-right">Nominal</th>
                <th className="py-3.5 px-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transaksiList.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {formatTanggal(item.waktu, true)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {item.napi?.nama}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono text-slate-700 font-semibold block">{item.napi?.id}</span>
                    {item.napi?.noTelp && (
                      <span className="text-[10px] text-slate-400 font-mono block">{item.napi?.noTelp}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                    {item.paket?.nama}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${getMetodeBadge(
                        item.metode
                      )}`}
                    >
                      {item.metode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#1565C0] text-right whitespace-nowrap text-sm">
                    {formatRupiah(item.paket?.harga)}
                  </td>
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center text-slate-400 group-hover:text-[#1565C0] transition">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Baris Total di Bawah Tabel */}
            <tfoot>
              <tr className="bg-slate-50 font-bold border-t border-slate-200 text-slate-800">
                <td colSpan={6} className="py-3.5 px-4 text-right uppercase tracking-wider text-[11px] text-slate-500">
                  Total Nominal ({transaksiList.length} Transaksi)
                </td>
                <td className="py-3.5 px-4 text-right text-[#1565C0] font-black text-sm whitespace-nowrap">
                  {formatRupiah(totalNominal)}
                </td>
                <td className="py-3.5 px-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
