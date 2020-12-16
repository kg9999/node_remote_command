'use strict'

const ApiServer = require("./app");


if (process.argv.length < 3 && !process.env.npm_config_port) {
    console.log(`Usage: npm --port=PORT start/test OR node index.js PORT`);
    process.exit();
    // throw Error (`Usage: npm --port=PORT start/test OR node index.js PORT`);
}

const port = process.env.npm_config_port || process.argv[2];

const mainApp = new ApiServer(port);
try {
    mainApp._startServer();
} catch (err) {
    console.error(`Error: ${err.message}`);
}

