# Development Standards & Tooling

Pastikan semua interaksi kode dan eksekusi terminal mengikuti standar berikut:

## Package Manager

- **Selalu gunakan `pnpm`**.
- Jangan pernah menyarankan atau menggunakan `npm` atau `yarn`.
- Gunakan perintah seperti `pnpm add`, `pnpm install`, dan `pnpm run`.

## TypeScript & Execution

- **Bahasa Utama:** Selalu gunakan TypeScript (.ts atau .tsx) untuk semua file logika baru.
- **Runtime Execution:** Untuk menjalankan file TypeScript secara langsung, gunakan `npx tsx`.
- **Never use `cd`** alway use relative path from current directory
- Contoh: `npx tsx path/to/file.ts`.

## Coding Language

- Prioritaskan penulisan kode dalam TypeScript dengan tipe data yang eksplisit (strong typing).
- Hindari penggunaan file JavaScript (.js) kecuali ada batasan teknis yang sangat spesifik.

## Code Generation Guidlines

- Always use es module
- Always create file with SOLID principle never create large typescript file
- Always create generic class into separate file then use import syntax to use it then save to `app\utils\classes`
- Always create logic or common function to separate file then use import syntax to use it then save to `app\utils\fn`
- Always create route component to `app\routes` after creating new page component and dont forget to attach the main router config file `app\routes.ts`
- Jangan pernah membuat dokumentasi baru tanpa konfirmasi terlebih dahulu

## Important

- This project built using react-router version 7
- This project built using material-ui version 7
- This project built using tailwindcss version 4
- Always use context7 before implementing
- Never ask for running `pnpm dev` just ask to do it myself
