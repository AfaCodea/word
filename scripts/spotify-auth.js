/*
 * 1. Masukkan Client ID dan Client Secret dari Spotify Dashboard di bawah ini.
 * 2. Pastikan Redirect URI di Spotify Dashboard (Edit Settings) ditambahkan: http://localhost:8888/callback
 * 3. Jalankan script ini dengan: node scripts/spotify-auth.js
 * 4. Buka link yang muncul di browser.
 * 5. Salin Refresh Token yang muncul di terminal ke file .env Anda.
 */

const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; // Ganti dengan Client ID Anda
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE'; // Ganti dengan Client Secret Anda
const REDIRECT_URI = 'http://localhost:8888/callback';

// ==========================================

const http = require('http');
const url = require('url');
const querystring = require('querystring');

if (CLIENT_ID === 'YOUR_CLIENT_ID_HERE' || CLIENT_SECRET === 'YOUR_CLIENT_SECRET_HERE') {
    console.error('❌ ERROR: Harap buka file ini dan isi CLIENT_ID serta CLIENT_SECRET terlebih dahulu!');
    process.exit(1);
}

const SCOPES = 'user-read-currently-playing';

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/callback') {
        const code = parsedUrl.query.code;

        if (code) {
            // Exchange code for tokens
            try {
                const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: REDIRECT_URI
                    })
                });

                const data = await tokenResponse.json();

                if (data.error) {
                    res.end('Error: ' + JSON.stringify(data));
                    return;
                }

                console.log('\n==================================================');
                console.log('✅ BERHASIL! Salin token di bawah ini ke file .env Anda:');
                console.log('==================================================\n');
                console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
                console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
                console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
                console.log('\n==================================================');

                res.end('Berhasil! Silakan cek terminal Anda untuk melihat Refresh Token.');

                server.close();
                process.exit(0);

            } catch (err) {
                res.end('Error fetching token: ' + err.message);
            }
        } else {
            res.end('No code returned');
        }
    } else {
        res.end('404 Not Found');
    }
});

server.listen(8888, () => {
    const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI
    });

    console.log('1. Buka URL ini di browser Anda untuk login Spotify:');
    console.log(authUrl);
});
