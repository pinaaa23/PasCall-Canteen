import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTransaksiById } from '../services/kantinService';
import StrukTransaksi from '../components/StrukTransaksi';
import EmptyState from '../components/EmptyState';
import { FileX } from 'lucide-react';

export default function StrukPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStruk = async () => {
      setIsLoading(true);
      try {
        const data = await getTransaksiById(id);
        if (isMounted) {
          setTransaksi(data);
        }
      } catch (err) {
        console.error('Gagal mengambil data transaksi:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStruk();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-xs animate-pulse space-y-4">
        <div className="w-14 h-14 bg-slate-200 rounded-full mx-auto" />
        <div className="h-6 bg-slate-200 rounded-md w-3/4 mx-auto" />
        <div className="h-4 bg-slate-100 rounded-md w-1/2 mx-auto" />
        <div className="space-y-3 pt-6">
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!transaksi) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <EmptyState
          title="Transaksi Tidak Ditemukan"
          description={`Data transaksi dengan ID "${id}" tidak ditemukan dalam catatan kantin.`}
          icon={FileX}
          actionText="Kembali ke Paket"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="py-2 animate-in fade-in duration-300">
      <StrukTransaksi transaksi={transaksi} />
    </div>
  );
}
