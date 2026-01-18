# Deployment ke Cloudflare Pages

Petunjuk untuk mendeploy aplikasi React Router v7 ke Cloudflare Pages.

## Prasyarat

1. Akun Cloudflare
2. Instalasi `wrangler` CLI:
   ```bash
   pnpm add -g wrangler
   ```

## Konfigurasi

1. Pastikan konfigurasi berikut telah diatur:
   - `react-router.config.ts`: `ssr: false`
   - `wrangler.toml`: Konfigurasi akun dan rute
   - `package.json`: Skrip deployment telah ditambahkan

## Langkah-langkah Deployment

### 1. Login ke Cloudflare

```bash
wrangler login
```

### 2. Build aplikasi

```bash
pnpm build
```

### 3. Deploy ke Cloudflare Pages

```bash
pnpm deploy
```

## Alternatif: Deployment Otomatis via GitHub

1. Hubungkan repositori ke Cloudflare Pages melalui dashboard
2. Pilih branch yang akan digunakan
3. Atur build configuration:
   - Framework preset: `React`
   - Build command: `pnpm run build`
   - Build output directory: `build/client`
   - Root directory: `.`

## Catatan Penting

- Aplikasi ini sekarang dikonfigurasi sebagai Static Site Generation (SSG) bukan Server-Side Rendering (SSR)
- Beberapa fitur yang bergantung pada server-side processing mungkin perlu disesuaikan
- Untuk lingkungan produksi, pastikan untuk mengganti placeholder `your-account-id` dan `your-zone-id` di `wrangler.toml`

## Troubleshooting

Jika mengalami masalah saat deployment:

1. Pastikan semua dependensi telah diinstal: `pnpm install`
2. Cek hasil build lokal: `pnpm build`
3. Verifikasi konfigurasi di `react-router.config.ts`
4. Jalankan preview lokal: `pnpm preview`
