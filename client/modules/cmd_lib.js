'use strict'

const { rejects } = require('assert');
const {spawn} = require('child_process');

const runCommand = (cmd, args) => {
    console.log(`Running cimmand ${cmd} with args ${args}`);
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args);
        let output = Buffer.from('');
        child.stdout.on('data', (data) => {
            output = Buffer.concat([output, data]);
        });
        child.stderr.on('data', (data) => {
            output = Buffer.from(data.toString());
        });
        child.on('close', () => {
            return resolve(output);
        })
        child.on('error', (err) => {
            return resolve(err.toString());
        });
    });
}

module.exports = {
    runCommand: runCommand
}