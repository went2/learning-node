module.exports = {
    'get /': async ctx => {
        ctx.body = 'index page';
    },
    'get /news': async ctx => {
        ctx.body = 'news page';
    }
};