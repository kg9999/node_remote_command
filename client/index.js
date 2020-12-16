

'use strict'

if (arguments.length < 3 && !process.env.npm_config_port) {
    console.log(`Usage: npm --uri=URI start/test OR node index.js URI. eg. node index.js 127.0.0.1:8080/`);
    process.exit();
    // throw Error (`Usage: npm --port=PORT start/test OR node index.js PORT`);
}
const uri = process.env.npm_config_uri || arguments[2];

console.log(process.env.npm_config_uri)
const WebSocketClient = new (require('./modules/webSocketClient'))(uri);

