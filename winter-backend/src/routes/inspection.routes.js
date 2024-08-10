'use strict';
const inspectionController = require('../controllers/inspection.controller.js');
const express = require('express');
const router = express.Router();

// Create a new Inspection
router.post('/', inspectionController.create);

// Retrieve all Inspections
router.get('/', inspectionController.findAll);

// Retrieve a single Inspection by ID
router.get('/:inspectionId', inspectionController.findOne);

// Update an Inspection by ID
router.put('/:inspectionId', inspectionController.update);

// Delete an Inspection by ID
router.delete('/:inspectionId', inspectionController.delete);

module.exports = router;
