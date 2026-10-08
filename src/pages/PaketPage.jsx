import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PromoBanner from '../components/PromoBanner';
import KategoriTabs from '../components/KategoriTabs';
import KartuPaket from '../components/KartuPaket';
import ModalBeli from '../components/ModalBeli';
import EmptyState from '../components/EmptyState';
import { getPaket } from '../services/kantinService';
import { Package, Wallet, AlertTriangle, ArrowUpCircle } from 'lucide-react';
import { ENABLE_COMBO_PACKAGES } from '../data/paket';
import { formatRupiah } from '../utils/format';
import {
  getSaldo,
  getSaldoSync,
  subscribeSaldoUpdate,
  SALDO_MINIMUM_WARNING,
} from '../services/saldoService';

export { ENABLE_COMBO_PACKAGES };

export default function PaketPage() {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState('telepon');
  const [paketList, setPaketList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paketTerpilih, setPaketTerpilih] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State saldo
  const [saldo, setSaldo] = useState(() => getSaldoSync());
  const [saldoWarning, setSaldoWarning] = useState(null); // { paketNama, harga }

  // Subscribe ke update saldo
  useEffect(() => {
    // Load saldo awal
    getSaldo().then((s) => setSaldo(s));

    const unsubscribe = subscribeSaldoUpdate((newSaldo) => {
      setSaldo(newSaldo);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadPaket = async () => {
      setIsLoading(true);
      try {
        const activeKategori = (!ENABLE_COMBO_PACKAGES && kategori === 'combo') ? 'telepon' : kategori;
        const data = await getPaket(activeKategori);
        if (isMounted) {
          setPaketList(data);
        }
      } catch (err) {
        console.error('Gagal mengambil data paket:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPaket();

    return () => {
      isMounted = false;
    };
  }, [kategori]);

  const handleBeliPaket = (paket) => {
    // Pengecekan saldo sebelum membuka modal beli
    if (saldo < paket.harga) {
      setSaldoWarning({ paketNama: paket.nama, harga: paket.harga });
      return;
    }
    setSaldoWarning(null);
    setPaketTerpilih(paket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaketTerpilih(null);
    // Refresh saldo setelah modal ditutup (transaksi mungkin sudah berhasil)
    getSaldo().then((s) => setSaldo(s));
  };

  const saldoRendah = saldo < SALDO_MINIMUM_WARNING;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Warning Saldo Tidak Cukup */}
      {saldoWarning && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-red-800">
                Saldo tidak cukup, silakan top up
              </p>
              <p className="text-xs text-red-600 mt-0.5">
                Paket "{saldoWarning.paketNama}" seharga {formatRupiah(saldoWarning.harga)} memerlukan saldo yang cukup.
                Saldo Anda saat ini: {formatRupiah(saldo)}.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => navigate('/top-up-saldo')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1565C0] hover:bg-[#0D47A1] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <ArrowUpCircle className="w-3.5 h-3.5" />
                  <span>Top Up Saldo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSaldoWarning(null)}
                  className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-100 text-xs font-semibold transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Promo Banner di Atas */}
      <PromoBanner />

      {/* 2. Filter Kategori Tab */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Pilihan Paket Komunikasi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih paket yang diinginkan oleh warga binaan pemasyarakatan.
          </p>
        </div>

        <KategoriTabs
          kategoriAktif={kategori}
          onPilihKategori={(kat) => setKategori(kat)}
        />
      </div>

      {/* 3. Grid Kartu Paket */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs animate-pulse space-y-4"
            >
              <div className="h-5 bg-slate-200 rounded-md w-3/5" />
              <div className="h-4 bg-slate-100 rounded-md w-4/5" />
              <div className="h-8 bg-slate-200 rounded-lg w-1/2 mt-6" />
              <div className="h-11 bg-slate-200 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : paketList.length === 0 ? (
        <EmptyState
          title="Paket Tidak Ditemukan"
          description="Saat ini belum ada daftar paket untuk kategori yang dipilih."
          icon={Package}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {paketList.map((paket) => (
            <KartuPaket
              key={paket.id}
              paket={paket}
              onBeli={handleBeliPaket}
            />
          ))}
        </div>
      )}

      {/* 4. Modal Alur Beli */}
      {isModalOpen && paketTerpilih && (
        <ModalBeli
          paket={paketTerpilih}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

