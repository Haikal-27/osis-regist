// Fungsi untuk beralih ke halaman berikutnya di form
function nextPage() {
    const sections = document.querySelectorAll('.form-section');
    sections[0].style.display = 'none';
    sections[1].style.display = 'block';
}

// Inisialisasi animasi partikel di latar belakang
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

// Menentukan properti partikel
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Metode untuk menggambar partikel
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    // Metode untuk mengupdate posisi partikel
    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Inisialisasi array partikel
function init() {
    particlesArray.length = 0;
    const numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 3) + 1;
        const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        const color = '#ffffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animasi loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// Memanggil fungsi untuk menginisialisasi partikel dan memulai animasi
init();
animate();

// Resize canvas saat ukuran jendela berubah
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
// Menangani pengiriman formulir
document.getElementById('formPendaftaran').addEventListener('submit', async function (e) {
    e.preventDefault(); // Mencegah submit default

    // Ambil data dari form
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    // Kirim data ke Google Apps Script
    const scriptURL = 'PASTE_https://script.google.com/macros/s/AKfycbzGS73FGZYSoxEvdiHU-vEFlkzi4g8pAuLbF9e406J0m-tyitzhpDpLDlGfQyVIW-QEtQ/exec'; // Ganti dengan URL Web App dari Google Apps Script

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams(data),
        });

        alert('Data berhasil dikirim!');
        this.reset(); // Mengosongkan form setelah submit
    } catch (error) {
        alert('Gagal mengirim data: ' + error.message);
    }
});
