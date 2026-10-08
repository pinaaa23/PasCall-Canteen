# Mode Demo (Trial Data) PasCall

Folder ini berisi sumber data tunggal (*single source of truth*) untuk mode demo/trial di aplikasi PasCall dan PasCall-Kantin.

---

## 1. Mekanisme Saklar (Switch)

Mode demo dikendalikan melalui fungsi `isDummyMode()` di `src/dummy/index.js`.
Mode demo **HANYA** akan aktif jika dua syarat terpenuhi:
1. Variabel environment `VITE_USE_DUMMY=true`
2. Aplikasi berjalan di mode Development (`import.meta.env.DEV === true`)

Saat mode demo aktif, sistem mencetak satu log notifikasi di console browser:
`[PasCall] MODE DEMO aktif - memakai data contoh`

> **Catatan Keamanan:** Mode demo **TIDAK AKAN PERNAH AKTIF** pada build produksi (`npm run build`), sehingga data contoh tidak akan bocor ke lingkungan live/production.

---

## 2. Cara Menyalakan & Mematikan

### Menyalakan:
1. Buat file `.env.local` di root proyek (atau salin dari `.env.local.example`):
   ```env
   VITE_USE_DUMMY=true
   ```
2. Jalankan dev server:
   ```bash
   npm run dev
   ```

### Mematikan:
1. Ubah nilai di `.env.local`:
   ```env
   VITE_USE_DUMMY=false
   ```
   Atau hapus file `.env.local`.
2. Restart dev server (`npm run dev`). Aplikasi akan kembali membaca data asli dari Backend API.

---

## 3. Cakupan Role & Halaman (Minimal 10-12 Baris per Tabel)

| Role / Modul | Halaman / Fitur | Status Data Dummy | Jumlah Data |
| :--- | :--- | :--- | :--- |
| **Superadmin** | Dashboard (Statistik, Grafik), Daftar UPT (10 UPT), Rekaman Panggilan (12 panggilan lintas UPT + transkrip), Data Narapidana (15 WBP), Transaksi (14 transaksi) | ✅ Dummy Store | ≥ 10-15 baris |
| **Kepala UPT** | Dashboard (Statistik & Rekaman), Data Narapidana (8 Cipinang), Rekaman Panggilan (12 baris + transkrip), Riwayat Transaksi (14 transaksi), Kelola Pengguna (10 akun staff/operator), Laporan | ✅ Dummy Store | ≥ 10-14 baris |
| **Operator Kantin** | Daftar Paket (6 paket telepon), Riwayat Transaksi (14 transaksi Tunai), Status Wartel (10 unit) | ✅ Dummy Store | ≥ 10-14 baris |
| **Data Narapidana** | List, Detail, Tambah, Edit, Ubah Status | ✅ Dummy Store (di memori) saat Demo Mode; Backend asli saat non-demo | 15 WBP |
| **Login / Autentikasi** | Form Login & Token Sesi | ❌ **BE Asli** (Login tetap ke server backend) | - |

---

## 4. Sinkronisasi Antar Proyek (`PasCall` & `PasCall-Kantin`)

Web Operator Kantin dapat dijalankan baik di dalam proyek `PasCall` maupun sebagai proyek mandiri di `PasCall-Kantin`.
- Folder `src/dummy/` di kedua repositori memiliki struktur, fungsi, dan data yang **IDENTIK**.
- Setiap penambahan atau perubahan data dummy di `PasCall/src/dummy/` **HARUS disalin sama persis** ke `PasCall-Kantin/src/dummy/`.

---

## 5. Cara Menambah / Mengubah Data

1. Buka `src/dummy/seed.js`.
2. Tambahkan atau sesuaikan data pada array (`branches`, `inmates`, `packages`, `calls`, `transactions`, `users`, atau `wartelUnits`).
3. Gunakan helper `getRelativeDate(daysAgo, hoursAgo, minutesAgo)` agar tanggal transaksi dan panggilan selalu dinamis dan relatif terhadap hari ini.
