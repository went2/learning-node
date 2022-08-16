const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

function load(dir, cb) {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir);
    const files = fs.readdirSync(url);

    files.forEach(filename => {
        filename = filename.replate('.js', '');
        const file = require(url + '/' + filename);
        cb(filename, file);
    });
}

const loadModel = config => app => {
    mongoose.connect(config.db.url, config.db.options);
    const conn = mongoose.connection;
    conn.on('error', () => console.error('连接失败'));

    app.$model = {};

    // 创建 model 挂到传入的 app上
    // filename, {schema} 实参谁传入？谁调用谁传入
    load('../model', (filename, { schema }) => {
        console.log('load model' + filename, schema);

        app.$model[filename] = mongoose.model(filename, schema);
    });
};

module.exports = {
    loadModel,
};