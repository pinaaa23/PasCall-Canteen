import React from 'react';
import { PackageOpen, AlertCircle, FileSearch, Inbox } from 'lucide-react';

export default function EmptyState({
  title = 'Data Tidak Ditemukan',
  description = 'Tidak ada data yang sesuai untuk ditampilkan saat ini.',
  icon: Icon = Inbox,
  actionText,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="w-16 h-16 mb-4 rounded-2xl bg-blue-50 text-[#1565C0] flex items-center justify-center">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1565C0] hover:bg-[#0D47A1] rounded-xl transition shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
