'use strict'

const http = require('http');
const express = require('express');
const ip = require('ip')
const os = require("os");
const routes = require('./routes');


const app = express();

app.use(routes);

class ApiServer {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(app);
        this.webSocketServer = new (require('./modules/websocketServer'))(this.server);
        this._setAssets();
    }
    _setAssets() {
        app.set('socketServer', this.webSocketServer);
    }
    _startServer() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on http://${ip.address()}:${this.port} or http://${os.hostname()}:${this.port}`);
        });
    }
}

module.exports = ApiServer;
