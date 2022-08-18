// 对约定路由和koa app的封装

const Koa = require('koa');
const { initRouter } = require('./ygg-loader');

class Ygg {
    constructor(conf) {
        this.$app = new Koa();
        this.$app.use(initRouter().routes());
    }
    start(port) {
        this.$app.listen(port);
        console.log(`app starts at port ${port}`);
    }
}

module.exports = Ygg;