# Directory Structure Standards

Aturan untuk mengatur dan memelihara struktur direktori dalam proyek ini:

## Struktur Umum

```
app/
├── components/          # Komponen UI reusable
│   ├── common/          # Komponen umum
│   ├── layouts/         # Layout komponen
│   └── ui/              # Komponen UI dasar
├── pages/               # Halaman aplikasi
├── routes/              # Definisi rute
├── services/            # Layanan backend dan API
├── hooks/               # React hooks kustom
├── utils/               # Fungsi utilitas
├── tests/               # Tests Files
│   ├── classes/         # Generic Class
│   └── fn/              # Shared function
├── types/               # Definisi tipe TypeScript
└── App.tsx              # Entry point utama
```

## Aturan Penempatan File

- Semua komponen React harus ditempatkan di dalam `app/components/`
- Komponen yang digunakan secara umum di seluruh aplikasi ditempatkan di `app/components/common/`
- Komponen layout ditempatkan di `app/components/layouts/`
- Halaman aplikasi ditempatkan di `app/pages/`
- File rute ditempatkan di `app/routes/`
- Fungsi-fungsi utilitas ditempatkan di `app/utils/`
- Definisi tipe TypeScript ditempatkan di `app/types/`
- Hooks kustom ditempatkan di `app/hooks/`
- Layanan (services) ditempatkan di `app/services/`

## Aturan Penamaan Direktori

- Gunakan huruf kecil dan pemisah tanda hubung untuk nama direktori: `my-directory-name`
- Gunakan singular form untuk nama folder kecuali jika berisi koleksi: `components/`, `pages/`, `routes/`
- Nama direktori harus deskriptif dan singkat

## Organisasi File

- Setiap komponen harus memiliki file `.tsx` yang sesuai
- File CSS/SCSS terkait harus berada dalam direktori yang sama dengan komponennya
- File konfigurasi harus ditempatkan di root proyek atau dalam direktori `.config/`
- File dokumentasi harus ditempatkan di direktori `docs/`

## Validasi Struktur

Saat membuat file atau direktori baru, pastikan untuk mengikuti struktur dan penamaan yang telah ditetapkan. Jika ada kebutuhan untuk struktur yang berbeda, diskusikan terlebih dahulu dengan tim dan perbarui rules ini sesuai kebutuhan.
