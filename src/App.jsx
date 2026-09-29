import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import PaketPage from './pages/PaketPage';
import RiwayatPage from './pages/RiwayatPage';
import StrukPage from './pages/StrukPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<PaketPage />} />
          <Route path="/riwayat" element={<RiwayatPage />} />
          <Route path="/struk/:id" element={<StrukPage />} />
          {/* Fallback route redirect to / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
