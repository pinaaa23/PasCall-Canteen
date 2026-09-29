import { daftarPaket } from '../data/paket';
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

  return [
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl, 8, 30)),
      kodeVoucher: 'PAS-7K9M-24NT',
      napi: { id: 'WBP-0001', nama: 'Budi Santoso', noTelp: '081234567801', blok: 'Blok A - Kamar 04' },
      paket: daftarPaket[2], // Paket Telepon 50 Menit (25.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 8, 30).toISOString(),
    },
    {
      id: buatIdTransaksi(2, new Date(thn, bln, tgl, 9, 15)),
      kodeVoucher: 'PAS-3B8X-9W2K',
      napi: { id: 'WBP-0002', nama: 'Ahmad Fauzi', noTelp: '081234567802', blok: 'Blok B - Kamar 12' },
      paket: daftarPaket[10], // Paket Video 30 Menit (30.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 9, 15).toISOString(),
    },
    {
      id: buatIdTransaksi(3, new Date(thn, bln, tgl, 11, 20)),
      kodeVoucher: 'PAS-4N8Y-7R3F',
      napi: { id: 'WBP-0003', nama: 'Joko Prasetyo', noTelp: '081234567803', blok: 'Blok A - Kamar 09' },
      paket: daftarPaket[17], // Combo Hemat (65.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 11, 20).toISOString(),
    },
    {
      id: buatIdTransaksi(4, new Date(thn, bln, tgl, 14, 5)),
      kodeVoucher: 'PAS-8C2V-5T9A',
      napi: { id: 'WBP-0004', nama: 'Hendra Gunawan', noTelp: '081234567804', blok: 'Blok C - Kamar 02' },
      paket: daftarPaket[4], // Paket Telepon 100 Menit (45.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 14, 5).toISOString(),
    },
    {
      id: buatIdTransaksi(5, new Date(thn, bln, tgl, 16, 45)),
      kodeVoucher: 'PAS-6P4D-8H2E',
      napi: { id: 'WBP-0005', nama: 'Rizky Pratama', noTelp: '081234567805', blok: 'Blok B - Kamar 07' },
      paket: daftarPaket[19], // Combo Keluarga (115.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl, 16, 45).toISOString(),
    },
    // Transaksi kemarin
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl - 1, 9, 10)),
      kodeVoucher: 'PAS-5M3G-9J4U',
      napi: { id: 'WBP-0006', nama: 'Dian Saputra', noTelp: '081234567806', blok: 'Blok D - Kamar 01' },
      paket: daftarPaket[6], // Paket Telepon 200 Menit (80.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 1, 9, 10).toISOString(),
    },
    {
      id: buatIdTransaksi(2, new Date(thn, bln, tgl - 1, 13, 40)),
      kodeVoucher: 'PAS-2R7T-4W8K',
      napi: { id: 'WBP-0007', nama: 'Agus Setiawan', noTelp: '081234567807', blok: 'Blok C - Kamar 15' },
      paket: daftarPaket[12], // Paket Video 60 Menit (55.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 1, 13, 40).toISOString(),
    },
    {
      id: buatIdTransaksi(3, new Date(thn, bln, tgl - 1, 15, 20)),
      kodeVoucher: 'PAS-9H5P-3C7N',
      napi: { id: 'WBP-0008', nama: 'Muhammad Ridwan', noTelp: '081234567808', blok: 'Blok A - Kamar 03' },
      paket: daftarPaket[2], // Paket Telepon 50 Menit (25.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 1, 15, 20).toISOString(),
    },
    // Transaksi 3 hari lalu
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl - 3, 10, 0)),
      kodeVoucher: 'PAS-4W9B-6E8Y',
      napi: { id: 'WBP-0001', nama: 'Budi Santoso', noTelp: '081234567801', blok: 'Blok A - Kamar 04' },
      paket: daftarPaket[17], // Combo Hemat (65.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 3, 10, 0).toISOString(),
    },
    {
      id: buatIdTransaksi(2, new Date(thn, bln, tgl - 3, 14, 15)),
      kodeVoucher: 'PAS-7F3K-2V9M',
      napi: { id: 'WBP-0002', nama: 'Ahmad Fauzi', noTelp: '081234567802', blok: 'Blok B - Kamar 12' },
      paket: daftarPaket[7], // Paket Telepon 300 Menit (110.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 3, 14, 15).toISOString(),
    },
    // Transaksi 5 hari lalu
    {
      id: buatIdTransaksi(1, new Date(thn, bln, tgl - 5, 11, 30)),
      kodeVoucher: 'PAS-8Y6U-4P2R',
      napi: { id: 'WBP-0003', nama: 'Joko Prasetyo', noTelp: '081234567803', blok: 'Blok A - Kamar 09' },
      paket: daftarPaket[14], // Paket Video 120 Menit (100.000)
      metode: 'Tunai',
      waktu: new Date(thn, bln, tgl - 5, 11, 30).toISOString(),
    },
    // Transaksi bulan lalu
    {
      id: buatIdTransaksi(1, new Date(thn, bln - 1, 15, 10, 30)),
      kodeVoucher: 'PAS-3K7D-9T5W',
      napi: { id: 'WBP-0004', nama: 'Hendra Gunawan', noTelp: '081234567804', blok: 'Blok C - Kamar 02' },
      paket: daftarPaket[2], // Paket Telepon 50 Menit (25.000)
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
    const normalized = parsed.map((item) => {
      let current = item;
      if (current.metode !== 'Tunai') {
        current = { ...current, metode: 'Tunai' };
        modified = true;
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
 * TODO: ganti dengan API backend
 * Mengambil daftar paket berdasarkan kategori (telepon / video / combo)
 */
export async function getPaket(kategori = 'telepon') {
  await delay(250);
  if (!kategori || kategori === 'semua') {
    return daftarPaket;
  }
  return daftarPaket.filter((p) => p.kategori.toLowerCase() === kategori.toLowerCase());
}

/**
 * TODO: ganti dengan API backend
 * Mencari data WBP berdasarkan ID atau No. Telepon
 * Mendukung pencarian: "WBP-0001", "0001", "081234567801", "0812-3456-7801", "+6281234567801"
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
    
    // Cocokkan ID penuh (WBP-0001 / WBP0001) atau nomornya (0001)
    const matchId = cleanId === cleanQuery || cleanId.includes(cleanQuery) || item.id.toUpperCase() === rawQuery.toUpperCase();
    
    // Cocokkan nomor telepon
    const matchTelp = cleanTelp === phoneNormalized || cleanTelp.endsWith(phoneNormalized) || cleanTelp.includes(phoneNormalized);

    return matchId || matchTelp;
  });

  return found || null;
}

// Alias untuk menjaga backward compatibility
export const cariNapiById = cariWbpByIdAtauTelp;

/**
 * TODO: kode voucher sebaiknya dibuat dan divalidasi oleh backend. Kode ini hanya simulasi.
 * Menghasilkan kode voucher unik dengan format PAS-XXXX-XXXX
 * Menggunakan huruf besar & angka tanpa karakter ambigu (tanpa 0, O, 1, I, L)
 */
export function buatKodeVoucher(existingCodes = []) {
  const chars = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  const existingSet = new Set(
    existingCodes.filter(Boolean).map((c) => c.toString().toUpperCase())
  );

  const generateSegment = (length = 4) => {
    const randomBytes = new Uint8Array(length);
    crypto.getRandomValues(randomBytes);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[randomBytes[i] % chars.length];
    }
    return result;
  };

  let code = '';
  let attempts = 0;
  do {
    const part1 = generateSegment(4);
    const part2 = generateSegment(4);
    code = `PAS-${part1}-${part2}`;
    attempts++;
  } while (existingSet.has(code) && attempts < 100);

  return code;
}

/**
 * TODO: ganti dengan API backend
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

  const nextSeq = trxHariIni.length + 1;
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
 * TODO: ganti dengan API backend
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
 * TODO: ganti dengan API backend
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

  // Filter pencarian (ID Transaksi, Nama WBP, ID WBP, No Telp, Nama Paket, Kode Voucher)
  if (cari && cari.trim()) {
    const q = cari.trim().toLowerCase();
    list = list.filter((item) => {
      const idTrx = (item.id || '').toLowerCase();
      const voucher = (item.kodeVoucher || '').toLowerCase();
      const namaWbp = (item.napi?.nama || '').toLowerCase();
      const idWbp = (item.napi?.id || '').toLowerCase();
      const noTelp = (item.napi?.noTelp || '').toLowerCase();
      const namaPaket = (item.paket?.nama || '').toLowerCase();
      return (
        idTrx.includes(q) ||
        voucher.includes(q) ||
        namaWbp.includes(q) ||
        idWbp.includes(q) ||
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
 * TODO: ganti dengan API backend
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
