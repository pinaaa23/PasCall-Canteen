import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import PaketPage from './pages/PaketPage';
import StatusWartelPage from './pages/StatusWartelPage';
import RiwayatPage from './pages/RiwayatPage';
import StrukPage from './pages/StrukPage';
import VoucherPage from './pages/VoucherPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route: Login Operator */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes: Operator Toko / Kantin */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<PaketPage />} />
            <Route path="/status-wartel" element={<StatusWartelPage />} />
            <Route path="/riwayat" element={<RiwayatPage />} />
            <Route path="/voucher/:id" element={<VoucherPage />} />
            <Route path="/struk/:id" element={<StrukPage />} />
            {/* Fallback route redirect to / */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
