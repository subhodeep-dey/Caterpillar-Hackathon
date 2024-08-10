const ExteriorInspection = require('../models/exteriorInspection.model.js');

// Create and Save a new ExteriorInspection
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Create an ExteriorInspection
    const exteriorInspection = new ExteriorInspection({
        inspectionId: req.body.inspectionId,
        rustDentOrDamage: req.body.rustDentOrDamage,
        oilLeakInSuspension: req.body.oilLeakInSuspension,
        overallSummary: req.body.overallSummary,
        attachedImages: req.body.attachedImages
    });

    // Save ExteriorInspection in the database
    exteriorInspection.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the ExteriorInspection."
            });
        });
};

// Retrieve and return all exterior inspections from the database.
exports.findAll = (req, res) => {
    ExteriorInspection.find()
        .then(exteriorInspections => {
            res.send(exteriorInspections);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving exterior inspections."
            });
        });
};

// Find a single exterior inspection with a exteriorInspectionId
exports.findOne = (req, res) => {
    ExteriorInspection.findById(req.params.exteriorInspectionId)
        .then(exteriorInspection => {
            if (!exteriorInspection) {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorInspectionId
                });            
            }
            res.send(exteriorInspection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorInspectionId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving exterior inspection with id " + req.params.exteriorInspectionId
            });
        });
};

// Update an exterior inspection identified by the exteriorInspectionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Find exterior inspection and update it with the request body
    ExteriorInspection.findByIdAndUpdate(req.params.exteriorInspectionId, {
        inspectionId: req.body.inspectionId,
        rustDentOrDamage: req.body.rustDentOrDamage,
        oilLeakInSuspension: req.body.oilLeakInSuspension,
        overallSummary: req.body.overallSummary,
        attachedImages: req.body.attachedImages
    }, { new: true })
    .then(exteriorInspection => {
        if (!exteriorInspection) {
            return res.status(404).send({
                message: "ExteriorInspection not found with id " + req.params.exteriorInspectionId
            });
        }
        res.send(exteriorInspection);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ExteriorInspection not found with id " + req.params.exteriorInspectionId
            });                
        }
        return res.status(500).send({
            message: "Error updating exterior inspection with id " + req.params.exteriorInspectionId
        });
    });
};

// Delete an exterior inspection with the specified exteriorInspectionId in the request
exports.delete = (req, res) => {
    ExteriorInspection.findByIdAndRemove(req.params.exteriorInspectionId)
        .then(exteriorInspection => {
            if (!exteriorInspection) {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorInspectionId
                });
            }
            res.send({ message: "ExteriorInspection deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorInspectionId
                });                
            }
            return res.status(500).send({
                message: "Could not delete exterior inspection with id " + req.params.exteriorInspectionId
            });
        });
};
