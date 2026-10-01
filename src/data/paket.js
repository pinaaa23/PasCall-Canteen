// TODO: TARIFF nantinya diambil dari API backend (tim BE)
export const TARIFF = {
  ratesPerSecond: {
    telepon: 15,
    video: 25,
  },
  ppnRate: 0.11,
  stepMinutes: 6,
  presets: [6, 12, 18, 24, 30, 36],
};

/**
 * Konfigurasi visibilitas Paket Combo
 * Ubah menjadi `true` untuk mengaktifkan kembali kategori & paket combo.
 */
export const ENABLE_COMBO_PACKAGES = false;

/**
 * Menghitung harga paket berdasarkan jenis paket dan durasi (menit)
 * dpp   = menit × 60 × tarifPerDetik
 * ppn   = dpp × 0,11
 * total = dpp + ppn
 *
 * @param {'telepon'|'video'} type
 * @param {number} minutes
 * @returns {{ dpp: number, ppn: number, total: number }}
 */
export function calcPrice(type, minutes) {
  const typeKey = (type || 'telepon').toLowerCase();
  const rateKey = typeKey.includes('video') ? 'video' : 'telepon';
  const rate = TARIFF.ratesPerSecond[rateKey] || 0;

  const dpp = Math.round(minutes * 60 * rate);
  const ppn = Math.round(dpp * TARIFF.ppnRate);
  const total = dpp + ppn;

  return { dpp, ppn, total };
}

/**
 * Menghasilkan daftar preset paket berdasarkan TARIFF
 *
 * @param {'telepon'|'video'} type
 * @returns {Array<{ id: string, nama: string, kategori: string, menit: number, durasi: string, keterangan: string, dpp: number, ppn: number, total: number, harga: number }>}
 */
export function buildPackages(type = 'telepon') {
  const typeKey = (type || 'telepon').toLowerCase();
  const presets = TARIFF.presets || [6, 12, 18, 24, 30, 36];

  if (typeKey === 'telepon') {
    return presets.map((min) => {
      const { dpp, ppn, total } = calcPrice('telepon', min);
      return {
        id: `pkt-telp-${min}`,
        nama: `Paket Telepon ${min} Menit`,
        kategori: 'telepon',
        menit: min,
        durasi: `${min} Menit`,
        keterangan: 'Semua Operator',
        dpp,
        ppn,
        total,
        harga: total,
      };
    });
  }

  if (typeKey === 'video' || typeKey === 'video call') {
    return presets.map((min) => {
      const { dpp, ppn, total } = calcPrice('video', min);
      return {
        id: `pkt-video-${min}`,
        nama: `Paket Video ${min} Menit`,
        kategori: 'video',
        menit: min,
        durasi: `${min} Menit`,
        keterangan: 'Semua Operator',
        dpp,
        ppn,
        total,
        harga: total,
      };
    });
  }

  return [];
}

export const daftarPaketTelepon = buildPackages('telepon');
export const daftarPaketVideo = buildPackages('video');
export const daftarPaket = [...daftarPaketTelepon, ...daftarPaketVideo];
