const http = require('http');
const app = require('./app');
var server = http.createServer(app);
server.listen(process.env.PORT_NO);