const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`
======================================================
Spotify Refresh Token Generator for Personal Portfolio
======================================================
This script will help you generate the refreshing token needed for your portfolio.

PRE-REQUISITES:
1. Go to https://developer.spotify.com/dashboard
2. Create an App (Select 'Web API' if asked)
3. In App Settings -> Edit Settings:
   - Add Redirect URI: http://localhost:3000
   - Save
4. Copy your Client ID and Client Secret
`);

rl.question('1. Enter Client ID: ', (clientId) => {
    rl.question('2. Enter Client Secret: ', (clientSecret) => {
        const redirectUri = 'http://localhost:3000';
        const scopes = 'user-read-currently-playing user-read-playback-state';

        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

        console.log(`
------------------------------------------------------
3. PLEASE OPEN THIS URL IN YOUR BROWSER AND LOGIN:
   ${authUrl}
------------------------------------------------------
After logging in, you will be redirected to localhost:3000 (it might show a "This site can't be reached" error, that is FINE).
COPY THE CODE from the URL address bar.
Example: http://localhost:3000/?code=AQDf...
Copy only the part after 'code='
`);

        rl.question('4. Paste the CODE here: ', (code) => {
            // Exchange code for tokens
            const data = new URLSearchParams({
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }).toString();

            const options = {
                hostname: 'accounts.spotify.com',
                port: 443,
                path: '/api/token',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length
                }
            };

            const req = https.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    try {
                        const json = JSON.parse(responseData);
                        if (json.error) {
                            console.error('\nERROR:', json.error_description || json.error);
                        } else {
                            console.log(`
======================================================
SUCCESS! HERE ARE YOUR CREDENTIALS FOR .env
======================================================

SPOTIFY_CLIENT_ID=${clientId}
SPOTIFY_CLIENT_SECRET=${clientSecret}
SPOTIFY_REFRESH_TOKEN=${json.refresh_token}

Copy the above lines into your .env file.
======================================================
`);
                        }
                    } catch (e) {
                        console.error('Error parsing response:', e);
                    }
                    rl.close();
                });
            });

            req.on('error', (e) => {
                console.error('Request failed:', e);
                rl.close();
            });

            req.write(data);
            req.end();
        });
    });
});
