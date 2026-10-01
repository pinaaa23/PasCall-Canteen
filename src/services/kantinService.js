import { buildPackages, daftarPaket, ENABLE_COMBO_PACKAGES } from '../data/paket';
import { daftarWbp } from '../data/napi';
import { buatIdTransaksi } from '../utils/format';

const STORAGE_KEY = 'pascall_kantin_transaksi';

// Helper simulasi delay network API
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Data transaksi awal (12 data contoh metode Tunai)
const seedTransaksiAwal = () => {
  const sekarang = new Date();
  const thn = sekarang.getFullYear();
  const bln = sekarang.getMonth(); // 0-indexed
  const tgl = sekarang.getDate();

  const telpPkts = buildPackages('telepon');
  const videoPkts = buildPackages('video');

  return [
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl, 8, 30)),
      kodeVoucher: '74921',
      napi: { id: 'NIP-0001', nama: 'Budi Santoso', noTelp: '081234567801', blok: 'Blok A - Kamar 04' },
      paket: telpPkts[0], // Paket Telepon 6 Menit (5.994)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 8, 30).toISOString(),
    },
    {
      id: buatIdTransaksi(2, new Date(thn, bln, tgl, 9, 15)),
      kodeVoucher: '38902',
      napi: { id: 'NIP-0002', nama: 'Ahmad Fauzi', noTelp: '081234567802', blok: 'Blok B - Kamar 12' },
      paket: videoPkts[1], // Paket Video 12 Menit (19.980)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 9, 15).toISOString(),
    },
    {
      id: buatIdTransaksi(3, new Date(thn, bln, tgl, 11, 20)),
      kodeVoucher: '48173',
      napi: { id: 'NIP-0003', nama: 'Joko Prasetyo', noTelp: '081234567803', blok: 'Blok A - Kamar 09' },
      paket: telpPkts[2], // Paket Telepon 18 Menit (17.982)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 11, 20).toISOString(),
    },
    {
      id: buatIdTransaksi(4, new Date(thn, bln, tgl, 14, 5)),
      kodeVoucher: '82509',
      napi: { id: 'NIP-0004', nama: 'Hendra Gunawan', noTelp: '081234567804', blok: 'Blok C - Kamar 02' },
      paket: telpPkts[3], // Paket Telepon 24 Menit (23.976)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 14, 5).toISOString(),
    },
    {
      id: buatIdTransaksi(5, new Date(thn, bln, tgl, 16, 45)),
      kodeVoucher: '64821',
      napi: { id: 'NIP-0005', nama: 'Rizky Pratama', noTelp: '081234567805', blok: 'Blok B - Kamar 07' },
      paket: videoPkts[2], // Paket Video 18 Menit (29.970)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 16, 45).toISOString(),
    },
    // Transaksi kemarin
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl - 1, 9, 10)),
      kodeVoucher: '53914',
      napi: { id: 'NIP-0006', nama: 'Dian Saputra', noTelp: '081234567806', blok: 'Blok D - Kamar 01' },
      paket: telpPkts[4], // Paket Telepon 30 Menit (29.970)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 1, 9, 10).toISOString(),
    },
    {
      id: buatIdTransaksi(2, new Date(thn, bln, tgl - 1, 13, 40)),
      kodeVoucher: '27408',
      napi: { id: 'NIP-0007', nama: 'Agus Setiawan', noTelp: '081234567807', blok: 'Blok C - Kamar 15' },
      paket: videoPkts[3], // Paket Video 24 Menit (39.960)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 1, 13, 40).toISOString(),
    },
    {
      id: buatIdTransaksi(3, new Date(thn, bln, tgl - 1, 15, 20)),
      kodeVoucher: '95371',
      napi: { id: 'NIP-0008', nama: 'Muhammad Ridwan', noTelp: '081234567808', blok: 'Blok A - Kamar 03' },
      paket: telpPkts[1], // Paket Telepon 12 Menit (11.988)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 1, 15, 20).toISOString(),
    },
    // Transaksi 3 hari lalu
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl - 3, 10, 0)),
      kodeVoucher: '49618',
      napi: { id: 'NIP-0001', nama: 'Budi Santoso', noTelp: '081234567801', blok: 'Blok A - Kamar 04' },
      paket: telpPkts[5], // Paket Telepon 36 Menit (35.964)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 3, 10, 0).toISOString(),
    },
    {
      id: buatIdTransaksi(2, new Date(thn, bln, tgl - 3, 14, 15)),
      kodeVoucher: '73289',
      napi: { id: 'NIP-0002', nama: 'Ahmad Fauzi', noTelp: '081234567802', blok: 'Blok B - Kamar 12' },
      paket: videoPkts[0], // Paket Video 6 Menit (9.990)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 3, 14, 15).toISOString(),
    },
    // Transaksi 5 hari lalu
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl - 5, 11, 30)),
      kodeVoucher: '86412',
      napi: { id: 'NIP-0003', nama: 'Joko Prasetyo', noTelp: '081234567803', blok: 'Blok A - Kamar 09' },
      paket: videoPkts[4], // Paket Video 30 Menit (49.950)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 5, 11, 30).toISOString(),
    },
    // Transaksi bulan lalu
    {
      id: buatIdTransaksi(1, new Date(thn, bln - 1, 15, 10, 30)),
      kodeVoucher: '37951',
      napi: { id: 'NIP-0004', nama: 'Hendra Gunawan', noTelp: '081234567804', blok: 'Blok C - Kamar 02' },
      paket: telpPkts[0], // Paket Telepon 6 Menit (5.994)
      metode: 'Tunai',
      waktu: new Date(thn, bln - 1, 15, 10, 30).toISOString(),
    },
  ];
};

const getStoredTransaksi = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const awal = seedTransaksiAwal();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(awal));
      return awal;
    }
    const parsed = JSON.parse(raw);
    let modified = false;
    const seenIds = new Set();
    const normalized = parsed
      .filter((item) => {
        if (!ENABLE_COMBO_PACKAGES && item.paket?.kategori === 'combo') {
          modified = true;
          return false;
        }
        return true;
      })
      .map((item, idx) => {
        let current = { ...item };
        if (current.metode !== 'Tunai') {
          current.metode = 'Tunai';
          modified = true;
        }
        // Normalize WBP- prefix to NIP-
        if (current.napi?.id && current.napi.id.startsWith('WBP-')) {
          current.napi = {
            ...current.napi,
            id: current.napi.id.replace(/^WBP-/, 'NIP-'),
          };
          modified = true;
        }
        // Normalize legacy voucher code format (e.g. PAS-XXXX-XXXX) to 5-digit format
        if (current.kodeVoucher && current.kodeVoucher.startsWith('PAS-')) {
          current.kodeVoucher = buatKodeVoucher();
          modified = true;
        }
        if (seenIds.has(current.id)) {
          current.id = `${current.id}-${idx + 1}`;
          modified = true;
        } else if (current.id) {
          seenIds.add(current.id);
        }
        return current;
      });
    if (modified) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch (err) {
    console.error('Error reading localStorage:', err);
    return seedTransaksiAwal();
  }
};

const saveStoredTransaksi = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};

/**
 * Mengambil daftar paket berdasarkan kategori (telepon / video)
 */
export async function getPaket(kategori = 'telepon') {
  await delay(250);
  const typeKey = (kategori || 'telepon').toLowerCase();
  if (typeKey === 'semua') {
    return daftarPaket;
  }
  return buildPackages(typeKey);
}

/**
 * Mencari data pelanggan berdasarkan NIP atau No. Telepon
 * Mendukung pencarian: "NIP-0001", "WBP-0001", "0001", "081234567801", "0812-3456-7801", "+6281234567801"
 */
export async function cariWbpByIdAtauTelp(queryInput) {
  await delay(300);
  if (!queryInput) return null;

  const rawQuery = queryInput.toString().trim();
  const cleanQuery = rawQuery.replace(/[\s\-_+.]/g, '').toUpperCase();

  // Jika input berupa nomor telepon (misal: 62812... -> 0812...)
  const phoneNormalized = cleanQuery.startsWith('62')
    ? '0' + cleanQuery.slice(2)
    : cleanQuery;

  const found = daftarWbp.find((item) => {
    const cleanId = item.id.replace(/[\s\-_]/g, '').toUpperCase();
    const cleanTelp = (item.noTelp || '').replace(/[\s\-_+.]/g, '');
    
    // Cocokkan NIP (NIP-0001 / NIP0001 / WBP0001) atau nomor digitnya (0001)
    const matchId =
      cleanId === cleanQuery ||
      cleanId.includes(cleanQuery) ||
      cleanId.replace('NIP', 'WBP') === cleanQuery ||
      cleanQuery.replace('WBP', 'NIP') === cleanId ||
      item.id.toUpperCase() === rawQuery.toUpperCase();
    
    // Cocokkan nomor telepon
    const matchTelp =
      cleanTelp === phoneNormalized ||
      cleanTelp.endsWith(phoneNormalized) ||
      cleanTelp.includes(phoneNormalized);

    return matchId || matchTelp;
  });

  return found || null;
}

// Alias untuk menjaga backward compatibility
export const cariNapiById = cariWbpByIdAtauTelp;

/**
 * Menghasilkan kode voucher unik 5 angka acak (contoh: 74921)
 * Memudahkan warga binaan (napi) untuk menghafal dan menginput ke wartelsus
 */
export function buatKodeVoucher(existingCodes = []) {
  const existingSet = new Set(
    existingCodes.filter(Boolean).map((c) => c.toString().trim())
  );

  let code = '';
  let attempts = 0;
  do {
    // Generate 5 digit angka acak antara 10000 s/d 99999
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    code = randomNum.toString();
    attempts++;
  } while (existingSet.has(code) && attempts < 100);

  return code;
}

/**
 * Membuat transaksi baru dengan nomor urut naik per hari dan waktu terkini
 */
export async function buatTransaksi({ napi, paket, metode }) {
  await delay(400);
  const list = getStoredTransaksi();
  const sekarang = new Date();
  
  // Hitung berapa transaksi yang sudah ada pada hari ini untuk nomor urut
  const yyyy = sekarang.getFullYear();
  const mm = sekarang.getMonth();
  const dd = sekarang.getDate();

  const trxHariIni = list.filter((item) => {
    const t = new Date(item.waktu);
    return (
      t.getFullYear() === yyyy &&
      t.getMonth() === mm &&
      t.getDate() === dd
    );
  });

  let maxSeq = 0;
  trxHariIni.forEach((item) => {
    const match = (item.id || '').match(/-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxSeq) maxSeq = num;
    }
  });

  const nextSeq = Math.max(maxSeq + 1, trxHariIni.length + 1);
  const newId = buatIdTransaksi(nextSeq, sekarang);

  // Buat kode voucher unik
  const existingVouchers = list.map((item) => item.kodeVoucher);
  const kodeVoucher = buatKodeVoucher(existingVouchers);

  const transaksiBaru = {
    id: newId,
    kodeVoucher,
    napi,
    paket,
    metode: 'Tunai',
    waktu: sekarang.toISOString(),
  };

  const updatedList = [transaksiBaru, ...list];
  saveStoredTransaksi(updatedList);

  return transaksiBaru;
}

/**
 * Mengambil detail transaksi berdasarkan ID
 */
export async function getTransaksiById(id) {
  await delay(250);
  if (!id) return null;
  const list = getStoredTransaksi();
  const found = list.find((item) => item.id.toUpperCase() === id.trim().toUpperCase());
  return found || null;
}

/**
 * Mengambil riwayat transaksi dengan filter pencarian, metode, periode, dan tanggal
 */
export async function getRiwayat({ cari = '', metode = 'Semua', periode = 'harian', tanggal = new Date() } = {}) {
  await delay(300);
  let list = getStoredTransaksi();

  const targetDate = new Date(tanggal);
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetDay = targetDate.getDate();

  // Filter berdasarkan periode
  list = list.filter((item) => {
    const d = new Date(item.waktu);
    if (periode === 'harian') {
      return (
        d.getFullYear() === targetYear &&
        d.getMonth() === targetMonth &&
        d.getDate() === targetDay
      );
    } else if (periode === 'bulanan') {
      return (
        d.getFullYear() === targetYear &&
        d.getMonth() === targetMonth
      );
    } else if (periode === 'tahunan') {
      return d.getFullYear() === targetYear;
    }
    return true;
  });

  // Filter berdasarkan metode bayar
  if (metode && metode !== 'Semua') {
    list = list.filter((item) => item.metode.toLowerCase() === metode.toLowerCase());
  }

  // Filter pencarian (ID Transaksi, Nama, NIP, No Telp, Nama Paket, Kode Voucher)
  if (cari && cari.trim()) {
    const q = cari.trim().toLowerCase();
    list = list.filter((item) => {
      const idTrx = (item.id || '').toLowerCase();
      const voucher = (item.kodeVoucher || '').toLowerCase();
      const namaPelanggan = (item.napi?.nama || '').toLowerCase();
      const nip = (item.napi?.id || '').toLowerCase();
      const noTelp = (item.napi?.noTelp || '').toLowerCase();
      const namaPaket = (item.paket?.nama || '').toLowerCase();
      return (
        idTrx.includes(q) ||
        voucher.includes(q) ||
        namaPelanggan.includes(q) ||
        nip.includes(q) ||
        noTelp.includes(q) ||
        namaPaket.includes(q)
      );
    });
  }

  // Urutkan terbaru di atas
  list.sort((a, b) => new Date(b.waktu) - new Date(a.waktu));

  return list;
}

/**
 * Mengambil rekap pemasukan, jumlah transaksi, breakdown per metode bayar, dan data chart
 */
export async function getRekap({ periode = 'harian', tanggal = new Date() } = {}) {
  await delay(300);
  const list = getStoredTransaksi();
  const targetDate = new Date(tanggal);
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetDay = targetDate.getDate();

  // Filter sesuai periode
  const filtered = list.filter((item) => {
    const d = new Date(item.waktu);
    if (periode === 'harian') {
      return (
        d.getFullYear() === targetYear &&
        d.getMonth() === targetMonth &&
        d.getDate() === targetDay
      );
    } else if (periode === 'bulanan') {
      return (
        d.getFullYear() === targetYear &&
        d.getMonth() === targetMonth
      );
    } else if (periode === 'tahunan') {
      return d.getFullYear() === targetYear;
    }
    return true;
  });

  // Hitung total & breakdown
  let totalPemasukan = 0;
  const jumlahTransaksi = filtered.length;

  const perMetode = {
    Tunai: { nominal: 0, count: 0 },
  };

  filtered.forEach((item) => {
    const harga = item.paket?.harga || 0;
    totalPemasukan += harga;

    if (perMetode[item.metode]) {
      perMetode[item.metode].nominal += harga;
      perMetode[item.metode].count += 1;
    } else {
      perMetode.Tunai.nominal += harga;
      perMetode.Tunai.count += 1;
    }
  });

  // Susun data bar chart
  let chartData = [];

  if (periode === 'harian') {
    // Breakdown per 2-3 jam dari 06:00 hingga 21:00
    const slotJam = [
      { label: '06:00', start: 6, end: 8 },
      { label: '09:00', start: 9, end: 11 },
      { label: '12:00', start: 12, end: 14 },
      { label: '15:00', start: 15, end: 17 },
      { label: '18:00', start: 18, end: 20 },
      { label: '21:00', start: 21, end: 23 },
    ];

    chartData = slotJam.map((slot) => {
      let sum = 0;
      let count = 0;
      filtered.forEach((item) => {
        const jam = new Date(item.waktu).getHours();
        if (jam >= slot.start && jam <= slot.end) {
          sum += item.paket?.harga || 0;
          count += 1;
        }
      });
      return { label: slot.label, nominal: sum, count };
    });
  } else if (periode === 'bulanan') {
    // Jumlah hari dalam bulan tsb
    const jumlahHari = new Date(targetYear, targetMonth + 1, 0).getDate();
    const rentang = [
      { label: '1-5', min: 1, max: 5 },
      { label: '6-10', min: 6, max: 10 },
      { label: '11-15', min: 11, max: 15 },
      { label: '16-20', min: 16, max: 20 },
      { label: '21-25', min: 21, max: 25 },
      { label: `26-${jumlahHari}`, min: 26, max: jumlahHari },
    ];

    chartData = rentang.map((r) => {
      let sum = 0;
      let count = 0;
      filtered.forEach((item) => {
        const tgl = new Date(item.waktu).getDate();
        if (tgl >= r.min && tgl <= r.max) {
          sum += item.paket?.harga || 0;
          count += 1;
        }
      });
      return { label: `Tgl ${r.label}`, nominal: sum, count };
    });
  } else if (periode === 'tahunan') {
    // 12 Bulan
    const namaBulanSingkat = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    chartData = namaBulanSingkat.map((blnName, idx) => {
      let sum = 0;
      let count = 0;
      filtered.forEach((item) => {
        const m = new Date(item.waktu).getMonth();
        if (m === idx) {
          sum += item.paket?.harga || 0;
          count += 1;
        }
      });
      return { label: blnName, nominal: sum, count };
    });
  }

  return {
    totalPemasukan,
    jumlahTransaksi,
    perMetode,
    chartData,
    periode,
  };
}
