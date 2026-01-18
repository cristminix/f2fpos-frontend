# Membuat Rules dan Prompt untuk Mengatur Struktur Direktori

Berdasarkan dokumentasi dari Kilo AI, berikut adalah panduan untuk membuat rules dan prompt yang mempengaruhi struktur direktori pada proyek f2fpos-frontend.

## Konsep Dasar

Custom rules dalam sistem Kilo AI digunakan untuk mengontrol perilaku agen berbasis konteks lokal. Dalam konteks proyek ini, rules dapat digunakan untuk mengatur bagaimana struktur direktori dibuat, diorganisir, dan dipertahankan.

## Lokasi Rules

Rules disimpan dalam direktori `.kilocode/rules/` seperti yang terlihat pada struktur proyek saat ini:

- `.kilocode/rules/development_standards.md` - berisi standar pengembangan
- `.kilocode/rules/naming_conventions.md` - berisi konvensi penamaan (saat ini kosong)

## Membuat Rules untuk Struktur Direktori

### 1. Membuat File Rules Baru

Untuk membuat rules tentang struktur direktori, buat file baru di dalam direktori `.kilocode/rules/` dengan ekstensi `.md`:

```
.kilocode/
├── rules/
│   ├── development_standards.md
│   ├── naming_conventions.md
│   └── directory_structure.md  ← File rules baru
```

### 2. Menetapkan Struktur Proyek Standar

Berikut contoh rules untuk struktur direktori:

```markdown
# Directory Structure Standards

Struktur direktori harus mengikuti pola berikut untuk memastikan konsistensi dan kemudahan navigasi:

## Struktur Umum
```

app/
├── components/ # Komponen UI reusable
│ ├── common/ # Komponen umum
│ ├── layouts/ # Layout komponen
│ └── ui/ # Komponen UI dasar
├── pages/ # Halaman aplikasi
├── routes/ # Definisi rute
├── services/ # Layanan backend dan API
├── hooks/ # React hooks kustom
├── utils/ # Fungsi utilitas
├── types/ # Definisi tipe TypeScript
└── App.tsx # Entry point utama

```

## Aturan Penamaan Direktori

- Gunakan huruf kecil dan pemisah tanda hubung untuk nama direktori: `my-directory-name`
- Gunakan singular form untuk nama folder kecuali jika berisi koleksi: `components/`, `pages/`, `routes/`
- Nama direktori harus deskriptif dan singkat

## Organisasi File

- Setiap komponen harus memiliki file `.tsx` yang sesuai
- File CSS/SCSS terkait harus berada dalam direktori yang sama dengan komponennya
- File konfigurasi harus ditempatkan di root proyek atau dalam direktori `.config/`
```

### 3. Implementasi Struktur Berdasarkan Rules

Dengan rules di atas, semua perubahan pada struktur direktori harus mengikuti standar ini. Misalnya, ketika membuat komponen baru:

- Harus ditempatkan di dalam direktori `app/components/`
- Jika komponen bersifat umum, tempatkan di `app/components/common/`
- Jika komponen adalah layout, tempatkan di `app/components/layouts/`

### 4. Prompt untuk Memastikan Kepatuhan terhadap Rules

Prompt yang digunakan untuk menciptakan atau memodifikasi struktur direktori harus menyertakan referensi ke rules:

```
"Saat membuat file atau direktori baru, pastikan untuk mengikuti struktur direktori yang telah ditetapkan dalam rules. Tempatkan komponen di direktori yang sesuai, gunakan penamaan yang konsisten, dan ikuti hierarki yang telah ditentukan."
```

## Contoh Implementasi dalam Proyek Ini

Melihat struktur proyek saat ini:

- `app/components/common/` - berisi komponen-komponen umum seperti `ErrorBoundary.tsx` dan `links.tsx`
- `app/components/layouts/` - berisi layout seperti `Layout.tsx`, `LayoutAdmin.tsx`, dll.
- `app/pages/` - berisi halaman-halaman aplikasi seperti `LoginPage.tsx`
- `app/routes/` - berisi definisi rute seperti `home.tsx` dan `users.tsx`

Struktur ini sudah cukup baik mengikuti prinsip-prinsip organisasi komponen dan fitur.

## Validasi Otomatis

Rules dapat digunakan untuk membuat skrip validasi yang memeriksa apakah struktur direktori sesuai dengan standar yang ditetapkan. Ketika seorang developer membuat file di lokasi yang tidak sesuai, sistem dapat memberikan warning atau error.

## Kesimpulan

Dengan membuat dan menerapkan rules untuk struktur direktori, kita dapat:

- Meningkatkan konsistensi dalam proyek
- Mempermudah navigasi dan pemeliharaan kode
- Mempercepat orientasi bagi developer baru
- Mengurangi kesalahan dalam penempatan file

Rules harus selalu diperbarui seiring dengan evolusi proyek dan kebutuhan tim pengembang.
