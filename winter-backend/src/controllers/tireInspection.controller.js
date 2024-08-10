const TireInspection = require('../models/tireInspection.model.js');

// Create and Save a new TireInspection
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Create a TireInspection
    const tireInspection = new TireInspection({
        inspectionId: req.body.inspectionId,
        tirePressureLeftFront: req.body.tirePressureLeftFront,
        tirePressureRightFront: req.body.tirePressureRightFront,
        tireConditionLeftFront: req.body.tireConditionLeftFront,
        tireConditionRightFront: req.body.tireConditionRightFront,
        tirePressureLeftRear: req.body.tirePressureLeftRear,
        tirePressureRightRear: req.body.tirePressureRightRear,
        tireConditionLeftRear: req.body.tireConditionLeftRear,
        tireConditionRightRear: req.body.tireConditionRightRear,
        overallTireSummary: req.body.overallTireSummary,
        attachedImages: req.body.attachedImages
    });

    // Save TireInspection in the database
    tireInspection.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the TireInspection."
            });
        });
};

// Retrieve and return all tire inspections from the database.
exports.findAll = (req, res) => {
    TireInspection.find()
        .then(tireInspections => {
            res.send(tireInspections);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tire inspections."
            });
        });
};

// Find a single tire inspection with a tireInspectionId
exports.findOne = (req, res) => {
    TireInspection.findById(req.params.tireInspectionId)
        .then(tireInspection => {
            if (!tireInspection) {
                return res.status(404).send({
                    message: "TireInspection not found with id " + req.params.tireInspectionId
                });            
            }
            res.send(tireInspection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "TireInspection not found with id " + req.params.tireInspectionId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving tire inspection with id " + req.params.tireInspectionId
            });
        });
};

// Update a tire inspection identified by the tireInspectionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Find tire inspection and update it with the request body
    TireInspection.findByIdAndUpdate(req.params.tireInspectionId, {
        inspectionId: req.body.inspectionId,
        tirePressureLeftFront: req.body.tirePressureLeftFront,
        tirePressureRightFront: req.body.tirePressureRightFront,
        tireConditionLeftFront: req.body.tireConditionLeftFront,
        tireConditionRightFront: req.body.tireConditionRightFront,
        tirePressureLeftRear: req.body.tirePressureLeftRear,
        tirePressureRightRear: req.body.tirePressureRightRear,
        tireConditionLeftRear: req.body.tireConditionLeftRear,
        tireConditionRightRear: req.body.tireConditionRightRear,
        overallTireSummary: req.body.overallTireSummary,
        attachedImages: req.body.attachedImages
    }, { new: true })
    .then(tireInspection => {
        if (!tireInspection) {
            return res.status(404).send({
                message: "TireInspection not found with id " + req.params.tireInspectionId
            });
        }
        res.send(tireInspection);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "TireInspection not found with id " + req.params.tireInspectionId
            });                
        }
        return res.status(500).send({
            message: "Error updating tire inspection with id " + req.params.tireInspectionId
        });
    });
};

// Delete a tire inspection with the specified tireInspectionId in the request
exports.delete = (req, res) => {
    TireInspection.findByIdAndRemove(req.params.tireInspectionId)
        .then(tireInspection => {
            if (!tireInspection) {
                return res.status(404).send({
                    message: "TireInspection not found with id " + req.params.tireInspectionId
                });
            }
            res.send({ message: "TireInspection deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "TireInspection not found with id " + req.params.tireInspectionId
                });                
            }
            return res.status(500).send({
                message: "Could not delete tire inspection with id " + req.params.tireInspectionId
            });
        });
};
