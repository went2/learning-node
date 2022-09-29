module.exports = {
    'get /': async ctx => {
        ctx.body = 'user index page';
    },
    'get /info': async ctx => {
        ctx.body = 'user detail page';
    }
};