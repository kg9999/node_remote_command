'use strict'

const express = require('express');

const router = express.Router();

router.use('/api/command', require('./command'));

module.exports = router;