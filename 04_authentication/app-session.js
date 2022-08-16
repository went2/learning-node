const Koa = require('koa');
const session = require('koa-session');

const app = new Koa();

app.keys = ['some secret keys'];

const SESS_CONFIG = {
    key: 'wt:sess',
    maxAge: '96000000',
    httpOnly: true,
    signed: false
};

app.use(session(SESS_CONFIG, app));


app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = `第 ${n} 次访问`;
});

app.listen(3000);
