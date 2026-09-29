import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy, Check, Printer, ArrowRight, FileX } from 'lucide-react';
import { getTransaksiById } from '../services/kantinService';
import EmptyState from '../components/EmptyState';

export default function VoucherPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchTransaksi = async () => {
      setIsLoading(true);
      try {
        const data = await getTransaksiById(id);
        if (isMounted) {
          setTransaksi(data);
        }
      } catch (err) {
        console.error('Gagal mengambil data transaksi voucher:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTransaksi();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const kodeVoucher = transaksi?.kodeVoucher || 'PAS-XXXX-XXXX';

  const handleSalinKode = async () => {
    if (!kodeVoucher) return;
    try {
      await navigator.clipboard.writeText(kodeVoucher);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Gagal menyalin kode:', err);
    }
  };

  const handleCetakVoucher = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center bg-white rounded-2xl border border-slate-200 shadow-xs animate-pulse space-y-3">
        <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto" />
        <div className="h-5 bg-slate-200 rounded-md w-2/3 mx-auto" />
        <div className="h-3.5 bg-slate-100 rounded-md w-1/2 mx-auto" />
        <div className="h-32 bg-slate-200 rounded-xl w-full" />
      </div>
    );
  }

  if (!transaksi) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <EmptyState
          title="Transaksi Tidak Ditemukan"
          description={`Data transaksi dengan ID "${id}" tidak ditemukan dalam catatan kantin.`}
          icon={FileX}
          actionText="Kembali ke Paket"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto py-0 sm:py-1 animate-in fade-in duration-300">
      {/* Header Halaman (Ikon Sukses, Judul, Subjudul) */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">
          Pembayaran Berhasil
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Berikan kode ini kepada warga binaan (WBP).
        </p>
      </div>

      {/* Kartu Voucher Tengah (ID: voucher-cetak untuk cetak khusus) */}
      <div
        id="voucher-cetak"
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Bagian Atas: Gradien Biru dengan Kode Voucher Sangat Besar (1 Baris) */}
        <div className="bg-gradient-to-br from-[#1565C0] via-[#1976D2] to-[#0D47A1] text-white p-4 sm:p-5 text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <span className="inline-block text-[11px] uppercase font-bold tracking-widest text-blue-200 mb-1 px-3 py-0.5 bg-white/10 rounded-full">
            KODE VOUCHER
          </span>

          <div className="my-1.5 flex items-center justify-center">
            <span className="text-2xl xs:text-3xl sm:text-4xl md:text-[44px] font-black font-mono tracking-wider sm:tracking-widest text-white whitespace-nowrap drop-shadow-xs select-all">
              {kodeVoucher}
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-blue-100/80">
            Gunakan kode ini pada perangkat wartelsus / tablet
          </p>
        </div>

        {/* Bagian Bawah: Nama WBP, ID WBP, dan Nama Paket saja (Kata Napi dihapus) */}
        <div className="p-4 sm:p-5 space-y-2.5 bg-white text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Nama WBP</span>
            <span className="font-bold text-slate-800 text-sm">
              {transaksi.napi?.nama || '-'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">ID WBP</span>
            <span className="font-mono font-bold text-slate-800">
              {transaksi.napi?.id || '-'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-medium">Nama Paket</span>
            <span className="font-bold text-[#1565C0] text-sm">
              {transaksi.paket?.nama || '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Tombol Aksi di Layar (no-print) */}
      <div className="no-print mt-3.5 sm:mt-4 space-y-2.5">
        {/* Baris Tombol Salin Kode & Cetak Voucher */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleSalinKode}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                <span className="text-emerald-700 font-bold">Tersalin ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Salin Kode</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCetakVoucher}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Voucher</span>
          </button>
        </div>

        {/* Tombol Utama: Lanjut ke Struk */}
        <button
          type="button"
          onClick={() => navigate(`/struk/${transaksi.id}`)}
          className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-bold text-sm rounded-xl shadow-sm transition cursor-pointer"
        >
          <span>Lanjut ke Struk</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
