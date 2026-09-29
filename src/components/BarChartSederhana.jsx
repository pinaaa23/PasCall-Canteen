import React, { useState } from 'react';
import { formatRupiah } from '../utils/format';
import { BarChart3 } from 'lucide-react';

export default function BarChartSederhana({ data = [], periode = 'harian' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-sm text-slate-400">
        Belum ada data grafik untuk periode ini.
      </div>
    );
  }

  // Cari nominal tertinggi untuk kalkulasi tinggi persentase batang
  const maxNominal = Math.max(...data.map((d) => d.nominal), 1);

  const getPeriodeSubtitle = () => {
    if (periode === 'harian') return 'Distribusi pemasukan per rentang jam operasional';
    if (periode === 'bulanan') return 'Distribusi pemasukan per rentang tanggal dalam bulan';
    return 'Distribusi pemasukan per bulan sepanjang tahun';
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      {/* Header Chart */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1565C0] flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Grafik Tren Pemasukan
            </h3>
            <p className="text-xs text-slate-400">{getPeriodeSubtitle()}</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Maks: <span className="font-bold text-slate-700">{formatRupiah(maxNominal)}</span>
        </div>
      </div>

      {/* Area Bar Chart */}
      <div className="h-48 sm:h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-1 sm:px-4 border-b border-slate-100">
        {data.map((item, idx) => {
          const persentase = maxNominal > 0 ? (item.nominal / maxNominal) * 100 : 0;
          const isHovered = hoveredIdx === idx;
          const isAdaData = item.nominal > 0;

          return (
            <div
              key={idx}
              className="relative flex-1 flex flex-col items-center h-full justify-end group"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip Hover */}
              {isHovered && (
                <div className="absolute -top-12 z-20 px-2.5 py-1.5 bg-slate-900 text-white rounded-lg shadow-lg text-[11px] whitespace-nowrap pointer-events-none transform -translate-x-1/2 left-1/2 animate-in fade-in">
                  <div className="font-bold text-blue-300">{formatRupiah(item.nominal)}</div>
                  <div className="text-[10px] text-slate-300">{item.count} Transaksi ({item.label})</div>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
              )}

              {/* Batang / Bar */}
              <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-full">
                <div
                  style={{ height: `${Math.max(persentase, isAdaData ? 8 : 2)}%` }}
                  className={`w-full rounded-t-lg transition-all duration-300 ease-out ${
                    isAdaData
                      ? isHovered
                        ? 'bg-[#0D47A1]'
                        : 'bg-[#1565C0]'
                      : 'bg-slate-200/60'
                  }`}
                />
              </div>

              {/* Label Sumbu X */}
              <span className="mt-2 text-[10px] sm:text-xs font-medium text-slate-500 truncate max-w-full text-center group-hover:text-slate-900 group-hover:font-semibold">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
