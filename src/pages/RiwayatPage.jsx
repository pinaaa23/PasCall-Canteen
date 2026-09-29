import React, { useState, useEffect } from 'react';
import FilterPeriode from '../components/FilterPeriode';
import KartuRingkasan from '../components/KartuRingkasan';
import BarChartSederhana from '../components/BarChartSederhana';
import TabelTransaksi from '../components/TabelTransaksi';
import { getRekap, getRiwayat } from '../services/kantinService';

export default function RiwayatPage() {
  const [periode, setPeriode] = useState('harian');
  const [tanggal, setTanggal] = useState(new Date());

  const [metodeFilter, setMetodeFilter] = useState('Semua');
  const [pencarian, setPencarian] = useState('');

  const [rekapData, setRekapData] = useState(null);
  const [transaksiList, setTransaksiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data rekap & riwayat saat periode, tanggal, metode, atau pencarian berubah
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [rekapRes, riwayatRes] = await Promise.all([
          getRekap({ periode, tanggal }),
          getRiwayat({ cari: pencarian, metode: metodeFilter, periode, tanggal }),
        ]);

        if (isMounted) {
          setRekapData(rekapRes);
          setTransaksiList(riwayatRes);
        }
      } catch (err) {
        console.error('Gagal mengambil data riwayat & rekap:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [periode, tanggal, metodeFilter, pencarian]);

  const handleUbahPeriode = (newPeriode) => {
    setPeriode(newPeriode);
  };

  const handleUbahTanggal = (newTanggal) => {
    setTanggal(newTanggal);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Filter Periode di Paling Atas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Rekap & Riwayat Transaksi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Laporan rekap pemasukan dan daftar riwayat transaksi kasir kantin.
          </p>
        </div>

        <FilterPeriode
          periode={periode}
          onUbahPeriode={handleUbahPeriode}
          tanggal={tanggal}
          onUbahTanggal={handleUbahTanggal}
        />
      </div>

      {/* 2. Bagian Rekap Ringkasan */}
      {isLoading && !rekapData ? (
        <div className="space-y-3 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-28 bg-slate-200 rounded-2xl" />
            <div className="h-28 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      ) : (
        <KartuRingkasan rekap={rekapData} />
      )}

      {/* 3. Bar Chart Sederhana (div + Tailwind) */}
      {rekapData && (
        <BarChartSederhana
          data={rekapData.chartData}
          periode={periode}
        />
      )}

      {/* 4. Tabel Riwayat Transaksi */}
      <TabelTransaksi
        transaksiList={transaksiList}
        metodeFilter={metodeFilter}
        onMetodeFilterChange={setMetodeFilter}
        pencarian={pencarian}
        onPencarianChange={setPencarian}
        isLoading={isLoading}
      />
    </div>
  );
}
