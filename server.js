const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FOOTBALL_DATA_API_KEY || 'a79ef265e53a4924a21f8ef439129dac';
const ROOT_DIR = __dirname;

const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(payload));
}

function serveStaticFile(requestPath, response) {
    const safePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
    const normalizedPath = path.normalize(safePath);
    const filePath = path.join(ROOT_DIR, normalizedPath);

    if (!filePath.startsWith(ROOT_DIR)) {
        sendJson(response, 403, { error: 'Forbidden' });
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            if (error.code === 'ENOENT') {
                sendJson(response, 404, { error: 'File not found' });
                return;
            }

            sendJson(response, 500, { error: 'Failed to read file' });
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        response.writeHead(200, {
            'Content-Type': contentTypes[extension] || 'application/octet-stream'
        });
        response.end(data);
    });
}

function proxyStandings(competitionCode, response) {
    const targetUrl = new URL(`https://api.football-data.org/v4/competitions/${competitionCode}/standings`);

    const proxyRequest = https.request(targetUrl, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_KEY
        }
    }, (apiResponse) => {
        let body = '';

        apiResponse.on('data', (chunk) => {
            body += chunk;
        });

        apiResponse.on('end', () => {
            const statusCode = apiResponse.statusCode || 500;

            try {
                const parsedBody = JSON.parse(body);
                sendJson(response, statusCode, parsedBody);
            } catch {
                sendJson(response, 502, { error: 'Invalid response from football-data API' });
            }
        });
    });

    proxyRequest.on('error', () => {
        sendJson(response, 502, { error: 'Could not reach football-data API' });
    });

    proxyRequest.end();
}

const server = http.createServer((request, response) => {
    const parsedUrl = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === 'GET' && parsedUrl.pathname.startsWith('/api/competitions/')) {
        const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
        const competitionCode = pathParts[2];
        const resource = pathParts[3];

        if (!competitionCode || resource !== 'standings') {
            sendJson(response, 404, { error: 'API route not found' });
            return;
        }

        proxyStandings(competitionCode, response);
        return;
    }

    if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Method not allowed' });
        return;
    }

    serveStaticFile(parsedUrl.pathname, response);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
