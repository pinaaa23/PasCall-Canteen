/**
 * Service untuk Data Status Wartel (Mock / Dummy Data)
 * 
 * TODO: Ganti data mock & helper simulasi ini dengan panggilan endpoint REST API / WebSocket Backend
 * ketika endpoint backend untuk monitoring wartel sudah tersedia.
 * Contoh endpoint nanti: GET /api/wartel/status atau WebSocket ws://.../wartel
 */

const STORAGE_KEY = 'pascall_wartel_status_v2';
const EVENT_NAME = 'pascall_wartel_updated';

// Helper simulasi delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Data awal 10 unit wartel (Wartel 01 - Wartel 10)
 * Dibuat realistis dengan variasi status Tersedia & Digunakan beserta sisa waktu.
 */
export const seedWartelAwal = () => {
  return [
    { id: 1, nomor: 'Wartel 01', status: 'digunakan', sisaWaktu: 4 },
    { id: 2, nomor: 'Wartel 02', status: 'tersedia', sisaWaktu: null },
    { id: 3, nomor: 'Wartel 03', status: 'digunakan', sisaWaktu: 8 },
    { id: 4, nomor: 'Wartel 04', status: 'tersedia', sisaWaktu: null },
    { id: 5, nomor: 'Wartel 05', status: 'digunakan', sisaWaktu: 2 },
    { id: 6, nomor: 'Wartel 06', status: 'digunakan', sisaWaktu: 15 },
    { id: 7, nomor: 'Wartel 07', status: 'tersedia', sisaWaktu: null },
    { id: 8, nomor: 'Wartel 08', status: 'digunakan', sisaWaktu: 7 },
    { id: 9, nomor: 'Wartel 09', status: 'tersedia', sisaWaktu: null },
    { id: 10, nomor: 'Wartel 10', status: 'digunakan', sisaWaktu: 5 },
  ];
};

/**
 * Mengambil daftar status wartel dari localStorage atau seed default (10 unit)
 */
export function getStoredWartel() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const awal = seedWartelAwal();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(awal));
      return awal;
    }
    const parsed = JSON.parse(raw);
    // Jika data lama tidak sesuai (bukan array 10 unit), reset ke seed 10 unit
    if (!Array.isArray(parsed) || parsed.length !== 10) {
      const awal = seedWartelAwal();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(awal));
      return awal;
    }
    return parsed;
  } catch (err) {
    console.error('Gagal membaca data status wartel dari storage:', err);
    return seedWartelAwal();
  }
}

/**
 * Menyimpan data status wartel dan memicu update event agar UI tersinkronisasi
 */
export function saveStoredWartel(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
    }
  } catch (err) {
    console.error('Gagal menyimpan data status wartel:', err);
  }
}

/**
 * Mengambil data status wartel (Asynchronous)
 * TODO: Ganti dengan fetch(`${API_BASE_URL}/wartel/status`)
 */
export async function getWartelStatus() {
  await delay(200);
  return getStoredWartel();
}

/**
 * Menghitung ringkasan ketersediaan wartel
 */
export function hitungRingkasanWartel(list = []) {
  const validList = Array.isArray(list) && list.length > 0 ? list : seedWartelAwal();
  const total = validList.length;
  const digunakan = validList.filter((item) => item.status === 'digunakan').length;
  const tersedia = total - digunakan;
  return {
    total,
    tersedia,
    digunakan,
  };
}

/**
 * Mengacak ulang status wartel (Simulasi Refresh Data Server)
 * Menghasilkan variasi baru status Tersedia & Digunakan secara acak
 */
export async function refreshWartelStatus() {
  await delay(350);
  const current = getStoredWartel();
  const durasiPilihan = [2, 3, 4, 5, 7, 8, 10, 12, 15, 18];

  const randomized = current.map((item) => {
    // 60% kemungkinan digunakan, 40% tersedia
    const isDigunakan = Math.random() < 0.6;
    if (isDigunakan) {
      const sisa = durasiPilihan[Math.floor(Math.random() * durasiPilihan.length)];
      return {
        ...item,
        status: 'digunakan',
        sisaWaktu: sisa,
      };
    } else {
      return {
        ...item,
        status: 'tersedia',
        sisaWaktu: null,
      };
    }
  });

  saveStoredWartel(randomized);
  return randomized;
}

/**
 * Helper listener untuk menyinkronkan komponen saat status wartel diperbarui
 */
export function subscribeWartelUpdate(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e) => {
    callback(e.detail || getStoredWartel());
  };
  window.addEventListener(EVENT_NAME, handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
  };
}
