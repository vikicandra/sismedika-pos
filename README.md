# Restaurant POS

Aplikasi Point of Sale (POS) Restauran dibangun menggunakan Laravel, Inertia, dan React. Material-ui digunakan dalam desain aplikasi.

## Prasyarat

Pastikan lingkungan pengembangan Anda memenuhi persyaratan berikut sebelum memulai:

- **PHP >= 8.2**
- **Composer**
- **Node.js >= 18.0**
- **NPM** atau **Yarn**
- **Database** (MySQL, PostgreSQL, dll.)

## Panduan Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek di lingkungan lokal Anda.

### 1. Clone Repositori

Clone repositori ini ke mesin lokal Anda menggunakan Git:

```bash
git clone <URL_REPOSITORI_ANDA>
cd nama-direktori-proyek
```

### 2. Instal Dependensi Backend

Instal semua dependensi PHP yang diperlukan menggunakan Composer:

```bash
composer install
```

### 3. Konfigurasi Lingkungan

Salin file `.env.example` menjadi `.env`. File ini akan berisi semua variabel lingkungan untuk aplikasi Anda.

```bash
cp .env.example .env
```

Setelah itu, buka file `.env` dan konfigurasikan koneksi database Anda:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_db
DB_USERNAME=
DB_PASSWORD=
```

### 4. Generate Kunci Aplikasi

Generate kunci aplikasi unik untuk proyek Anda dengan perintah Artisan berikut:

```bash
php artisan key:generate
```

### 5. Jalankan Migrasi Database dan Seeder

Jalankan migrasi untuk membuat skema database yang diperlukan:

```bash
php artisan migrate --seed
```

### 6. Instal Dependensi Frontend

Instal semua dependensi JavaScript yang diperlukan menggunakan NPM (atau Yarn):

```bash
npm install
```

### 7. Jalankan Server Pengembangan

Untuk memulai pengembangan, Anda perlu menjalankan server backend Laravel dan server pengembangan Vite secara bersamaan.

Buka dua terminal terpisah:

1.  **Terminal 1: Jalankan server Laravel**

    ```bash
    php artisan serve
    ```

2.  **Terminal 2: Jalankan server Vite**
    ```bash
    npm run dev
    ```

Setelah kedua server berjalan, Anda dapat mengakses aplikasi di `http://localhost:8000` (atau alamat yang ditampilkan oleh `php artisan serve`).

### 8. Akses User

Akses user terbagi menjadi 2 yaitu Kasir dan Pelayan.

Link Login :
http://localhost:8000/login

```bash
Kasir
email : cashier@cashier.com
password : 12345678

Pelayan
email : waiter@waiter.com
password : 1234567
```
