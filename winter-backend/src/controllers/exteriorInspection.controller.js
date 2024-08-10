const ExteriorInspection = require('../models/exteriorInspection.model.js');

// Create and Save a new ExteriorInspection
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionID) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Create an ExteriorInspection
    const exteriorInspection = new ExteriorInspection({
        inspectionID: req.body.inspectionID,
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

// Find a single exterior inspection with a exteriorinspectionID
exports.findOne = (req, res) => {
    ExteriorInspection.findById(req.params.exteriorinspectionID)
        .then(exteriorInspection => {
            if (!exteriorInspection) {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorinspectionID
                });            
            }
            res.send(exteriorInspection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorinspectionID
                });                
            }
            return res.status(500).send({
                message: "Error retrieving exterior inspection with id " + req.params.exteriorinspectionID
            });
        });
};

// Update an exterior inspection identified by the exteriorinspectionID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionID) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Find exterior inspection and update it with the request body
    ExteriorInspection.findByIdAndUpdate(req.params.exteriorinspectionID, {
        inspectionID: req.body.inspectionID,
        rustDentOrDamage: req.body.rustDentOrDamage,
        oilLeakInSuspension: req.body.oilLeakInSuspension,
        overallSummary: req.body.overallSummary,
        attachedImages: req.body.attachedImages
    }, { new: true })
    .then(exteriorInspection => {
        if (!exteriorInspection) {
            return res.status(404).send({
                message: "ExteriorInspection not found with id " + req.params.exteriorinspectionID
            });
        }
        res.send(exteriorInspection);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ExteriorInspection not found with id " + req.params.exteriorinspectionID
            });                
        }
        return res.status(500).send({
            message: "Error updating exterior inspection with id " + req.params.exteriorinspectionID
        });
    });
};

// Delete an exterior inspection with the specified exteriorinspectionID in the request
exports.delete = (req, res) => {
    ExteriorInspection.findByIdAndRemove(req.params.exteriorinspectionID)
        .then(exteriorInspection => {
            if (!exteriorInspection) {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorinspectionID
                });
            }
            res.send({ message: "ExteriorInspection deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "ExteriorInspection not found with id " + req.params.exteriorinspectionID
                });                
            }
            return res.status(500).send({
                message: "Could not delete exterior inspection with id " + req.params.exteriorinspectionID
            });
        });
};
