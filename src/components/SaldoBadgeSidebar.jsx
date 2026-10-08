import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, ChevronRight, AlertTriangle } from 'lucide-react';
import { formatRupiah } from '../utils/format';
import {
  SALDO_MINIMUM_WARNING,
  getSaldoSync,
  subscribeSaldoUpdate,
} from '../services/saldoService';

/**
 * Kartu kecil "Saldo Kantin" untuk sidebar.
 * Menampilkan sisa saldo dan tombol menuju halaman Top Up Saldo.
 * Jika saldo di bawah SALDO_MINIMUM_WARNING (Rp 50.000),
 * kartu berubah warna jadi peringatan (kuning/merah) dengan tulisan "Saldo menipis".
 */
export default function SaldoBadgeSidebar() {
  const [saldo, setSaldo] = useState(() => getSaldoSync());

  useEffect(() => {
    // Subscribe untuk menerima update saldo realtime
    const unsubscribe = subscribeSaldoUpdate((newSaldo) => {
      setSaldo(newSaldo);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const saldoRendah = saldo < SALDO_MINIMUM_WARNING;

  return (
    <NavLink
      to="/top-up-saldo"
      className={({ isActive }) =>
        `block p-3 rounded-2xl border transition-all duration-150 group ${
          isActive
            ? 'bg-[#E3F2FD] border-blue-200 shadow-2xs'
            : saldoRendah
            ? 'bg-amber-50/70 hover:bg-amber-50 border-amber-200/80 hover:border-amber-300'
            : 'bg-emerald-50/70 hover:bg-emerald-50 border-emerald-200/80 hover:border-emerald-300'
        }`
      }
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              saldoRendah
                ? 'bg-amber-100 text-amber-600'
                : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <span
              className={`text-xs font-bold leading-tight block truncate ${
                saldoRendah ? 'text-amber-800' : 'text-emerald-800'
              }`}
            >
              {formatRupiah(saldo)}
            </span>
            <span className="text-[10px] font-medium block">
              {saldoRendah ? (
                <span className="text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5 inline" />
                  Saldo menipis
                </span>
              ) : (
                <span className="text-slate-500">Klik untuk top up</span>
              )}
            </span>
          </div>
        </div>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
      </div>
    </NavLink>
  );
}
