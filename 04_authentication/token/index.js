const Koa = require('koa');
const router = require('koa-router')();

const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');

const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const app = new Koa();

const SECRET = 'keep me a secret';

// 配置session中间件
app.use(cors({ credentials: true }));
app.keys = ['some secrets'];

app.use(static(__dirname + '/'));
app.use(bodyParser());


router.post('/users/login-token', async ctx => {
    const { body } = ctx.request;
    // ...省略密码认证过程
    const userinfo = body.username;

    // 生成token返回给客户端
    ctx.body = {
        message: '登陆成功',
        user: userinfo,
        token: jwt.sign(
            {
                data: userinfo,
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            }, SECRET
        ),
    };
});

router.get(
    '/users/getUser-token',
    jwtAuth({ secret: SECRET }), // 这行起到session中间件的鉴权作用
    async ctx => {
        // 验证通过，会自动设置state.user
        console.log(ctx.state.user);

        ctx.body = {
            message: '获取用户信息成功',
            userinfo: ctx.state.user.data,
        };
    }
);

app.use(router.routes());
app.listen(3000);