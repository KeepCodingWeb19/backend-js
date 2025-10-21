import http from 'node:http';
import app from './app.js';

const port = 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})