Buatlah komponen Data Grid untuk manajemen Purchase Order dengan spesifikasi:

1. Tampilkan tabel dengan kolom:
   - semua kolom (bisa di-sort, header dengan panah ↓)
   - ["No. PO", "Supplier", "Tanggal", "Total (Rp)", "Status", "Aksi"]
   - "Aksi" (berisi ikon atau tombol aksi)

2. Gunakan Data Grid MUI X dengan konfigurasi:
   - Tampilkan 5 data per halaman (pagination)
   - Total data: 3 item
   - Page size options: [5]

3. Data contoh:
   [

   ]

4. Kolom "Aksi" berisi:
   - Ikon edit (misal: EditIcon)
   - Ikon delete (misal: DeleteIcon)
   - Dalam satu baris horizontal

5. Fitur yang diperlukan:
   - Sorting untuk kolom nama
   - Pagination dengan info "1-3 of 3"
   - Dropdown "Records per page: 5 ▼"

6. **Dukungan tema (CRITICAL):**
   - Komponen HARUS mendukung tema gelap (dark mode) dan terang (light mode)
   - Gunakan `useTheme` hook dari MUI untuk mengakses palette tema
   - Warna border, background, dan teks harus menyesuaikan tema otomatis
   - Pastikan contrast ratio memadai untuk kedua tema
   - Ikon dan tombol harus memiliki warna yang sesuai dengan tema

7. Implementasikan:
   - Custom styling menggunakan `sx` prop dengan warna dari tema
   - Pastikan Data Grid mengikuti theme provider aplikasi
   - Tambahkan transisi halus untuk perubahan tema

8. Style spesifik:
   - Header tabel: background sesuai tema (primary.light/primary.dark)
   - Border antar sel: menggunakan divider color dari tema
   - Warna teks: text.primary dari palette
   - Hover state: menggunakan action.hover dari tema
   - Tombol aksi: warna primary untuk edit, error untuk delete

9. Pastikan komponen responsif dan aksesibel di kedua tema.
10. Layout header:

- Di atas tabel, buat sebuah header yang berisi:
  - Judul "Purchase Order" di sebelah kiri
  - Tombol "+ Tambah PO" di sebelah kanan
- Tombol tersebut harus menggunakan variant "contained" dengan warna primary
