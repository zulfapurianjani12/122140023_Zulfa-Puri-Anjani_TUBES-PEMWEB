
# Nongki-Geh

**Nongki-Geh** adalah aplikasi web berbasis React yang dirancang untuk membantu pengguna menemukan dan mengeksplorasi tempat nongkrong favorit. Aplikasi ini memiliki antarmuka modern, ramah pengguna, serta dibangun dengan teknologi web terkini untuk pengalaman penggunaan yang maksimal.

## 🚀 Fitur Unggulan

- 🔍 Menampilkan daftar tempat nongkrong
- 📍 Navigasi antar halaman menggunakan React Router
- 📸 Antarmuka visual menarik dengan React Icons
- 🌐 Pengambilan data dari API menggunakan Axios
- 📱 Desain responsif yang mendukung berbagai ukuran layar
- 🧪 Dukungan testing dengan Testing Library

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React** v19.1.0
- **React Router DOM** v6.30.0
- **Axios** v1.9.0
- **React Icons** v5.5.0
- **React Scripts** v5.0.1
- **Testing Library** (React, DOM, Jest, User Event)
- **Web Vitals** untuk pengukuran performa


### Backend
- **Python** dengan **Pyramid Framework**
- **PostgreSQL** sebagai basis data utama
- **SQLAlchemy** untuk ORM (jika digunakan)


## 📦 Instalasi

Untuk menjalankan aplikasi secara lokal, ikuti langkah-langkah berikut:

1. **Clone repositori ini**

   ```bash
   git clone https://github.com/username/nongki-geh.git
   cd nongki-geh
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan aplikasi**

   ```bash
   npm start
   ```

   Aplikasi akan berjalan di `http://localhost:3000`.

## 🧪 Testing

Untuk menjalankan testing unit dan integrasi, gunakan perintah berikut:

```bash
npm test
```

Testing dilakukan menggunakan kombinasi dari `@testing-library/react`, `@testing-library/jest-dom`, dan `@testing-library/user-event`.

## 📁 Struktur Folder (Ringkasan)

```
nongki-geh/
├── backend/                # Backend Pyramid Python
│   ├── development.ini     # Konfigurasi environment
│   └── ...
├── frontend/               # Frontend React
│   ├── src/
│   │   ├── components/     # Komponen UI reusable
│   │   ├── pages/          # Halaman utama
│   │   ├── App.js          # Komponen utama
│   │   └── index.js        # Entry point
├── .gitignore
├── README.md
└── ...
```

## 👨‍💻 Kontribusi

Kontribusi sangat terbuka! Jika kamu menemukan bug, ide fitur baru, atau peningkatan performa, silakan:

- Fork repositori ini
- Buat branch baru (`git checkout -b fitur-anda`)
- Commit perubahan Anda (`git commit -m 'Menambahkan fitur X'`)
- Push ke branch (`git push origin fitur-anda`)
- Buat Pull Request


