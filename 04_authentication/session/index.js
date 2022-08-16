const Koa = require('koa');
const router = require('koa-router')();
const session = require('koa-session');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const app = new Koa();

// 配置session中间件
app.use(cors({ credentials: true }));
app.keys = ['some secrets'];

app.use(static(__dirname + '/'));
app.use(bodyParser());
app.use(session(app));

// 鉴权中间件
app.use((ctx, next) => {
    if (ctx.url.indexOf('login') > -1) {
        next();
    } else {
        if (!ctx.session.userinfo) {
            ctx.body = {
                message: '未登陆'
            }
        } else {
            next();
        }
    }
});

router.post('/users/login', async ctx => {
    const { body } = ctx.request;
    // 省略密码认证过程

    ctx.session.userinfo = body.username;
    ctx.body = {
        message: '登陆成功'
    };
});

router.post('/users/logout', async ctx => {
    delete ctx.session.userinfo;
    ctx.body = {
        message: '登出'
    };
});

router.get('/users/getUser', async ctx => {
    ctx.body = {
        message: '获取用户信息成功',
        userinfo: ctx.session.userinfo
    }
});

app.use(router.routes());
app.listen(3000);