const BrakeInspection = require('../models/brakeInspection.model.js');

// Create and Save a new BrakeInspection
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Create a BrakeInspection
    const brakeInspection = new BrakeInspection({
        inspectionId: req.body.inspectionId,
        brakeFluidLevel: req.body.brakeFluidLevel,
        brakeConditionFront: req.body.brakeConditionFront,
        brakeConditionRear: req.body.brakeConditionRear,
        emergencyBrake: req.body.emergencyBrake,
        brakeOverallSummary: req.body.brakeOverallSummary,
        attachedImages: req.body.attachedImages
    });

    // Save BrakeInspection in the database
    brakeInspection.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the BrakeInspection."
            });
        });
};

// Retrieve and return all brake inspections from the database.
exports.findAll = (req, res) => {
    BrakeInspection.find()
        .then(brakeInspections => {
            res.send(brakeInspections);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving brake inspections."
            });
        });
};

// Find a single brake inspection with a brakeInspectionId
exports.findOne = (req, res) => {
    BrakeInspection.findById(req.params.brakeInspectionId)
        .then(brakeInspection => {
            if (!brakeInspection) {
                return res.status(404).send({
                    message: "BrakeInspection not found with id " + req.params.brakeInspectionId
                });            
            }
            res.send(brakeInspection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "BrakeInspection not found with id " + req.params.brakeInspectionId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving brake inspection with id " + req.params.brakeInspectionId
            });
        });
};

// Update a brake inspection identified by the brakeInspectionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Find brake inspection and update it with the request body
    BrakeInspection.findByIdAndUpdate(req.params.brakeInspectionId, {
        inspectionId: req.body.inspectionId,
        brakeFluidLevel: req.body.brakeFluidLevel,
        brakeConditionFront: req.body.brakeConditionFront,
        brakeConditionRear: req.body.brakeConditionRear,
        emergencyBrake: req.body.emergencyBrake,
        brakeOverallSummary: req.body.brakeOverallSummary,
        attachedImages: req.body.attachedImages
    }, { new: true })
    .then(brakeInspection => {
        if (!brakeInspection) {
            return res.status(404).send({
                message: "BrakeInspection not found with id " + req.params.brakeInspectionId
            });
        }
        res.send(brakeInspection);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "BrakeInspection not found with id " + req.params.brakeInspectionId
            });                
        }
        return res.status(500).send({
            message: "Error updating brake inspection with id " + req.params.brakeInspectionId
        });
    });
};

// Delete a brake inspection with the specified brakeInspectionId in the request
exports.delete = (req, res) => {
    BrakeInspection.findByIdAndRemove(req.params.brakeInspectionId)
        .then(brakeInspection => {
            if (!brakeInspection) {
                return res.status(404).send({
                    message: "BrakeInspection not found with id " + req.params.brakeInspectionId
                });
            }
            res.send({ message: "BrakeInspection deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "BrakeInspection not found with id " + req.params.brakeInspectionId
                });                
            }
            return res.status(500).send({
                message: "Could not delete brake inspection with id " + req.params.brakeInspectionId
            });
        });
};
