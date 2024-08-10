'use strict';
const vehicleController = require('../controllers/vehicle.controller.js');
const express = require('express');
const router = express.Router();

// Create a new Vehicle
router.post('/', vehicleController.create);

// Retrieve all Vehicles
router.get('/', vehicleController.findAll);

// Retrieve a single Vehicle by ID
router.get('/:vehicleId', vehicleController.findOne);

// Update a Vehicle by ID
router.put('/:vehicleId', vehicleController.update);

// Delete a Vehicle by ID
router.delete('/:vehicleId', vehicleController.delete);

module.exports = router;
