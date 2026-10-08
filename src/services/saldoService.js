/**
 * Saldo Service — PasCall Kantin
 * ================================
 * Service layer untuk semua operasi saldo kantin.
 *
 * PENTING:
 * Fitur saldo SELALU memakai data dummy selama endpoint BE saldo belum ada,
 * WALAUPUN saklar VITE_USE_DUMMY dalam keadaan mati.
 * Ini berbeda dengan service lain (kantinService, wartelService) yang mengecek isDummyMode().
 *
 * CARA MIGRASI KE BACKEND NANTI:
 * 1. Ganti isi fungsi getSaldo()           → panggil GET /api/canteen/saldo
 * 2. Ganti isi fungsi getRiwayatTopUp()    → panggil GET /api/canteen/saldo/riwayat
 * 3. Ganti isi fungsi prosesTopUp()        → panggil POST /api/canteen/saldo/topup
 * 4. Ganti isi fungsi cekDanPotongSaldo()  → panggil POST /api/canteen/saldo/potong
 * 5. Hapus import dari saldoDummy.js dan localStorage usage
 */

import {
  PPN_RATE,
  SALDO_AWAL,
  SALDO_MINIMUM_WARNING,
  NOMINAL_TOPUP_OPTIONS,
  generateRiwayatTopUpDummy,
} from '../dummy/saldoDummy';

// Re-export konstanta agar komponen cukup import dari service ini
export { PPN_RATE, SALDO_MINIMUM_WARNING, NOMINAL_TOPUP_OPTIONS };

const STORAGE_KEY_SALDO = 'pascall_kantin_saldo';
const STORAGE_KEY_RIWAYAT = 'pascall_kantin_saldo_riwayat';

// Simulasi delay network
const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Subscribers untuk reactive update (dipakai oleh sidebar badge) ---
const subscribers = [];

function notifySubscribers(saldo) {
  subscribers.forEach((cb) => cb(saldo));
}

/**
 * Subscribe untuk menerima update saldo secara realtime.
 * Digunakan oleh SaldoBadgeSidebar.
 * @param {Function} callback - menerima saldo (number)
 * @returns {Function} unsubscribe
 */
export function subscribeSaldoUpdate(callback) {
  subscribers.push(callback);
  return () => {
    const idx = subscribers.indexOf(callback);
    if (idx > -1) subscribers.splice(idx, 1);
  };
}

// --- Internal helpers ---

function getStoredSaldo() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SALDO);
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY_SALDO, JSON.stringify(SALDO_AWAL));
      return SALDO_AWAL;
    }
    return JSON.parse(raw);
  } catch {
    return SALDO_AWAL;
  }
}

function saveStoredSaldo(nilai) {
  try {
    localStorage.setItem(STORAGE_KEY_SALDO, JSON.stringify(nilai));
    notifySubscribers(nilai);
  } catch (err) {
    console.error('Error saving saldo to localStorage:', err);
  }
}

function getStoredRiwayat() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RIWAYAT);
    if (raw === null) {
      const awal = generateRiwayatTopUpDummy();
      localStorage.setItem(STORAGE_KEY_RIWAYAT, JSON.stringify(awal));
      return awal;
    }
    return JSON.parse(raw);
  } catch {
    return generateRiwayatTopUpDummy();
  }
}

function saveStoredRiwayat(data) {
  try {
    localStorage.setItem(STORAGE_KEY_RIWAYAT, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving riwayat to localStorage:', err);
  }
}

// =============================================================================
// PUBLIC API — Ganti isi fungsi-fungsi di bawah ini saat migrasi ke backend
// =============================================================================

/**
 * Mengambil sisa saldo kantin saat ini.
 * TODO BE: Ganti dengan GET /api/canteen/saldo
 * @returns {Promise<number>}
 */
export async function getSaldo() {
  await delay(150);
  return getStoredSaldo();
}

/**
 * Mengambil saldo secara sinkron (untuk pengecekan cepat di komponen).
 * TODO BE: Hapus fungsi ini, gunakan getSaldo() async saja.
 * @returns {number}
 */
export function getSaldoSync() {
  return getStoredSaldo();
}

/**
 * Mengambil daftar riwayat top up, diurutkan terbaru di atas.
 * TODO BE: Ganti dengan GET /api/canteen/saldo/riwayat
 * @returns {Promise<Array>}
 */
export async function getRiwayatTopUp() {
  await delay(200);
  const list = getStoredRiwayat();
  list.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  return list;
}

/**
 * Memproses top up saldo kantin.
 * Saldo bertambah sebesar NOMINAL (bukan total bayar/nominal + PPN).
 * TODO BE: Ganti dengan POST /api/canteen/saldo/topup
 *
 * @param {number} nominal - Nominal saldo yang dipilih (misal 500000, 1000000, 2000000)
 * @returns {Promise<{ success: boolean, saldoBaru: number, topup: object }>}
 */
export async function prosesTopUp(nominal) {
  await delay(400);

  const ppn = Math.round(nominal * PPN_RATE);
  const totalBayar = nominal + ppn;

  const saldoLama = getStoredSaldo();
  // Saldo bertambah sebesar NOMINAL, bukan total bayar
  const saldoBaru = saldoLama + nominal;

  // Simpan saldo baru
  saveStoredSaldo(saldoBaru);

  // Buat entri riwayat baru
  const riwayat = getStoredRiwayat();
  const nextId = `TPU-${String(riwayat.length + 1).padStart(3, '0')}`;

  const entriBaru = {
    id: nextId,
    tanggal: new Date().toISOString(),
    nominal,
    ppn,
    totalBayar,
    status: 'Berhasil',
  };

  const updatedRiwayat = [entriBaru, ...riwayat];
  saveStoredRiwayat(updatedRiwayat);

  return {
    success: true,
    saldoBaru,
    topup: entriBaru,
  };
}

/**
 * Cek apakah saldo cukup untuk membeli paket, dan potong saldo jika cukup.
 *
 * FUNGSI INI SATU-SATUNYA TEMPAT pengecekan & pemotongan saldo untuk pembelian paket.
 * Aturan finalnya nanti mengikuti backend.
 *
 * TODO BE: Ganti dengan POST /api/canteen/saldo/potong
 *          Body: { hargaPaket: number }
 *          Response: { success: boolean, saldoBaru: number, message?: string }
 *
 * @param {number} hargaPaket - Harga paket yang akan dibeli
 * @returns {{ cukup: boolean, saldoSekarang: number, saldoSetelah: number }}
 */
export function cekDanPotongSaldo(hargaPaket) {
  const saldoSekarang = getStoredSaldo();

  if (saldoSekarang < hargaPaket) {
    return {
      cukup: false,
      saldoSekarang,
      saldoSetelah: saldoSekarang,
    };
  }

  const saldoSetelah = saldoSekarang - hargaPaket;
  saveStoredSaldo(saldoSetelah);

  return {
    cukup: true,
    saldoSekarang,
    saldoSetelah,
  };
}
