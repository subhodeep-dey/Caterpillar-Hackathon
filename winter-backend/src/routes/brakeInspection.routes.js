'use strict';
const brakeInspectionController = require('../controllers/brakeInspection.controller.js');
const express = require('express');
const router = express.Router();

// Create a new BrakeInspection
router.post('/', brakeInspectionController.create);

// Retrieve all BrakeInspections
router.get('/', brakeInspectionController.findAll);

// Retrieve a single BrakeInspection by ID
router.get('/:brakeinspectionID', brakeInspectionController.findOne);

// Update a BrakeInspection by ID
router.put('/:brakeinspectionID', brakeInspectionController.update);

// Delete a BrakeInspection by ID
router.delete('/:brakeinspectionID', brakeInspectionController.delete);

module.exports = router;
