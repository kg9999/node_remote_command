'use strict'

const express = require('express');
const {sendCommandClient, getHostNames} = require('../controllers/command');
const {validateCommandPost} = require('../schemas/index.js');

const bodyParser = require('body-parser');

const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/hostname', (req, res) => {
    const socketServer = req.app.get('socketServer');
    getHostNames(req, res, socketServer);
});

router.post('/', urlencodedParser, jsonParser, validateCommandPost,  (req, res) => {
    
    const socketServer = req.app.get('socketServer');
    sendCommandClient(req, res, socketServer);
});

module.exports = router;

