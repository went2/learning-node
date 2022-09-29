// 对约定路由和koa app的封装

const Koa = require('koa');
const { initRouter, initController } = require('./ygg-loader');

class Ygg {
    constructor(conf) {
        this.$app = new Koa(conf);
        this.$ctrl = initController();
        this.$router = initRouter(this);

        this.$app.use(this.$router.routes());
    }
    start(port) {
        this.$app.listen(port);
        console.log(`app starts at port ${port}`);
    }
}

module.exports = Ygg;