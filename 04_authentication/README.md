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

在正式应用中使用中间件处理 session，走完这个中间件，session就在上下文环境中了。


