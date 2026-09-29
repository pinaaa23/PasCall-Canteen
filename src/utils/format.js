/**
 * Format angka ke format mata uang Rupiah
 * Contoh: 25000 -> "Rp 25.000"
 */
export function formatRupiah(nominal) {
  if (nominal === undefined || nominal === null || isNaN(nominal)) {
    return 'Rp 0';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal).replace(/\s+/g, ' ');
}

/**
 * Format tanggal ke format Indonesia
 * Contoh: "29 September 2026, 14:35 WIB" atau "29 September 2026"
 */
export function formatTanggal(dateInput, includeTime = true) {
  if (!dateInput) return '-';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '-';

  const namaBulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const tgl = date.getDate();
  const bln = namaBulan[date.getMonth()];
  const thn = date.getFullYear();

  if (!includeTime) {
    return `${tgl} ${bln} ${thn}`;
  }

  const jam = String(date.getHours()).padStart(2, '0');
  const menit = String(date.getMinutes()).padStart(2, '0');

  return `${tgl} ${bln} ${thn}, ${jam}:${menit} WIB`;
}

/**
 * Buat ID Transaksi dengan format TRX-YYYYMMDD-0001
 */
export function buatIdTransaksi(nomorUrut = 1, tanggal = new Date()) {
  const d = new Date(tanggal);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const seq = String(nomorUrut).padStart(4, '0');

  return `TRX-${yyyy}${mm}${dd}-${seq}`;
}
