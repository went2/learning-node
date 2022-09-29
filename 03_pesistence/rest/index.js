const Koa = require('koa');
const app = new Koa();

const config = require('./conf');
const { loadModel } = require('./framework/loader');

loadModel(config)(app);
const rest = require('./framework/router');

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(rest);

const PORT = 3000;
app.listen(port, () => {
    console.log(`app started at port ${PORT}`);
});