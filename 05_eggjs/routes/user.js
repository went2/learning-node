module.exports = {
    'get /': async ctx => {
        ctx.body = 'user index page';
    },
    'get /detail': async ctx => {
        ctx.body = 'user detail page';
    }
};