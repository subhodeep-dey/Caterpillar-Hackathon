'use strict';
const engineInspectionController = require('../controllers/engineInspection.controller.js');
const express = require('express');
const router = express.Router();

// Create a new EngineInspection
router.post('/', engineInspectionController.create);

// Retrieve all EngineInspections
router.get('/', engineInspectionController.findAll);

// Retrieve a single EngineInspection by ID
router.get('/:engineinspectionID', engineInspectionController.findOne);

// Update an EngineInspection by ID
router.put('/:engineinspectionID', engineInspectionController.update);

// Delete an EngineInspection by ID
router.delete('/:engineinspectionID', engineInspectionController.delete);

module.exports = router;
