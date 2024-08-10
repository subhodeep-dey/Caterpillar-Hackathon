'use strict';
const exteriorInspectionController = require('../controllers/exteriorInspection.controller.js');
const express = require('express');
const router = express.Router();

// Create a new ExteriorInspection
router.post('/', exteriorInspectionController.create);

// Retrieve all ExteriorInspections
router.get('/', exteriorInspectionController.findAll);

// Retrieve a single ExteriorInspection by ID
router.get('/:exteriorInspectionId', exteriorInspectionController.findOne);

// Update an ExteriorInspection by ID
router.put('/:exteriorInspectionId', exteriorInspectionController.update);

// Delete an ExteriorInspection by ID
router.delete('/:exteriorInspectionId', exteriorInspectionController.delete);

module.exports = router;
