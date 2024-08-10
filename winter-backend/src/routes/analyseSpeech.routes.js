'use strict';
const express = require('express');
const router = express.Router();
const analyseSpeech = require('../controllers/analyseSpeechGemini.controller.js');

// Route to handle speech analysis
router.post('/', analyseSpeech.analyze);

module.exports = router;
