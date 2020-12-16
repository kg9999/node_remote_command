
'use strict'

const sendCommandClient = async (req, res, socketServer) => {
    try {
        const resp = await socketServer._sendCommandClient(req.body);
        res.json({code: 'ok', message: 'Done', data: resp})
    } catch (err) {
        console.log(err.message);
        res.json({code: 'error', message: err.message});
    }
};

const getHostNames = (req, res, socketServer) => {
    try {
        const keys = socketServer._getHostNames();
        res.json({code: 'ok', message: 'Done', data: keys})
    } catch (err) {
        console.log(err.message);
        res.json({code: 'error', message: err.message});
    }
}

module.exports = {
    sendCommandClient: sendCommandClient,
    getHostNames: getHostNames
}