const VoiceOfCustomer = require('../models/voiceOfCustomer.model.js');

// Create and Save a new VoiceOfCustomer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionID) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Create a VoiceOfCustomer
    const voiceOfCustomer = new VoiceOfCustomer({
        inspectionID: req.body.inspectionID,
        feedback: req.body.feedback,
        images: req.body.images
    });

    // Save VoiceOfCustomer in the database
    voiceOfCustomer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the VoiceOfCustomer."
            });
        });
};

// Retrieve and return all voice of customer records from the database.
exports.findAll = (req, res) => {
    VoiceOfCustomer.find()
        .then(voiceOfCustomers => {
            res.send(voiceOfCustomers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving voice of customer records."
            });
        });
};

// Find a single voice of customer record with a voiceOfCustomerId
exports.findOne = (req, res) => {
    VoiceOfCustomer.findById(req.params.voiceOfCustomerId)
        .then(voiceOfCustomer => {
            if (!voiceOfCustomer) {
                return res.status(404).send({
                    message: "VoiceOfCustomer not found with id " + req.params.voiceOfCustomerId
                });            
            }
            res.send(voiceOfCustomer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "VoiceOfCustomer not found with id " + req.params.voiceOfCustomerId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving voice of customer with id " + req.params.voiceOfCustomerId
            });
        });
};

// Update a voice of customer record identified by the voiceOfCustomerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionID) {
        return res.status(400).send({
            message: "Inspection ID cannot be empty"
        });
    }

    // Find voice of customer record and update it with the request body
    VoiceOfCustomer.findByIdAndUpdate(req.params.voiceOfCustomerId, {
        inspectionID: req.body.inspectionID,
        feedback: req.body.feedback,
        images: req.body.images
    }, { new: true })
    .then(voiceOfCustomer => {
        if (!voiceOfCustomer) {
            return res.status(404).send({
                message: "VoiceOfCustomer not found with id " + req.params.voiceOfCustomerId
            });
        }
        res.send(voiceOfCustomer);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "VoiceOfCustomer not found with id " + req.params.voiceOfCustomerId
            });                
        }
        return res.status(500).send({
            message: "Error updating voice of customer with id " + req.params.voiceOfCustomerId
        });
    });
};

// Delete a voice of customer record with the specified voiceOfCustomerId in the request
exports.delete = (req, res) => {
    VoiceOfCustomer.findByIdAndRemove(req.params.voiceOfCustomerId)
        .then(voiceOfCustomer => {
            if (!voiceOfCustomer) {
                return res.status(404).send({
                    message: "VoiceOfCustomer not found with id " + req.params.voiceOfCustomerId
                });
            }
            res.send({ message: "VoiceOfCustomer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "VoiceOfCustomer not found with id " + req.params.voiceOfCustomerId
                });                
            }
            return res.status(500).send({
                message: "Could not delete voice of customer with id " + req.params.voiceOfCustomerId
            });
        });
};
