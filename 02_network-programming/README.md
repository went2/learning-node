# 网络编程 Network programming

## 1. 跨域

什么是同源？协议、host、端口号都相同叫同源。

因不同源而无法获取接口数据，是浏览器接收到的接口返回数据的限制，也就是说，请求不同源的接口，即便服务端会返回数据，但浏览器会因为因同源政策禁止访问。

跨域：指的是要解决浏览器同源政策而引起的接口调用问题。

举例：

`server A`: http://localhost:3000, 提供 `/index.html` 静态文件服务与 `/api/users` 接口请求服务

`server B`: http://localhost:4000, 仅提供 `/index.html` 静态文件服务

两个 `index.html` 的文件都请求相同的 `http://localhost:3000/api/users` 接口。

结果是： `server A` 的 html 文件发出的请求能拿到接口数据，`server B` 的 html 文件拿到的数据被浏览器同源策略封锁了。

### 跨域的解决方式

1. 代理服务器

反向代理：请求同源服务器，通过该服务器转发请求至目标服务器，得到结果再转发给前端。

前端开发中的测试服务器的代理功能用的是这种解决方案，但是最终发布时，如果 web 应用和接口服务器不在一起仍会跨域。

使用 `http-proxy-middleware` 实现反向代理，webpack 用的就是它实现反向代理

```js
const express = require("express");
const proxy = require("http-proxy-middleware");
const app = express();

app.use(
  "api",
  proxy({
    target: "http://localhost:4000",
    changeOrigin: true,
  })
);
```

使用反向代理服务器转发后，就不需要在后端对设置响应头了。

另外，什么是正向代理？正向代理在客户端。

2. CORS——跨域资源共享，后端方案，解决跨域

cors 是 w3c 规范，真正意义上解决跨域问题，需要服务器对请求做出检查，并对响应头做相应处理，从而允许跨域。

响应简单请求时，通过添加响应头：

`res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')`

非简单请求，浏览器会触发预检请求（OPTIONS），服务器要响应预检请求，在相应头添加：

```js
if (method === "OPTIONS" && url === "api/users") {
  res.writeHead(200, {
    "Access-Allow-Control-Origin": "http://localhost:3000",
    "Access-Allow-Control-Headers": "Costomized-Header, Content-Type",
    "Access-Allow-Control-Methods": "PUT",
  });
  res.end();
}
```

3. 跨域时在服务器端接收 cookie

```js
// 1.服务器设置cookie
res.setHeader("Set-Cookie", "cookie1=df73ehnv66wer");

// 2.浏览器接受到该响应头后会保存cookie，并在接下去的请求头中添加cookie

// 3. 产生跨域时，服务器接收不到cookie，需要在对预检请求的响应中加入：
res.setHeader("Access-Allow-Control-Credentials", "true");
```

## 2. 使用 node 写一个爬虫

见`./spider.js`
