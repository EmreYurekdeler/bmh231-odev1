const http = require('http');
const dayjs = require('dayjs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`[LOG] Zaman: ${new Date().toISOString()} | Yontem: ${req.method} | Yol: ${req.url}`);

    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Allow': 'GET' });
        return res.end('Yalnızca GET yöntemi desteklenmektedir.');
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1 style="color: #1B365D;">BMH231 Web Programlama Ana Sayfasi</h1><p><a href="/hakkimda">Hakkımda</a> sayfasına git</p>');
    } else if (req.url === '/hakkimda') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1 style="color: #2B547E;">Hakkımda</h1><p>Ben Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği öğrencisiyim.</p>');
    } else if (req.url === '/api/ders') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ kod: 'BMH231', ad: 'Web Programlama', gun: 'Cuma' }));
    } else if (req.url === '/api/agep') {
        const hedef = dayjs('2026-11-01');
        const bugun = dayjs();
        const kalanGun = hedef.diff(bugun, 'day');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ sonTeslim: '01.11.2026', kalanGun: kalanGun }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Sayfa bulunamadı');
    }
});

server.listen(PORT, () => console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor.`));