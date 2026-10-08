/**
 * Data Dummy Saldo Kantin
 * ========================
 * File ini berisi data awal saldo kantin dan riwayat top up.
 * Digunakan selama endpoint backend untuk fitur saldo belum tersedia.
 *
 * Struktur data ini dirancang agar mudah dimigrasi ke respons API nantinya.
 */

// Tarif PPN sebagai SATU konstanta agar mudah diubah
export const PPN_RATE = 0.11;

// Saldo awal kantin (Rp 1.500.000)
export const SALDO_AWAL = 1_500_000;

// Batas minimum saldo untuk peringatan "Saldo menipis"
export const SALDO_MINIMUM_WARNING = 50_000;

// Pilihan nominal top up (dalam Rupiah)
export const NOMINAL_TOPUP_OPTIONS = [500_000, 1_000_000, 2_000_000];

/**
 * Generate riwayat top up dummy (minimal 12 baris)
 * Campuran status: Berhasil dan Menunggu
 */
export function generateRiwayatTopUpDummy() {
  const now = new Date();
  const thn = now.getFullYear();
  const bln = now.getMonth();
  const tgl = now.getDate();

  return [
    {
      id: 'TPU-001',
      tanggal: new Date(thn, bln, tgl - 1, 9, 15).toISOString(),
      nominal: 1_000_000,
      ppn: Math.round(1_000_000 * PPN_RATE),
      totalBayar: 1_000_000 + Math.round(1_000_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-002',
      tanggal: new Date(thn, bln, tgl - 2, 14, 30).toISOString(),
      nominal: 500_000,
      ppn: Math.round(500_000 * PPN_RATE),
      totalBayar: 500_000 + Math.round(500_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-003',
      tanggal: new Date(thn, bln, tgl - 3, 10, 0).toISOString(),
      nominal: 2_000_000,
      ppn: Math.round(2_000_000 * PPN_RATE),
      totalBayar: 2_000_000 + Math.round(2_000_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-004',
      tanggal: new Date(thn, bln, tgl - 5, 11, 45).toISOString(),
      nominal: 1_000_000,
      ppn: Math.round(1_000_000 * PPN_RATE),
      totalBayar: 1_000_000 + Math.round(1_000_000 * PPN_RATE),
      status: 'Menunggu',
    },
    {
      id: 'TPU-005',
      tanggal: new Date(thn, bln, tgl - 7, 8, 20).toISOString(),
      nominal: 500_000,
      ppn: Math.round(500_000 * PPN_RATE),
      totalBayar: 500_000 + Math.round(500_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-006',
      tanggal: new Date(thn, bln, tgl - 10, 16, 5).toISOString(),
      nominal: 2_000_000,
      ppn: Math.round(2_000_000 * PPN_RATE),
      totalBayar: 2_000_000 + Math.round(2_000_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-007',
      tanggal: new Date(thn, bln, tgl - 12, 13, 30).toISOString(),
      nominal: 1_000_000,
      ppn: Math.round(1_000_000 * PPN_RATE),
      totalBayar: 1_000_000 + Math.round(1_000_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-008',
      tanggal: new Date(thn, bln, tgl - 14, 9, 50).toISOString(),
      nominal: 500_000,
      ppn: Math.round(500_000 * PPN_RATE),
      totalBayar: 500_000 + Math.round(500_000 * PPN_RATE),
      status: 'Menunggu',
    },
    {
      id: 'TPU-009',
      tanggal: new Date(thn, bln - 1, 25, 10, 15).toISOString(),
      nominal: 2_000_000,
      ppn: Math.round(2_000_000 * PPN_RATE),
      totalBayar: 2_000_000 + Math.round(2_000_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-010',
      tanggal: new Date(thn, bln - 1, 18, 14, 0).toISOString(),
      nominal: 1_000_000,
      ppn: Math.round(1_000_000 * PPN_RATE),
      totalBayar: 1_000_000 + Math.round(1_000_000 * PPN_RATE),
      status: 'Berhasil',
    },
    {
      id: 'TPU-011',
      tanggal: new Date(thn, bln - 1, 10, 11, 30).toISOString(),
      nominal: 500_000,
      ppn: Math.round(500_000 * PPN_RATE),
      totalBayar: 500_000 + Math.round(500_000 * PPN_RATE),
      status: 'Menunggu',
    },
    {
      id: 'TPU-012',
      tanggal: new Date(thn, bln - 2, 5, 15, 45).toISOString(),
      nominal: 1_000_000,
      ppn: Math.round(1_000_000 * PPN_RATE),
      totalBayar: 1_000_000 + Math.round(1_000_000 * PPN_RATE),
      status: 'Berhasil',
    },
  ];
}
