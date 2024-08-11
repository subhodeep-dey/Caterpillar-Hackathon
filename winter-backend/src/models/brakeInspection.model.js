const mongoose = require('mongoose');
const { Schema } = mongoose;

const brakeInspectionSchema = new Schema({
  inspectionID: { 
    type: Schema.Types.ObjectId, 
    ref: 'Inspection', 
    required: true 
  },
  brakeFluidLevel: { 
    type: String, 
    enum: ['Good', 'Ok', 'Low'], 
    required: true 
  },
  brakeConditionFront: { 
    type: String, 
    enum: ['Good', 'Ok', 'Needs Replacement'], 
    required: true 
  },
  brakeConditionRear: { 
    type: String, 
    enum: ['Good', 'Ok', 'Needs Replacement'], 
    required: true 
  },
  emergencyBrakeCondition: { 
    type: String, 
    enum: ['Good', 'Ok', 'Low'], 
    required: true 
  },
  brakeOverallSummary: { 
    type: String, 
    maxlength: 1000 
  },
  attachedImages: [{ 
    type: String, 
    trim: true,
    default: null
  }]
}, {
  timestamps: true
});

const BrakeInspection = mongoose.model('BrakeInspection', brakeInspectionSchema);

module.exports = BrakeInspection;
