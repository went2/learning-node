// module.exports = {
//     'get /': async ctx => {
//         ctx.body = 'index page';
//     },
//     'get /news': async ctx => {
//         ctx.body = 'news page';
//     }
// };

module.exports = (app) => ({
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail
});