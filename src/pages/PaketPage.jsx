import React, { useState, useEffect } from 'react';
import PromoBanner from '../components/PromoBanner';
import KategoriTabs from '../components/KategoriTabs';
import KartuPaket from '../components/KartuPaket';
import ModalBeli from '../components/ModalBeli';
import EmptyState from '../components/EmptyState';
import { getPaket } from '../services/kantinService';
import { Package } from 'lucide-react';
import { ENABLE_COMBO_PACKAGES } from '../data/paket';

export { ENABLE_COMBO_PACKAGES };

export default function PaketPage() {
  const [kategori, setKategori] = useState('telepon');
  const [paketList, setPaketList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paketTerpilih, setPaketTerpilih] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setPaketTerpilih(paket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaketTerpilih(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
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
