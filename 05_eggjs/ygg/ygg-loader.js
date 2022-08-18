const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

/**
 * 读取目标下的文件
 * @param {*} 目标文件所在(相对)目录
 * @param {*} cb
 */
function loader(dir, cb) {
    const fileDir = path.resolve(__dirname, dir);

    const files = fs.readdirSync(fileDir);

    files.forEach(filename => {
        filename = filename.replace('.js', '');
        const file = require(fileDir + '/' + filename);
        cb(filename, file);
    });
}

function initRouter(app) {
    const router = new Router();

    loader('../routes', (filename, routes) => {
        // 获取路由文件名作为前缀，user.js 文件 ==> /user
        const prefix = filename === 'index' ? '' : `/${filename}`;

        routes = typeof routes === 'function' ? routes(app) : routes;

        Object.keys(routes).forEach(key => {
            // key: 'get /details'
            const [method, path] = key.split(' ');

            console.log(`映射地址: ${method.toLocaleUpperCase()} ${prefix}${path}`);

            // 统一处理路由
            router[method](prefix + path, routes[key]);
        })
    });

    return router;
}

function initController() {
    const controller = {}
    loader('../controller', (filename, ctrl) => {
        controller[filename] = ctrl;
    });
    return controller;
}

module.exports = {
    initRouter,
    initController
};