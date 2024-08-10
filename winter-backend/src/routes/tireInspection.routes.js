'use strict';
const tireInspectionController = require('../controllers/tireInspection.controller.js');
const express = require('express');
const router = express.Router();

// Create a new TireInspection
router.post('/', tireInspectionController.create);

// Retrieve all TireInspections
router.get('/', tireInspectionController.findAll);

// Retrieve a single TireInspection by ID
router.get('/:tireinspectionID', tireInspectionController.findOne);

// Update a TireInspection by ID
router.put('/:tireinspectionID', tireInspectionController.update);

// Delete a TireInspection by ID
router.delete('/:tireinspectionID', tireInspectionController.delete);

module.exports = router;
