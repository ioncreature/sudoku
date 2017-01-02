let http = require('http'),
    app = require('./app');

http.createServer(app).listen(3000);