'use strict'

const io = require('socket.io-client');
const os = require("os");
const cmdLib = require('../modules/cmd_lib');

class _WebSocketClient  {
    constructor(uri) {
        this.uri = uri;
        this.connection = null;
        this.client = null;
        this.client = io(uri);
        this._listenEvents();
        this._connect();
        
    }
    _connect() {//localhost:8080/
        console.log(`Trying to connect to http://${this.uri}`)
        this.client.connect(`${this.uri}`, 'echo-protocol');
    }

    _sendCommandServer(command) {
        this.client.emit(command);
    }
    _isConnected() {
        return this.client.isConnected;
    }
    _sendAnnouncement() {
        console.log('Client Sending announcement')
        this.client.emit('command', JSON.stringify({code: 'announcement', message: 'Announcement', data: {host: os.hostname()}}));
    }
    _listenEvents() {
        this.client.on('connect', (connection) => {
            this._sendAnnouncement();
            console.info(`Socket client connected to ${this.uri}`);

            this.client.on('error', function(error) {
                console.log(`Connection Error: ${error.toString()}`);
            });
            
            this.client.on('command', async (message, cb) => { 
                const _mess = JSON.parse(message);
                const res = await cmdLib.runCommand(_mess.command, _mess.args);
                cb(res.toString());
            });
        });
    }
}

module.exports = _WebSocketClient;