const mongoose = require('mongoose');
const { Schema } = mongoose;

const batteryInspectionSchema = new Schema({
  inspectionID: { 
    type: Schema.Types.ObjectId, 
    ref: 'Inspection', 
    required: true 
  },
  batteryMake: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 50 
  },
  batteryReplacementDate: { 
    type: Date, 
    required: true 
  },
  batteryVoltage: { 
    type: Number, 
    required: true 
  },
  batteryWaterLevel: { 
    type: String, 
    enum: ['Good', 'Ok', 'Low'], 
    required: true 
  },
  batteryCondition: { 
    type: Boolean, 
    required: true 
  },
  batteryLeakOrRust: { 
    type: Boolean, 
    required: true 
  },
  batteryOverallSummary: { 
    type: String, 
    maxlength: 1000 
  },
  attachedImages: [{ 
    type: String, 
    trim: true,
    default: null
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const BatteryInspection = mongoose.model('BatteryInspection', batteryInspectionSchema);

module.exports = BatteryInspection;
