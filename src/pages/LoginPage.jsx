import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Check 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Form State - Sama persis dengan Login Superadmin & Kepala UPT
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');

    if (!identifier.trim()) {
      setError('Nomor HP atau email tidak boleh kosong.');
      return;
    }

    if (!password) {
      setError('Kata sandi tidak boleh kosong.');
      return;
    }

    if (password.length < 6) {
      setError('Kata sandi minimal harus terdiri dari 6 karakter.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message || 'Email/nomor atau kata sandi salah.');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada sistem, silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen h-screen w-full flex flex-col items-center justify-center p-3 sm:p-4 text-[#101828] select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #f2f7fe 0%, #e6effa 50%, #d8e5f8 100%)',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      {/* ================================================================
          BACKGROUND DECORATIVE ELEMENTS (Subtle, Atmospheric & Non-intrusive)
          ================================================================ */}
      {/* 1. Ambient Corner Blur Blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'linear-gradient(135deg, #cde1fe 0%, #dbeafe 100%)',
          filter: 'blur(75px)',
          opacity: 0.5,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-80 sm:w-[440px] h-80 sm:h-[440px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'linear-gradient(135deg, #c7d2fe 0%, #bfdbfe 100%)',
          filter: 'blur(80px)',
          opacity: 0.4,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -right-16 w-60 sm:w-72 h-60 sm:h-72 rounded-full pointer-events-none -z-10"
        style={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          filter: 'blur(65px)',
          opacity: 0.45,
        }}
      />

      {/* 2. Dashed Orbit Circles */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-[480px] sm:w-[560px] h-[480px] sm:h-[560px] rounded-full border-[1.5px] border-dashed border-[#60a5fa]/30 pointer-events-none -z-10 lp-dash-spin-2"
      />
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-8 w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-dashed border-[#818cf8]/25 pointer-events-none -z-10 lp-dash-spin-1"
      />

      {/* 3. Subtle Accent Dots */}
      <div aria-hidden="true" className="absolute top-14 left-8 sm:left-24 w-2 h-2 rounded-full bg-[#2f6fed] opacity-45 pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute top-1/3 left-6 sm:left-16 w-1.5 h-1.5 rounded-full bg-[#60a5fa] opacity-60 pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute bottom-20 left-10 sm:left-24 w-2.5 h-2.5 rounded-full bg-[#93c5fd] opacity-55 pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute top-20 right-10 sm:right-28 w-2 h-2 rounded-full bg-[#818cf8] opacity-50 pointer-events-none -z-10" />
      <div aria-hidden="true" className="absolute bottom-28 right-8 sm:right-20 w-2.5 h-2.5 rounded-full bg-[#2f6fed] opacity-40 pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center my-auto">
        {/* ================================================================
            MAIN NEUMORPHIC CARD (Identik dengan Superadmin / Kepala UPT)
            ================================================================ */}
        <main
          className="relative w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 flex flex-col items-center border border-white/50"
          style={{
            backgroundColor: '#dce6f8',
            boxShadow: '16px 16px 36px rgba(145, 165, 195, 0.78), -16px -16px 36px rgba(255, 255, 255, 0.95)',
          }}
        >
          {/* 1. Neumorphic Avatar Brand Icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center -mt-1 mb-3 transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: '#dce6f8',
              boxShadow: '5px 5px 12px #b6c9e4, -5px -5px 12px #ffffff',
            }}
            aria-hidden="true"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#dce6f8',
                boxShadow: 'inset 2px 2px 4px #b6c9e4, inset -2px -2px 4px #ffffff',
              }}
            >
              <svg width="20" height="15" viewBox="0 0 32 24" fill="none" aria-hidden="true">
                <path d="M2 20 C6 6, 10 6, 14 14 C18 22, 22 4, 26 8 C28 10, 30 6, 30 4" stroke="url(#neu-card-g)" strokeWidth="3.6" strokeLinecap="round" fill="none"/>
                <defs>
                  <linearGradient id="neu-card-g" x1="0" y1="12" x2="32" y2="12">
                    <stop offset="0%" stopColor="#2f6fed"/>
                    <stop offset="100%" stopColor="#60a5fa"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* 2. Header Text */}
          <h1 className="text-xl font-extrabold text-[#101828] tracking-tight text-center leading-tight">
            Masuk ke PasCall
          </h1>
          <p className="text-xs text-[#475467] font-medium mt-1 mb-4 text-center leading-relaxed max-w-[280px]">
            Portal Layanan Komunikasi &amp; Kasir Kantin Lapas
          </p>

          {/* Error Alert Message */}
          {error && (
            <div
              className="w-full mb-3 p-2.5 rounded-xl text-xs font-semibold text-rose-600 flex items-center gap-2"
              style={{
                backgroundColor: '#fce8e8',
                boxShadow: 'inset 2px 2px 4px #eec4c4, inset -2px -2px 4px #ffffff',
              }}
            >
              <AlertCircle size={15} className="shrink-0 text-rose-500" />
              <span className="text-[11.5px]">{error}</span>
            </div>
          )}

          {/* 3. Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-3">
            
            {/* Input 1: Nomor HP atau Email */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-[#344054] ml-1">
                Nomor HP atau Email
              </label>
              <div
                className="relative flex items-center rounded-xl transition-all focus-within:ring-2 focus-within:ring-[#2f6fed]/40"
                style={{
                  backgroundColor: '#dce6f8',
                  boxShadow: 'inset 3px 3px 6px #b6c9e4, inset -3px -3px 6px #ffffff',
                }}
              >
                <div className="pl-3.5 text-[#2f6fed] pointer-events-none flex items-center justify-center">
                  <Mail size={16} strokeWidth={2.2} />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="kantin.cipinang@pascall.id"
                  className="w-full py-2.5 pl-2.5 pr-3 bg-transparent text-xs sm:text-sm font-semibold text-[#101828] placeholder-[#7d8fa9] focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Input 2: Kata Sandi */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-[#344054] ml-1">
                Kata Sandi
              </label>
              <div
                className="relative flex items-center rounded-xl transition-all focus-within:ring-2 focus-within:ring-[#2f6fed]/40"
                style={{
                  backgroundColor: '#dce6f8',
                  boxShadow: 'inset 3px 3px 6px #b6c9e4, inset -3px -3px 6px #ffffff',
                }}
              >
                <div className="pl-3.5 text-[#2f6fed] pointer-events-none flex items-center justify-center">
                  <Lock size={16} strokeWidth={2.2} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi Anda"
                  className="w-full py-2.5 pl-2.5 pr-10 bg-transparent text-xs sm:text-sm font-semibold text-[#101828] placeholder-[#7d8fa9] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-[#64748b] hover:text-[#2f6fed] transition-colors cursor-pointer rounded-lg"
                  title={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Ingat Saya */}
            <div className="flex items-center justify-between pt-0.5 text-xs">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-1.5 cursor-pointer select-none text-[#475467] hover:text-[#101828] font-medium"
              >
                <div
                  className="w-4 h-4 rounded-md flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: '#dce6f8',
                    boxShadow: rememberMe
                      ? 'inset 2px 2px 3px #b6c9e4, inset -2px -2px 3px #ffffff'
                      : '2px 2px 3px #b6c9e4, -2px -2px 3px #ffffff',
                  }}
                >
                  {rememberMe && <Check size={11} className="text-[#2f6fed] stroke-[3.5]" />}
                </div>
                <span className="text-[11px]">Ingat saya</span>
              </button>

              <span className="text-[11px] font-bold text-[#2f6fed]">
                Kasir UPT
              </span>
            </div>

            {/* 4. Primary Submit Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-5 rounded-xl font-bold text-white text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#2f6fed]/40"
                style={{
                  backgroundColor: '#2f6fed',
                  boxShadow: '5px 5px 14px rgba(47, 111, 237, 0.45), -5px -5px 14px rgba(255, 255, 255, 0.85)',
                }}
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Memverifikasi...</span>
                  </span>
                ) : (
                  <>
                    <span>Masuk ke Akun</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          </form>
        </main>

        {/* Bottom Legal / Copyright */}
        <footer className="mt-3 text-center text-[10px] font-medium text-[#64748b]">
          &copy; {new Date().getFullYear()} PasCall. Sistem Layanan Terpadu Lembaga Pemasyarakatan.
        </footer>
      </div>
    </div>
  );
}
