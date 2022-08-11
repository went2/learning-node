const api = require('./api');
const proxy = require('./proxy');

api.listen(3000);
proxy.listen(4000);