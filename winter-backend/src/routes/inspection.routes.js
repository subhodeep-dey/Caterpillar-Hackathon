'use strict';
const inspectionController = require('../controllers/inspection.controller.js');
const express = require('express');
const router = express.Router();

// Create a new Inspection
router.post('/', inspectionController.create);

// Retrieve all Inspections
router.get('/', inspectionController.findAll);

// Retrieve a single Inspection by ID
router.get('/:inspectionID', inspectionController.findOne);

// Update an Inspection by ID
router.put('/:inspectionID', inspectionController.update);

// Delete an Inspection by ID
router.delete('/:inspectionID', inspectionController.delete);

module.exports = router;
