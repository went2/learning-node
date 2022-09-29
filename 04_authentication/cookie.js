const http = require('http');

const session = {}
http.createServer((req, res) => {
    if (req.url === './favicon.icon') {
        res.end('');
    }
    const sessionKey = 'sid';
    const cookie = req.headers.cookie;
    if (cookie && cookie.indexOf(sessionKey) > -1) {
        // 存在
        res.end('客官又来啦');

        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const sid = pattern.exec(cookie)[1];
        console.log('session:', sid, session, session[sid]);
    } else {
        const sid = (Math.random() * 9999999).toFixed();
        // 设置cookie
        res.setHeader('Set-Cookie', `${sessionKey}=${sid};`);
        // 服务端保存有关该用户的信息
        session[sid] = { name: 'gust1' };
        res.end('hello!');
    }
}).listen(3000);