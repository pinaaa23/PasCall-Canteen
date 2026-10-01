import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, History, Calendar, Store, PhoneCall, LogOut, User } from 'lucide-react';
import { formatTanggal } from '../utils/format';
import { useAuth } from '../context/AuthContext';
import WartelBadgeSidebar from '../components/WartelBadgeSidebar';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Tentukan judul halaman berdasarkan route saat ini
  const getJudulHalaman = () => {
    if (location.pathname === '/') return 'Katalog Paket Komunikasi';
    if (location.pathname.startsWith('/status-wartel')) return 'Status Wartel Lapas';
    if (location.pathname.startsWith('/riwayat')) return 'Rekap & Riwayat Transaksi';
    if (location.pathname.startsWith('/struk')) return 'Struk Bukti Transaksi';
    if (location.pathname.startsWith('/voucher')) return 'Voucher Transaksi';
    return 'PasCall Kantin';
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari sesi Kasir Operator?')) {
      logout();
      navigate('/login', { replace: true });
    }
  };

  const menuItems = [
    {
      to: '/',
      label: 'Paket',
      icon: ShoppingBag,
    },
    {
      to: '/status-wartel',
      label: 'Status Wartel',
      icon: PhoneCall,
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

        {/* Navigation Menus (Paket, Status Wartel, Riwayat) */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
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

          {/* Badge Ringkas Status Wartel di Bawah Menu Navigasi */}
          <div className="pt-4 px-1">
            <div className="px-2 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Ketersediaan Unit
            </div>
            <WartelBadgeSidebar />
          </div>
        </nav>

        {/* Footer Sidebar: Info Operator & Tombol Logout */}
        <div className="p-4 border-t border-[#E2E8F0] bg-slate-50/70 space-y-2.5">
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1565C0] flex items-center justify-center font-bold shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-800 truncate" title={user?.name || 'Operator Toko'}>
                  {user?.name || 'Operator Toko'}
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate">
                  {user?.role || 'Operator Kantin'}
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 rounded-xl transition cursor-pointer border border-rose-200/60 shadow-2xs"
            title="Keluar dari sesi kasir"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        {/* TOPBAR */}
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

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <Calendar className="w-3.5 h-3.5 text-[#1565C0]" />
              <span>{formatTanggal(new Date(), false)}</span>
            </div>

            {/* Mobile Logout Quick Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="md:hidden p-2 text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* OUTLET KONTEN */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* BOTTOM NAVIGATION FOR MOBILE (Paket, Status Wartel, Riwayat) */}
      <nav className="no-print md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-40 px-3 py-2 flex justify-around shadow-lg">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 sm:px-5 rounded-xl transition font-bold text-xs ${
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
