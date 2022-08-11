const http = require('http');
const fs = require('fs');

const PORT = 4000;

const proxy = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    fs.readFile('./index.html', (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.end('服务器内部错误');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data);
    });
  } else if (method === 'GET' && url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'Polly',
      color: 'white',
      age: '1 year 6 months'
    }));
  } else {
    res.statusCode = 404;
    res.end('Woops, 404 not found')
  }
});

module.exports = proxy;
