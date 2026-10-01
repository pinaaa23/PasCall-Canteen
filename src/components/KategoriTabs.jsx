import React from 'react';
import { Phone, Video, Layers } from 'lucide-react';
import { ENABLE_COMBO_PACKAGES } from '../data/paket';

const allTabs = [
  { id: 'telepon', label: 'Telepon', icon: Phone },
  { id: 'video', label: 'Video Call', icon: Video },
  { id: 'combo', label: 'Combo', icon: Layers },
];

export default function KategoriTabs({ kategoriAktif, onPilihKategori }) {
  const tabs = ENABLE_COMBO_PACKAGES
    ? allTabs
    : allTabs.filter((tab) => tab.id !== 'combo');

  return (
    <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl w-fit max-w-full overflow-x-auto shadow-inner">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isAktif = kategoriAktif === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onPilihKategori(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
              isAktif
                ? 'bg-[#1565C0] text-white shadow-sm scale-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Icon className={`w-4 h-4 ${isAktif ? 'text-white' : 'text-slate-500'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
