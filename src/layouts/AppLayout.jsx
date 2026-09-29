import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ShoppingBag, History, Calendar, Store } from 'lucide-react';
import { formatTanggal } from '../utils/format';

export default function AppLayout() {
  const location = useLocation();

  // Tentukan judul halaman berdasarkan route saat ini
  const getJudulHalaman = () => {
    if (location.pathname === '/') return 'Katalog Paket Komunikasi';
    if (location.pathname.startsWith('/riwayat')) return 'Rekap & Riwayat Transaksi';
    if (location.pathname.startsWith('/struk')) return 'Struk Bukti Transaksi';
    return 'PasCall Kantin';
  };

  const menuItems = [
    {
      to: '/',
      label: 'Paket',
      icon: ShoppingBag,
    },
    {
      to: '/riwayat',
      label: 'Riwayat',
      icon: History,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col md:flex-row text-[#1E293B]">
      {/* SIDEBAR DESKTOP / TABLET (Hidden on Mobile) */}
      <aside className="no-print hidden md:flex flex-col w-64 bg-white border-r border-[#E2E8F0] shrink-0 sticky top-0 h-screen z-30">
        {/* Logo Header */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1565C0] to-[#0D47A1] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline font-black text-xl tracking-tight leading-none">
                <span className="text-[#1E293B]">Pas</span>
                <span className="text-[#1565C0]">Call</span>
              </div>
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block mt-0.5">
                Kantin Lapas
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menus (HANYA 2 MENU: Paket & Riwayat) */}
        <nav className="flex-1 p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Menu Petugas
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#E3F2FD] text-[#1565C0] shadow-xs'
                      : 'text-[#64748B] hover:bg-slate-50 hover:text-[#1E293B]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-[#1565C0]' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Sidebar info */}
        <div className="p-4 border-t border-[#E2E8F0] bg-slate-50/50">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-xs font-bold text-slate-700">Petugas Kantin Aktif</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Mode Kasir Standalone</p>
          </div>
        </div>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        {/* TOPBAR TIPIS */}
        <header className="no-print bg-white border-b border-[#E2E8F0] sticky top-0 z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Brand icon on mobile */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1565C0] text-white flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-800">
                Pas<span className="text-[#1565C0]">Call</span>
              </span>
            </div>
            <h1 className="hidden sm:block text-base font-bold text-slate-800">
              {getJudulHalaman()}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <Calendar className="w-3.5 h-3.5 text-[#1565C0]" />
            <span>{formatTanggal(new Date(), false)}</span>
          </div>
        </header>

        {/* OUTLET KONTEN */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* BOTTOM NAVIGATION FOR MOBILE (HANYA 2 MENU: Paket & Riwayat) */}
      <nav className="no-print md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-40 px-6 py-2 flex justify-around shadow-lg">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-5 rounded-xl transition font-bold text-xs ${
                  isActive
                    ? 'text-[#1565C0]'
                    : 'text-slate-400 hover:text-slate-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl transition ${
                      isActive ? 'bg-[#E3F2FD]' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
