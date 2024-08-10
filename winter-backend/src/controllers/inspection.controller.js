const Inspection = require('../models/inspection.model.js');

// Create and Save a new Inspection
exports.create = (req, res) => {
    // Validate request
    if (!req.body.truckSerialNumber || !req.body.truckModel || !req.body.inspectorName) {
        return res.status(400).send({
            message: "Truck serial number, model, and inspector name cannot be empty"
        });
    }

    // Create an Inspection
    const inspection = new Inspection({
        truckSerialNumber: req.body.truckSerialNumber,
        truckModel: req.body.truckModel,
        inspectorName: req.body.inspectorName,
        inspectionEmployeeID: req.body.inspectionEmployeeID,
        dateTimeOfInspection: req.body.dateTimeOfInspection,
        locationOfInspection: req.body.locationOfInspection,
        geoCoordinatesOfInspection: req.body.geoCoordinatesOfInspection,
        serviceMeterHours: req.body.serviceMeterHours,
        inspectorSignature: req.body.inspectorSignature,
        customerName: req.body.customerName,
        catCustomerID: req.body.catCustomerID
    });

    // Save Inspection in the database
    inspection.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Inspection."
            });
        });
};

// Retrieve and return all inspections from the database.
exports.findAll = (req, res) => {
    Inspection.find()
        .then(inspections => {
            res.send(inspections);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving inspections."
            });
        });
};

// Find a single inspection with an inspectionId
exports.findOne = (req, res) => {
    Inspection.findById(req.params.inspectionId)
        .then(inspection => {
            if (!inspection) {
                return res.status(404).send({
                    message: "Inspection not found with id " + req.params.inspectionId
                });            
            }
            res.send(inspection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Inspection not found with id " + req.params.inspectionId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving inspection with id " + req.params.inspectionId
            });
        });
};

// Update an inspection identified by the inspectionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.truckSerialNumber || !req.body.truckModel) {
        return res.status(400).send({
            message: "Truck serial number and model cannot be empty"
        });
    }

    // Find inspection and update it with the request body
    Inspection.findByIdAndUpdate(req.params.inspectionId, {
        truckSerialNumber: req.body.truckSerialNumber,
        truckModel: req.body.truckModel,
        inspectorName: req.body.inspectorName || "Unknown Inspector",
        inspectionEmployeeID: req.body.inspectionEmployeeID,
        dateTimeOfInspection: req.body.dateTimeOfInspection,
        locationOfInspection: req.body.locationOfInspection,
        geoCoordinatesOfInspection: req.body.geoCoordinatesOfInspection,
        serviceMeterHours: req.body.serviceMeterHours,
        inspectorSignature: req.body.inspectorSignature,
        customerName: req.body.customerName,
        catCustomerID: req.body.catCustomerID
    }, { new: true })
    .then(inspection => {
        if (!inspection) {
            return res.status(404).send({
                message: "Inspection not found with id " + req.params.inspectionId
            });
        }
        res.send(inspection);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Inspection not found with id " + req.params.inspectionId
            });                
        }
        return res.status(500).send({
            message: "Error updating inspection with id " + req.params.inspectionId
        });
    });
};

// Delete an inspection with the specified inspectionId in the request
exports.delete = (req, res) => {
    Inspection.findByIdAndRemove(req.params.inspectionId)
        .then(inspection => {
            if (!inspection) {
                return res.status(404).send({
                    message: "Inspection not found with id " + req.params.inspectionId
                });
            }
            res.send({ message: "Inspection deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Inspection not found with id " + req.params.inspectionId
                });                
            }
            return res.status(500).send({
                message: "Could not delete inspection with id " + req.params.inspectionId
            });
        });
};
