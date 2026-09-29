import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { formatRupiah } from '../utils/format';
import { cariWbpByIdAtauTelp, buatTransaksi } from '../services/kantinService';
import KartuKonfirmasiNapi from './KartuKonfirmasiNapi';
import PilihMetodeBayar from './PilihMetodeBayar';

export default function ModalBeli({ paket, isOpen, onClose }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [idInput, setIdInput] = useState('');
  const [wbpTerpilih, setWbpTerpilih] = useState(null);
  const [errorPencarian, setErrorPencarian] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [metodeBayar, setMetodeBayar] = useState('Tunai');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !paket) return null;

  const handleCariWbp = async (e) => {
    if (e) e.preventDefault();
    if (!idInput.trim()) {
      setErrorPencarian('Silakan masukkan ID atau Nomor Telepon terlebih dahulu.');
      return;
    }

    setIsSearching(true);
    setErrorPencarian('');
    setWbpTerpilih(null);

    try {
      const data = await cariWbpByIdAtauTelp(idInput);
      if (data) {
        setWbpTerpilih(data);
        setErrorPencarian('');
      } else {
        setErrorPencarian('Data tidak ditemukan, periksa kembali ID atau nomor telepon.');
      }
    } catch (err) {
      setErrorPencarian('Terjadi kesalahan saat mencari data.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleLanjutKeMetode = () => {
    if (!wbpTerpilih) return;
    setStep(2);
  };

  const handleKembaliKeStep1 = () => {
    setStep(1);
  };

  const handleKonfirmasiPembayaran = async () => {
    if (!wbpTerpilih || !paket) return;

    setIsSubmitting(true);
    try {
      const transaksi = await buatTransaksi({
        napi: wbpTerpilih,
        paket: paket,
        metode: metodeBayar,
      });

      onClose();
      navigate(`/voucher/${transaksi.id}`);
    } catch (err) {
      alert('Gagal menyimpan transaksi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setStep(1);
    setIdInput('');
    setWbpTerpilih(null);
    setErrorPencarian('');
    setMetodeBayar('Tunai');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {step === 1 ? 'Pengisian Paket - Langkah 1' : 'Pengisian Paket - Langkah 2'}
            </h3>
            <p className="text-xs text-slate-500">
              {step === 1 ? 'Pencarian ID / Nomor Telepon' : 'Konfirmasi & Metode Pembayaran'}
            </p>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indikator */}
        <div className="px-5 sm:px-6 py-2.5 bg-slate-50/40 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= 1 ? 'bg-[#1565C0] text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                1
              </div>
              <span className={`text-xs font-semibold ${step >= 1 ? 'text-[#1565C0]' : 'text-slate-400'}`}>
                ID / No. Telp
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${step === 2 ? 'bg-[#1565C0]' : 'bg-slate-200'}`} />

            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2 ? 'bg-[#1565C0] text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                2
              </div>
              <span className={`text-xs font-semibold ${step === 2 ? 'text-[#1565C0]' : 'text-slate-400'}`}>
                Metode Bayar
              </span>
            </div>
          </div>
        </div>

        {/* Konten Modal (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-4">
          {/* Ringkasan Paket Terpilih */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1565C0] block">
                Paket Terpilih
              </span>
              <p className="text-sm font-bold text-slate-800">{paket.nama}</p>
              <p className="text-xs text-slate-500">{paket.keterangan}</p>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-[#1565C0]">
                {formatRupiah(paket.harga)}
              </span>
              <span className="block text-[10px] text-slate-400">Masa aktif {paket.masaAktif}</span>
            </div>
          </div>

          {/* STEP 1: Masukkan ID atau No. Telepon */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  ID atau No. Telepon <span className="text-red-500">*</span>
                </label>
                <form onSubmit={handleCariWbp} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={idInput}
                      onChange={(e) => {
                        setIdInput(e.target.value);
                        if (errorPencarian) setErrorPencarian('');
                      }}
                      placeholder="Contoh: WBP-0001 atau 081234567801"
                      className="w-full pl-3.5 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-blue-500/20"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-4 py-2.5 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold text-sm rounded-xl transition flex items-center gap-1.5 shadow-sm disabled:opacity-60 cursor-pointer"
                  >
                    {isSearching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span>Cari</span>
                  </button>
                </form>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Cari berdasarkan ID (<span className="font-mono text-slate-600 font-semibold">WBP-0001</span>) atau No. HP (<span className="font-mono text-slate-600 font-semibold">081234567801</span>)
                </p>
              </div>

              {/* Error Message */}
              {errorPencarian && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-600 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorPencarian}</span>
                </div>
              )}

              {/* Hasil Konfirmasi Data */}
              {wbpTerpilih && (
                <KartuKonfirmasiNapi napi={wbpTerpilih} />
              )}
            </div>
          )}

          {/* STEP 2: Metode Pembayaran */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Ringkasan Lengkap */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Pelanggan:</span>
                  <span className="font-bold text-slate-800">{wbpTerpilih?.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ID / No. Telp:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {wbpTerpilih?.id} {wbpTerpilih?.noTelp ? `• ${wbpTerpilih.noTelp}` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Paket:</span>
                  <span className="font-medium text-slate-800">{paket.nama}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-slate-200 text-sm">
                  <span className="font-bold text-slate-700">Total Tagihan:</span>
                  <span className="font-extrabold text-[#1565C0]">{formatRupiah(paket.harga)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Metode Pembayaran
                </label>
                <PilihMetodeBayar
                  metodeTerpilih={metodeBayar}
                  onPilihMetode={setMetodeBayar}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2.5 shrink-0">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-semibold transition cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleLanjutKeMetode}
                disabled={!wbpTerpilih}
                className="px-5 py-2.5 rounded-xl bg-[#1565C0] hover:bg-[#0D47A1] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleKembaliKeStep1}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span>Kembali</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-700 text-sm font-medium transition cursor-pointer whitespace-nowrap"
                >
                  Batal
                </button>
              </div>

              <button
                type="button"
                onClick={handleKonfirmasiPembayaran}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl bg-[#16A34A] hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-bold transition flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                )}
                <span className="whitespace-nowrap">Konfirmasi Pembayaran Diterima</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
