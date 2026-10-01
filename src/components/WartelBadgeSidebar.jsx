import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  getStoredWartel,
  hitungRingkasanWartel,
  subscribeWartelUpdate,
} from '../services/wartelService';

export default function WartelBadgeSidebar() {
  const [summary, setSummary] = useState(() =>
    hitungRingkasanWartel(getStoredWartel())
  );

  useEffect(() => {
    // Sinkronisasi realtime jika ada perubahan status wartel
    const unsubscribe = subscribeWartelUpdate((data) => {
      setSummary(hitungRingkasanWartel(data));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { total = 10, digunakan = 0 } = summary;
  const isBanyakDigunakan = digunakan > total / 2;

  return (
    <NavLink
      to="/status-wartel"
      className={({ isActive }) =>
        `block p-3 rounded-2xl border transition-all duration-150 group ${
          isActive
            ? 'bg-[#E3F2FD] border-blue-200 shadow-2xs'
            : isBanyakDigunakan
            ? 'bg-rose-50/70 hover:bg-rose-50 border-rose-200/80 hover:border-rose-300'
            : 'bg-emerald-50/70 hover:bg-emerald-50 border-emerald-200/80 hover:border-emerald-300'
        }`
      }
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isBanyakDigunakan ? 'bg-rose-400' : 'bg-emerald-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isBanyakDigunakan ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
            />
          </span>
          <div className="truncate">
            <span
              className={`text-xs font-bold leading-tight block truncate ${
                isBanyakDigunakan ? 'text-rose-800' : 'text-emerald-800'
              }`}
            >
              {digunakan} dari {total} Wartel Digunakan
            </span>
            <span className="text-[10px] text-slate-500 font-medium block">
              Klik untuk pantau bilik
            </span>
          </div>
        </div>

        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
      </div>
    </NavLink>
  );
}
