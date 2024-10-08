const EngineInspection = require('../models/engineInspection.model.js');

// Create and Save a new EngineInspection
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionID) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Create an EngineInspection
    const engineInspection = new EngineInspection({
        inspectionID: req.body.inspectionID,
        rustDentsOrDamage: req.body.rustDentsOrDamage,
        engineOilCondition: req.body.engineOilCondition,
        engineOilColor: req.body.engineOilColor,
        brakeFluidCondition: req.body.brakeFluidCondition,
        brakeFluidColor: req.body.brakeFluidColor,
        oilLeakInEngine: req.body.oilLeakInEngine,
        overallSummary: req.body.overallSummary,
        attachedImages: req.body.attachedImages
    });

    // Save EngineInspection in the database
    engineInspection.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the EngineInspection."
            });
        });
};

// Retrieve and return all engine inspections from the database.
exports.findAll = (req, res) => {
    EngineInspection.find()
        .then(engineInspections => {
            res.send(engineInspections);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving engine inspections."
            });
        });
};

// Find a single engine inspection with a engineinspectionID
exports.findOne = (req, res) => {
    EngineInspection.findById(req.params.engineinspectionID)
        .then(engineInspection => {
            if (!engineInspection) {
                return res.status(404).send({
                    message: "EngineInspection not found with id " + req.params.engineinspectionID
                });            
            }
            res.send(engineInspection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "EngineInspection not found with id " + req.params.engineinspectionID
                });                
            }
            return res.status(500).send({
                message: "Error retrieving engine inspection with id " + req.params.engineinspectionID
            });
        });
};

// Update an engine inspection identified by the engineinspectionID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionID) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Find engine inspection and update it with the request body
    EngineInspection.findByIdAndUpdate(req.params.engineinspectionID, {
        inspectionID: req.body.inspectionID,
        rustDentsOrDamage: req.body.rustDentsOrDamage,
        engineOilCondition: req.body.engineOilCondition,
        engineOilColor: req.body.engineOilColor,
        brakeFluidCondition: req.body.brakeFluidCondition,
        brakeFluidColor: req.body.brakeFluidColor,
        oilLeakInEngine: req.body.oilLeakInEngine,
        overallSummary: req.body.overallSummary,
        attachedImages: req.body.attachedImages
    }, { new: true })
    .then(engineInspection => {
        if (!engineInspection) {
            return res.status(404).send({
                message: "EngineInspection not found with id " + req.params.engineinspectionID
            });
        }
        res.send(engineInspection);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "EngineInspection not found with id " + req.params.engineinspectionID
            });                
        }
        return res.status(500).send({
            message: "Error updating engine inspection with id " + req.params.engineinspectionID
        });
    });
};

// Delete an engine inspection with the specified engineinspectionID in the request
exports.delete = (req, res) => {
    EngineInspection.findByIdAndRemove(req.params.engineinspectionID)
        .then(engineInspection => {
            if (!engineInspection) {
                return res.status(404).send({
                    message: "EngineInspection not found with id " + req.params.engineinspectionID
                });
            }
            res.send({ message: "EngineInspection deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "EngineInspection not found with id " + req.params.engineinspectionID
                });                
            }
            return res.status(500).send({
                message: "Could not delete engine inspection with id " + req.params.engineinspectionID
            });
        });
};
