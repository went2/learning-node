# NodeJs 基础

## 使用模块

### node 内建模块

```js
const os = require('os');
const memPercent = os.freemem() / os.totalmem() * 100;
console.log(`内存占用率${memPercent.toFixed(2)}`);
```

#### fs 模块

```js
const data = fs.readFileSync('./test.js');
data.toString();
```

node 是个高级语言，关于二进制级别处理都封装成 Buff 模块，读取文件拿到的是 Buff 类型的对象（文件的二进制形式）

**文件的流 Stream**

高级语言使用**流**这个概念操作文件。http 模块中的回调参数 response 对象就是一个 stream 对象。

```js
const fs = require('fs');
// 创建了一个文件读取流（管道），并没有把整个文件读进内存，只是创建一个和文件关联的读取管道
const rs = fs.createReadStream('./01.jpg');
// 创建了一个文件写出管道，并没有创建 02.jpg 这个文件，此时它是虚无缥缈的
const ws = fs.createWriteStream('./02.jpg');
// 将读取流和写出流接到一起，此时01.jpg的内容会通过 rs ws 流向 02.jpg，即复制了01.jpg命名为02.jpg
rs.pipe(ws);

```

#### Buff 模块

默认使用 UTF-8 编码方案

```js
const buf1 = Buffer.from('创建一个Buff'); 
```

#### http 模块

对 http 模块的使用，展示如何 handle 不同路由

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const { url, method，headers } = request;

    if(url === '/' && method === 'GET') {
        // 返回服务器上的 html 文件
        fs.readFile('index.html', (err, data) => {
            if(err) {
                response.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
                response.end(`500 服务器内部错误`);
            }
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        })

    } else if (url === '/users' && method === 'GET') {
        // handle 接口请求，返回 json 文件
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringfy({name: 'Andy'}));

    } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1) { 
        // handle 图片文件的请求
        
        fs.createReadStream('.' + url).pipe(response);

    } else {
        // 返回404
        response.statusCode = 404;
        response.end(`404 Not Found`);
    }
});

server.listen(3000);
```

### 第三方模块

```
npm i download-git-repo -s 
```

```js
const download = require('download-git-repo');
const ora = require('ora');
const process = ora(`正在下载...`);
process.start();

// 从 github 上下载仓库
download('github:su37dfwxcsdf/vue-template', '../test', (err) => {
    if(err) {
        process.fail();
    } else {
        process.succeed();
    }
})

// 用 node util 的 promisify 将使用回调的函数包装成基于 promise 的函数
const repo = 'github:su37dfwxcsdf/vue-template';
const desc = '../test';
clone(repo, desc);
async function clone(repo, desc) {
    const { promisify } = require('util');
    const download = promisify(require('download-git-repo'));
    const ora = require('ora');
    const process = ora(`正在下载...`);
    process.start();

    try {
        await download(repo, desc);
        process.succeed();
    } catch(e) {
        process.fail();
    }
}
```

## 用node写小工具：vue-auto-router-cli

路由约束：实现在`src/views` 目录下添加`.vue`添加组件时，自动在首页添加一条路由