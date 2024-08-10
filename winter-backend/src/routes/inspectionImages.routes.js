'use strict';
const inspectionImagesController = require('../controllers/inspectionImages.controller.js');
const express = require('express');
const router = express.Router();

// Create a new InspectionImage
router.post('/', inspectionImagesController.create);

// Retrieve all InspectionImages
router.get('/', inspectionImagesController.findAll);

// Retrieve a single InspectionImage by ID
router.get('/:imageId', inspectionImagesController.findOne);

// Update an InspectionImage by ID
router.put('/:imageId', inspectionImagesController.update);

// Delete an InspectionImage by ID
router.delete('/:imageId', inspectionImagesController.delete);

module.exports = router;
