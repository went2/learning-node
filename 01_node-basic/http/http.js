// http 模块的基本使用
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;

  // 请求主页，返回 html 文件
  if (url === '/' && method === 'GET') {
    fs.readFile('./public/index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end('服务器内部错误');
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (url === '/api/users' && method === 'GET') {
    // 处理ajax请求

    // 数据埋点的处理
    console.log('请求接口', url);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'Tommy',
      age: 1,
      color: 'white'
    }));
  } else if (method === 'GET' && headers.accept.indexOf('text/css') !== -1) {
    fs.createReadStream('./public' + url).pipe(res);
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // handle 图片文件请求
    fs.createReadStream('./public' + url).pipe(res);
  } else {
    // 返回404
    res.statusCode = 404;
    res.end(`Woops, 404 Not Found`);
  }

});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});