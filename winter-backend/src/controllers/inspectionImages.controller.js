const InspectionImages = require('../models/inspectionImage.model.js');

// Create and Save a new InspectionImage
exports.create = (req, res) => {
    // Validate request
    if (!req.body.inspectionId || !req.body.imageUrl) {
        return res.status(400).send({
            message: "Inspection ID and image URL cannot be empty"
        });
    }

    // Create an InspectionImage
    const inspectionImage = new InspectionImages({
        inspectionId: req.body.inspectionId,
        imageUrl: req.body.imageUrl,
        description: req.body.description || ""
    });

    // Save InspectionImage in the database
    inspectionImage.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the InspectionImage."
            });
        });
};

// Retrieve and return all inspection images from the database.
exports.findAll = (req, res) => {
    InspectionImages.find()
        .then(inspectionImages => {
            res.send(inspectionImages);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving inspection images."
            });
        });
};

// Find a single inspection image with an imageId
exports.findOne = (req, res) => {
    InspectionImages.findById(req.params.imageId)
        .then(inspectionImage => {
            if (!inspectionImage) {
                return res.status(404).send({
                    message: "InspectionImage not found with id " + req.params.imageId
                });            
            }
            res.send(inspectionImage);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "InspectionImage not found with id " + req.params.imageId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving inspection image with id " + req.params.imageId
            });
        });
};

// Update an inspection image identified by the imageId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.inspectionId || !req.body.imageUrl) {
        return res.status(400).send({
            message: "Inspection ID and image URL cannot be empty"
        });
    }

    // Find inspection image and update it with the request body
    InspectionImages.findByIdAndUpdate(req.params.imageId, {
        inspectionId: req.body.inspectionId,
        imageUrl: req.body.imageUrl,
        description: req.body.description || ""
    }, { new: true })
    .then(inspectionImage => {
        if (!inspectionImage) {
            return res.status(404).send({
                message: "InspectionImage not found with id " + req.params.imageId
            });
        }
        res.send(inspectionImage);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "InspectionImage not found with id " + req.params.imageId
            });                
        }
        return res.status(500).send({
            message: "Error updating inspection image with id " + req.params.imageId
        });
    });
};

// Delete an inspection image with the specified imageId in the request
exports.delete = (req, res) => {
    InspectionImages.findByIdAndRemove(req.params.imageId)
        .then(inspectionImage => {
            if (!inspectionImage) {
                return res.status(404).send({
                    message: "InspectionImage not found with id " + req.params.imageId
                });
            }
            res.send({ message: "InspectionImage deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "InspectionImage not found with id " + req.params.imageId
                });                
            }
            return res.status(500).send({
                message: "Could not delete inspection image with id " + req.params.imageId
            });
        });
};
