const BatteryInspection = require('../models/batteryInspection.model.js');

// Create and Save a new BatteryInspection
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Create a BatteryInspection
    const batteryInspection = new BatteryInspection({
        inspectionId: req.body.inspectionId,
        batteryMake: req.body.batteryMake,
        batteryReplacementDate: req.body.batteryReplacementDate,
        batteryVoltage: req.body.batteryVoltage,
        batteryWaterLevel: req.body.batteryWaterLevel,
        conditionOfBattery: req.body.conditionOfBattery,
        anyLeakOrRust: req.body.anyLeakOrRust,
        batteryOverallSummary: req.body.batteryOverallSummary,
        attachedImages: req.body.attachedImages
    });

    // Save BatteryInspection in the database
    batteryInspection.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the BatteryInspection."
            });
        });
};

// Retrieve and return all battery inspections from the database.
exports.findAll = (req, res) => {
    BatteryInspection.find()
        .then(batteryInspections => {
            res.send(batteryInspections);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving battery inspections."
            });
        });
};

// Find a single battery inspection with a batteryInspectionId
exports.findOne = (req, res) => {
    BatteryInspection.findById(req.params.batteryInspectionId)
        .then(batteryInspection => {
            if (!batteryInspection) {
                return res.status(404).send({
                    message: "BatteryInspection not found with id " + req.params.batteryInspectionId
                });            
            }
            res.send(batteryInspection);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "BatteryInspection not found with id " + req.params.batteryInspectionId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving battery inspection with id " + req.params.batteryInspectionId
            });
        });
};

// Update a battery inspection identified by the batteryInspectionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionId) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Find battery inspection and update it with the request body
    BatteryInspection.findByIdAndUpdate(req.params.batteryInspectionId, {
        inspectionId: req.body.inspectionId,
        batteryMake: req.body.batteryMake,
        batteryReplacementDate: req.body.batteryReplacementDate,
        batteryVoltage: req.body.batteryVoltage,
        batteryWaterLevel: req.body.batteryWaterLevel,
        conditionOfBattery: req.body.conditionOfBattery,
        anyLeakOrRust: req.body.anyLeakOrRust,
        batteryOverallSummary: req.body.batteryOverallSummary,
        attachedImages: req.body.attachedImages
    }, { new: true })
    .then(batteryInspection => {
        if (!batteryInspection) {
            return res.status(404).send({
                message: "BatteryInspection not found with id " + req.params.batteryInspectionId
            });
        }
        res.send(batteryInspection);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "BatteryInspection not found with id " + req.params.batteryInspectionId
            });                
        }
        return res.status(500).send({
            message: "Error updating battery inspection with id " + req.params.batteryInspectionId
        });
    });
};

// Delete a battery inspection with the specified batteryInspectionId in the request
exports.delete = (req, res) => {
    BatteryInspection.findByIdAndRemove(req.params.batteryInspectionId)
        .then(batteryInspection => {
            if (!batteryInspection) {
                return res.status(404).send({
                    message: "BatteryInspection not found with id " + req.params.batteryInspectionId
                });
            }
            res.send({ message: "BatteryInspection deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "BatteryInspection not found with id " + req.params.batteryInspectionId
                });                
            }
            return res.status(500).send({
                message: "Could not delete battery inspection with id " + req.params.batteryInspectionId
            });
        });
};
