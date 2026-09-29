# PasCall Kantin

Aplikasi web kasir mandiri untuk petugas kantin lapas guna melakukan pengisian paket telepon, video call, dan combo komunikasi bagi Warga Binaan Pemasyarakatan (WBP).

---

## 🚀 Panduan Memulai

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di URL lokal yang disediakan Vite (biasanya `http://localhost:5173`).

### 3. Membangun Proyek untuk Produksi
```bash
npm run build
```

---

## 📁 Struktur Folder Proyek

```text
src/
├── main.jsx                    # Entry point React
├── App.jsx                     # Definisi router & rute navigasi
├── index.css                   # Konfigurasi Tailwind CSS & style print struk
│
├── layouts/
│   └── AppLayout.jsx           # Layout utama: Sidebar (2 menu: Paket & Riwayat) + Topbar + Mobile Bottom Nav
│
├── pages/
│   ├── PaketPage.jsx           # Halaman katalog paket komunikasi (Route "/")
│   ├── RiwayatPage.jsx         # Halaman rekapitulasi & tabel riwayat transaksi (Route "/riwayat")
│   └── StrukPage.jsx           # Halaman cetak & bukti transaksi (Route "/struk/:id")
│
├── components/
│   ├── PromoBanner.jsx         # Banner informasi promo paket 24 jam
│   ├── KategoriTabs.jsx        # Tab filter pil kategori (Telepon, Video Call, Combo)
│   ├── KartuPaket.jsx          # Kartu rincian paket & tombol beli
│   ├── ModalBeli.jsx           # Modal dialog alur pembelian 2 tahap (ID WBP -> Metode Bayar)
│   ├── KartuKonfirmasiNapi.jsx # Kartu verifikasi identitas WBP
│   ├── PilihMetodeBayar.jsx    # Pilihan metode bayar (Tunai, GoPay, ShopeePay, DANA)
│   ├── StrukTransaksi.jsx      # Tampilan struk nota dengan format cetak (print CSS)
│   ├── FilterPeriode.jsx       # Filter periode (Harian, Bulanan, Tahunan) & pemilih tanggal
│   ├── KartuRingkasan.jsx      # Kartu rekap pemasukan & breakdown per metode
│   ├── BarChartSederhana.jsx   # Grafik batang visualisasi tren pemasukan (Pure Tailwind + div)
│   ├── TabelTransaksi.jsx      # Tabel riwayat transaksi dengan pencarian & filter metode
│   └── EmptyState.jsx          # Tampilan state kosong / tidak ditemukan
│
├── services/
│   └── kantinService.js        # Service data lokal (CRUD, LocalStorage, simulasi delay async API)
│
├── data/
│   ├── paket.js                # Data master paket telepon, video, & combo
│   └── napi.js                 # Data dummy identitas WBP (WBP-0001 s/d WBP-0008)
│
└── utils/
    └── format.js               # Utility format rupiah (IDR), tanggal Indonesia, & ID transaksi
```

---

## 🌟 Fitur Utama

1. **Katalog Paket Komunikasi Lengkap & Bervariasi**
   - **Kategori Telepon**: 9 pilihan durasi (20 Menit s/d 500 Menit).
   - **Kategori Video Call**: 7 pilihan durasi (15 Menit s/d 180 Menit).
   - **Kategori Combo**: 6 pilihan hemat & lengkap (Combo Kilat s/d Combo Ultimate).
2. **Pencarian Fleksibel (ID atau No. Telepon)**
   - Mendukung pencarian instan menggunakan **ID WBP** (`WBP-0001` s/d `WBP-0008` atau digit `0001`) maupun **Nomor Telepon** (`081234567801` s/d `081234567808`).
   - Verifikasi data lengkap dengan ID, nama, nomor telepon, dan blok hunian.
3. **Cetak Struk Resmi (Nota Pembayaran)**
   - Dilengkapi fungsi `window.print()` dengan optimasi CSS print (menyembunyikan sidebar & tombol aksi).
4. **Rekapitulasi & Riwayat Transaksi Lengkap**
   - Filter periode interaktif (Harian, Bulanan, Tahunan).
   - Ringkasan total omzet, jumlah transaksi, dan breakdown per metode pembayaran.
   - Grafik batang interaktif dengan tooltip detail.
   - Tabel riwayat dengan filter pencarian real-time dan tautan cepat ke struk.
5. **Penyimpanan Lokal (LocalStorage Persistence)**
   - Semua transaksi baru langsung tersimpan aman di browser tanpa hilang saat di-refresh.
