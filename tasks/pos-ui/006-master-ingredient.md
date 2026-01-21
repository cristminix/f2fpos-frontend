Buat komponen Master Bahan Baku menggunakan Material-UI (MUI v5) dan MUI X Data Grid dengan spesifikasi berikut:

1. **Judul Halaman**: "Master Bahan Baku" sebagai heading dengan typography h5.

2. **Search Bar**: Buat komponen pencarian dengan placeholder "Cari bahan baku..." menggunakan:
   - `TextField` dengan variant "outlined"
   - Ikon pencarian di sebelah kiri (SearchIcon)
   - Properti `fullWidth` dan margin bottom untuk spacing
   - Event handler untuk pencarian real-time (onChange)

3. **Data Grid** (MUI X v6+):
   - Gunakan `DataGrid` atau `DataGridPro` untuk fitur dasar
   - Kolom sesuai tabel: Nama Bahan Baku, Kode/SKU, Stok Saat Ini, Stok Minimum, Satuan Dasar, Satuan Beli Lain, Aksi
   - Atur lebar kolom proporsional (Nama Bahan Baku lebih lebar)
   - Kolom "Aksi" berisi:
     - IconButton Edit (EditIcon) dengan arahkan ke halaman edit
     - IconButton Delete (DeleteIcon) dengan konfirmasi dialog
   - Tampilkan pesan "Data tidak ditemukan atau belum ada" ketika data kosong menggunakan `slotProps.noRowsOverlay`
   - Tambahkan pagination di bawah grid
   - Tinggi grid minimal 400px

4. **Tombol Tambah**:
   - Gunakan `Button` dengan variant "contained"
   - Posisikan di atas grid sebelah kanan (gunakan Flexbox atau Grid layout)
   - Teks: "[Tambah Bahan Baku Pertama]" atau "+ Tambah Bahan Baku"
   - Ikon tambah (AddIcon) di sebelah kiri teks
   - Arahkan ke halaman/form tambah bahan baku

5. **Tema Gelap/Terang**:
   - Gunakan `useTheme` dan `styled` untuk styling kondisional
   - Pastikan warna grid, teks, dan background adaptif dengan tema
   - Gunakan palette primary untuk tombol, secondary untuk aksi
   - Border dan divider warna menggunakan `theme.palette.divider`

6. **Responsif**:
   - Grid menyesuaikan lebar layar (gunakan `flex: 1` pada kolom)
   - Pada layar kecil, tombol tambah dan search bar stack vertikal

7. **Loading State**:
   - Sertakan skeleton loading saat fetching data

8. **Fitur**:
   - Client-side sorting dan filtering untuk kolom teks
   - Filter numerik untuk kolom stok
   - Dialog konfirmasi hapus dengan `Dialog` MUI

9. **Layout**:
   - Gunakan `Container` MUI untuk batasan lebar
   - Spacing konsisten dengan `theme.spacing()`

10. **Catatan**:
    - Gunakan `useState` untuk state pencarian dan data
    - Implementasi `useEffect` untuk fetch data dari API
    - Handle error dengan snackbar MUI

Pastikan semua komponen mengikuti desain sistem MUI dan mendukung tema gelap/terang otomatis berdasarkan setting provider.
