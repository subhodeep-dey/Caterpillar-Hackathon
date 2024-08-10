'use strict';
const batteryInspectionController = require('../controllers/batteryInspection.controller.js');
const express = require('express');
const router = express.Router();

// Create a new BatteryInspection
router.post('/', batteryInspectionController.create);

// Retrieve all BatteryInspections
router.get('/', batteryInspectionController.findAll);

// Retrieve a single BatteryInspection by ID
router.get('/:batteryinspectionID', batteryInspectionController.findOne);

// Update a BatteryInspection by ID
router.put('/:batteryinspectionID', batteryInspectionController.update);

// Delete a BatteryInspection by ID
router.delete('/:batteryinspectionID', batteryInspectionController.delete);

module.exports = router;
