const http = require('http');
const fs = require('fs');

require('./app');

const hostname = '127.0.0.1';
const port = 3001;

fs.readFile('./index.html', function (err, html) {
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }).listen(port, hostname);
});