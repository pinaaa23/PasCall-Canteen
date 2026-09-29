import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FilterPeriode({
  periode,
  onUbahPeriode,
  tanggal,
  onUbahTanggal,
}) {
  const formatInputDate = (dateObj) => {
    const d = new Date(dateObj);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatInputMonth = (dateObj) => {
    const d = new Date(dateObj);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${yyyy}-${mm}`;
  };

  const currentYear = new Date(tanggal).getFullYear();

  const handleDateChange = (e) => {
    const val = e.target.value;
    if (val) {
      onUbahTanggal(new Date(val));
    }
  };

  const handleMonthChange = (e) => {
    const val = e.target.value; // "YYYY-MM"
    if (val) {
      const [y, m] = val.split('-');
      const newD = new Date(tanggal);
      newD.setFullYear(parseInt(y, 10));
      newD.setMonth(parseInt(m, 10) - 1);
      onUbahTanggal(new Date(newD));
    }
  };

  const handleYearChange = (e) => {
    const y = parseInt(e.target.value, 10);
    const newD = new Date(tanggal);
    newD.setFullYear(y);
    onUbahTanggal(new Date(newD));
  };

  const setHariIni = () => {
    onUbahTanggal(new Date());
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      {/* Tab Pilihan Periode (Harian, Bulanan, Tahunan) */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
        {[
          { id: 'harian', label: 'Harian' },
          { id: 'bulanan', label: 'Bulanan' },
          { id: 'tahunan', label: 'Tahunan' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onUbahPeriode(item.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              periode === item.id
                ? 'bg-[#1565C0] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Kontrol Pemilih Waktu */}
      <div className="flex items-center gap-2">
        {periode === 'harian' && (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <input
                type="date"
                value={formatInputDate(tanggal)}
                onChange={handleDateChange}
                className="pl-3 pr-2 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={setHariIni}
              className="px-2.5 py-1.5 text-xs font-semibold text-[#1565C0] bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
            >
              Hari Ini
            </button>
          </div>
        )}

        {periode === 'bulanan' && (
          <div className="flex items-center gap-2">
            <input
              type="month"
              value={formatInputMonth(tanggal)}
              onChange={handleMonthChange}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {periode === 'tahunan' && (
          <div className="flex items-center gap-2">
            <select
              value={currentYear}
              onChange={handleYearChange}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-blue-500"
            >
              {[2024, 2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>
                  Tahun {y}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
