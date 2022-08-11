# 网络编程 Network programming

## 简易 http 服务端实现

见 `../01_node-basic/http/http.js`

## 跨域

同源政策

什么是同源？协议、host、端口号都相同叫同源

因不同源而无法获取接口数据，是浏览器接收到接口返回后做的限制，也就是说，虽然请求不同源的接口，服务端会返回数据，而接口返回的数据在浏览器端因不同源被限制了。

跨域：指的是要解决浏览器同源政策而引起的接口调用问题

举例：

`server A`: http://localhost:3000, 提供 `/index.html` 静态文件服务与 `/api/users` 接口请求服务

`server B`: http://localhost:4000, 仅提供 `/index.html` 静态文件服务

两个 `index.html` 的文件都请求相同的 `http://localhost:3000/api/users` 接口。

那么结果是：从 `server A` 拿到的 html 文件能拿到接口数据，从 `server B` 拿到的 html 文件拿到的数据被浏览器同源策略封锁了。


