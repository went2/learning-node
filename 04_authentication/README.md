# 鉴权 Authentication

authentication: 鉴权，识别一个用户、设备的身份，用于登陆场景。
authorization: 授权，分配用户的访问资源的权限。

三种常见的鉴权方式：

- Session/Cookie
- Token
- OAuth 第三方认证
- SSO

## session-cookie 方式

session基于cookie实现，cookie是一种协议，当浏览器在A域名下有一个cookie，只要是A域名的请求，都会在header中带上这个cookie，服务端从`req.headers.cookie`中获得cookie，使用`res.setHeader('Set-Cookie', 'cookie1=abc;')`设置cookie。

纯粹的 cookie 机制不会用于鉴权，因为可存的东西少，并且存在浏览器端的值容易被修改。基于 cookie 可实现 sesison，cookie 只存 sid。

session 基本实现见 './cookie.js';

在 session 基本实现中，将session保存到代码里(即内存中)，这种方式一会占用很多服务器内存(如万人在线)，二来如果使用分布式部署，在同一个机器或不同机器上开启多个后端实例的话，它们不共享session，所以一般情况，将session存到专门的存储服务器上，如数据库，Redis，MongoDB

在正式应用中使用中间件处理 session，走完这个中间件，session就在上下文环境中了。

使用 `koa-session` 处理 session 见 './app-session.js';

### 使用 session 进行鉴权
