const Vehicle = require('../models/vehicle.model.js');

// Create and Save a new Vehicle
exports.create = (req, res) => {
    // Validate request
    if (!req.body.serialNumber || !req.body.model) {
        return res.status(400).send({
            message: "Vehicle serial number and model cannot be empty"
        });
    }

    // Create a Vehicle
    const vehicle = new Vehicle({
        serialNumber: req.body.serialNumber,
        model: req.body.model,
        // Add other fields if required
    });

    // Save Vehicle in the database
    vehicle.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Vehicle."
            });
        });
};

// Retrieve and return all vehicles from the database.
exports.findAll = (req, res) => {
    Vehicle.find()
        .then(vehicles => {
            res.send(vehicles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving vehicles."
            });
        });
};

// Find a single vehicle with a vehicleId
exports.findOne = (req, res) => {
    Vehicle.findById(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).send({
                    message: "Vehicle not found with id " + req.params.vehicleId
                });            
            }
            res.send(vehicle);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Vehicle not found with id " + req.params.vehicleId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving vehicle with id " + req.params.vehicleId
            });
        });
};

// Update a vehicle identified by the vehicleId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.model) {
        return res.status(400).send({
            message: "Vehicle model cannot be empty"
        });
    }

    // Find vehicle and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId, {
        serialNumber: req.body.serialNumber || "Unknown Serial Number",
        model: req.body.model,
        // Update other fields if required
    }, { new: true })
    .then(vehicle => {
        if (!vehicle) {
            return res.status(404).send({
                message: "Vehicle not found with id " + req.params.vehicleId
            });
        }
        res.send(vehicle);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Vehicle not found with id " + req.params.vehicleId
            });                
        }
        return res.status(500).send({
            message: "Error updating vehicle with id " + req.params.vehicleId
        });
    });
};

// Delete a vehicle with the specified vehicleId in the request
exports.delete = (req, res) => {
    Vehicle.findByIdAndRemove(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).send({
                    message: "Vehicle not found with id " + req.params.vehicleId
                });
            }
            res.send({ message: "Vehicle deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Vehicle not found with id " + req.params.vehicleId
                });                
            }
            return res.status(500).send({
                message: "Could not delete vehicle with id " + req.params.vehicleId
            });
        });
};
