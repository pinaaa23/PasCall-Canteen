import React, { useState, useEffect } from 'react';
import { RefreshCw, PhoneCall, CheckCircle2 } from 'lucide-react';
import RingkasanWartel from '../components/RingkasanWartel';
import KartuWartel from '../components/KartuWartel';
import {
  getWartelStatus,
  refreshWartelStatus,
  hitungRingkasanWartel,
  subscribeWartelUpdate,
} from '../services/wartelService';

export default function StatusWartelPage() {
  /**
   * TODO: Integrasikan state ini dengan data realtime dari Endpoint REST API / WebSocket Backend
   * ketika endpoint status wartel sudah diimplementasikan di server.
   */
  const [wartelList, setWartelList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await getWartelStatus();
        if (isMounted) {
          setWartelList(data);
        }
      } catch (err) {
        console.error('Gagal mengambil data status wartel:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    // Berlangganan event update agar UI selalu sinkron dengan trigger refresh
    const unsubscribe = subscribeWartelUpdate((updatedData) => {
      if (isMounted) {
        setWartelList(updatedData);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      const refreshedData = await refreshWartelStatus();
      setWartelList(refreshedData);
    } catch (err) {
      console.error('Gagal memperbarui status wartel:', err);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 300);
    }
  };

  const summary = hitungRingkasanWartel(wartelList);
  const digunakanList = wartelList.filter((item) => item.status === 'digunakan');
  const tersediaList = wartelList.filter((item) => item.status === 'tersedia');

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Halaman & Tombol Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E3F2FD] text-[#1565C0] flex items-center justify-center shadow-2xs shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 leading-tight">
              Status Wartel
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pantau ketersediaan wartel di cabang ini.
            </p>
          </div>
        </div>

        {/* Tombol Refresh di Pojok Kanan Atas */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing || isLoading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs hover:shadow-xs transition active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 text-[#1565C0] transition-transform ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          />
          <span>{isRefreshing ? 'Memperbarui...' : 'Refresh'}</span>
        </button>
      </div>

      {/* 2. 3 Kartu Ringkasan (Total / Tersedia / Digunakan) */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
          <div className="h-24 bg-slate-200 rounded-2xl" />
          <div className="h-24 bg-slate-200 rounded-2xl" />
          <div className="h-24 bg-slate-200 rounded-2xl" />
        </div>
      ) : (
        <RingkasanWartel summary={summary} />
      )}

      {/* 3. BAGIAN 1: Sedang Digunakan */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Sedang Digunakan ({summary.digunakan})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Bilik dalam panggilan aktif
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs animate-pulse space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-2xl" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                    <div className="h-3 bg-slate-100 rounded-md w-1/2" />
                  </div>
                </div>
                <div className="h-8 bg-slate-100 rounded-xl w-full mt-3" />
              </div>
            ))}
          </div>
        ) : digunakanList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs font-semibold text-slate-400">
            Tidak ada wartel yang sedang digunakan saat ini. Semua bilik siap dipakai.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {digunakanList.map((wartel) => (
              <KartuWartel key={wartel.id} wartel={wartel} />
            ))}
          </div>
        )}
      </section>

      {/* 4. BAGIAN 2: Tersedia (Chip / Pil Berjejer Ringkas) */}
      <section className="space-y-4 pt-6 border-t border-slate-200/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tersedia ({summary.tersedia})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Bilik kosong siap pakai
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-wrap gap-3 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-24 h-11 bg-slate-200 rounded-xl" />
            ))}
          </div>
        ) : tersediaList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-rose-200 p-8 text-center text-xs font-semibold text-rose-500">
            Seluruh bilik wartel sedang digunakan penuh saat ini.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-wrap items-center gap-3">
              {tersediaList.map((wartel) => {
                const nomorDigit = wartel.nomor.replace(/^[^\d]*/, '') || wartel.nomor;

                return (
                  <div
                    key={wartel.id}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-800 font-bold text-sm shadow-2xs hover:bg-emerald-100/70 transition-colors"
                    title={`Wartel ${nomorDigit} - Tersedia`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span className="font-extrabold tracking-tight">
                      {nomorDigit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
