'use strict'

class _WebSocketServer  {
    constructor(server) {
        this.connections = new Map();
        this.io = require('socket.io')(server);
        this._listenEvents();
    }
    _sendCommandClient(commandObj) {
        return new Promise((resolve, reject) => {
            try {
                if (!this.connections[commandObj.host]) {
                    console.warn(`Client ${commandObj.host} not connected`);
                    return;
                }
                this.connections[commandObj.host].emit('command', JSON.stringify({command: commandObj.command, args: commandObj.arguments}), (data) => {
                    return resolve(data);
                });
            } catch (err) {
                return reject(err);
            }
        });
       
    }
    _listenEvents() {
        this.io.on('connection', (connection) => {
            console.log('GNew Client connected.');
            
            connection.on('command', (message) => {
                const _message = JSON.parse(message);
                switch(_message.code) {
                    case 'announcement': 
                        console.log(`Got new announcement from host: ${_message.data.host}`);
                        this.connections[_message.data.host] = connection;
                        break;
                    
                    default: 
                        console.info(`command not found!`);
                        break;
                }
            });
            connection.on('close', (reasonCode, description) => {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
                const socketKey = getMapByValue(this.connections, connection);
                delete this.connections[socketKey];
            });
            connection.on('error', (err) => {
                console.warn(err)
            })
        });
    }
    _getHostNames() {
        const hostnames = [];
        for (let host in this.connections) {
            hostnames.push(host);
        }
        return hostnames;
    }
}

function getMapByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }

module.exports = _WebSocketServer;