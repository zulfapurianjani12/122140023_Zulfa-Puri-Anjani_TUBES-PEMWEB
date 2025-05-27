import React from 'react';
import './AboutUs.css';
import logoImage from '../../assets/foto.png';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>Halo Sobat Nongki!</h1>
        <p>Mau nongki tapi bingung nongki di mana? Lagi cari cafe di sekitar Bandar Lampung? Kalian mengunjungi situs yang tepat!</p>
      </div>
      <div className="about-us-content">
        <img src={logoImage} alt="Nongki Geh Logo" className="about-us-image" />
        <p>Selamat datang di Nongki Geh! Kami sangat senang Anda mengunjungi platform ini, website ini dirancang untuk membantu Anda menemukan tempat-tempat nongkrong terbaik di sekitar Bandar Lampung. Website Nongki Geh hadir dengan berbagai fitur yang memungkinkan Anda mencari kedai kopi terdekat, membaca ulasan, serta memberikan rekomendasi kepada sesama pecinta nongki.</p>
        <p>Di Nongki Geh, Anda dapat menemukan berbagai pilihan cafe mulai dari yang memiliki suasana santai hingga tempat-tempat yang cocok untuk bekerja. Kami juga menyediakan informasi terkait lokasi, rating, dan fitur-fitur lainnya seperti peta lokasi serta pilihan favorit yang bisa Anda simpan.</p>
        <p>Kami juga memberikan kesempatan bagi Anda untuk berbagi pengalaman dengan sesama pengguna, dengan memberi review serta rating pada setiap kedai kopi yang Anda kunjungi. Dengan demikian, aplikasi ini dapat membantu para pengguna lainnya dalam memilih tempat yang paling sesuai dengan selera mereka.</p>
        <p>Tentunya, aplikasi ini masih dalam pengembangan dan kami sangat terbuka terhadap masukan dan saran dari Anda, para pengguna setia. Kami berharap aplikasi Nongki Geh bisa menjadi referensi utama dalam mencari tempat nongkrong terbaik bersama teman, keluarga, atau bahkan sendiri.</p>
        <p>Terima kasih telah menggunakan Nongki Geh, semoga aplikasi ini dapat mempermudah pencarian cafe favorit Anda. Jangan lupa untuk selalu menikmati setiap momen seru Anda dengan segelas minuman di tempat terbaik!</p>
      </div>
    </div>
  );
};

export default AboutUs;
