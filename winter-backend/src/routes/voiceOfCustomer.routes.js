'use strict';
const voiceOfCustomerController = require('../controllers/voiceOfCustomer.controller.js');
const express = require('express');
const router = express.Router();

// Create a new VoiceOfCustomer record
router.post('/', voiceOfCustomerController.create);

// Retrieve all VoiceOfCustomer records
router.get('/', voiceOfCustomerController.findAll);

// Retrieve a single VoiceOfCustomer record by ID
router.get('/:voiceOfCustomerId', voiceOfCustomerController.findOne);

// Update a VoiceOfCustomer record by ID
router.put('/:voiceOfCustomerId', voiceOfCustomerController.update);

// Delete a VoiceOfCustomer record by ID
router.delete('/:voiceOfCustomerId', voiceOfCustomerController.delete);

module.exports = router;
