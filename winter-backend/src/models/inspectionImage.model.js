const mongoose = require('mongoose');
const { Schema } = mongoose;

const inspectionImagesSchema = new Schema({
  inspectionID: { 
    type: Schema.Types.ObjectId, 
    ref: 'Inspection', 
    required: true 
  },
  imageType: { 
    type: String, 
    enum: ['Tire', 'Battery', 'Exterior', 'Brakes', 'Engine', 'Customer'], 
    required: true 
  },
  imageURL: { 
    type: String, 
    trim: true, 
    required: true 
  },
  description: { 
    type: String, 
    maxlength: 500,
    default: null
  }
}, {
  timestamps: true
});

const InspectionImages = mongoose.model('InspectionImages', inspectionImagesSchema);

module.exports = InspectionImages;
